import Button from "@mui/material/Button";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Snack, SnackbarContext } from '../context/Context';
import { FooterData } from "../Data";

const Footer = () => {
    const { currentUser, login, logout } = useAuth();
    let navigate = useNavigate();
    const { setSnack } = useContext(SnackbarContext);

    const handleClickLogin = async () => {
        await login().then((res) => {
            if (res) {
                navigate('/');
                setSnack(new Snack({ message: 'Du har logget inn!', color: 'success', autoHideDuration: 5000, open: true }));
            }
        }).catch((err) => {
            setSnack(new Snack({ message: 'Noe gikk galt!', color: 'error', autoHideDuration: 5000, open: true }));
        });
    };

    const handleClickLogout = async () => {
        await logout().then((res) => {
            if (res) {
                navigate('/');
                setSnack(new Snack({ message: 'Du har logget ut!', color: 'success', autoHideDuration: 5000, open: true }));
            }
        }).catch((err) => {
            setSnack(new Snack({ message: 'Noe gikk galt!', color: 'error', autoHideDuration: 5000, open: true }));
        });
    };

    return (
        <div className="w-full h-auto text-left">
            <h1 className="text-4xl mb-5">{FooterData.title}</h1>
            <div className="flex flex-row w-full gap-20 mb-10">
                <div id="ROW_LEFT" className="flex flex-col text-left max-w-1/2">
                    <h2 className="text-2xl mb-2">Kontakt oss:</h2>
                    <p>{FooterData.adresse}</p>
                    <p>{FooterData.email}</p>
                    <p>{FooterData.telefon}</p>
                </div>
                {currentUser ? (
                    <div id="ROW_RIGHT" className="flex flex-col text-center max-w-1/2" text-white>
                        <h2 className="text-2xl mb-2">Sider:</h2>
                        <Button onClick={() => navigate("/ads")} style={{ color: "white" }}>Annonser</Button>
                        <Button onClick={() => navigate("/profile")} style={{ color: "white" }}>Min side</Button>
                        <Button onClick={() => navigate("/adcreator")} style={{ color: "white" }}>Opprett annonse</Button>
                        <Button onClick={handleClickLogout} style={{ color: "white" }}>Logg ut</Button>
                    </div>
                ) : (
                    <div id="ROW_RIGHT" className="flex flex-col text-center max-w-1/2" text-white>
                        <h2 className="text-2xl mb-2">Sider:</h2>
                        <Button onClick={() => navigate("/ads")} style={{ color: "white" }}>Annonser</Button>
                        <Button onClick={() => navigate("/FAQ")} style={{ color: "white" }}>Ofte stilte spørsmål</Button>
                        <Button onClick={handleClickLogin} style={{ color: "white" }}>Logg inn</Button>
                    </div>
                )}
            </div>
            <p>{FooterData.trademark}</p>
        </div>
    );
}

export default Footer;