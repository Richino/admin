import styles from "../../../../styles/transaction.module.scss";
import TransactionList from "../components/transactionList";
import { useState } from "react";

export default function Transaction(props) {
    const [data, setData] = useState(props.transaction);
    const [checked, setChecked] = useState(false);
    return (
        <div className={styles.wrapper}>
            <div>LATEST TRANSACTION</div>
            <div className={styles.title}>
                <div className={styles.label}>
                    <input type="checkbox" checked={checked} onChange={() => setChecked(!checked)} />
                    <span>Order ID</span>
                </div>
                <div>Billing Name</div>
                <div>Date</div>
                <div>Total</div>
                <div>Payment Status</div>
                <div>Payment Method</div>
            </div>
            {data.map((key, index) => {
                return (
                    <TransactionList
                        key={index}
                        name={data[index].customer}
                        id={data[index].order_id}
                        date={data[index].date}
                        total={data[index].total}
                        payment_status={data[index].payment_status}
                        payment_method={data[index].payment_method}
                    />
                );
            })}
        </div>
    );
}
