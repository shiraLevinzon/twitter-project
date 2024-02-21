import UserDocument from "../../../../types/user.type";
import { NavigateFunction } from "react-router";
import "react-toastify/dist/ReactToastify.css";

export const sucssesFetchActions = async (
    data: Response,
     setUser: React.Dispatch<React.SetStateAction<UserDocument>>,
    navigate: NavigateFunction) => {

    const { user, token }: { user: UserDocument, token: string } = await data.json();
    setUser(user);
    localStorage.setItem("token", token);
    navigate('/home');
}