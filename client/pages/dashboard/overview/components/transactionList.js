import styles from "../../../../styles/transactionList.module.scss";
import { useState } from "react";
import { GoKebabVertical } from "react-icons/go";
import OutsideClickHandler from "react-outside-click-handler";

export default function TransactionList(props) {
    const [checked, setChecked] = useState(false);
    const [isopen, setOpen] = useState(false);
    return (
        <div className={styles.wrapper}>
            <div className={styles.label}>
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => setChecked(!checked)}
                />
                <span>{props.id}</span>
            </div>
            <div>{props.name}</div>
            <div>{props.date}</div>
            <div>{"$" + props.total}</div>
            <div
                className={
                    props.payment_status === "Paid"
                        ? styles.paid
                        : props.payment_status === "Refunded"
                        ? styles.refunded
                        : styles.chargeback
                }
            >
                {props.payment_status}
            </div>
            <div>{props.payment_method}</div>
            <div className={styles.dropdown}>
                <OutsideClickHandler
                    onOutsideClick={() => {
                        setOpen(false);
                    }}
                >
                    <div
                        className={styles.kebab}
                        onClick={() => setOpen(!isopen)}
                    >
                        <GoKebabVertical id={props.id} size={20} />
                    </div>
                </OutsideClickHandler>

                {isopen && (
                    <div className={styles.dropdown_content}>
                        <div>Edit</div>
                        <div>Refund</div>
                        <div>Delete</div>
                    </div>
                )}
            </div>
        </div>
    );
}
