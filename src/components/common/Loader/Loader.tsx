import styles from './Loader.module.scss'

type Props = {
  size?: number
}

export const Loader = ({ size = 48 }: Props) => {
  return <div className={styles.Loader} style={{ width: `${size}px`, height: `${size}px` }}></div>
}
