import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";


const ProfileBar = () => {
    let navigate = useNavigate();
    const { currentUser } = useAuth();
    const [image, setImage] = useState<string>("");

    useEffect(() => {
        if (currentUser?.photoURL !== null && currentUser?.photoURL !== undefined) {
            setImage(currentUser?.photoURL);
        }
    }, [currentUser]);

    const BtnStyle = {
        p: 2,
    }

    return (
        <div className="bg-white dark:bg-dark-lysGraa h-full flex flex-col gap-10 p-10 justify-start pt-60">
            <div className="flex flex-col items-center gap-10 w-full">
                <img src={image} alt="" className="h-32 w-32 rounded-full" />
                <h1 className=" font-bold dark:text-dark-white text-md">{currentUser?.displayName}</h1>
                <div className="flex flex-col gap-2">
                    <Button variant="contained" sx={BtnStyle} onClick={() => navigate("/profile")}>Min profil</Button>
                    <Button variant="contained" sx={BtnStyle} onClick={() => navigate("/myads")}>Mine annonser</Button>
                    <Button variant="contained" sx={BtnStyle} onClick={() => navigate("/myReservations")}>Mine reservasjoner</Button>
                    <Button variant="contained" sx={BtnStyle} onClick={() => navigate("/savedads")}>Lagrede annonser</Button>
                </div>
            </div>
        </div>
    );
}

export default ProfileBar;