import { toast } from "react-toastify";
import { Input } from "./Types";
import { NavigateFunction } from "react-router";

export const submitForm  = async (info: Input, navigate: NavigateFunction) : Promise<void> => {
    const response : Response = await fetch('http://localhost:3001/api/v1/users/addUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', 
        },
        body: JSON.stringify(info),
    })
    
    !response.ok? toast.error( await response.text() ,{position: 'top-right'}) : navigate('/')

}

    