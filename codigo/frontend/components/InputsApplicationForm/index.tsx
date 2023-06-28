import React from "react";
import { useState, useEffect } from "react";
import styles from './styles.module.scss';

type InputProps = {
    className?: string;
    placeholder: string;
    type: string;
    size?: 'sm' | 'md' | 'lg';
    value?: any;
    onChange?: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
    rows?: number;
}

export const InputsApplicationForm = (props: InputProps) => {
    const [value, setValue] = useState('')

    const changeValue = (value: any) => {
        setValue(value)
        if (props.onChange) {
            props.onChange(value)
        }
    }

    useEffect(() => {
        setValue(props.value)
    }, [props.value])

    return (
        <div className={styles.inputsApplicationForm}>
            {props.rows ? <textarea
                // type={props.type}
                placeholder={'' + props.placeholder}
                className={''}
                value={value}
                onChange={props.onChange}
                rows={6}
            /> :
                <input
                    type={props.type}
                    placeholder={'' + props.placeholder}
                    className={''}
                    value={value}
                    onChange={props.onChange}
                />}

        </div>

    )
}

