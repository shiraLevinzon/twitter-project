import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserDocument from "../../../../types/user.type";
import { Dispatch, SetStateAction } from "react";
import { UseMutationResult } from "@tanstack/react-query";
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from "react-query";

export const setUserProfile = (
    userProfile: UserDocument,
    user: UserDocument,
    setRole: Dispatch<SetStateAction<string>>,
    setIsManager: Dispatch<SetStateAction<boolean>>,
    setIsFollow: Dispatch<SetStateAction<boolean>>,
    )    : void => {

    userProfile.role === 'user' ? setRole("user") : setRole("manager");
    user.role === 'manager' ? setIsManager(true) : setIsManager(false);
    user?.followers?.includes(userProfile._id) ? setIsFollow(true) : setIsFollow(false);
}
export const sucssesUpdateFollowActions = async (
    setIsFollow: Dispatch<SetStateAction<boolean>>,
    isFollow: boolean,
    setUser: Dispatch<SetStateAction<UserDocument>>,
    data: UserDocument)
    : Promise<void> => {

    setIsFollow(!isFollow);
    setUser(data);
}


