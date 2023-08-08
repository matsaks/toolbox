import { MenuItem, Select, Button, FormControl, InputLabel } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { getAd, updateAd, uploadImages } from "../lib/controller";
import { UpdateAd } from "../types/types";
import Title from "../components/Title";
import Step from "../components/Step";
import { validateAddress, validateCity, validatePrice, validateTitle, validateZip } from "../lib/validation";
import { useNavigate } from "react-router-dom";
import { Snack, SnackbarContext } from "../context/Context";
import { useAuth } from "../context/AuthContext";
import { useSelector } from "react-redux";
import TwStyles from "../Data";


const EditAd = () => {
    const navigate = useNavigate();

    const [ad, setAd] = useState<UpdateAd | null>(null);
    const [description, setDescription] = useState("");
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [address, setAddress] = useState("");
    const [zip, setZip] = useState("");
    const [city, setCity] = useState("");
    const [pictures, setPictures] = useState<string[]>([]);
    const [images, setImages] = useState<FileList | null>(null);

    const { setSnack } = useContext(SnackbarContext);
    const { currentUser } = useAuth();


    useEffect(() => {
        async function fetchData() {
            const adIDFromSessionStorage = sessionStorage.getItem("ADID");
            if (adIDFromSessionStorage != null) {
                const adFromDatabase = await getAdFromDatabase(adIDFromSessionStorage);
                if (adFromDatabase !== undefined) {
                    setAd(adFromDatabase);
                    setDescription(adFromDatabase.description);
                    setTitle(adFromDatabase.title);
                    setCategory(adFromDatabase.category);
                    setPrice(adFromDatabase.price.toString());
                    setAddress(adFromDatabase.address);
                    setZip(adFromDatabase.zip.toString());
                    setCity(adFromDatabase.city);
                    setPictures(adFromDatabase.pictures);
                }
            }
        }

        fetchData();
    }, []);

    async function getAdFromDatabase(adID: string): Promise<UpdateAd | undefined> {
        const doc = await getAd(adID)
        if (doc === undefined || doc === null) return undefined;
        const adFromDatabase = { id: doc.id, ...doc.data() } as UpdateAd;
        return adFromDatabase;
    }

    function updateAdToDatabase(props: UpdateAd) {
        const adID = sessionStorage.getItem("ADID")
        if (currentUser?.id !== null && adID != null) {
            const ad = {
                id: adID,
                userid: currentUser?.id,
                title: props.title,
                description: props.description,
                category: props.category,
                price: props.price,
                address: props.address,
                zip: props.zip,
                city: props.city,
                pictures: props.pictures,
            } as UpdateAd;


            if (ad.pictures.length > 0) {
                for (let i = 0; i < ad.pictures.length; i++) {
                    if (ad.pictures[i] === 'http://www.sitech.co.id/assets/img/products/default.jpg') {
                        ad.pictures.splice(i, 1); // remove default image if other images are provided
                    }
                }
            }

            if (ad.pictures.length === 0) {
                ad.pictures = ['http://www.sitech.co.id/assets/img/products/default.jpg']; // default image if none is provided
            }

            updateAd(adID, ad);
            setSnack(new Snack({ message: 'Annonse er oppdatert!', color: 'success', autoHideDuration: 5000, open: true }));

            navigate(`/adinspector/${ad.id}`); // redirect back to same ad
            setSnack(new Snack({ message: 'Annonse er oppdatert!', color: 'success', autoHideDuration: 5000, open: true }));
        }
    }


    const handleOnClick = async () => {
        // check if all fields are filled
        if (title === "" || description === "" || category === "" || price === "" || address === "" || zip === "" || city === "") {
            setSnack(new Snack({ message: 'Alle felt må fylles ut!', color: 'warning', autoHideDuration: 5000, open: true }));
            return;
        }
        if (!validateTitle(title)) {
            setSnack(new Snack({ message: 'Ikke en gyldig tittel!', color: 'warning', autoHideDuration: 5000, open: true }));
            return;
        }

        if (!validateAddress(address)) {
            setSnack(new Snack({ message: 'Ikke en gyldig adresse!', color: 'warning', autoHideDuration: 5000, open: true }));
            return;
        }
        if (!validateZip(zip)) {
            setSnack(new Snack({ message: 'Ikke et gyldig postnummer!', color: 'warning', autoHideDuration: 5000, open: true }));
            return;
        }
        if (!validateCity(city)) {
            setSnack(new Snack({ message: 'Ikke gyldig navn på by!', color: 'warning', autoHideDuration: 5000, open: true }));
            return;
        }
        if (!validatePrice(price)) {
            setSnack(new Snack({ message: 'Pris kan ikke være tom!', color: 'warning', autoHideDuration: 5000, open: true }));
            return;
        }
        await uploadImagesToBackend(images);
    }

    async function uploadImagesToBackend(images: FileList | null) {
        if (images !== null) {
            const imageUrls2 = await uploadImages(images);

            // Add existing images to ad
            if (pictures !== null) {
                if (pictures.length > 0) {
                    imageUrls2.push(...pictures);
                }
            }

            const adToDatabase = {
                title: title,
                description: description,
                category: category,
                price: parseInt(price),
                address: address,
                zip: parseInt(zip),
                city: city,
                pictures: imageUrls2
            } as UpdateAd;
            updateAdToDatabase(adToDatabase);
        } else {
            const adToDatabase = {
                title: title,
                description: description,
                category: category,
                price: parseInt(price),
                address: address,
                zip: parseInt(zip),
                city: city,
                pictures: ad?.pictures
            } as UpdateAd;
            updateAdToDatabase(adToDatabase);
        }
    }

    const MuiMode = useSelector((state: any) =>
        state.darkMode.active
    );

    let StandardColor = MuiMode ? 'white' : 'black';

    return (
        <div>
            <div id="c_section" className='flex w-full h-full content-center bg-slate-100 dark:bg-dark-graa overflow-hidden z-10'>
                <div id="c_container" className='static flex flex-row mr-auto ml-auto mt-auto mb-auto w-full max-w-7xl p-10 gap-10 justify-center bg-slate-100 dark:bg-dark-graa'>
                    <div className='flex flex-col w-10/12 text-left pt-32 mb-10'>

                        <Title size={'text-7xl'} heading={'Rediger '} span={'annonse'} description={'Start utlån allerede i dag! Følg stegene, så er annonsen din oppe og går i løpet av kort tid!'} />


                        <div id="CATEGORY" className='flex flex-col my-5 dark:text-dark-white'>
                            <Step nr={'01'} title={'Velg kategori'} />
                            <p> Velg en passende kategori så brukere enkelt kan finne annonsen din. Sjekk gjerne at valgt kategori inneholder lignende produkter.</p>

                            <div className='flex flex-row w-full gap-2 mt-5 my-2'>
                                <FormControl fullWidth sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: StandardColor,
                                        },
                                        '&:hover fieldset': {
                                            borderColor: StandardColor,
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: StandardColor,
                                        },
                                        color: StandardColor,
                                    },
                                }}>
                                    <InputLabel sx={{
                                        color: StandardColor,
                                        '&.Mui-focused': { color: StandardColor },
                                    }}
                                        id="category"
                                    >
                                        Kategori
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={category}
                                        label="Kategori"
                                        onChange={(e) => { setCategory(e.target.value as string) }}
                                        variant="outlined"
                                    >
                                        <MenuItem value="Håndverktøy">Håndverktøy</MenuItem>
                                        <MenuItem value="Hage">Hage</MenuItem>
                                        <MenuItem value="Henger">Henger</MenuItem>
                                        <MenuItem value="Elektronikk">Elektronikk</MenuItem>
                                        <MenuItem value="Bil">Bil og Motorsykkel</MenuItem>
                                        <MenuItem value="Sykkel">Sykkel</MenuItem>
                                        <MenuItem value="Stiger">Stiger</MenuItem>
                                        <MenuItem value="Maskineri">Maskineri</MenuItem>
                                        <MenuItem value="Rør">Rør</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>

                        </div>


                        <div id="TITLE_DESC" className='flex flex-col my-5 dark:text-dark-white'>
                            <Step nr={'02'} title={'Tittel og beskrivelse'} />
                            <p> Velg en kort og beskrivende tittel. Legg til en mer detaljert beskrivelse så bruker kan få mer informasjon om produktet når de trykker på annonsen. </p>

                            <div className='flex flex-col w-full mt-5 gap-2 my-2 '>
                                <input
                                    placeholder="Tittel"
                                    type='text'
                                    value={title}
                                    onChange={(e) => { setTitle(e.target.value) }}
                                    className={TwStyles.TextField}
                                />
                                <textarea
                                    placeholder="Beskrivelse"
                                    value={description}
                                    onChange={(e) => { setDescription(e.target.value) }}
                                    rows={4}
                                    className={TwStyles.TextField + " resize-none h-40"}
                                >
                                </textarea>
                            </div>

                        </div>

                        <div id="IMAGES" className='flex flex-col my-5 dark:text-dark-white'>
                            <Step nr={'03'} title={'Last opp bilder'} />
                            <p>Vis frem produktet så brukere kan se hva du leier ut. Vi anbefaler 3-5 bilder for best resultat. Trykk på boksene eller bruk knappen.</p>
                            <div className='flex flex-col w-full mt-5 gap-2'>
                                <Button
                                    variant="contained"
                                    component="label"
                                    color="primary"
                                    sx={{
                                        p: 2,
                                        ':hover': {
                                            bgcolor: 'black',
                                            color: 'white',
                                        },
                                    }}>Last opp bilder <input
                                        accept="image/"
                                        type="file"
                                        hidden
                                        id="select-image"
                                        multiple
                                        onChange={e => setImages(e.target.files)}
                                    /></Button>
                                {images && images.length > 0 && (
                                    <div>
                                        <p>Selected files:</p>
                                        <ul>
                                            {Array.from(images).map((file, index) => (
                                                <li key={index}>{file.name}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div id="ADDRESS_INFO" className='flex flex-col my-5 dark:text-dark-white'>
                            <Step nr={'04'} title={'Sted og addresse'} />
                            <p> Gi produktet en adresse. Dette vil gjøre annonsen din synlig for brukere i nærheten, og vil gi kjøpere mulighet til å hente produktet hos deg. Merk: adressen din blir kun synlig for andre brukere etter at utlån er avtalt og godkjent av deg.</p>

                            <div className='flex flex-col w-full mt-5 gap-2'>
                                <input
                                    placeholder="Hjemmeadresse"
                                    type='text'
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className={TwStyles.TextField}
                                />
                                <div className='flex flex-row w-full gap-2'>
                                    <input
                                        placeholder="Postnummer"
                                        type='number'
                                        min={0}
                                        value={zip}
                                        onChange={(e) => setZip(e.target.value)}
                                        className={TwStyles.TextField + "w-1/4"}
                                    />
                                    <input
                                        placeholder="By"
                                        type='text'
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        className={TwStyles.TextField}
                                    />
                                </div>
                            </div>
                        </div>

                        <div id="PRICE" className='flex flex-col my-5 dark:text-dark-white'>
                            <Step nr={'05'} title={'Velg pris'} />
                            <p>Vi anbefaler at du sjekker prisen til tilsvarende produkter. En passende pris øker sannsynligheten for utlån.</p>

                            <div className='flex flex-col w-full mt-5 gap-2'>
                                <input
                                    placeholder="Pris"
                                    type='number'
                                    min={0}
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    className={TwStyles.TextField}
                                />
                            </div>
                        </div>

                        <div className='flex flex-col w-full gap-2 my-2'>
                            <Button variant="contained" color="primary" sx={{ p: 2 }} onClick={() => handleOnClick()}> Oppdater annonse </Button>
                            <Button variant="contained" color="primary" sx={{ p: 2, ':hover': { bgcolor: 'black', color: 'white', }, }} onClick={() => navigate(`/adinspector/${sessionStorage.getItem("ADID")}`)}> Avbryt redigering </Button>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default EditAd;