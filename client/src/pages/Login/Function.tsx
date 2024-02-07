import { Input } from "./Types";
import UserDocument from "../../../../types/user.type";
import { NavigateFunction } from "react-router";
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
export const submitForm = async (info: Input, navigate: NavigateFunction): Promise<UserDocument> => {

    const response: Response = await fetch('http://localhost:3001/api/v1/users/addLogin',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(info),
        })

    if(!response.ok) toast.error("Error",{position: 'top-right'});

    const { user, token }: { user: UserDocument, token: string } = await response.json();
    localStorage.setItem("token", token);
    navigate('/home');
    return user;
}