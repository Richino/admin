import styles from "../../../../../styles/teamList.module.scss";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { GoKebabVertical } from "react-icons/go";
import Link from "next/link";

export default function List(props) {
    const [checked, setChecked] = useState(false);
    const [isopen, setOpen] = useState(false);
    const ref = useRef();

    useEffect(() => {
        const clickOutside = (e) => {
            if (isopen && ref.current && !ref.current.contains(e.target) && e.path[2].className !== "customersList_dropdown__gFPBH") {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", clickOutside);
        return () => {
            document.removeEventListener("mousedown", clickOutside);
        };
    }, [isopen]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.label}>
                <input type="checkbox" checked={checked} onChange={() => setChecked(!checked)} />
                <div className={styles.item}>
                    <div className={styles.profilePhoto}>
                        <Image loading="eager" layout="fixed" src={props.image} height={50} width={50} priority />
                    </div>
                    <div>
                        <span className={styles.name}>{props.name}</span>
                        <div>{props.position}</div>
                    </div>
                </div>
            </div>
            <div className={styles.total}>{props.email}</div>
            <div className={styles.status_container}>
                <div className={styles.status}>{props.status === 0 ? "Offline" : "Online"}</div>
                <div className={styles.dropdown}>
                    <div className={styles.kebab} onClick={() => setOpen(!isopen)}>
                        <GoKebabVertical id={props.id} size={20} />
                    </div>

                    {isopen && (
                        <div className={styles.dropdown_content}>
                            <Link
                                as={`/dashboard/team/user/${props.id}`}
                                href={{
                                    pathname: "/dashboard/team/user/[id]",
                                    query: {
                                        id: props.id,
                                    },
                                }}
                            >
                                <div>View</div>
                            </Link>

                            <div>Actions</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
