import { Pie, PieChart, ResponsiveContainer, Tooltip, Cell } from "recharts";
import { useState, useRef, useEffect } from "react";
import styles from "../../../../styles/piechart.module.scss";

export default function ChartPie() {
    const data = [
        { name: "Completed", value: 1205 },
        { name: "Pending", value: 250 },
        { name: "Canceled", value: 124 },
    ];
    const [isOpen, setOpen] = useState(false);
    const ref = useRef();
    const [colors, setColors] = useState(["#672CFF", "#FFC107", "#FF4842"]);
    useEffect(() => {
        const clickOutside = (e) => {
            let path = e.path || (e.composedPath && e.composedPath());
            if (path[0] !== ref.current) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", clickOutside);
        return () => {
            document.removeEventListener("mousedown", clickOutside);
        };
    }, [isOpen]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.top}>
                <div className={styles.text}>ORDER STATUS</div>
                
            </div>
            <ResponsiveContainer height="100%">
                <PieChart>
                    <Pie
                        dataKey="value"
                        data={data}
                        innerRadius={77}
                        outerRadius={85}
                        fill="#82ca9d"
                    >
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={colors[index % colors.length]}
                            />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
            <div className={styles.bottom}>
                <div>
                    <span>Completed</span>
                    <span className={styles.completed}>1205</span>
                </div>
                <div>
                    <span>Pending</span>
                    <span className={styles.pending}>250</span>
                </div>
                <div>
                    <span>Canceled</span>
                    <span className={styles.canceled}>124</span>
                </div>
            </div>
        </div>
    );
}
