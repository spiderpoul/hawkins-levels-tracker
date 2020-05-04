import moment, { Moment } from 'moment';

export const prepareData = (data = []) =>
    data.map((item: any) => ({
        date: moment(item.data.time).format('HH:mm'),
        value: item.data.value,
        task: item.data.task,
    }));

export const getQueryByDate = (date?: Moment) =>
    '/api/db?date=' + (date || moment()).format('YYYY-MM-DD');
