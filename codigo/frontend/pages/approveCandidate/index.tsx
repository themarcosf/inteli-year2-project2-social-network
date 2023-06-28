import { InputSearch } from "@/components/inputSearch";
import exp from "constants";
import { Col, Grid, Row } from "react-styled-flexboxgrid";
import styles from "./styles.module.scss"
import { useState } from "react";
import { Layout } from "@/components/Layout";

const approveCandidate = () => {

    const candidates = [
        {
            name: "joao",
            status: ["Pending", "Approved", "Denied"]
        },
        {
            name: "saad",
            status: ["Pending", "Approved", "Denied"]
        },
        {
            name: "celin",
            status: ["Pending", "Approved", "Denied"]
        },
        {
            name: "lucas",
            status: ["Pending", "Approved", "Denied"]
        }
    ]

    const [padingOpened, setPadingOpened] = useState(false)
    const [optionsPadingOpened, setOptionPadingOpened] = useState(false)

    return (
        < Col className={styles.approveCandidates} >
            <Col className={styles.modalApproveCandidates}>
                <div className={styles.titleApproveCandidates}>
                    <h1>Candidates</h1>
                </div>
                <div className={styles.inputSearch}>
                    <InputSearch
                        placeholder=" Search for a title, tag, ..."
                    />
                </div>
                {candidates.map((candidate, index) => (
                    <Row className={styles.cardCandidates} key={index} between="xs">

                        <p>{`${index + 1}. ${candidate.name}`}</p>

                        <div className={styles.candidatePading}>
                            <select name="Padding" id="">
                                <option value="">Padding</option>
                                <option value={"true"}>Approve</option>
                                <option value={"false"}>Declien</option>
                            </select>
                        </div>
                    </Row>
                ))}

            </Col>
        </Col >
    )
}

export default approveCandidate;


