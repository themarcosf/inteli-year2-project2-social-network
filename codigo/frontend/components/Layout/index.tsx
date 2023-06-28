import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Navbar from "../Navbar";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Container } from "./styles";

const inter = Inter({ subsets: ['latin'] })

export const Layout = ({
    active,
    title,
    matchs,
    header = [],
    children,
    backgroundColor,
    navbar = true,
}: {
    active?: number | any;
    title?: string;
    matchs?: number;
    header?: boolean | any;
    children: React.ReactNode;
    backgroundColor?: string;
    navbar?: boolean;
}) => {
    const router = useRouter();
    let accessToken;

    const [route, setRoute] = useState<string>("")

    useEffect(() => {
        setRoute(router.asPath.toString().split("/")[1].charAt(0).toUpperCase() + router.asPath.toString().split("/")[1].slice(1))
    }, [route])

    useEffect(() => {
        accessToken = localStorage.getItem('accessToken')

        if (!accessToken) {
            router.push('/start/intro')
        }
    }, [])

    return (
        <>
            <Head>
                <title>{
                    route ? `${route} - DellHub` : "DellHub"
                }</title>
            </Head>

            <Container fluid navbar={navbar} className={inter.className} backgroundColor={backgroundColor}>
                {header ? <Header navigation={header} matchs={matchs} title={title} active={active} /> : null}

                {children}

                {navbar ? <Navbar /> : null}
            </Container>
        </>
    )
}

