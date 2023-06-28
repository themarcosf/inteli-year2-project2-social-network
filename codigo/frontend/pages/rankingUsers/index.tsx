import React from "react";
import { Layout } from "@/components/Layout";
import { Col, Row } from "react-styled-flexboxgrid";
import { text } from "stream/consumers";
import Image from 'next/image'
import star from "@/assets/icons/star.png"
import styles from "./styles.module.scss"
import starScore from "@/assets/icons/starScore.svg"

const rankingUsers = () => {


    const navigation = [
        {
            icon: "/burguer.png",
            text: "Challenges",
            url: "/challenges",
        },
        {
            icon: star,
            text: 'Rewards',
            url: '/rewards'
        },
        {
            icon: "/community.png",
            text: "Ranking",
            url: "/rankingUsers",
        }
    ];

    const user =
    {
        name: "João",
        myPoints: 200,
        myRole: "Software Enginer"
    };

    const users = [{
        name: "lucas",
        points: 280,
        role: "Designer"
    },
    {
        name: "Julia",
        points: 150,
        role: "UX/UI Designer"
    },
    {
        name: "manel",
        points: 60,
        role: "Developer"
    }]



    return (
        <Layout header={navigation} navbar={true}>
            <Row className={styles.ranking}>
                <p className={styles.textRanking}>
                    Ranking
                </p>
                <Row className={styles.myScore}>
                    <Image src={starScore} width={32} height={32} alt="starScore" ></Image>
                    <p>My points: {user.myPoints}</p>
                </Row>
            </Row>
            <Row className={styles.cardUser}>
                <Col>
                    <p>you</p>
                    <p>{user.myRole}</p>
                </Col>
                <Row className={styles.starMyCard}>
                    <Image src={starScore} width={32} height={32} alt="starScore"></Image>
                    <p>{user.myPoints}</p>
                </Row>
            </Row>
            <Col className={styles.rankingUsers}>
                {users.map((user, index) => (
                    <Row className={styles.cardUsers} key={index} between="xs">
                        <Col>
                            <p>{`${index + 1}º. ${user.name}`}</p>
                            <p>{user.role}</p>
                        </Col>
                        <Row className={styles.starCard}>
                            <Image src={starScore} width={32} height={32} alt="starScore"></Image>
                            <p>{user.points}</p>
                        </Row>
                    </Row>
                ))
                }
            </Col>
        </Layout>
    )
}

export default rankingUsers;