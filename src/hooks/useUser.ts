import useSWR from 'swr';
import useLocalStorage from '@rehooks/local-storage';
import { useCallback } from 'react';
import Axios from 'axios';

export const useUser = () => {
    const [auth, setAuth] = useLocalStorage<any>('auth_hawkins_app');

    const { isValidating, data, mutate } = useSWR(
        auth ? '/api/getUser' : null,
        async (url) => {
            try {
                const res = await Axios.post(url, {
                    token: auth,
                });
                return res.data;
            } catch (e) {
                setAuth(null);
            }
        }
    );

    const clearToken = useCallback(() => {
        setAuth(null);
        mutate(null);
    }, [mutate, setAuth]);

    return {
        isAuthorizing: auth && isValidating,
        token: auth,
        user: data,
        clearToken,
    };
};
