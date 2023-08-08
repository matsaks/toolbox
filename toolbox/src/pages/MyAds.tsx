import { Ad } from "../types/types";
import { useEffect, useState } from "react";
import AdFB from "../components/Ad";
import { getUserAds } from "../lib/controller";
import ProfileSidebar from "../components/ProfileBar";
import Title from "../components/Title";
import { useAuth } from "../context/AuthContext";


const MyAds = () => {

    const [myAds, setAds] = useState<Ad[]>([]);
    const { currentUser } = useAuth();

    async function getMyAds() {
        if (currentUser?.id != null) {
            const adsFromDatabase = await getUserAds(currentUser?.id);
            setAds(adsFromDatabase);
        }
    }

    useEffect(() => {
        getMyAds();
    }, []);

    return (
        <div className='flex w-screen h-auto text-current flex-wrap flex-row gap-20 bg-slate-100 dark:bg-dark-graa'>
            <div className="flex flex-col">
                <ProfileSidebar />
            </div>
            <div className="pt-60 text-left flex flex-col gap-10 pb-10">
                <div>
                    <Title heading="Mine " span="annonser" size="text-7xl" />
                </div>
                <section className='flex flex-col h-auto'>
                    <div className='flex w-full max-w-7xl p-10 text-current flex-wrap flex-row justify-left'>
                        {myAds?.map((myAd) => (
                            <AdFB key={myAd.id} ad={myAd} />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}

export default MyAds;



