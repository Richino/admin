import styles from "../../../styles/team.module.scss";
import List from "./components/list";
import { useState } from "react";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import axios from "axios";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const api = axios.create({
    baseURL: "http://localhost:3001",
});

export default function Team({ api_result, number }) {
    const [data, setData] = useState(api_result);
    const [checked, setChecked] = useState(false);
    const [numbers, setNumbers] = useState(number);
    const [previousNum, setPreviousNum] = useState(number);
    console.log(data);

    const right = () => {
        let array = [];
        if (numbers[1] >= numbers[2]) {
            return;
        } else {
            array = [...numbers];
            setPreviousNum(numbers);
            array[0] += 5;
            array[1] = array[0] + 5;
            if (array[1] >= array[2]) {
                array[1] = array[2];
                if (array[0] >= array[2]) {
                    array[0] -= 5;
                }
                setNumbers(array);
            } else {
                setNumbers(array);
            }
            api.post("/team/list", { data: array });
            api.get("/team").then((res) => {
                setData(res.data);
            });
        }
    };

    const left = () => {
        let array = [];

        if (numbers[1] >= numbers[2]) {
            console.log(previousNum);
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
        api.post("/team/list", { data: array });
        api.get("/team").then((res) => {
            setData(res.data);
        });
    };

    return (
        <div className={styles.content}>
            <div className={styles.right}>
                <div className={styles.header}>Team</div>
                <div>
                    <span>{`${numbers[0]} - ${numbers[1]} of ${numbers[2]}`}</span>
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
                    <div>Email</div>
                    <div>Status</div>
                </div>
                {data.map((key, index) => {
                    return (
                        <List
                            key={index}
                            id={data[index].id}
                            name={data[index].name}
                            image={data[index].href}
                            position={data[index].position}
                            email={data[index].email}
                            status={data[index].status}
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
    await api.post("/team/list", { data: [1, 5, null] });
    await api.get("/team").then((res) => {
        result = res.data;
    });
    await api.get("/team/count").then((res) => {
        let array = [1, 5, null];
        array[2] = res.data;
        number = array;
    });

    return { props: { api_result: result, number: number } };
}
