import { useEffect, useState } from "react";
import { User } from "../models/user.model";
import { userMe } from "../services/user.service";




export const useUserMe = () => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [reload, setReload] = useState(true);

    useEffect(() => {

        console.log("useUserMe hook executed");
        if (!reload) return;

        try {

            userMe().then((response) => {
                setUser(response.data);
                console.log("User data fetched successfully:", response.data);
            }).catch((err) => {
                setError(err as Error);
            }).finally(() => {
                setIsLoading(false);
            });


        } catch (err) {
            setError(err as Error);
        }

        setReload(false);
    }, [reload]);

    return {
        user,
        isLoading,
        error,
        setReload,
    };
}