import {useEffect, useState} from "react";
import {useLogto} from "@logto/react";

export const useUserData = () => {
    const { getAccessTokenClaims } = useLogto();
    const [userScopes, setUserScopes] = useState<string[]>([]);
    const [userId, setUserId] = useState<string>();

    useEffect(() => {
        const fetchScopes = async () => {

            const token = await getAccessTokenClaims(import.meta.env.VITE_LOGTO_RESOURCES);
            setUserScopes(token?.scope?.split(" ") ?? []);
            setUserId(token?.sub);
        };

        fetchScopes();
    }, [getAccessTokenClaims]);

    return { userId, userScopes };
};