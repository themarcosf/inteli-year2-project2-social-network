import React from 'react'
import styles from './styles.module.scss'

type Props = {
  tp: 'default' | 'secundary' | 'terceary' | 'cancel',
  type: 'button' | 'submit' | 'reset',
  text: string,
  size: 'small' | 'medium' | 'large',
  disabled?: boolean
  onClick?: any
}

const Button = (props: Props) => {
  return (
    <div className={styles.dellButton}>
      <button className={`${props.tp && styles[props.tp]} ${styles[props.size]}`} type={props.type} disabled={props.disabled} onClick={() => props.onClick && props.onClick() || false}>{props.text}</button>
    </div>
  )
}

export default Button