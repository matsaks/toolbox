import Title from "../components/Title";
import EditUser from "../components/EditUser";
import ProfileSidebar from "../components/ProfileBar";

const ProfilePage = () => {

    return (
        <div className='flex w-screen h-auto text-current flex-wrap flex-row gap-20 bg-slate-100 dark:bg-dark-graa overscroll-x-none'>
            <div className="flex flex-col">
                <ProfileSidebar />
            </div>
            <div className="w-2/3 pt-60 px-36 text-left flex flex-col gap-10 pb-10 ">
                <div>
                    <Title heading="Min " span="profil" size="text-7xl" />
                </div>
                <div className="flex flex-row w-full">
                    <EditUser />
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;