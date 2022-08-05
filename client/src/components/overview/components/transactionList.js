import styles from "../../../../styles/transactionList.module.scss";
import { useState, useEffect, useRef } from "react";
import { GoKebabVertical } from "react-icons/go";
import OutsideClickHandler from "react-outside-click-handler";

export default function TransactionList(props) {
    const [checked, setChecked] = useState(false);
    const [isopen, setOpen] = useState(false);
    const ref = useRef();
    const click = () => {
        setOpen(false);
    };
    useEffect(() => {
        const clickOutside = (e) => {
            if (!ref.current.contains(e.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", clickOutside);

        return () => {
            document.removeEventListener("mousedown", clickOutside);
        };
    }, [isopen]);
    return (
        <div className={styles.wrapper}>
            <div className={styles.label}>
                <input type="checkbox" checked={checked} onChange={() => setChecked(!checked)} />
                <span>{props.id}</span>
            </div>
            <div className={styles.name}>{props.name}</div>
            <div className={styles.date}>{props.date}</div>
            <div className={styles.total}>{"$" + props.total}</div>
            <div
                className={`${
                    props.payment_status === "Paid" ? styles.paid : props.payment_status === "Refunded" ? styles.refunded : styles.chargeback
                } ${styles.payment}`}
            >
                {props.payment_status}
            </div>
            <div className={styles.payment_method}>
                <div className={styles.payment_text}>{props.payment_method}</div>
                <div ref={ref} className={styles.dropdown}>
                    <div className={styles.kebab} onClick={() => setOpen(!isopen)}>
                        <GoKebabVertical id={props.id} size={20} />
                    </div>

                    {isopen && (
                        <div className={styles.dropdown_content}>
                            <div onClick={click}>Edit</div>
                            <div onClick={click}>Refund</div>
                            <div onClick={click}>Delete</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
