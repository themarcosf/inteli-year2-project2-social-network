import React from 'react'

import styles from './styles.module.scss'
import Image from 'next/image'
import Link from 'next/link';

type Props = {
  icon: string;
  text: string;
  imageAlt?: string;
  url: string;
  active?: boolean;
}

const NavigationItem: React.FC<Props> = ({
  icon, text, imageAlt, url, active
}: Props) => {
  return (
    <Link href={url}>
      <div className={`${styles.navigationItem} ${active && styles.active}`}>
        <div className={styles.iconContainer}>
          <Image className={styles.icon} width={0} height={0} sizes='100%' src={icon} alt={imageAlt || 'Header icone'} />
        </div>
        <p className={styles.text}>{text}</p>
      </div>
    </Link>
  )
}

export default NavigationItem