import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserDocument from "../../../../types/user.type";
import { Dispatch, SetStateAction } from "react";


export const setUserProfile =(
    userProfile: UserDocument,
     user: UserDocument,
      setRole: Dispatch<SetStateAction<string>>,
       setIsMyOwnProfile: Dispatch<SetStateAction<boolean>>,
        setIsFollow: Dispatch<SetStateAction<boolean>>)
        :void => {
            
        userProfile.role === 'user' ? setRole("user") : setRole("manager");
        user._id === userProfile._id ? setIsMyOwnProfile(true) : setIsMyOwnProfile(false);
        user?.followers?.includes(userProfile._id) ? setIsFollow(true) : setIsFollow(false);
    }
export const sucssesUpdateFollowActions = async (
    setIsFollow: Dispatch<SetStateAction<boolean>>,
    isFollow: boolean,
    setUser: Dispatch<SetStateAction<UserDocument>>,
    data: Response)
    : Promise<void> => {

    setIsFollow(!isFollow);
    setUser(await data.json());
}