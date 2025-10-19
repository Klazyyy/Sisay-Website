import Link from "next/link";
import styles from './HomePage.module.css';

export default function HomePage() {
  return (
    <main className={styles.main}>
      <h1>Bienvenido a Sisay</h1>
      <p>Esta será la página de inicio con contenido destacado.</p>
      <Link href="/catalogo" className={styles.link}>
        Ir a la tienda
      </Link>
    </main>
  );
}