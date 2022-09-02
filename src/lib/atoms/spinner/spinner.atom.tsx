import styles from './spinner.module.scss';

export default function SpinnerAtom() {
  return (
    <div className={styles.ldsRipple}>
      <div></div>
      <div></div>
    </div>
  );
}
