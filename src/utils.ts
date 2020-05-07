import moment, { Moment } from 'moment';
import Axios from 'axios';
import { LEVELS_VALUES } from './constants';

export const prepareData = (data: any[] = []) =>
    data.map((item: any) => ({
        date: moment(item.data.time).format('HH:mm'),
        value: item.data.value,
        task: item.data.task,
    }));

export const getQueryByDate = (date?: Moment) =>
    `/api/db?date=${(date || moment()).format('YYYY-MM-DD')}`;

export const updateRecord = ({ url, token, level, task }) =>
    Axios.post(url, {
        level: {
            value: LEVELS_VALUES[level],
            task,
            date: moment().format('YYYY-MM-DD'),
            time: moment().format(),
        },
        token,
    });

export const getInitials = (name: string) => {
    const names = name.split(' ');
    const initials = names.map((name) => name.charAt(0).toUpperCase());
    if (initials.length > 1) {
        return `${initials[0]}${initials[initials.length - 1]}`;
    } else {
        return initials[0];
    }
};
