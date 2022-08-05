import styles from "../../../styles/dashboard.module.scss";
import Card from "../../../src/components/overview/components/card";
import Chart from "../../../src/components/overview/components/charts";
import { AiOutlineDollar, AiOutlineUsergroupAdd } from "react-icons/ai";
import { BsBox } from "react-icons/bs";
import ChartPie from "../../../src/components/overview/components/pieCharts";
import Transaction from "../../../src/components/overview/components/transactions";
import axios from "axios";
import { useState } from "react";
const api = axios.create({
    baseURL: "https://adminapiapp.herokuapp.com/",
});

export default function Dashboard({ api_result, api_sales }) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>Overview</div>
            <div className={styles.box}>
                <Card
                    image={<AiOutlineDollar size={50} color="#672CFF" />}
                    header="TOTAL SALES"
                    total="$205.8K"
                    summary={5.68}
                    summary2="since last week"
                />
                <Card image={<BsBox size={50} color="#672CFF" />} header="TOTAL ORDERS" total="5795" summary={22.58} summary2="since last week" />
                <Card
                    image={<AiOutlineUsergroupAdd size={50} color="#672CFF" />}
                    header="NEW CUSTOMERS"
                    total="2985"
                    summary={-15.98}
                    summary2="since last week"
                />
                <Chart sales={api_sales} />
                <ChartPie />
                <Transaction transaction={api_result} />
            </div>
        </div>
    );
}

export async function getServerSideProps() {
    let result = null;
    let sales = null;
    await api.get("/overview/transactions").then((res) => {
        result = res.data;
    });
    await api.get("/overview/sales").then((res) => {
        sales = res.data;
    });

    return {
        props: { api_result: result, api_sales: sales, fallback: false },
    };
}
