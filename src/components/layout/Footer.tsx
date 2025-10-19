import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <p>&copy; {currentYear} Sisay. Todos los derechos reservados.</p>
    </footer>
  );
}