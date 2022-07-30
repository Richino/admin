import { useState } from "react";
import styles from "../../../../styles/user.module.scss";
import Image from "next/image";
import List from "./components/list";
import axios from "axios";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
const api = axios.create({
    baseURL: "http://localhost:3001",
});

const User = ({ api_result, users }) => {
    const [data, setData] = useState(api_result);
    const [user, setUser] = useState(users);
    const [checked, setChecked] = useState(false);
    return (
        <div className={styles.wrapper}>
            <div className={styles.card}>
                <div className={styles.circle_container}>
                    <div className={styles.photo}>
                        <Image priority height={100} width={100} src={data.image} />
                    </div>
                </div>
                <div className={styles.info}>
                    <span>{data.name}</span>
                    <span>{data.position}</span>
                    <span>{data.email}</span>
                    <span>9764390281</span>
                    <button>Message</button>
                </div>
            </div>
            <div className={styles.list}>
                <div className={styles.title}>
                    <div className={styles.label}>
                        <input type="checkbox" checked={checked} onChange={() => setChecked(!checked)} />
                        <span>Associates</span>
                    </div>
                    <div>Email</div>
                    <div>Status</div>
                </div>
                {user.map((key, index) => {
                    return (
                        <List
                            key={index}
                            name={user[index].name}
                            image={user[index].href}
                            position={user[index].position}
                            email={user[index].email}
                            status={user[index].status}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export async function getServerSideProps(ctx) {
    const { query } = ctx;
    var result = "";
    var list = "";
    await api.post("/user/id", { data: query.id });
    await api.get("/user").then((res) => {
        result = res.data;
    });
    await api.get("/user/list").then((res) => {
        list = res.data;
    });

    return { props: { api_result: result, users: list } };
}

export default User;
