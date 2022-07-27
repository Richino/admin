import styles from "../../../styles/inventory.module.scss";
import InventoryList from "./components/inventoryList";
import { useState } from "react";
import {
    MdOutlineKeyboardArrowLeft,
    MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3001",
});

export default function Inventory({ api_result, number_result}) {
    const [data, setData] = useState(api_result);
    const [checked, setChecked] = useState(false);
    const [numbers, setNumbers] = useState(number_result);
    const [previousNum, setPreviousNum] = useState();

    const right = async () => {
        let array = [];
        if (numbers[1] >= numbers[2]) {
            return;
        } else {
            array = [...numbers];
            setPreviousNum(numbers);
            array[0] += 5;
            array[1] = array[0] + 4;
            if (array[1] >= array[2]) {
                array[1] = array[2];
                if (array[0] >= array[2]) {
                    array[0] -= 5;
                }
                setNumbers(array);
            } else {
                setNumbers(array);
            }
            await api.post("/inventory/list", { data: array });
            await api.get("/inventory").then((res) => {
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
            array[0] -= 5;
            array[1] -= 5;
            if (array[0] <= 1) {
                array[0] = 1;
                array[1] = 5;
            }
            setNumbers(array);
        }
        await api.post("/inventory/list", { data: array });
        await api.get("/inventory").then((res) => {
            setData(res.data);
        });
    };

    return (
        <div className={styles.content}>
            <div className={styles.right}>
                <div className={styles.header}>Inventory</div>
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
                    <div>Price</div>
                    <div>Updated</div>
                    <div>Status</div>
                    <div>Ratings</div>
                </div>
                {Object.keys(data).map((key, index) => {
                    return (
                        <InventoryList
                            key={key}
                            id={key}
                            name={data[index].name}
                            date={data[index].date}
                            total={data[index].price}
                            image={data[index].href}
                            quantity={data[index].quantity}
                            time={data[index].time}
                            status={data[index].status}
                            r1={data[index].r1}
                            r2={data[index].r2}
                            r3={data[index].r3}
                            r4={data[index].r4}
                            r5={data[index].r5}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export async function getStaticProps() {
    let number = 0;
    let result = 0;
    await api.post("/inventory/list", { data: [1, 5, null] });
    await api.get("/inventory").then((res) => {
        result = res.data;
    });
    await api.get("/inventory/count").then((res) => {
        let array = [1, 5, null];
        array[2] = res.data;
        number = array;
    });

    return {
        props: { api_result: result, number_result: number },
    };
}
