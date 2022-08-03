import styles from "../../styles/topbar.module.scss";
import { AiOutlineBell, AiOutlineSearch } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsPower } from "react-icons/bs";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { open } from "../../store/openSlice";

export default function Topnav() {
    const [isopen, setOpen] = useState(false);
    const dispatch = useDispatch();

    const OpenClick = () => {
        setOpen(!isopen);
        dispatch(open(true));
    };

    return (
        <div className={styles.content}>
            <button onClick={OpenClick}>
                <GiHamburgerMenu size={20} color="#454f5b" />
            </button>
        </div>
    );
}
