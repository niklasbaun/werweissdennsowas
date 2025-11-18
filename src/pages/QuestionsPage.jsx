import React from 'react';
import {  signOut } from "firebase/auth";
import {auth} from '../hooks/firebaseConfig';
import { useNavigate } from 'react-router-dom';

const QuestionsPage = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            navigate("/");
            console.log("Signed out successfully")
        }).catch((error) => {
            console.log(error);
        });
    }

    return(
        <>
            <nav>
                <p>
                    Welcome Home
                </p>

                <div>
                    <button onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </nav>
        </>
    )
}

export default QuestionsPage;