import styles from './Input.module.css';


export default function Input({ type, placeholder, fontSize, onChange, value }) {
  const style = {
    "fontSize" : fontSize ? fontSize : "1rem"
  }
  return (
    <>
      <input className={styles.input} type={type} placeholder={placeholder} style={style} onChange={onChange} value={value}></input>
    </>
  );
}
