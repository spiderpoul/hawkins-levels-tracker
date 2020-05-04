import moment from "moment";

export const prepareData = (data) =>
    data &&
    data.map((item) => ({
        date: moment(item.ts / 1000).format('HH:mm ddd'),
        value: item.data.value,
        task: item.data.task,
    }));
