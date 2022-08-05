import styles from "../../../styles/orders.module.scss";
import TransactionList from "../../../src/components/orders/components/transactionList";
import { useState, useEffect } from "react";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import axios from "axios";
const api = axios.create({
    baseURL: "https://adminapiapp.herokuapp.com/",
});

export default function Orders({ api_result, number_result }) {
    const [data, setData] = useState(api_result);
    const [checked, setChecked] = useState(false);
    const [numbers, setNumbers] = useState([1, 10]);
    const [total, setTotal] = useState(number_result);
    const [previousNum, setPreviousNum] = useState([1,10]);

    useEffect(() => {
        let result = api_result.filter((key, index) => {
            return index < 10;
        });
        setData(result);
    }, []);

    const right = async () => {
        let array = [];
        if (numbers[1] >= total) {
            return;
        } else {
            array = [...numbers];
            setPreviousNum(numbers);
            array[0] += 10;
            array[1] = array[0] + 10;
            if (array[1] >= total) {
                array[1] = total;
                if (array[0] >= total) {
                    array[0] -= 10;
                }
                setNumbers(array);
            } else {
                setNumbers(array);
            }
            let result = api_result.filter((key, index) => {
                return index >= array[0] - 1 && index < array[1];
            });
            setData(result);
        }
    };

    const left = async () => {
        let array = [];
        if (numbers[1] >= total) {
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
        let result = api_result.filter((key, index) => {
            return index >= array[0] - 1 && index < array[1];
        });
        setData(result);
    };
    return (
        <div className={styles.content}>
            <div className={styles.right}>
                <div className={styles.header}>Orders</div>
                <div>
                    <span>{`${numbers[0]} - ${numbers[1]} of ${number_result}`}</span>
                    <MdOutlineKeyboardArrowLeft color="#454f5b" onClick={left} />
                    <MdOutlineKeyboardArrowRight color="#454f5b" onClick={right} />
                </div>
            </div>
            <div className={styles.wrapper}>
                <div className={styles.responsive}>
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
            </div>
        </div>
    );
}

export async function getServerSideProps() {
    var number = 0;
    var result = 0;
    await api.get("/order").then((res) => {
        result = res.data;
    });
    await api.get("/order/count").then((res) => {
        number = res.data;
    });

    return { props: { api_result: result, number_result: number } };
}
