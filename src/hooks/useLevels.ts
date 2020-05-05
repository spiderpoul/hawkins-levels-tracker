import Axios from 'axios';
import useSWR from 'swr';
import { useUser } from './useUser';
import { getQueryByDate } from '../utils';
import { Moment } from 'moment';

export const useLevels = () => {
    const { token } = useUser();
    const { data: date } = useSWR('date');
    const { data, isValidating, revalidate } = useSWR(
        token ? getQueryByDate(date as Moment) : null,
        (url) => Axios.post(url, { token }).then((res) => res.data)
    );

    return { data, isLoading: isValidating, revalidate };
};
