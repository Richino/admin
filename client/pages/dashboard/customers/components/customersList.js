import styles from "../../../../styles/customersList.module.scss";
import { useState, useRef, useEffect } from "react";
import { GoKebabVertical } from "react-icons/go";

export default function CustomerList(props) {
    const [checked, setChecked] = useState(false);
    const [isopen, setOpen] = useState(false);
    const ref = useRef();

    useEffect(() => {
        const clickOutside = (e) => {
            if (
                isopen &&
                ref.current &&
                !ref.current.contains(e.target) &&
                e.path[2].className !== "customersList_dropdown__gFPBH"
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", clickOutside);
        return () => {
            document.removeEventListener("mousedown", clickOutside);
        };
    }, [isopen]);

    const click = (id) => {
        setOpen(false);
    };
    return (
        <div className={styles.wrapper}>
            <div className={styles.label}>
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => setChecked(!checked)}
                />
                <span>{`${props.first_name} ${props.last_name}`}</span>
            </div>
            <div>{props.phone}</div>
            <div>{props.email}</div>
            <div className={styles.last}>
                <div>{props.created}</div>
                <div className={styles.dropdown}>
                    <div
                        className={styles.kebab}
                        onClick={() => setOpen(!isopen)}
                        ref={ref}
                    >
                        <GoKebabVertical id={props.id} size={20} />
                    </div>

                    {isopen && (
                        <div className={styles.dropdown_content}>
                            <div onClick={() => click(props.id)}>Edit</div>
                            <div>Report</div>
                            <div>Delete</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
