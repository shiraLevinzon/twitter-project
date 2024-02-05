import { SubmitHandler } from "react-hook-form";
import { Input } from "./Types";

export const onSubmit: SubmitHandler<Input> = async (info) => {
    console.log(JSON.stringify(info));
    const response = await fetch('http://localhost:3001/api/v1/users/addUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // Specify the content type
        },
        body: JSON.stringify(info),
    });
    if (!response.ok) {
        console.log('ggggg');
        
    }
    const data =await response.json();
    console.log(data);

}

    