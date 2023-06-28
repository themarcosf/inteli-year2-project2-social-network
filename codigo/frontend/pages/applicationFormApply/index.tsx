import React from "react";
import { Col, Row } from "react-styled-flexboxgrid";
import styles from './styles.module.scss'
import { Tags } from "@/components/Tags";
import { ApplyButton } from "@/components/ApplyButton";


const applicationFormApply = () => {

    const tags = ['python', 'javaScript', 'Ux', 'BackEnd', 'node.js',]
    const roles = ['BackEnd', 'FrontEnd', 'UxDesign', 'BackEnd', 'FrontEnd']

    return (
        <Col xs={12} className={styles.applicationForm}>
            <Col xs={12} className={styles.modalApplicationForm}> {/* MODAL */}
                <Col xs={12} className={styles.contentApplicationForm}>
                    <div className={styles.pageTitleApplicationForm}>
                        <h1>Application From</h1>
                    </div>
                    <Row className={styles.dateApplicationForm}>
                        <Col className={styles.startDate}>
                            <p>Start Date:</p>
                            <p>XX/XX/XX</p> {/*INTEGRAÇÂO */}
                        </Col>
                        <Col className={styles.endDate}>
                            <p>End Date:</p>
                            <p>XX/XX/XX</p> {/*INTEGRAÇÂO */}
                        </Col>
                    </Row>
                    <Col className={styles.tagsApplicationForm}>
                        <div>
                            <p>Tags:</p>
                        </div>
                        <Row className={styles.tag}>
                            {tags.map((tag, index) => (
                                <Tags key={index} text={tag} />
                            ))}
                        </Row>
                    </Col>
                    <Col className={styles.rolesApplicationForm}>
                        <div>
                            <p>Roles:</p>
                        </div>
                        <Col xs={12} md={5} className={styles.role}>
                            {roles.map((role, index) => (
                                <React.Fragment key={index}>
                                    <p>{role}</p>
                                    {index < roles.length - 1 && <hr />}
                                </React.Fragment>
                            ))}
                        </Col>
                    </Col>
                    <div className={styles.applyButtonApplicationForm}>
                        <ApplyButton
                            text="Apply"
                        // onClick={() => nome da função()}
                        />
                    </div>
                </Col>
            </Col>
        </Col >
    )
}

export default applicationFormApply;
