import Sidebar from "./components/sidebar";
import Topnav from "./components/topbar";
import styles from "../styles/home.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { open } from "../store/openSlice";

export default function Layout(props) {
    const isopen = useSelector((state) => state.opening.value);
    const dispatch = useDispatch();
    return (
        <div className={styles.wrapper}>
            <div onClick={() => dispatch(open(false))} className={isopen ? styles.modal_open : styles.modal}></div>
            <Sidebar />
            <div className={styles.content}>
                <Topnav />
                {props.children}
            </div>
        </div>
    );
}
