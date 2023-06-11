import styles from './Loader.module.scss'

type Props = {
  style?: React.CSSProperties
  size?: number
}

export const Loader = ({ size = 48, style }: Props) => {
  return (
    <div
      className={styles.Loader}
      style={{ ...style, width: `${size}px`, height: `${size}px` }}
    ></div>
  )
}
