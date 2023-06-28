
import { Col, Row } from 'react-styled-flexboxgrid'
import { Layout } from '@/components/Layout'
import { Title } from '@/components/Title'
import styled from 'styled-components'
import { Text } from '@/components/Text'

import { Spacer } from '@/components/Spacer'

import burguer from "@/assets/icons/burguer.png"
import star from "@/assets/icons/star.png"
import community from "@/assets/icons/community.png"

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

  return (
    <Layout header={navigation} navbar={true} title={"Community"} active={2}>
      <Col xs={12} md={6} lg={4}>
        <Row style={{ marginBottom: '8px' }} center='xs'>
          <Text color='#2e2e2e'>Based on your profile</Text>
        </Row>

        <Row center='xs'>
          {Array(13).fill(1).map((_, index) => (
            <Post key={index} />
          ))}
        </Row>
      </Col>
    </Layout>
  )
}

const Post = () => {
  return (
    <Card xs={12}>
      <Row middle='xs' between='xs'>
        <Title color="#2e2e2e">{
          ['JavaScript', 'TypeScript', 'Python', 'Java', 'C#', 'C++', 'PHP', 'Ruby', 'Go', 'Rust', 'Kotlin', 'Swift', 'Objective-C', 'Scala', 'R', 'Dart', 'Elixir', 'Clojure', 'Haskell', 'Lua', 'Perl', 'Julia'][Math.floor(Math.random() * 22) + 1]
        } Programming</Title>
      </Row>

      <Spacer size="sm" />

      <Row start={'xs'} middle={'xs'}>
        <div style={{
          height: 32,
          width: 32,
          borderRadius: 50,
          backgroundColor: '#3F3D56',
        }}></div>
        <div style={{
          height: 32,
          width: 32,
          borderRadius: 50,
          backgroundColor: '#585678',
          position: 'relative',
          left: -16,
        }}></div>
        <div style={{
          height: 32,
          width: 32,
          borderRadius: 50,
          backgroundColor: '#3D3878',
          position: 'relative',
          left: -32,
        }}></div>
        <div style={{
          height: 32,
          width: 32,
          borderRadius: 50,
          backgroundColor: '#534CA5',
          position: 'relative',
          left: -48,
        }}></div>

        <Text style={{ position: 'relative', left: -32 }} color='#2e2e2e'>+{
          Math.floor(Math.random() * 100) + 1
        } participantes</Text>
      </Row>
    </Card>
  )
}

const Card = styled(Col)`
  border-radius: 10px;
  background-color: #FFF;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`