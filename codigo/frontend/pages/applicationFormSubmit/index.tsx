import React from "react";
import styles from './styles.module.scss';
import { Col } from "react-styled-flexboxgrid";
import { useState } from "react";
import { SubmitButton } from "@/components/SubmitButton";
import { SelectRoleInterest } from "@/components/SelectRoleInterest"
import { InputsApplicationForm } from "@/components/InputsApplicationForm"


const applicationFormSubmit = () => {
    const rolesInterestOptions = [
        {
            label: 'python',
            value: 'python'
        },
        {
            label: 'uxDesign',
            value: 'uxDesign'
        },
        {
            label: 'W3',
            value: 'W3'
        }
    ]

    const [selectRole, setSelectRole] = useState('')
    const [whyThisVacancy, setWhyThisVacancy] = useState('')
    const [skillDevelop, setSkillDevelop] = useState('')

    const handleInputWhyThisVacancy = (event: any) => {
        setSelectRole(event.target.value);
        setWhyThisVacancy(event.target.value);
        setSkillDevelop(event.target.value);
    }

    const alertInput = () => { // integração aqui
        alert(selectRole)
        alert(whyThisVacancy)
        alert(skillDevelop)
    }

    return (
        <Col className={styles.applicationFormSubmit}>
            <Col className={styles.modalApplicationFormSubmit}>
                <Col className={styles.contentApplicationFormSubmit}>
                    <div className={styles.pageTitleApplicationFormsubmit}>
                        <h1>Application From</h1>
                    </div>
                    <Col className={styles.formApplicationFormSubmit}>
                        <Col className={styles.selectRoleInterest}>
                            <Col>
                                <SelectRoleInterest
                                    default="Select a role"
                                    type={''}
                                    options={rolesInterestOptions}
                                    className={styles.RoleInterest}
                                    onChange={(value: any) => setSelectRole(value)}
                                />
                            </Col>

                        </Col>
                        <Col className={styles.inputWhyThisVacancy}>
                            <InputsApplicationForm
                                type={''}
                                placeholder={''}
                                className={styles.whyThisVacancy}
                                value={whyThisVacancy}
                                onChange={(event: any) => setWhyThisVacancy(event.target.value)}
                                rows={6}
                            />
                        </Col>
                        <Col className={styles.inputSkillDevelop}>
                            <InputsApplicationForm
                                type={''}
                                placeholder={''}
                                className={styles.skillDevelop}
                                value={skillDevelop}
                                onChange={(event: any) => setSkillDevelop(event.target.value)}
                            />
                        </Col>
                        <Col className={styles.submitButton}>
                            <SubmitButton
                                text='Submit'
                                onClick={() => alertInput()}
                            />
                        </Col>
                    </Col>
                </Col>
            </Col>
        </Col>
    )
}


export default applicationFormSubmit;
