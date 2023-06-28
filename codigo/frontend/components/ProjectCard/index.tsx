import React from "react";
import { Col, Row } from "react-styled-flexboxgrid";
import styles from './styles.module.scss'
import Image from "next/image";
import lamp from "@/assets/icons/lamp.svg"
import { Tags } from "@/components/Tags";

type Props = {
    data: {
        id: number;
        name: string;
        duration?: string;
        area?: string;
        tags: string[]
    }
}

export const ProjectCard: React.FC<Props> = ({ data }: Props) => {
    const tags = ['js', 'c++', 'python', 'PHP', 'js', 'c++']

    return (
        <Col xs={12} md={5} className={styles.cardProject}>
            <Col xs={12} className={styles.contentCard}>
                <Row className={styles.higher}>
                    <Col xs={8} className={styles.cardBackOffice}>
                        <p>{data.name}</p>
                        <p>Duration: {data.duration}</p>
                        <p>Area: {data.area}</p> {/*INTEGRAÇÃO */}
                    </Col>
                    <Col xs={4} className={styles.cardDeadline}>
                        <p>Applications Open!</p>
                        <p>Deadline:</p>
                    </Col>
                </Row>
                <Row className={styles.bottom}>
                    <Col xs={8}>
                        <Row className={styles.cardTags}>
                            <Row className={styles.cardTags}>
                                {tags.map((tag: any, index: number) => (
                                    <div key={index}>
                                        <Tags key={index} text={tag}/>
                                    </div>
                                ))}
                            </Row>
                        </Row>
                    </Col>
                    <Col xs={4} className={styles.cardMatch}>
                        <Image src={lamp} width={24} alt="lamp" />
                        <p>Match!</p>
                    </Col>
                </Row>
            </Col>
        </Col>
    )
}
