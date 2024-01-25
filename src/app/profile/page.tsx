import {isAuthenticated}  from '@/Utils/Auth';
import { redirect } from 'next/navigation';

const Profile = () => {
    console.log(isAuthenticated())

    if (!isAuthenticated()) {
        console.log("Passou aqui!")
        redirect("/login")
    }

    return (
        <main className="text-center h-screen flex justify-center items-center">
            <div>
                <h1>Profile</h1>
            </div>
        </main>
    );
};


export default Profile;