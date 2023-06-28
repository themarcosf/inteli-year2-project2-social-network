import React, { useEffect, useState } from 'react'
import mqtt from 'mqtt'

import styles from './styles.module.scss'
import { Col, Row } from 'react-styled-flexboxgrid'
import Image from 'next/image'
import Link from 'next/link'

import lamp from '@/assets/icons/lamp.png'
import next from '@/assets/icons/next.png'
import { randomInt } from 'crypto'

type Props = {
  matchs: number;
}

const MatchCard: React.FC<Props> = (props: Props) => {
  const [recommendation, setRecommendation] = useState<any>("")

  useEffect(() => {
    const host = "mqtt-dashboard.com"
    const userId = localStorage.getItem("userId")
    const clientId = userId || `client_id${randomInt}`
    let topic = `recommendation/${clientId}`
    let topicAI = "IA Recommendation"

    let client = mqtt.connect(`wss://${host}:8884/mqtt`, { clientId, keepalive: 20 })
    client.publish(topicAI, "Iron Man")
    if (client) {
      client.on('connect', function () {
        client.subscribe(topic, function (err: any) {
        })
      })

      client.on('message', (topic: string, message: any) => {
        const payload = { topic, message: message.toString() };
        setRecommendation(payload.message);
        client.end()
      });
    }
  }, [])

  useEffect(() => {
    console.log(recommendation)
  }, [recommendation])

  return (
    <div className={styles.card}>
      {/* <Grid className={styles.grid}> */}
      <Row between='xs' middle='xs' className={styles.row}>
        <Col xs={3}>
          <Image src={lamp} width={56} height={56} alt='Imagem de lampada' />
        </Col>
        <Col xs={6}>
          <p>
            You have {props.matchs} content recommendations that match your profile!
          </p>
        </Col>
        <Col xs={3}>
          <Link href={'/projects'}>
            <Image className={styles.next} src={next} width={32} height={32} alt='Imagem de ir para a próxima página' />
          </Link>
        </Col>
      </Row>
      {/* </Grid> */}
    </div>
  )
}

export default MatchCard