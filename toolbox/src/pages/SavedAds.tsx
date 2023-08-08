import { Ad } from "../types/types";
import { useEffect, useState } from "react";
import AdFB from "../components/Ad";
import { getSavedAdsFromUser } from "../lib/controller";
import ProfileSidebar from "../components/ProfileBar";
import Title from "../components/Title";
import { useAuth } from "../context/AuthContext";

const SavedAds = () => {

    const [savedAds, setSavedAds] = useState<Ad[]>([]);
    const { currentUser } = useAuth();

    async function getSavedAds() {
        if (currentUser?.id != null) {
            const adsFromDatabase = await getSavedAdsFromUser(currentUser?.id);
            if (adsFromDatabase !== undefined && adsFromDatabase.length > 0) {
                setSavedAds(adsFromDatabase);
            }
        }
    }

    useEffect(() => {
        getSavedAds();
    }, []);

    return (
        <div className='flex w-screen h-auto text-current flex-wrap flex-row gap-20 bg-slate-100 dark:bg-dark-graa'>
            <div className="flex flex-col">
                <ProfileSidebar />
            </div>
            <div className="pt-60 text-left flex flex-col gap-10 pb-10">
                <div>
                    <Title heading="Lagrede " span="annonser" size="text-7xl" />
                </div>
                <section className='flex flex-col h-auto'>
                    <div className='flex w-full max-w-7xl text-current flex-wrap flex-row justify-left'>
                        {savedAds?.map((savedAds) => (
                            <AdFB key={savedAds.id} ad={savedAds} />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}

export default SavedAds;



