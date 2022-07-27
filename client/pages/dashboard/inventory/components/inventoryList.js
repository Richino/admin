import styles from "../../../../styles/inventoryList.module.scss";
import { useState } from "react";
import Image from "next/image";
import ReactStars from "react-stars";
import { GoKebabVertical } from "react-icons/go";
import OutsideClickHandler from "react-outside-click-handler";

export default function InventoryList(props) {
    const [checked, setChecked] = useState(false);
    const [isopen, setOpen] = useState(false);

    return (
        <div className={styles.wrapper}>
            <div className={styles.label}>
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => setChecked(!checked)}
                />
                <div className={styles.item}>
                    <Image src={props.image} height={60} width={60} />
                    <div>
                        <span className={styles.name}>{props.name}</span>
                        <div>{`${props.quantity} in stock`}</div>
                    </div>
                </div>
            </div>
            <div className={styles.total}>{"$" + props.total}</div>
            <div className={styles.updated}>
                <div>{props.date}</div>
                <div>{props.time}</div>
            </div>
            <div className={styles.status}>{props.status}</div>
            <div className={styles.rating}>
                <ReactStars
                    count={5}
                    size={20}
                    color2={"#ffd700"}
                    color1={"#c4cdd54d"}
                    edit={false}
                    value={
                        (props.r1 * 1 +
                            props.r2 * 2 +
                            props.r3 * 3 +
                            props.r4 * 4 +
                            props.r5 * 5) /
                        (props.r1 + props.r2 + props.r3 + props.r5 + props.r5)
                    }
                />
                <div className={styles.dropdown}>
                    <OutsideClickHandler
                        onOutsideClick={() => {
                            setOpen(false);
                        }}
                    >
                        <div
                            className={styles.kebab}
                            onClick={() => setOpen(!isopen)}
                        >
                            <GoKebabVertical id={props.id} size={20} />
                        </div>
                    </OutsideClickHandler>

                    {isopen && (
                        <div className={styles.dropdown_content}>
                            <div>Edit</div>
                            <div>Archive</div>
                            <div>Delete</div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
