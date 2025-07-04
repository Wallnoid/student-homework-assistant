import { useEffect, useState } from "react";
import { User } from "../models/user.model";
import { userMe } from "../services/user.service";
import { useChatsHomeStore } from "../store/chatsHome.store";
import { useCurrentOrganizationStore } from "../store/currentOrganization.store";
import { useLoadChatsStore } from "../store/loadChat.store";
import { setUserLocal } from "../utils/localStorage.utils";



/**
 * Custom hook to fetch the current user's data.
 * It provides functionality to manage the loading state, error handling, and the fetched user data.
 *
 * @returns {Object} - Contains the user data, loading state, and error state
 * @property {User | null} user - The fetched user data or null if not found
 * @property {boolean} isLoading - Indicates whether the user data is currently being fetched
 * @property {Error | null} error - Indicates whether there was an error fetching the user data
 */
export const useUserMe = () => {

    // State variables to manage user data, loading state, and error state
    // The user state holds the fetched user data or null if not found
    const [user, setUser] = useState<User | null>(null);

    // The isLoading state indicates whether the user data is currently being fetched
    // It is set to true when the fetch operation starts and false when it completes
    const [isLoading, setIsLoading] = useState(true);

    // The error state indicates whether there was an error fetching the user data
    // It is set to an Error object if an error occurs during the fetch operation
    const [error, setError] = useState<Error | null>(null);

    // Using Zustand stores to manage the loading state of user data and the chats displayed on the home page
    // The `useLoadChatsStore` is used to determine if user data should be loaded
    const setChatsHome = useChatsHomeStore((state: any) => state.setChatsHome);

    // The `useCurrentOrganizationStore` is used to manage the current organization of the user
    // It provides a function to set the organization data in the store
    const setOrg = useCurrentOrganizationStore((state: any) => state.setOrg)

    // The `useLoadChatsStore` is used to determine if chats should be loaded
    // It provides a function to set the loading state of chats
    const setLoadChats = useLoadChatsStore((state: any) => state.setLoad)

    // The `load` variable is used to check if the user data should be loaded
    // It is derived from the Zustand store to determine if the user data should be fetched
    const load = useLoadChatsStore((state: any) => state.load);


    // Effect to fetch user data when the component mounts or when `load` changes
    // This effect calls the `userMe` function to fetch the user data from the API
    useEffect(() => {

        console.log("useUserMe hook executed");
        if (!load) return;

        try {

            userMe().then((response) => {
                setUser(response.data);

                setUserLocal(response.data);
                console.log("User data fetched successfully:", response.data);

                setOrg(response.data.organization);


                if (Array.isArray(response.data.sessions) && response.data.sessions.length > 3)
                    setChatsHome(response.data.sessions.slice(-3));
                else
                    setChatsHome(response.data.sessions || []);
            }).catch((err) => {
                setError(err as Error);
            }).finally(() => {
                setIsLoading(false);
            });


        } catch (err) {
            setError(err as Error);
        }

        setLoadChats(false);
    }, [load]);

    return {
        user,
        isLoading,
        error,
    };
}