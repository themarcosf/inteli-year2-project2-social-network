import React from "react";
import styles from './styles.module.scss'

type Options = {
    value: string;
    label: string;
}

type Props = {
    className?: string;
    default: string;
    showDefault?: boolean
    type: any;
    options: Options[];
    onChange: Function;
    value?: any;
}

export const SelectRoleInterest = (props: Props) => {

    return (
        <div className={styles.selectRoleInterest}>
            <select className={styles.roleInterest} onChange={(e: any) => props.onChange(e.target.value)} value={props.value}>
                <option hidden={!props.showDefault} value={""}>{props.default}</option>
                {
                    props.options.map((option, index) => {
                        return (
                            <option value={option.value} key={index}>{option.label}</option>
                        )
                    })
                }
            </select>

        </div >
    )
}


