import React from "react";
import { Col, Row } from "react-styled-flexboxgrid";
import styles from './styles.module.scss'
import { Tags } from "@/components/Tags";
import { ApplyButton } from "@/components/ApplyButton";
import { SubmitButton } from "@/components/SubmitButton"


const backoffice = () => {

    const tags = ['python', 'javaScript', 'Ux', 'BackEnd', 'node.js', 'lllllllllllllllllllllllllllllllllllllllll    ']
    const roles = ['BackEnd', 'FrontEnd', 'UxDesign', 'BackEnd', 'FrontEnd']

    return (
        <Col xs={12} className={styles.backoffice}>
            <Col xs={12} className={styles.modalBackoffice}> {/* MODAL */}
                <Col xs={12} className={styles.contentBackoffice}>
                    <div className={styles.pageTitleBackoffice}>
                        <h1>Backoffice</h1>
                    </div>
                    <Row className={styles.dateBackoffice}>
                        <Col className={styles.startDateBackoffice}>
                            <p>Start Date:</p>
                            <p>XX/XX/XX</p> {/*INTEGRAÇÂO */}
                        </Col>
                        <Col className={styles.endDateBackoffice}>
                            <p>End Date:</p>
                            <p>XX/XX/XX</p> {/*INTEGRAÇÂO */}
                        </Col>
                    </Row>
                    <Col className={styles.tagsBackoffice}>
                        <div>
                            <p>Tags:</p>
                        </div>
                        <Row className={styles.tagBackoffice}>
                            {tags.map((tag, index) => (
                                <Tags key={index} text={tag} />
                            ))}
                        </Row>
                    </Col>
                    <Col className={styles.rolesBackoffice}>
                        <div>
                            <p>Roles:</p>
                        </div>
                        <Col xs={12} md={5} className={styles.roleBackoffice}>
                            {roles.map((role, index) => (
                                <React.Fragment key={index}>
                                    <p>{role}</p>
                                    {index < roles.length - 1 && <hr />}
                                </React.Fragment>
                            ))}
                        </Col>
                    </Col>
                    <div className={styles.buttonBackofficeViewApplies}>
                        <ApplyButton
                            text="View applies"
                        // onClick={() => nome da função()}
                        />
                    </div>
                    <div className={styles.buttonBackofficeFinishProject}>
                        <SubmitButton
                            text="Finish project"
                        // onClick={() => nome da função()}
                        />
                    </div>
                </Col>
            </Col>
        </Col >
    )
}

export default backoffice;