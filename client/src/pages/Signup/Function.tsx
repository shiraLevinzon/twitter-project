import { toast } from "react-toastify";
import { Input } from "./Types";
import { NavigateFunction } from "react-router";

export const submitForm  = async (info: Input, navigate: NavigateFunction) : Promise<void> => {
    const response : Response | null = await fetch('http://localhost:3001/api/v1/users/addUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', 
        },
        body: JSON.stringify(info),
    }).catch(async (error:Error)=>{
        return null;
    })
    !response? toast.error("error" ,{position: 'top-right'}):
    !response.ok? toast.error(await response.text() ,{position: 'top-right'}):
    navigate('/');

}

    