import styles from "../../../styles/team.module.scss";
import List from "../../../src/components/team/components/list";
import { useState, useEffect } from "react";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import axios from "axios";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const api = axios.create({
    baseURL: "https://adminapiapp.herokuapp.com/",
});

export default function Team({ api_result, number }) {
    const [data, setData] = useState(api_result);
    const [checked, setChecked] = useState(false);
    const [numbers, setNumbers] = useState([1, 5]);
    const [total, setTotal] = useState(number);
    const [previousNum, setPreviousNum] = useState([1,5]);

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
            array[1] = array[0] + 5;
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
                <div className={styles.header}>Team</div>
                <div className={styles.arrows}>
                    <span>{`${numbers[0]} - ${numbers[1]} of ${total}`}</span>
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
                            image={data[index].location}
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

export async function getServerSideProps() {
    var number = 0;
    var result = 0;
    await api.get("/team").then((res) => {
        result = res.data;
    });
    await api.get("/team/count").then((res) => {
        number = res.data;
    });

    return { props: { api_result: result, number: number } };
}
