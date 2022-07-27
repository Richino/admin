import Sidebar from "./components/sidebar";
import Topnav from "./components/topbar";
import styles from "../styles/home.module.scss";

export default function Layout(props) {

    return (
        <div className={styles.wrapper}>
            <Sidebar />
            <div className={styles.content}>
                <Topnav />
                {props.children}
            </div>
        </div>
    );
}
