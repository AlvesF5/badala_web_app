'use client';

import { toast } from "react-hot-toast";

function Account(){
    return (
        <div className="text-center h-screen flex justify-center items-center">
            <div>
                <h1>Account</h1>
                
            </div>
            {toast.success('You did it!')}
        </div>
    );
};


export default Account;