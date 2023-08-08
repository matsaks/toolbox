import StaticRatingStars from "./StaticRatingStars";
import { GoogleUser } from "../types/types";
import { useEffect, useState } from "react";


interface Review {
    id?: string;
    user?: GoogleUser;
    adId?: string;
    rating?: number;
    comment?: string;
}


export default function ReviewComponent(props: Review) {

    const [image, setImage] = useState<string>("");

    useEffect(() => {
        if (props.user?.photoURL) {
            setImage(props.user?.photoURL);
        }
    }, [props.user?.photoURL]);

    return (
        <div className="flex flex-col p-5 rounded-md mt-2 bg-slate-100 dark:bg-dark-lysGraa">
            <div className="flex flex-row gap-5">
                <img src={image} alt="User profile" style={{ width: '60px', height: '60px', borderRadius: '50%', marginRight: '8px' }} />
                <div>
                    <h2 className="mb-2 text-xl">{props.user?.displayName}</h2>
                    <StaticRatingStars value={Number(props.rating)} key={props.id} />
                </div>
            </div>
            <div className="mt-5 break-words">
                {props.comment}
            </div>
        </div>
    );

};



