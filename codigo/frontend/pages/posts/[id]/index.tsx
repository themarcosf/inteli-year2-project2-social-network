import { Layout } from "@/components/Layout";

import back from "@/assets/icons/chevron-left.svg"
import like from "@/assets/icons/like.svg"
import bookmark from "@/assets/icons/bookmark.svg"
import send from "@/assets/icons/send.svg"

import useSWR from 'swr';
import axios from "@/utils/axios";
import { useRouter } from "next/router";
import { Text } from "@/components/Text";
import { useEffect, useState } from "react";
import { Col, Row } from "react-styled-flexboxgrid";
import Image from "next/image";
import styled from "styled-components";
import { Title } from "@/components/Title";
import { Spacer } from "@/components/Spacer";
import { BottomBar, Container, TopBar } from "./styles";

const fetchData = (url: string) => {
    const fetcher = async () => {
        const response = await axios.get(url);
        return response.data;
    };

    const { data, error } = useSWR(url, fetcher);

    return {
        data,
        isLoading: !error && !data,
        isError: error,
    };
};

interface PostProps {
    __user__: {
        name: string,
        email: string,
        userIdLegacy: string,
        id: string,
    },
    role: string,
    imgURL: string,
    content: string,
    likes: number,
    comments: string[],
    saves: number,
    postId: string;
}

export default function Index() {
    const router = useRouter();
    const { id } = router.query;

    const [postDetails, setPostDetails] = useState<PostProps>({
        comments: [],
        content: "",
        postId: "",
        imgURL: "",
        likes: 0,
        role: "",
        saves: 0,
        __user__: {
            email: "",
            id: "",
            name: "",
            userIdLegacy: "",
        }
    })

    const { data, isLoading, isError } = fetchData("http://load-balancer-1420159949.us-east-1.elb.amazonaws.com/post/" + id);

    isLoading ?? (
        <Layout>
            <Text color={"#2e2e2e"}>Loading...</Text>
        </Layout>
    )

    isError ?? (
        <Layout>
            <Text color={"#2e2e2e"}>Error</Text>
        </Layout>
    )

    useEffect(() => {
        setPostDetails({ ...postDetails, ...data })
    }, [data])

    return (
        <Layout navbar={false} header={false} backgroundColor="#fff">
            <Container xs={12} md={6} lg={4}>
                <TopBar between="xs">
                    <Col>
                        <Image src={back} alt="return" width={32} height={32} onClick={() => router.back()} style={{ cursor: "pointer" }} />
                    </Col>

                    <Col>
                        <button style={{
                            transform: "rotate(90deg)",
                            background: "none",
                            border: "none",
                            color: "#000",
                            fontWeight: "bold",
                        }}>. . .</button>
                    </Col>
                </TopBar>

                <Row middle='xs' between='xs'>
                    <Col xs={2}>
                        <ProfilePicture loader={
                            () => 'https://placehold.co/64x64'
                        } src={'https://placehold.co/64x64'} alt='Post' width={56} height={56} />
                    </Col>

                    <Col xs={10}>
                        <Title variant="md" color='#000'>{postDetails.__user__.name}</Title>

                        <Text color='#000'>
                            {postDetails.role}
                        </Text>
                    </Col>
                </Row>

                <Spacer size="sm" />

                <Row>
                    <Col xs={12}>
                        <Text color="#2e2e2e">
                            {postDetails.content}
                        </Text>
                    </Col>
                </Row>

                <Spacer size="sm" />

                {postDetails.imgURL && (
                    <Row>
                        <Col xs={12}>
                            <img src={postDetails.imgURL || 'https://placehold.co/350x300'} alt='Post' style={{
                                width: "100%",
                            }} />
                        </Col>
                    </Row>
                )}

                <Spacer size="sm" />

                <Row between="xs">
                    <Col>
                        <Image src={like} alt="like" width={24} height={24} />
                        <Text color="#2e2e2e" center={true}>
                            ({postDetails.likes})
                        </Text>
                    </Col>

                    <Col>
                        <Image src={bookmark} alt="save" width={24} height={24} />
                        <Text color="#2e2e2e" center={true}>
                            ({postDetails.saves})
                        </Text>
                    </Col>
                </Row>

                <Spacer size="sm" />

                <Row>
                    <Col xs={12}>
                        <Title variant="md" color="#2e2e2e">
                            Comments
                        </Title>
                    </Col>
                </Row>

                <Spacer size="sm" />

                {postDetails.comments && postDetails.comments.length > 0 ? postDetails.comments.map((comment, index) => (
                    <>
                        <Row key={index} between="xs" middle="xs">
                            <Col>
                                <ProfilePicture loader={
                                    () => 'https://placehold.co/64x64'
                                } src={'https://placehold.co/64x64'} alt='Post' width={48} height={48} />
                            </Col>

                            <Col xs={10}>
                                <Title variant="sm" color="#2e2e2ed7">
                                    {postDetails.__user__.name}
                                </Title>
                                <Text color="#2e2e2eb7">
                                    {postDetails.role}
                                </Text>
                            </Col>
                        </Row>

                        <Spacer size="xs" />

                        <Row center="xs">
                            <Col xs={12}>
                                <Text color="#2e2e2e">
                                    {comment}
                                </Text>
                            </Col>
                        </Row>

                        <Spacer size="md" />
                    </>
                )) : (
                    <Row>
                        <Col xs={12}>
                            <Text color="#2e2e2e">
                                No comments yet
                            </Text>
                        </Col>
                    </Row>
                )}

                <BottomBar center="xs">
                    <Col>
                        <ProfilePicture loader={
                            () => 'https://placehold.co/64x64'
                        } src={'https://placehold.co/64x64'} alt='Post' width={48} height={48} />
                    </Col>

                    <Col xs={9} md={4}>
                        <input type="text" placeholder="Add a comment..." style={{
                            width: "100%",
                            border: "none",
                            outline: "none",
                            backgroundColor: "#fff",
                            fontSize: "1rem",
                            padding: "0.5rem 0",
                        }} />
                    </Col>

                    <Col>
                        <Image src={send} alt="send" width={24} height={24} />
                    </Col>
                </BottomBar>
            </Container>
        </Layout>
    )
}

const ProfilePicture = styled(Image)`
  border-radius: 50%;
`