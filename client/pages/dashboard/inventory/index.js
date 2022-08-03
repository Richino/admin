import styles from "../../../styles/inventory.module.scss";
import InventoryList from "./components/inventoryList";
import { useState, useEffect } from "react";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3001",
});

export default function Inventory({ api_result, number_result }) {
    const [data, setData] = useState([]);
    const [checked, setChecked] = useState(false);
    const [numbers, setNumbers] = useState([1, 5]);
    const [total, setTotal] = useState(number_result);
    const [previousNum, setPreviousNum] = useState();

    useEffect(() => {
        let result = api_result.filter((key, index) => {
            return index < 5;
        });
        setData(result);
    }, []);

    const right = () => {
        let array = [];
        if (numbers[1] >= total) {
            return;
        } else {
            array = [...numbers];
            setPreviousNum(numbers);
            array[0] += 5;
            array[1] = array[0] + 4;
            if (array[1] >= total) {
                array[1] = total;
                if (array[0] >= total) {
                    array[0] -= 5;
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

    const left = () => {
        let array = [];
        if (numbers[1] >= total) {
            console.log(previousNum);
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
        let result = api_result.filter((key, index) => {
            return index >= array[0] - 1 && index < array[1];
        });
        setData(result);
    };

    return (
        <div className={styles.content}>
            <div className={styles.right}>
                <div className={styles.header}>Inventory</div>
                <div>
                    <span>{`${numbers[0]} - ${numbers[1]} of ${number_result}`}</span>
                    <MdOutlineKeyboardArrowLeft color="#454f5b" onClick={left} />
                    <MdOutlineKeyboardArrowRight color="#454f5b" onClick={right} />
                </div>
            </div>
            <div className={styles.wrapper}>
                <div className={styles.title}>
                    <div className={styles.label}>
                        <input type="checkbox" checked={checked} onChange={() => setChecked(!checked)} />
                        <span>Name</span>
                    </div>
                    <div>Price</div>
                    <div>Updated</div>
                    <div>Status</div>
                    <div>Ratings</div>
                </div>
                {data.map((key, index) => {
                    return (
                        <InventoryList
                            key={index}
                            id={index}
                            name={data[index].name}
                            date={data[index].date}
                            total={data[index].price}
                            image={data[index].location}
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
        number = res.data;
    });

    return {
        props: { api_result: result, number_result: number },
    };
}
