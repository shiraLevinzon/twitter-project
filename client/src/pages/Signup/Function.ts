import { toast } from "react-toastify";
import { Input } from "./Types";
import { NavigateFunction } from "react-router";



export const sucssesFetchActions = async (
    navigate: NavigateFunction) => {
        toast.success("User added successfuly", { position: 'top-right' })
    navigate('/');
}