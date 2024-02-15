import UserDocument from "../../../types/user.type";
import { Input as LoginType } from "../pages/Login/Types";
import { Input as SignupInput } from "../pages/Signup/Types";

export const addUser = async (info: SignupInput): Promise<Response> => {
    console.log(info);

    const res: Response = await fetch('http://localhost:3001/api/v1/users/addUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(info),
    });
    //console.log(await res.json());
    return res;

}

export const addLogin = async (info: LoginType): Promise<Response> => {

    return await fetch('http://localhost:3001/api/v1/users/addLogin',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(info),
        })
}

export const updateFollow = async (userToFollowId: string, isFollow: boolean): Promise<Response> => {

    const route: string = isFollow ? `addUnfollow/${userToFollowId}` : `addFollow/${userToFollowId}`;
    const token: string | null = localStorage.getItem("token");

    return await fetch('http://localhost:3001/api/v1/users/' + route,
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
}

export const changeRole = async (role: string): Promise<Response> => {
    const futureRole: string = role === 'user' ? 'manager' : 'user';
    const token: string | null = localStorage.getItem("token");

    return await fetch('http://localhost:3001/api/v1/users/updateRole/' + futureRole,
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
}