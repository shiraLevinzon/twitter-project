import { createContext, Dispatch, SetStateAction, useContext, useState } from 'react';
import UserDocument from '../../../types/user.type';


export const UserContext = createContext<any>(null);


// type UserContextProps=  {
//   user: UserDocument;
//   setUser: Dispatch<SetStateAction<UserDocument>>;
// }

// export const UserContext = createContext<UserContextProps | null>(null);

// type Props = {
//     children: React.ReactNode;
//   };
  
//   export const UserContextProvider = ({ children }: Props) => {
//     const [user, setUser] = useState();
  
//     return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
//   };
  