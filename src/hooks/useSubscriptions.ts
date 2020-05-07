import { useState, useEffect, useCallback } from 'react';
import {
    isUserSubscribed,
    subscribePush,
    unsubscribePush,
} from '../subscribePush';

export const useSubscriptions = (token) => {
    const [isSubscribed, setIsSubscribed] = useState(false);

    useEffect(() => {
        async function func() {
            const res = await isUserSubscribed();
            setIsSubscribed(res);
        }

        func();
    }, []);

    const subscribe = useCallback(async () => {
        isSubscribed
            ? await unsubscribePush(token)
            : await subscribePush(token);
        setIsSubscribed(!isSubscribed);
    }, [isSubscribed, token]);

    return { isSubscribed, subscribe };
};
