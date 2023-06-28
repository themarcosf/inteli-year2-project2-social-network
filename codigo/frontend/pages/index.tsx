// @ts-ignore

import { Col, Row } from 'react-styled-flexboxgrid'
import { Layout } from '@/components/Layout'
import { Title } from '@/components/Title'
import Image from 'next/legacy/image'
import styled from 'styled-components'
import { Text } from '@/components/Text'

import save from "@/assets/icons/heart.svg"
import like from "@/assets/icons/like.svg"
import comment from "@/assets/icons/comment.svg"

import burguer from "@/assets/icons/burguer.png"
import star from "@/assets/icons/star.png"
import community from "@/assets/icons/community.png"

import useSWR from 'swr';
import axios from 'axios';
import Link from 'next/link'
import Modal from '@/components/Modal'
import { useEffect, useState } from 'react'
import PostService from '@/services/post'
import { useRouter } from 'next/router'

// const fetchData = (url: string) => {
//   const fetcher = async () => {
//     const response = await axios.get(url);
//     return response.data;
//   };

//   const { data, error } = useSWR(url, fetcher);

//   return {
//     data,
//     isLoading: !error && !data,
//     isError: error,
//   };
// };

interface PostProps {
  __user__: any,
  role: string,
  imgURL: string,
  likes: number,
  content: string,
  comments: string[] | null,
  saves: number,
  id: number;
}

export default function Index() {
  const navigation = [
    {
      icon: burguer,
      text: 'All Posts',
      url: '/'
    },
    {
      icon: star,
      text: 'Recommended',
      url: '/recommended'
    },
    {
      icon: community,
      text: 'Community',
      url: '/community'
    }
  ]

  const [posts, setPosts] = useState<any>()
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  const getAllPosts = async () => {
    const response = await PostService.findAll()
    setPosts(response.data)
    setIsLoading(false)
    if (response.error) setIsError(true)
    console.log(posts)
  }

  useEffect(() => {
    getAllPosts()
  }, [])

  return (
    <Layout header={navigation} navbar={true} title={"All posts"} active={0} matchs={3}>
      <Col xs={12} md={6} lg={4}>
        <Row>
          {isLoading && <Col xs={12}>
            <Text color='#2e2e2e'>
              Loading...
            </Text>
          </Col>}
        </Row>

        {/* <Post __user__={"marcelofeitoza"} role={"Mobile developer"} imgURL={"https://placehold.co/600x400/EEE/31343C"} likes={[1, 2, 3, 4, 5, 6]} comments={["123", "321", "456"]} saves={[1, 2, 3, 4, 5, 6, 7]} /> */}

        {posts && posts.map((post: PostProps, index: number) => (
          <Post {...post} __user__={post.__user__} key={index} />
        ))}

        {posts && posts.length === 0 && (
          <Col xs={12}>
            <Text color='#2e2e2e'>
              No posts yet...
            </Text>
          </Col>
        )}

        {isError && (
          <Col xs={12}>
            <Text color='#2e2e2e'>
              Error!
            </Text>
          </Col>
        )}
      </Col>
    </Layout>
  )
}

const Post = ({
  __user__, role, imgURL, likes, content, comments, saves, id
}: PostProps) => {
  const router = useRouter();

  useEffect(() => { console.log(__user__) }, [])

  return (
    <Card xs={12} onClick={() => router.push(`/posts/${id}`)}>
      <Row middle='xs'>
        <Col>
          <ProfilePicture loader={
            () => 'https://placehold.co/64x64'
          } src={'https://placehold.co/64x64'} alt='Post' width={48} height={48} />
        </Col>

        <Col>
          <Title variant='sm' color='#000'>{__user__.name}</Title>

          <Text color='#000'>DevOps</Text>
        </Col>
      </Row>

      <Row center='xs' style={{ margin: "1rem 0" }}>
        <Col xs={12}>
          {
            imgURL && (
              <Image src={imgURL} loader={
                () => imgURL
              } width={300} height={200} layout="responsive" alt='Post' />
            )
          }
        </Col>
        <Col xs={12}>
          <Text color='#000'>

            {content}
          </Text>
        </Col>
      </Row>

      <Row start={'xs'} middle={'xs'}>
        <Col>
          <Row center="xs">
            <Image src={like} alt="save" width={16} height={16} />
          </Row>
          <Text center={true} color={'#00000080'}>Like ({likes | 0})</Text>
        </Col>

        <Col>
          <Row center="xs">
            <Image src={comment} alt="save" width={16} height={16} />
          </Row>
          <Text center={true} color={'#00000080'}>Comment ({comments ? comments.length : 0})</Text>
        </Col>

        <Col>
          <Row center="xs">
            <Image src={save} alt="save" width={16} height={16} />
          </Row>
          <Text center={true} color={'#00000080'}>Save ({saves | 0})</Text>
        </Col>
      </Row>
    </Card>
  )
}

const ProfilePicture = styled(Image)`
  border-radius: 50%;
`

const Card = styled(Col)`
  border-radius: 10px;
  background-color: #FFF;
  padding: 1.25rem 1rem;
  margin-bottom: 1.5rem;
width: 100%;

  :hover {
    cursor: pointer;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.1);
  }
`
