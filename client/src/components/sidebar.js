import styles from "../../styles/sidebar.module.scss";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { MdOutlineDashboardCustomize, MdOutlineTask } from "react-icons/md";
import { BsReceipt, BsBoxSeam, BsPeople, BsPerson, BsChat, BsCalendar3 } from "react-icons/bs";
import { IoMailOutline, IoSettingsOutline } from "react-icons/io5";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { open } from "../../store/openSlice";

const color = "#454F5B";
const color_hover = "#672CFF";

export default function Sidebar() {
    const router = useRouter();
    const isopen = useSelector((state) => state.opening.value);
    const dispatch = useDispatch();
    const ref = useRef();
    const [generalButtons, setGeneralButtons] = useState([
        {
            name: "Dashboard",
            image: <MdOutlineDashboardCustomize color={color} />,
            image_hover: <MdOutlineDashboardCustomize color={color_hover} />,
            hover: false,
            focus: false,
            href: "/dashboard/overview",
        },
        {
            name: "Orders",
            image: <BsReceipt color={color} />,
            image_hover: <BsReceipt color={color_hover} />,
            hover: false,
            focus: false,
            href: "/dashboard/orders",
        },
        {
            name: "Inventory",
            image: <BsBoxSeam color={color} />,
            image_hover: <BsBoxSeam color={color_hover} />,
            hover: false,
            focus: false,
            href: "/dashboard/inventory",
        },
        {
            name: "Customers",
            image: <BsPeople color={color} />,
            image_hover: <BsPeople color={color_hover} />,
            hover: false,
            focus: false,
            href: "/dashboard/customers",
        },
        {
            name: "Team",
            image: <BsPerson color={color} />,
            image_hover: <BsPerson color={color_hover} />,
            hover: false,
            focus: false,
            href: "/dashboard/team",
        },
    ]);

    const [appButtons, setappButtons] = useState([
        {
            name: "Mail",
            image: <IoMailOutline color={color} />,
            image_hover: <IoMailOutline color={color_hover} />,
            hover: false,
            focus: false,
        },
        {
            name: "Chat",
            image: <BsChat color={color} />,
            image_hover: <BsChat color={color_hover} />,
            hover: false,
            focus: false,
        },
        {
            name: "Calendar",
            image: <BsCalendar3 color={color} />,
            image_hover: <BsCalendar3 color={color_hover} />,
            hover: false,
            focus: false,
        },
        {
            name: "Task",
            image: <MdOutlineTask color={color} />,
            image_hover: <MdOutlineTask color={color_hover} />,
            hover: false,
            focus: false,
        },
        {
            name: "Settings",
            image: <IoSettingsOutline color={color} />,
            image_hover: <IoSettingsOutline color={color_hover} />,
            hover: false,
            focus: false,
        },
    ]);

    const generalButtonClick = (index) => {
        let array = [...generalButtons];
        let array2 = [...appButtons];
        for (let i = 0; i < array.length; i++) {
            array[i].focus = false;
        }
        for (let i = 0; i < array2.length; i++) {
            array2[i].focus = false;
        }
        array[index].focus = true;
        setGeneralButtons(array);
        setappButtons(array2);
        dispatch(open(false));
    };

    const generalButtonHoverEnter = (index) => {
        let array = [...generalButtons];
        for (let i = 0; i < array.length; i++) {
            array[i].hover = false;
        }
        array[index].hover = true;
        setGeneralButtons(array);
    };

    const generalButtonHoverleave = () => {
        let array = [...generalButtons];
        for (let i = 0; i < array.length; i++) {
            array[i].hover = false;
        }
        setGeneralButtons(array);
    };

    const appsButtonClick = (index) => {
        let array = [...appButtons];
        let array2 = [...generalButtons];
        for (let i = 0; i < array.length; i++) {
            array[i].focus = false;
        }
        for (let i = 0; i < array2.length; i++) {
            array2[i].focus = false;
        }
        array[index].focus = true;
        setappButtons(array);
        setGeneralButtons(array2);
    };

    const appsButtonHoverEnter = (index) => {
        let array = [...appButtons];
        for (let i = 0; i < array.length; i++) {
            array[i].hover = false;
        }
        array[index].hover = true;
        setappButtons(array);
    };

    const appsButtonHoverleave = () => {
        let array = [...appButtons];
        for (let i = 0; i < array.length; i++) {
            array[i].hover = false;
        }
        setappButtons(array);
    };

    useEffect(() => {
        if (router.pathname.includes("/dashboard/overview")) {
            let array = [...generalButtons];
            array[0].focus = true;
            setGeneralButtons(array);
        }
        if (router.pathname.includes("/dashboard/orders")) {
            let array = [...generalButtons];
            array[1].focus = true;
            setGeneralButtons(array);
        }
        if (router.pathname.includes("/dashboard/inventory")) {
            let array = [...generalButtons];
            array[2].focus = true;
            setGeneralButtons(array);
        }
        if (router.pathname.includes("/dashboard/customers")) {
            let array = [...generalButtons];
            array[3].focus = true;
            setGeneralButtons(array);
        }
        if (router.pathname.includes("/dashboard/team")) {
            let array = [...generalButtons];
            array[4].focus = true;
            setGeneralButtons(array);
        }

        const clickOutside = (e) => {
            console.log()
            if(ref.current == e.target || e.path[3].classList[1]=== "profile"){
               
                dispatch(open(false))
            }
        };

        document.addEventListener("mousedown", clickOutside);

        return () => {
            document.removeEventListener("mousedown", clickOutside);
        };
    }, [router.pathname]);

    return (
        <div ref={ref} className={`${isopen ? styles.wrapper_responsive : styles.wrapper} ${styles.sidebar}`}>
            <div className={`${styles.profile} profile`}>
                <div className={styles.profilePhoto}>
                    <Image priority height={100} width={100} src="/profile.jpg" />
                </div>
                <div className={styles.info}>
                    <span className={styles.name}>Samantha Beckford</span>
                    <span className={styles.position}>Admin</span>
                </div>
            </div>
            <span className={styles.text}>GENERAL</span>
            <ul className={styles.buttonContainer}>
                {Object.keys(generalButtons).map((key, index) => {
                    return (
                        <Link key={key} href={generalButtons[index].href}>
                            <div
                                onMouseEnter={() => generalButtonHoverEnter(index)}
                                onMouseLeave={() => generalButtonHoverleave()}
                                onClick={() => generalButtonClick(index)}
                                className={`${generalButtons[index].focus === true ? styles.button_focus : styles.button} button`}
                                key={key}
                            >
                                <li
                                    className={
                                        generalButtons[index].href === router.pathname || generalButtons[index].focus === true
                                            ? styles.containerFocus
                                            : styles.container
                                    }
                                >
                                    {generalButtons[index].href === router.pathname || generalButtons[index].focus === true
                                        ? generalButtons[index].image_hover
                                        : generalButtons[index].hover == true
                                        ? generalButtons[index].image_hover
                                        : generalButtons[index].image}
                                    <span className={styles.buttonText}>{generalButtons[index].name}</span>
                                </li>
                            </div>
                        </Link>
                    );
                })}
            </ul>
            <span className={styles.text}>APPS</span>
            <ul className={styles.buttonContainer}>
                {Object.keys(appButtons).map((key, index) => {
                    return (
                        <div className={styles.button} key={key}>
                            <li
                                onMouseEnter={() => appsButtonHoverEnter(index)}
                                onMouseLeave={() => appsButtonHoverleave()}
                                onClick={() => appsButtonClick(index)}
                                className={appButtons[index].focus === true ? styles.containerFocus : styles.container}
                            >
                                {appButtons[index].focus == true
                                    ? appButtons[index].image_hover
                                    : appButtons[index].hover == true
                                    ? appButtons[index].image_hover
                                    : appButtons[index].image}
                                <span className={styles.buttonText}>{appButtons[index].name}</span>
                            </li>
                        </div>
                    );
                })}
            </ul>
        </div>
    );
}
