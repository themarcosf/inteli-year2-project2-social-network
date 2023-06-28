extern crate rocket;
use serde::{Deserialize, Serialize};
use std::{process, thread, time::Duration};
extern crate paho_mqtt as mqtt;
use std::net::{IpAddr, Ipv4Addr};
use std::process::Command;

// #[derive(Serialize)]
// struct Pong {
//     message: String,
// }

// #[get("/")]
// fn index() -> Json<Pong> {
//     Json(Pong {
//         message: "pong".to_string(),
//     })
// }

// #[derive(Deserialize)]
// struct Body {
//     movie_title: String,
//     amount: u64,
// }

#[derive(Serialize)]
struct Response {
    based_on: String,
    amount: u64,
    movies: Option<Vec<String>>,
}

#[derive(Debug, Serialize, Deserialize)]
struct PythonOutput {
    #[serde(default)]
    based_on: String,
    amount: Option<u64>,
    movies: Option<Vec<String>>,
}

fn get_movie_recommendations(movie_title: String, amount: u64) -> PythonOutput {
    let output = Command::new("python")
        .args(&[
            "src/movie_recommender2.py",
            movie_title.as_str(),
            &amount.to_string(),
        ])
        .output()
        .expect("Failed to execute the Python script");

    let stdout = String::from_utf8_lossy(&output.stdout);

    let result: PythonOutput = serde_json::from_str(&stdout).unwrap();

    result
}

// #[post("/getRecommendations", data = "<body>")]
// fn get_recommendations(body: Json<Body>) -> Json<Response> {
//     let movie_title: String = body.movie_title.clone();
//     let amount: u64 = body.amount;

//     let response: PythonOutput = get_movie_recommendations(movie_title.clone(), amount);

//     let amount = response.amount.unwrap_or(0);
//     let movies = response.movies;

//     Json(Response {
//         based_on: movie_title,
//         amount,
//         movies,
//     })
// }

const DFLT_BROKER: &str = "mqtt://mqtt-dashboard.com";
const DFLT_CLIENT: &str = "IA Recommendation";
const DFLT_TOPICS: &[&str] = &["IA Recommendation", "Web App"];
const DFLT_QOS: &[i32] = &[0, 1];

fn try_reconnect(cli: &mqtt::Client) -> bool {
    println!("Connection lost. Waiting to retry connection");
    for _ in 0..12 {
        thread::sleep(Duration::from_millis(5000));
        if cli.reconnect().is_ok() {
            println!("Successfully reconnected");
            return true;
        }
    }
    println!("Unable to reconnect after several attempts.");
    false
}

fn subscribe_topics(cli: &mqtt::Client) {
    if let Err(e) = cli.subscribe_many(DFLT_TOPICS, DFLT_QOS) {
        println!("Error subscribes topics: {:?}", e);
        process::exit(1);
    }
}

// #[rocket::main]
fn main() {
    let mut config = rocket::Config::default();

    config.address = IpAddr::V4(Ipv4Addr::new(0, 0, 0, 0));
    config.port = 5500;

    let create_opts = mqtt::CreateOptionsBuilder::new()
        .server_uri(DFLT_BROKER)
        .client_id(DFLT_CLIENT.to_string())
        .finalize();

    let cli = mqtt::Client::new(create_opts).unwrap_or_else(|err| {
        println!("Error creating the client: {:?}", err);
        process::exit(1);
    });

    let rx = cli.start_consuming();

    let lwt = mqtt::MessageBuilder::new()
        .topic("test")
        .payload("Consumer lost connection")
        .finalize();
    let conn_opts = mqtt::ConnectOptionsBuilder::new()
        .keep_alive_interval(Duration::from_secs(20))
        .clean_session(false)
        .will_message(lwt)
        .finalize();

    if let Err(e) = cli.connect(conn_opts) {
        println!("Unable to connect:\n\t{:?}", e);
        process::exit(1);
    }

    subscribe_topics(&cli);

    println!("Processing requests...");
    loop {
        if let Ok(Some(msg)) = rx.recv() {
            println!("Receiving ...");

            // message will come as a json string which might be read as a json object
            let message: &str = &msg.payload_str();
            let message_json: serde_json::Value = serde_json::from_str(message).unwrap();

            println!("Received: {:?}\n", message.to_string().replace("\"", ""));

            let movie_title: String = message_json["content"]
                .to_string()
                .replace("\"", "")
                .to_string();
            println!("Movie title: {}", movie_title);

            let user_id: String = message_json["userId"]
                .to_string()
                .replace("\"", "")
                .to_string();
            println!("User id: {}\n", user_id);

            let result: PythonOutput = get_movie_recommendations(movie_title.clone(), 5);
            println!("Result: {:?}", result);

            println!(
                "Generating recommendations for '{}' for user '{}'",
                movie_title, user_id
            );

            if let Some(movies) = result.movies {
                if movies.is_empty() {
                    println!(
                        "Unable to generate movie recommendations for '{}'",
                        movie_title
                    );
                    continue;
                }

                let response = Response {
                    based_on: movie_title,
                    amount: movies.len() as u64,
                    movies: Some(movies.clone()),
                };

                let content = serde_json::to_string(&response.movies).unwrap();

                let message = mqtt::MessageBuilder::new()
                    .topic("recommendation/".to_string() + &user_id.replace("\"", ""))
                    .payload(content)
                    .qos(1)
                    .finalize();

                if let Err(err) = cli.publish(message) {
                    println!("Failed to publish message: {:?}", err);
                }

                println!("Received: {:?}", msg.payload_str());
                println!("Recommendations: {:?}\n\n\n\n\n", movies);
            } else {
                println!(
                    "Missing '{}' field in the Python script output.",
                    msg.payload_str()
                );
                continue;
            }
        } else if !cli.is_connected() {
            println!("Lost connection. Attempting reconnect");

            if try_reconnect(&cli) {
                println!("Resubscribe topics...");
                subscribe_topics(&cli);
            } else {
                println!("Exiting");
            }
        }
    }
    // let _ = rocket::build()
    //     .configure(config)
    //     .mount("/", routes![index, get_recommendations])
    //     .launch()
    //     .await;
}
