import { Button } from '@mui/material/';
import { DocumentData, onSnapshot, QuerySnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdComponent from '../components/Ad';
import Title from '../components/Title';
import { adsCollection } from '../lib/controller';
import { Ad } from '../types/types';
import SEARCH from '../img/search.png';
import TOOLS from '../img/tools.png';
import VALUE from '../img/value.png';
import AGREEMENT from '../img/agreement.png';
import SALES from '../img/sales.png';
import CHOOSE from '../img/choose.png';
import CLOCK from '../img/clock.png';
import WhiteDots from '../img/square-dots-white.svg';
import Dots from '../img/square-dots.svg';
import Category from '../components/Category';
import UserStep from '../components/UserStep';
import TitledIcon from '../components/TitledIcon';
import { useSelector } from "react-redux";
import { Searchfield } from '../components/TextField';
import { landingData } from '../Data';

const LandingPage = () => {
    let navigate = useNavigate();
    const [ads, setAds] = useState<Ad[]>([]);
    const threeAds = ads.slice(0, 3);

    useEffect(
        () =>
            onSnapshot(adsCollection, (snapshot: QuerySnapshot<DocumentData>) => {
                setAds(
                    snapshot.docs.map((doc) => {
                        return {
                            id: doc.id,
                            ...doc.data(),
                        };
                    })
                );
            }),
        []
    );

    //---------------Custom MUI textfield----------------
    const MuiMode = useSelector((state: any) =>
        state.darkMode.active
    );

    return (
        <div>
            <div id="c_section" className='relative flex h-screen content-center gap-10 bg-slate-100 dark:bg-dark-graa overflow-hidden'>
                <div id="c_container" className='static flex flex-row m-auto w-full max-w-7xl p-10'>
                    <div id="c_wrapper" className='max-w-3xl text-left mt-64 mb-32 z-10 flex-row'>
                        <img src={MuiMode ? WhiteDots : Dots} alt="decorative circles" className=' w-14 h-14 mb-2' />
                        <Title
                            size="text-7xl"
                            heading='Verktøyene du'
                            span='trenger'
                            mid=','
                            span2='når'
                            tail=' du trenger dem.'
                            description='Hos oss får du enkelt tilgang på verktøyet du trenger, når du trenger det. Lei verktøyet du ønsker, så lenge du trenger det, kun ved et par tastetrykk.'
                        />

                        <div className="flex place-content-between justify-between gap-5 my-5 w-11/12">
                            <Searchfield Label='Søk' Type='text' />
                            <Button sx={{ px: 5 }} variant='contained' onClick={() => navigate("/ads")}>Søk</Button>
                        </div>
                        <div className='mt-16 flex w-3/4 justify-end'>
                            <img src={MuiMode ? WhiteDots : Dots} alt="decorative circles" className='w-20 h-20' />
                        </div>
                    </div>
                </div>

                <div className='bg-cover bg-center absolute top-0 right-0 w-4/12 h-full'
                    style={{
                        backgroundImage: `url("https://images.unsplash.com/photo-1631630259742-c0f0b17c6c10?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80")`
                    }}
                >
                </div>

                <div className='absolute right-0 bottom-0 w-1/2 h-28 bg-pu-gray'></div>

                <div id="c_section" className='absolute bottom-0 right-0 flex h-auto w-full content-center bg-pu-gul'>
                    <div id="c_container" className='flex flex-col m-auto w-full max-w-7xl p-5'>
                        <div className='flex flex-row w-full gap-20 align-middle pl-5'>
                            <TitledIcon icon={CHOOSE} iconSize='h-11' text='Enkelt' textSize='text-lg' />
                            <TitledIcon icon={CLOCK} iconSize='h-11' text='Effektivt' textSize='text-lg' />
                            <TitledIcon icon={SALES} iconSize='h-11' text='Bærekraftig' textSize='text-lg' />
                        </div>
                    </div>
                </div>
            </div>
            <div id="c_section" className='flex h-auto content-center dark:bg-dark-graa'>
                <div id="c_container" className='flex flex-col m-auto w-full max-w-7xl p-10 dark:bg-dark-graa'>
                    <div id="c_wrapper" className='max-w-3xl text-left z-10 dark:bg-dark-graa'>
                        <Title size='text-5xl' heading='Inspirasjon' description='La deg inspirere av noen av våre mange annonser. Våre brukere låner ut produkter innen en rekke kategorier som: ' />

                        <div className='flex flex-row flex-wrap gap-1 mb-3'>
                            <Category name={'Håndverktøy'} />
                            <Category name={'Hage'} />
                            <Category name={'Henger'} />
                            <Category name={'Elektronikk'} />
                            <Category name={'Bil & Motorsykkel'} />
                            <Category name={'Sykkel'} />
                            <Category name={'Stige'} />
                            <Category name={'Maskineri'} />
                            <Category name={'Rør'} />
                            <Category name={'Arbeidskraft'} />
                            <Category name={'Mystery Box'} />
                        </div>
                    </div>

                    <div className='flex flex-row w-full h-auto gap-2 '>
                        {threeAds?.map((ad) => (
                            <AdComponent key={ad.id} ad={ad} />
                        ))}
                    </div>

                </div>
            </div>

            <div id="c_section" className='relative flex h-auto content-center bg-pu-gray text-white overflow-hidden'>
                <div id="c_container" className='flex flex-row mr-auto ml-auto mt-auto mb-auto w-full max-w-7xl p-10'>
                    <div id="l_side" className='w-full relative'>
                        <Title size='text-5xl' heading='Steg-for-steg' description='Hvordan funker det?' />

                        <div className='h-auto flex flex-row w-1/2 text-left gap-1 flex-wrap'>
                            <UserStep icon={SEARCH} span={'01: '} description={landingData.userStep[0]} />
                            <UserStep icon={TOOLS} span={'02: '} description={landingData.userStep[1]} />
                            <UserStep icon={AGREEMENT} span={'03: '} description={landingData.userStep[2]} />
                            <UserStep icon={VALUE} span={'04: '} description={landingData.userStep[3]} />
                        </div>
                    </div>
                </div>
                <div className='absolute top-0 right-0 z-0 w-1/2 h-full bg-pu-gul'></div>
            </div>

            <div id="c_section" className='flex h-auto content-center bg-black text-white overflow-hidden'>
                <div id="c_container" className='flex flex-row mr-auto ml-auto mt-auto mb-auto w-full max-w-7xl p-10'>
                    <div id="c_wrapper" className='max-w-3xl text-left z-10 flex-row'>
                        <Title size='text-5xl' heading={landingData.why.title} description={landingData.why.desc} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandingPage;