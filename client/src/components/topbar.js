import styles from "../../styles/topbar.module.scss";
import { AiOutlineBell, AiOutlineSearch } from "react-icons/ai";
import { BsPower } from "react-icons/bs";
import { useState } from "react";


export default function Topnav() {
    const [isopen, setOpen] = useState(false);

    return (
        <div className={styles.content}>
            <div className={styles.wrapper}>
                <div className={styles.searchBar}>
                    <AiOutlineSearch size={24} color="79838E" />
                    <input placeholder="Search..." />
                </div>
                <div className={styles.container}>
                    <AiOutlineBell
                        size={22}
                        color="79838E"
                        onClick={() => setOpen(!isopen)}
                    />
                    <BsPower size={22} color="79838E" />
                </div>
            </div>
            {isopen && <div className={styles.noti}></div>}
        </div>
    );
}
