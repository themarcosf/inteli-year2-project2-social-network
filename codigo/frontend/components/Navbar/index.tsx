import React, { useEffect, useRef, useState } from 'react'

import styles from './styles.module.scss'
import { Col, Grid, Row } from 'react-styled-flexboxgrid'
import Image from 'next/image'
import Link from 'next/link'

import home from "@/assets/icons/home.png"
import rewards from "@/assets/icons/rewards.png"
import create from "@/assets/icons/create.png"
import projects from "@/assets/icons/projects.png"
import profile from "@/assets/icons/profile.png"
import project from "@/assets/icons/project.png"
import edit from "@/assets/icons/edit.png"
import Modal from '../Modal'
import CreatePost from '../CreatePost'
import CreateProject from '../CreateProject'

const Navbar: React.FC = () => {
  const ref = useRef(null)

  const [optionsCreateOpened, setOptionsCreateOpened] = useState(false)
  const [createPostOpened, setCreatePostOpened] = useState(false)
  const [createProjectOpened, setCreateProjectOpened] = useState(false)

  const navItems = [
    {
      icon: home,
      text: 'Contents',
      url: '/',
      alt: 'Home icon',
      width: 20,
      height: 20
    },
    {
      icon: rewards,
      text: 'Rewards',
      url: '/rewards',
      alt: 'Rewards icon',
      width: 22,
      height: 22
    },
    {
      icon: create,
      text: 'Create',
      onClick: () => setOptionsCreateOpened(true),
      alt: 'Create icon',
      width: 22,
      height: 22
    },
    {
      icon: projects,
      text: 'Projects',
      url: '/projects',
      alt: 'Projects icon',
      width: 20,
      height: 20
    },
    {
      icon: profile,
      text: 'Profile',
      url: '/profile',
      alt: 'Profile icon',
      width: 18,
      height: 20
    },
  ]

  const useOutsideAlerter = (ref: any) => {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      const handleClickOutside = (event: any) => {
        if (ref.current && !ref.current.contains(event.target)) {
          setOptionsCreateOpened(false)
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  return (
    <Col xs={12} className={styles.navbar}>
      <Grid className={styles.grid}>
        <Row className={styles.row} around='xs' >
          {
            navItems.map((item: any, index: number) => {
              return item.onClick ? (
                <Col xs={2} key={`${item.text}-${index}`} >
                  <div className={styles.item} onClick={() => item.onClick()}>
                    <Image src={item.icon} alt={item.alt} width={item.width} height={item.height} />
                    <p className={styles.text}>{item.text}</p>

                    {optionsCreateOpened && (
                      <div ref={wrapperRef} className={styles.select} onClick={() => item.onClick()}>
                        <div className={styles.optionContainer} onClick={() => setCreateProjectOpened(true)}>
                          <Image src={project} alt='Imagem de projeto' width={0} height={0} />
                          <p>Creat project</p>
                        </div>
                        <div className={styles.optionContainer} onClick={() => setCreatePostOpened(true)}>
                          <Image src={edit} alt='Imagem de post' width={0} height={0} />
                          <p>Creat a post</p>
                        </div>
                      </div>
                    )}
                  </div>
                </Col>
              ) : (
                <Col xs={2} key={`${item.text}-${index}`}>
                  <Link href={item.url ? item.url : ''}>
                    <div className={styles.item} key={index}>
                      <Image src={item.icon} alt={item.alt} width={item.width} height={item.height} />
                      <p className={styles.text}>{item.text}</p>
                    </div>
                  </Link>
                </Col>
              )
            })
          }

          {
            createProjectOpened &&
            (
              <Modal
                title='New Project'
                closeArrow
                closeModal={() => setCreateProjectOpened(false)}
                content={
                  <CreateProject submit={() => setCreateProjectOpened(false)} />
                }
              />
            )
          }

          {
            createPostOpened &&
            (
              <Modal
                title='New Post'
                closeArrow
                closeModal={() => setCreatePostOpened(false)}
                content={
                  <CreatePost submit={() => setCreatePostOpened(false)} />
                }
              />
            )
          }
        </Row>
      </Grid>
    </Col>
  )
}

export default Navbar