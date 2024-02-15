import { createContext, Dispatch, FC, SetStateAction, useContext, useState } from 'react';
import UserDocument from '../../../types/user.type';


type UserContextProps=  {
  user: UserDocument;
  setUser: Dispatch<SetStateAction<UserDocument>>;
}

const UserContext = createContext<UserContextProps>({} as UserContextProps);

export const useUser = (): UserContextProps => useContext(UserContext);

export const UserProvider: FC<{ children: React.ReactNode }> = ({ children }) => {

    const [user, setUser] = useState<UserDocument>({} as UserDocument);

    const value: UserContextProps = { user, setUser}
    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}