import React, { ChangeEvent, Dispatch } from "react";
import TweetDocument, { TweetPopulated } from "../../../../types/tweet.type";
import UserDocument from "../../../../types/user.type";
import TweetItem from "../../components/TweetItem/Index";
import { includes } from 'lodash/fp'
import { Query } from "./Types";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";


export const renderTweet = (tweet: TweetDocument) => (

     <TweetItem key={tweet.id} tweet={tweet} />
);

export const margeFilter = (tw: TweetPopulated, user: UserDocument): boolean => {
     return Array.isArray(tw.tweetOwner) && tw.tweetOwner.length > 0 &&
     includes(tw.tweetOwner[0]._id)(user.followers);
}



export const filterOptionChange = async (
     setQuery: Dispatch<React.SetStateAction<Query>>,
     event: ChangeEvent<HTMLInputElement>,
     query: Query,
     refetch: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<TweetPopulated[], Error>>
     
     ): Promise<void> => {

     const sortOptions: Record<string, { sortOption: string, isFilterRequire: boolean }> = {
         newFollowing: { sortOption: "date", isFilterRequire: true },
         popularFollowing: { sortOption: "likes", isFilterRequire: true },
         date: { sortOption: "date", isFilterRequire: false },
         likes: { sortOption: "likes", isFilterRequire: false },
         all: { sortOption: "all", isFilterRequire: false }
     };

     await setQuery({ ...sortOptions[event.target.value], search: query.search });
     await refetch();
 };

 export const filterSearchChange = async (
     setQuery: Dispatch<React.SetStateAction<Query>>,
     event: ChangeEvent<HTMLInputElement>,
     query: Query,
     refetch: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<TweetPopulated[], Error>>
     
 ): Promise<void> => {
     setQuery({ sortOption: query.sortOption, search: event.target.value, isFilterRequire: false });
     await refetch();
 };
