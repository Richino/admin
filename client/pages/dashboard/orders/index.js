import styles from "../../../styles/orders.module.scss";
import TransactionList from "./components/transactionList";
import { useState } from "react";
import {
    MdOutlineKeyboardArrowLeft,
    MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import axios from "axios";
const api = axios.create({
    baseURL: "http://localhost:3001",
});

export default function Orders({ api_result, number }) {
    const [data, setData] = useState(api_result);
    const [checked, setChecked] = useState(false);
    const [numbers, setNumbers] = useState(number);
    const [previousNum, setPreviousNum] = useState();

    const right = async () => {
        let array = [];
        if (numbers[1] >= numbers[2]) {
            return;
        } else {
            array = [...numbers];
            setPreviousNum(numbers);
            array[0] += 10;
            array[1] = array[0] + 10;
            if (array[1] >= array[2]) {
                array[1] = array[2];
                if (array[0] >= array[2]) {
                    array[0] -= 10;
                }
                setNumbers(array);
            } else {
                setNumbers(array);
            }
            await api.post("/order/list", { data: array });
            await api.get("/order").then((res) => {
                setData(res.data);
            });
        }
    };

    const left = async () => {
        let array = [];
        if (numbers[1] >= numbers[2]) {
            array = [...previousNum];
            setNumbers(array);
        } else {
            array = [...numbers];
            array[0] -= 10;
            array[1] -= 10;
            if (array[0] <= 1) {
                array[0] = 1;
                array[1] = 10;
            }
            setNumbers(array);
        }
        await api.post("/order/list", { data: array });
        await api.get("/order").then((res) => {
            setData(res.data);
        });
    };
    return (
        <div className={styles.content}>
            <div className={styles.right}>
                <div className={styles.header}>Orders</div>
                <div>
                    <span>{`${numbers[0]} - ${numbers[1]} of ${numbers[2]}`}</span>
                    <MdOutlineKeyboardArrowLeft
                        color="#454f5b"
                        onClick={left}
                    />
                    <MdOutlineKeyboardArrowRight
                        color="#454f5b"
                        onClick={right}
                    />
                </div>
            </div>
            <div className={styles.wrapper}>
                <div className={styles.title}>
                    <div className={styles.label}>
                        <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => setChecked(!checked)}
                        />
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
        </div>
    );
}

export async function getStaticProps() {
    var number = 0;
    var result = 0;
    await api.post("/order/list", { data: [1, 10, null] });
    await api.get("/order").then((res) => {
        result = res.data;
    });
    await api.get("/order/count").then((res) => {
        let array = [1, 10, null];
        array[2] = res.data;
        number = array;
    });

    return { props: { api_result: result, number: number } };
}
