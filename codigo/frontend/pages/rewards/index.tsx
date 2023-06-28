import React from "react"
import { Col, Row } from "react-styled-flexboxgrid"
import { Layout } from "@/components/Layout"
import { Container, IconContainer, StyledRow } from "./styles";
import { Title } from "@/components/Title";

import post from "@/assets/icons/post.svg"
import estrela from "@/assets/icons/estrela.svg"
import celular from "@/assets/icons/celular.svg"
import pasta from "@/assets/icons/pasta.svg"
import maosdadas from "@/assets/icons/maosdadas.svg"
import Image from "next/image";
import { Spacer } from "@/components/Spacer";

const Rewards = () => {
  const navigation = [
    {
      icon: "/burguer.png",
      text: "Challenges",
      url: "/rewards",
    },
    {
      icon: "/community.png",
      text: "Ranking",
      url: "/ranking",
    },
  ];

  const cards = [
    {
      icon: post,
      title: "Create a new publication",
      rewards: 10
    },
    {
      icon: celular,
      title: "Like at least 5 posts",
      rewards: 10
    },
    {
      icon: pasta,
      title: "Submit a new project",
      rewards: 10
    },
    {
      icon: maosdadas,
      title: "Apply to a project",
      rewards: 10
    }
  ];

  return (
    <Layout header={navigation} navbar={true} active={0}>
      <Container xs={12} md={6} lg={4}>
        <Row between="xs">
          <Title color="#2e2e2e" variant="sm" bold={false}>Daily Tasks</Title>
          <Title color="#2e2e2e" variant="sm" bold={false}>My Points: 450</Title>
        </Row>

        <Spacer size="md" />

        {cards.map((card, index) => (
          <StyledRow middle="xs" around="xs" key={index}>
            <IconContainer xs={2}>
              <Image src={card.icon} width={32} height={32} alt="post" />
            </IconContainer>

            <Col xs={8}>
              <Title variant="sm">
                {card.title}
              </Title>
            </Col>

            <IconContainer xs={2}>
              <Image src={estrela} width={32} height={32} alt="star" />
              <p>{card.rewards}</p>
            </IconContainer>
          </StyledRow>
        ))}

      </Container>
    </Layout>
  );
};

export default Rewards;
