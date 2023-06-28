import React from "react";
import styles from "./styles.module.scss"


type Props = {
    onClick?: any,
    text: string,
}

export const SubmitButton = ({ onClick, text }: Props) => {
    return (
        <div>
            <button className={styles.buttonSubmit} onClick={onClick}>{text}</button>
        </div >
    )
}