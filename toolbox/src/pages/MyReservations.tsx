import { useEffect, useState } from "react";
import ProfileSidebar from "../components/ProfileBar";
import ReservationAd from "../components/ReservationAd";
import Title from "../components/Title";
import { useAuth } from "../context/AuthContext";
import { getUserReservation } from "../lib/controller";
import { Reservation } from "../types/types";


export default function MyReservations() {

    const [myReservations, setReservations] = useState<Reservation[]>([]);
    const { currentUser } = useAuth();

    async function getMyReservations() {
        if (currentUser?.id != null) {
            const adsFromDatabase = await getUserReservation(currentUser?.id);
            setReservations(adsFromDatabase);
        }
    }

    useEffect(() => {
        getMyReservations();
    }, []);


    return (
        <div className='flex w-screen h-auto text-current flex-wrap flex-row gap-20 bg-slate-100 dark:bg-dark-graa'>
            <div className="flex flex-col">
                <ProfileSidebar />
            </div>
            <div className="pt-60 text-left flex flex-col gap-10 pb-10">
                <div>
                    <Title heading="Mine " span="reservasjoner" size="text-7xl" />
                </div>
                <section className='flex flex-col h-auto'>
                    <div className='flex m-auto w-full max-w-7xl p-10 text-current flex-wrap flex-row justify-center'>
                        {myReservations?.map((reservation) => (
                            <ReservationAd key={reservation.id} reservation={reservation} />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
}