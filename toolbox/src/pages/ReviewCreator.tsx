import { Button } from "@mui/material";
import { useContext, useState } from "react";
import { addReview, checkReview } from "../lib/controller";
import Title from "../components/Title";
import Step from "../components/Step";
import { useNavigate } from "react-router-dom";
import { NewReview } from "../types/types";
import { Snack, SnackbarContext } from "../context/Context";
import { useAuth } from "../context/AuthContext";
import TwStyles from "../Data";
import * as React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';

const ReviewCreator = () => {
    let navigate = useNavigate();
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState("");
    const { setSnack } = useContext(SnackbarContext);
    const { currentUser } = useAuth();


    const handleOnClick = async () => {
        const adId = sessionStorage.getItem("ADID");
        if (adId === null) {
            setSnack(new Snack({ message: 'Noe gikk galt, prøv igjen senere', color: 'warning', autoHideDuration: 5000, open: true }));
            return;
        }

        if (review === "") {
            setSnack(new Snack({ message: 'Alle felt må fylles ut', color: 'warning', autoHideDuration: 5000, open: true }));
            return;
        }

        if (currentUser?.id !== null && currentUser !== undefined) {
            // check if the user has already reviewed the ad
            if (await checkReview(currentUser?.id, adId) === true) {
                setSnack(new Snack({ message: 'Du har allerede anmeldt denne annonsen', color: 'warning', autoHideDuration: 5000, open: true }));
                return;
            }


            const newReview: NewReview = {
                userId: currentUser?.id,
                adId: adId,
                rating: rating,
                comment: review,
            }
            const res = await addReview(newReview);
            if (res === true) {
                setSnack(new Snack({ message: 'Anmeldelse lagt til', color: 'success', autoHideDuration: 5000, open: true }));
                navigate("/adinspector/" + adId);
            } else {
                setSnack(new Snack({ message: 'Noe gikk galt, prøv igjen senere', color: 'warning', autoHideDuration: 5000, open: true }));
            }

        }
    }

    const labels: { [index: string]: string } = {
        1: 'Forferdelig!',
        2: 'Dårlig!',
        3: 'Ok!',
        4: 'Bra!',
        5: 'Fantastisk!',
    };

    function getLabelText(value: number) {
        return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
    }

    const [value, setValue] = React.useState<number | null>(0);
    const [hover, setHover] = React.useState(-1);



    return (
        <div>
            <div id="c_section" className='flex w-full h-full content-center bg-slate-100 dark:bg-dark-graa overflow-hidden z-10'>
                <div id="c_container" className='static flex flex-row mr-auto ml-auto mt-auto mb-auto w-full max-w-7xl p-10 gap-10 justify-center bg-slate-100 dark:bg-dark-graa'>
                    <div className='flex flex-col w-10/12 text-left pt-32 mb-10'>

                        <Title size={'text-7xl'} heading={'Opprett '} span={'anmeldelse'} description={'Gi en tilbakemelding på produktet du har lånt!'} />

                        <div id="RATING" className='flex flex-col my-5 dark:text-dark-white'>
                            <Step nr={'01'} title={'Rating'} />
                            <p> Gi en anmeldelse av produktet. </p>
                            <Box
                                sx={{
                                    width: 400,
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: 2,
                                }}
                            >
                                <Rating
                                    name="hover-feedback"
                                    value={value}
                                    precision={1}
                                    sx={{
                                        fontSize: "4rem"

                                    }}
                                    getLabelText={getLabelText}
                                    onChange={(event, newValue) => {
                                        setValue(newValue);
                                        setRating(Number(newValue));
                                    }}
                                    onChangeActive={(event, newHover) => {
                                        setHover(newHover);
                                    }}
                                    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                />
                                {value !== null && (
                                    <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
                                )}
                            </Box>
                        </div>

                        <div id="REVIEW" className='flex flex-col my-5 dark:text-dark-white'>
                            <Step nr={'02'} title={'Anmeldelse'} />
                            <p> Skriv en anmeldelse av produktet. </p>
                            <div className='flex flex-col w-full mt-5 gap-2 my-2'>
                                <textarea
                                    placeholder="Anmeldelse"
                                    value={review}
                                    onChange={(e) => { setReview(e.target.value) }}
                                    rows={4}
                                    className={TwStyles.TextField + " resize-none h-40"}
                                ></textarea>
                            </div>
                        </div>

                        <div className='flex flex-col w-full gap-2 my-2'>
                            <Button variant="contained" color="primary" sx={{ p: 2 }} onClick={() => handleOnClick()}> Publiser anmeldelse </Button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewCreator;