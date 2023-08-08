import { Avatar } from "@mui/material";
import { amber } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAd } from "../lib/controller";
import { Reservation, UpdateAd } from "../types/types";
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import RoomIcon from '@mui/icons-material/Room';

interface ReservationProps {
    reservation: Reservation;
}

interface timeInstanceProps {
    mode: "fra" | "til";
    reservation: Reservation;
}

const TimeInstance = (props: timeInstanceProps) => {
    const dateString = (s: string | undefined) => {
        if (s === undefined) {
            return "";
        }
        let copy = s.split(",");
        if (copy[1].length === 1) {
            copy[1] = "0" + copy[1];
        }
        return copy.reverse().join("-");
    }

    return (
        <div className="flex flex-col">
            <p className="dark:text-dark-white font-medium">{props.mode === "fra" ? "Fra" : "til"}</p>
            <p className="dark:text-dark-white border-black dark:border-white border p-2 rounded-md">
                {
                    props.mode === "fra" ?
                        dateString(props.reservation.startDate) :
                        dateString(props.reservation.endDate)
                }
            </p>
        </div>
    )
}

const ReservationComp = (props: ReservationProps) => {
    return (
        <div className="flex bg-white dark:bg-dark-lysGraa p-3 rounded-2xl shadow-sm dark:shadow-dark-white  items-center flex-col">
            <div className="flex flex-row gap-5">
                <TimeInstance reservation={props.reservation} mode="fra" />
                <TimeInstance reservation={props.reservation} mode="til" />
            </div>
        </div>
    )
}

export default function ReservationAd(props: ReservationProps) {

    let navigate = useNavigate();
    const [picture, setPicture] = useState<string>("");

    const [description, setDescription] = useState("");
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [city, setCity] = useState("");
    const [pictures, setPictures] = useState<string[]>([]);

    function truncate(str: any) {
        return (str.length > 30) ? str.substring(0, 30 - 1) + '...' : str;
    };

    const handleClick = () => {
        if (props.reservation.adId !== null && props.reservation.adId) {
            sessionStorage.removeItem("ADID");
            sessionStorage.setItem("ADID", props.reservation.adId);
            navigate(`/adinspector/${props.reservation.adId}`)
        }
    }

    async function getAdFromDatabase(adID: string): Promise<UpdateAd | undefined> {
        const doc = await getAd(adID)
        if (doc === undefined || doc === null) return undefined;
        const adFromDatabase = { id: doc.id, ...doc.data() } as UpdateAd;
        return adFromDatabase;
    }

    useEffect(() => {
        async function fetchAd() {
            const adId = props.reservation.adId;
            if (adId) {
                const adFromDatabase = await getAdFromDatabase(adId);
                if (adFromDatabase !== undefined) {
                    setDescription(adFromDatabase.description);
                    setTitle(adFromDatabase.title);
                    setPrice(adFromDatabase.price.toString());
                    setCity(adFromDatabase.city);
                    setPictures(adFromDatabase.pictures);
                }
            }
        }
        fetchAd();
    }, []);

    useEffect(() => {
        function getAdPicture() {
            if (pictures !== undefined && pictures.length > 0) {
                setPicture(pictures[0]);
                return pictures[0];
            }
            else {
                return "https://img.icons8.com/ios/50/000000/price-tag-euro.png";
            }
        }
        getAdPicture();
    }, [pictures]);


    return (
        <div className="flex flex-col items-center">
            <ReservationComp reservation={props.reservation} />

            <div onClick={() => handleClick()} className='
            rounded-lg w-32 h-32 md:w-60 md:h-60 lg:w-80 lg:h-80 
                shadow-lg overflow-hidden relative hover:scale-105 hover:shadow-2xl dark:shadow-dark-white/25 active:scale-100 duration-200 m-3
            '>
                <div className="flex h-full w-full overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url(${picture})` }}>
                </div>

                <div className="flex flex-row">

                    <div className="flex flex-row bg-white dark:bg-dark-lysGraa dark:text-dark-white rounded-lg h-auto absolute bottom-0 p-4 justify-between w-full shadow-inner ">

                        <div className="w-1/5 hidden md:block">
                            <Avatar sx={{ bgcolor: amber[500] }}>TH</Avatar>
                        </div>
                        <div className="flex flex-col w-4/5">
                            <div className="flex justify-between">
                                <h2 className="text-md font-bold">{title}</h2>

                                <div className="flex flex-row h-5 lg:hidden">
                                    <img alt="bilde" className="h-full" src="https://img.icons8.com/ios/50/000000/price-tag-euro.png" />
                                    <p className="md:text-lg text-pu-ghost ml-1 dark:text-dark-white">{price}kr/dag</p>
                                </div>

                            </div>
                            <p className="text-sm text-left my-2 hidden lg:block">{truncate(description)}</p>
                            <div className=" flex-row gap-5 hidden lg:flex">

                                <div className="flex flex-row h-5">
                                    <AttachMoneyIcon color="secondary" />
                                    <p className="text-md text-pu-ghost ml-1 dark:text-dark-white">{price}kr</p>
                                </div>

                                <div className="flex flex-row h-5">
                                    <RoomIcon color="secondary" />
                                    <p className="text-md text-pu-ghost ml-1 dark:text-dark-white">{city}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}