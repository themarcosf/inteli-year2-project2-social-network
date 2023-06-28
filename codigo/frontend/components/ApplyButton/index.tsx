import React from "react";
import styles from "./styles.module.scss"

type Props = {
    onClick?: any,
    text: string,
}

export const ApplyButton = ({ onClick, text }: Props) => {
    return (
        <div>
            <button className={styles.buttonAplly} onClick={onClick}>{text}</button>
        </div>
    )
}

