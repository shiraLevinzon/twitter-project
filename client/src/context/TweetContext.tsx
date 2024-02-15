import { createContext, Dispatch, FC, SetStateAction, useContext, useState } from 'react';
import UserDocument from '../../../types/user.type';
import  { TweetPopulated } from '../../../types/tweet.type';


type TweetContextProps = {
    tweet: TweetPopulated;
    setTweet: Dispatch<SetStateAction<TweetPopulated>>;
}

const TweetContext = createContext<TweetContextProps>({} as TweetContextProps);

export const useTweet = (): TweetContextProps => useContext(TweetContext);

export const TweetProvider: FC<{ children: React.ReactNode }> = ({ children }) => {

    const [tweet, setTweet] = useState<TweetPopulated>({} as TweetPopulated);

    const value: TweetContextProps = { tweet, setTweet }
    return (
        <TweetContext.Provider value={value}>
            {children}
        </TweetContext.Provider>
    )
}