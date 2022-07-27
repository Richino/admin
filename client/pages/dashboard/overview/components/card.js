import styles from "../../../../styles/card.module.scss";

export default function Card(props) {
    return (
        <div className={styles.wrapper}>
            <div>
                <span className={styles.header}>{props.header}</span>
                <span>{props.total}</span>
                <div>
                    <span
                        className={
                            props.summary >= 0 ? styles.green : styles.red
                        }
                    >
                        {props.summary >= 0
                            ? `+${props.summary}% `
                            : `-${props.summary}% `}
                    </span>
                    <span>{props.summary2}</span>
                </div>
            </div>
            <div>{props.image}</div>
        </div>
    );
}
