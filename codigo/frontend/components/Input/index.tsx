import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'

type InputProps = {
  className?: string;
  placeholder: string;
  type: any;
  size?: 'small' | 'medium' | 'large';
  value?: any;
  onChange?: Function;
  disabled?: boolean;
  autocomplete?: "off" | "on";
}

const Input = (props: InputProps) => {
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
    <div className={styles.dellInput}>
      <input
        type={props.type}
        autoComplete={props.autocomplete ? props.autocomplete : "on"}
        // autoComplete="off"
        disabled={props.disabled}
        placeholder={'' + props.placeholder}
        className={`${props.className && styles[props.className]} ${props.size && styles[props.size]} ${props.disabled && styles.disabled} `}
        value={value}
        onChange={(e) => changeValue(e.target.value)}
      />
    </div>
  )
}

export default Input