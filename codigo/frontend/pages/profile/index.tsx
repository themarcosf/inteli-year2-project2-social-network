import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import mode_edit from "@/assets/icons/mode_edit.svg";
import delete_forever from "@/assets/icons/delete_forever.svg";
import Image from "next/image";
import { Col, Row } from "react-styled-flexboxgrid";
import { Layout } from "@/components/Layout";
import UserService from "@/services/user";
import Modal from "@/components/Modal";
import DeleteConfirm from "@/components/DeleteConfirm";

const Profile = () => {
  const [profile, setProfile] = useState<any>()
  const [deleteModalOpened, setDeleteModalOpened] = useState(false)

  const getProfile = async () => {
    const response = await UserService.findByID("1")
    setProfile(response.data)
  }

  useEffect(() => {
    getProfile()
  }, [])

  return (
    <Layout header={false} navbar={true}>
      <div className={styles.container}>
        <Row className={styles.row} center="xs">
          <h1>Profile</h1>
        </Row>
        <Row className={styles.row} middle="xs">
          <Col>
            <Image
              className={styles.profile}
              loader={() => 'https://ca.slack-edge.com/T02DWH2MXQR-U02UAA1E2HK-7468bf815087-512'}
              src={'https://ca.slack-edge.com/T02DWH2MXQR-U02UAA1E2HK-7468bf815087-512'}
              width={56}
              height={56}
              alt="Imagem do perfil"
            />
          </Col>
          <Col>
            {profile && <h3>{profile.name}</h3>}
            {profile && <h5>{profile.description}</h5>}
          </Col>
        </Row>
        <Row>
          <h3>Pontuação</h3>
        </Row>
        <Row className={styles.row}>
          {profile && <div>{profile.points} pontos</div>}
        </Row>
        <Row>
          <h3>About me</h3>
          <Col>
            <Image src={mode_edit} alt="ícone de edição" />
          </Col>
        </Row>
        <Row className={styles.row}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Row>
        <Row>
          <h3>Interests</h3>
          <Col>
            <Image src={mode_edit} alt="ícone de edição" />
          </Col>
        </Row>
        <Row className={styles.row}>
          <div>tag</div>
        </Row>
        <Row className={styles.row} around="xs">
          <Col className={styles.col}>
            <h3>Projects</h3>
          </Col>
          <Col>
            <h3>Publications</h3>
          </Col>
        </Row>
        <Row>
          <div className={styles.card}>
            <h4>Frontend Develoment</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam
              porro similique aliquid debitis ipsam soluta dolorum ipsa!
              Voluptate, suscipit iure.
            </p>

            <Row className="image" end="xs">
              <Image
                className="image"
                src={delete_forever}
                alt="ícone de edição"
                onClick={() => setDeleteModalOpened(true)}
              />
            </Row>
          </div>
        </Row>

        {
          deleteModalOpened &&
          (
            <Modal
              closeModal={() => setDeleteModalOpened(false)} size="small"
              content={
                <DeleteConfirm
                  text="this project visualization"
                  submit={() => alert('deleted')}
                  cancel={() => setDeleteModalOpened(false)}
                />
              }
            />
          )
        }
      </div>
    </Layout>
  );
};

export default Profile;
