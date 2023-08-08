import Filter from '../components/Filter';
import { Button } from '@mui/material';
import { Ad } from '../types/types';
import { useState, useEffect } from 'react';
import AdComponent from '../components/Ad';
import { AdsQuery } from '../lib/controller';
import { useSelector } from "react-redux";
import { selectAdFilters } from "../store/AdFiltersReducer";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


const Ads = () => {
    const [ads, setAds] = useState<Ad[]>([]);
    const AdFilters = useSelector(selectAdFilters);
    let navigate = useNavigate();
    const { currentUser } = useAuth();


    // query backend for ads with filters
    useEffect(() => {
        AdsQuery(
            AdFilters.search,
            AdFilters.category,
            AdFilters.minPrice,
            AdFilters.maxPrice,
            AdFilters.zipCode
        ).then((ads) => {
            setAds(ads);
        });
    }, [AdFilters]);

    //--------------- MUI themecontrol for button text----------------
    const MuiMode = useSelector((state: any) =>
        state.darkMode.active
    );

    let StandardColor = MuiMode ? 'white' : 'black';


    return (
        <div className='w-screen flex flex-col bg-slate-100 dark:bg-dark-graa pt-40'>
            <div className='flex flex-row w-full lg:mx-10 xl:mx-20'>
                <div className='pt-24 hidden w-1/5 lg:block '>
                    {currentUser ? (
                        <div className='flex flex-row ml-8 w-full p-4'>
                            <Button sx={{ p: 2 }} color="info" variant="contained" onClick={() => navigate("/adcreator")}>Opprett annonse</Button>
                        </div>
                    ) : (
                        <div className='flex flex-row ml-8 w-full p-4'>

                            <Button disabled={true} sx={{ p: 2 }} color="info" variant="contained" onClick={() => navigate("/adcreator")}>Opprett annonse</Button>
                        </div>
                    )}
                    <Filter />
                </div>

                <section className='flex flex-col h-auto w-3/5'>
                    <div className='flex m-2 max-w-7xl pt-10 text-current flex-wrap flex-row justify-left'>
                        {ads?.map((ad) => (
                            <AdComponent key={ad.id} ad={ad} />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Ads;

