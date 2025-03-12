import { styles } from "./styles";

export default function Home() {
  return (
    <>
      <div
        className={`${styles.titleHeroSize} ${styles.heroHeadTextDark} bg-landingDark`}
      >
        <p>Go to /test</p>
      </div>
    </>
  );
}
