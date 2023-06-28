import dell from '@/assets/icons/dell.svg'
import Image from "next/image"
import { Inter } from 'next/font/google'

import { Col, Row } from 'react-styled-flexboxgrid'
import { Button, Container, Heading, Logo, LogoTitle, Text } from "./styles"
import { useEffect } from "react"
import AuthService from "@/services/auth"
import { useRouter } from "next/router"

const inter = Inter({ subsets: ['latin'] })

export default function Start() {
  let token;
  const router = useRouter();

  useEffect(() => {
    token = localStorage.getItem('accessToken')

    AuthService.validateToken(token).then((valid: boolean) => {
      if (valid) {
        router.push('/')
      } else {
        localStorage.clear();
      }
    }).catch(
      (err) => {
        console.log(err)
        localStorage.clear();
      }
    )
  }, [])

  return (
    <Container fluid className={inter.className}>
      <Col xs={12} md={4}>
        <Heading>
          <Logo>
            <Image src={dell} alt="DellHub Logo" width={350} />

            <LogoTitle>DellHub</LogoTitle>
          </Logo>

          <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
        </Heading>

        <Row>
          <Button href={"/start/intro"}>Let’s start</Button>
        </Row>
      </Col>
    </Container>
  )
}
