import { CartesianGrid, XAxis, YAxis, ResponsiveContainer, AreaChart, Area, Tooltip } from "recharts";
import { useEffect, useState, useRef } from "react";
import styles from "../../../../styles/charts.module.scss";

export default function Chart(props) {
    const [data, setData] = useState(props.sales);
    const [isOpen, setOpen] = useState(false);
    const [isOpen2, setOpen2] = useState(false);
    const [isOpen3, setOpen3] = useState(false);
    const [months, setMonths] = useState([
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ]);
    const [week, setWeekText] = useState(() => {
        let array = [];
        for (let i = 0; i < 4; i++) {
            array.push(`Week ${i + 1}`);
        }
        array.shift();
        return array;
    });

    const [yearFirstText, setYearFirstText] = useState();
    const [years, setYears] = useState();
    const [getYears, setGetYears] = useState();
    const ref = useRef();

    useEffect(() => {
        setYear();

        const clickOutside = (e) => {
            if (!ref.current.contains(e.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", clickOutside);
        return () => {
            document.removeEventListener("mousedown", clickOutside);
        };
    }, []);

    const setYear = () => {
        let data = [];
        let x = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let year = props.sales.filter((key) => {
            return key.date.slice(0, 4) === "2020";
        });

        for (let i = 0; i < x.length; i++) {
            let month = year.filter((key) => {
                return key.date.slice(5, 7) === x[i];
            });
            let sum = month.reduce((accumulator, curValue) => {
                let result = accumulator + curValue.sales;
                return result;
            }, 0);

            let result = sum.toFixed(2);
            data.push({ months: months[i], sales: result });
        }
        setData(data);

        let array = [];
        for (let i = 0; i < props.sales.length; i++) {
            let newNum = i;
            let previousNum = 0;
            let text = "";
            let previousText = "";
            if (i == 0) {
                array.push(props.sales[i].date.slice(0, 4));
            } else {
                previousNum = i - 1;
            }
            text = props.sales[newNum].date.slice(0, 4);
            previousText = props.sales[previousNum].date.slice(0, 4);
            if (previousText != text) {
                array.push(text);
            }
        }
        setGetYears(array);
        setYearFirstText(array.at(-1));
        let filter = array.filter((key, index) => {
            return index != array.length - 1;
        });
        setYears(filter);
    };

    const yearClick = (e) => {
        let data = [];
        let x = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let year = props.sales.filter((key) => {
            return key.date.slice(0, 4) === e;
        });

        for (let i = 0; i < x.length; i++) {
            let month = year.filter((key) => {
                return key.date.slice(5, 7) === x[i];
            });
            let sum = month.reduce((accumulator, curValue) => {
                let result = accumulator + curValue.sales;
                return result;
            }, 0);

            let result = sum.toFixed(2);
            data.push({ months: months[i], sales: result });
        }
        setData(data);

        let filter = getYears.filter((value) => {
            return value != e;
        });
        setYearFirstText(e);
        setYears(filter);
        setOpen(false);
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.top}>
                <div className={styles.text}>EARNINGS</div>

                <div className={styles.right}>
                    <div ref={ref} className={`dropdown ${styles.dropdown_content} ${styles.content} ${isOpen ? styles.shadow : ""}`}>
                        <button onClick={() => setOpen(!isOpen)}>{yearFirstText}</button>
                        {isOpen && (
                            <div className={styles.dw}>
                                {years.map((key, index) => {
                                    return (
                                        <div key={key}>
                                            <button onClick={() => yearClick(years[index])}>{years[index]}</button>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <ResponsiveContainer height={400}>
                <AreaChart data={data}>
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid stroke="#F0F0F6" />
                    <Area
                        strokeWidth={2}
                        dot={{ fill: "#672CFF", r: 2 }}
                        type="monotone"
                        fillOpacity={1}
                        dataKey="sales"
                        stroke="#672CFF"
                        fill="url(#colorUv)"
                    />
                    <XAxis
                        style={{
                            fontSize: "14px",
                        }}
                        dataKey="months"
                        axisLine={false}
                        tickLine={false}
                    />
                    <YAxis
                        style={{
                            fontSize: "14px",
                        }}
                        dataKey="sales"
                        axisLine={false}
                        tickLine={false}
                        tickCount={5}
                        tickFormatter={(number) =>
                            number == 0
                                ? `$${String(number).slice(0, 2)}`
                                : number >= 1000000
                                ? `$${String(number).slice(0, 3)}K`
                                : `$${String(number).slice(0, 2)}K`
                        }
                    />
                    <Tooltip />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
