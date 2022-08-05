import styles from "../../../styles/customers.module.scss";
import CustomerList from "../../../src/components/customers/components/customersList";
import { useState, useEffect } from "react";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import axios from "axios";

const api = axios.create({
    baseURL: "https://adminapiapp.herokuapp.com/",
});

export default function Customers({ api_result, number_result }) {
    const [data, setData] = useState(api_result);
    const [checked, setChecked] = useState(false);
    const [numbers, setNumbers] = useState([1, 10]);
    const [total, setTotal] = useState(number_result);
    const [previousNum, setPreviousNum] = useState([1, 10]);

    useEffect(() => {
        let result = api_result.filter((key, index) => {
            return index < 10;
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

    const left = () => {
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
                <div className={styles.header}>Customers</div>
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
    await api.get("/customers").then((res) => {
        result = res.data;
    });
    await api.get("/customers/count").then((res) => {
        number = res.data;
    });

    return { props: { api_result: result, number_result: number } };
}
