import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserDocument from "../../../../types/user.type";

export const updateFollow = async (route: string): Promise<UserDocument| null> => {
    const token: string | null = localStorage.getItem("token");

    const response: Response | null = await fetch('http://localhost:3001/api/v1/users/' + route,
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }).catch((error: Error) => {
            toast.error(error.message, { position: 'top-right' });
            return null
        })
    if (!response) return null;
    if (response && !response.ok) {
        toast.error(await response.text(), { position: 'top-right' });
        return null
    }

    return await response.json();
};

export const changeRole = async (role: string): Promise<boolean> => {
    const token: string | null = localStorage.getItem("token");

    const response: Response | null = await fetch('http://localhost:3001/api/v1/users/updateRole/' + role,
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }).catch((error: Error) => {
            toast.error(error.message, { position: 'top-right' });
            return null
        })
    if (!response) return false;
    if (response && !response.ok) {
        toast.error(await response.text(), { position: 'top-right' });
        return false
    }

    return true;

};