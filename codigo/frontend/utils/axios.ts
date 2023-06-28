import axios from "axios";

const instance = axios.create({
    baseURL: "http://load-balancer-1420159949.us-east-1.elb.amazonaws.com",
});

export default instance;