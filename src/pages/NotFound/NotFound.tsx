import styles from './NotFound.module.css'

export function NotFound() {
  return (
    <section className={styles.section}>
      <span className={styles.code}>404</span>
      <span className={styles.notFound}>Not found</span>
    </section>
  )
}
