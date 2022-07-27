import styles from "../../../styles/customers.module.scss";
import CustomerList from "./components/customersList";
import { useState } from "react";
import {
    MdOutlineKeyboardArrowLeft,
    MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3001",
});

export default function Customers({ api_result, number_result }) {
    const [data, setData] = useState(api_result);
    const [checked, setChecked] = useState(false);
    const [numbers, setNumbers] = useState(number_result);
    const [previousNum, setPreviousNum] = useState();

    const right = () => {
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
            api.post("/customers/list", { data: array });
            api.get("/customers").then((res) => {
                setData(res.data);
            });
        }
    };

    const left = () => {
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
        api.post("/customers/list", { data: array });
        api.get("/customers").then((res) => {
            setData(res.data);
        });
    };
    return (
        <div className={styles.content}>
            <div className={styles.right}>
                <div className={styles.header}>Customers</div>
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
                        <span>Name</span>
                    </div>
                    <div>Phone</div>
                    <div>Email</div>
                    <div>Created</div>
                </div>
                {Object.keys(data).map((key, index) => {
                    return (
                        <CustomerList
                            key={key}
                            first_name={data[index].first_name}
                            last_name={data[index].last_name}
                            id={data[index].id}
                            created={data[index].created}
                            email={data[index].email}
                            phone={data[index].phone}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export async function getServerSideProps() {
    let number = 0;
    let result = 0;
    await api.post("/customers/list", { data: [1, 10, null] });
    await api.get("/customers").then((res) => {
        result = res.data;
    });
    await api.get("/customers/count").then((res) => {
        let array = [1, 10, null];
        array[2] = res.data;
        number = array;
    });

    return { props: { api_result: result, number_result: number } };
}
