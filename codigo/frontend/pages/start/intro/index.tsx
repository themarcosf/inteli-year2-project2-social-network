import { Inter } from 'next/font/google'
import { useEffect, useState } from "react"

import { Container, SlideContainer, Text } from "./styles"
import { Carousel } from '@/components/Carousel'
import { Login } from '@/components/Login'

import first from '@/assets/images/1.svg'
import second from '@/assets/images/2.svg'
import third from '@/assets/images/3.svg'
import AuthService from '@/services/auth'
import { useRouter } from 'next/router'
import { Spacer } from '@/components/Spacer'


const inter = Inter({ subsets: ['latin'] })

export default function Intro() {
    const [currentSlide, setCurrentSlide] = useState(0);

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

    const slides = [
        <SlideContainer key={1} xs={12} md={4}>
            <Text>Connect and collaborate with colleagues all over the world.</Text>
            <Spacer size="md" />
        </SlideContainer>,
        <SlideContainer key={2} xs={12} md={4}>
            <Text>Connect with teams, share knowledge and bring your ideas to life!</Text>
            <Spacer size="md" />
        </SlideContainer>,
        <SlideContainer key={3} xs={12} md={4}>
            <Text>Connect and collaborate with colleagues all over the world.</Text>
            <Spacer size="md" />
        </SlideContainer>,
        ""
    ];

    const backgrounds = [
        first.src,
        second.src,
        third.src,
        ""
    ]

    return (
        <Container fluid className={inter.className} background={backgrounds[currentSlide]}>
            {currentSlide === 3 ? <Login slides={slides} currentSlide={
                currentSlide} setCurrentSlide={setCurrentSlide}
            /> :
                <Carousel slides={slides} currentSlide={currentSlide} setCurrentSlide={setCurrentSlide} />}
        </Container>
    )
}

