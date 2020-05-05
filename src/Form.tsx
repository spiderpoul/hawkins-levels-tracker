import React, { useState } from 'react';
import { AutoComplete, Select, Button, Form } from 'antd';
import Axios from 'axios';
import useSWR from 'swr';
import moment from 'moment';

import { LEVELS_TYPES } from './models';
import { LEVELS_VALUES } from './constants';
import { getQueryByDate, schedulePushNotification } from './utils';

export function FormComponent() {
    const [level, setLevel] = useState(LEVELS_TYPES.Peace);
    const [task, setTask] = useState('');
    const { data: userId } = useSWR('userId');
    const { revalidate } = useSWR(getQueryByDate(undefined, userId), Axios.get);

    return (
        <Form style={{ marginLeft: 20 }}>
            <Form.Item label="Select level">
                <Select
                    value={LEVELS_TYPES[level]}
                    onSelect={(v) => setLevel(v)}
                    style={{ width: 200 }}
                >
                    {Object.keys(LEVELS_TYPES).map((key) => (
                        <Select.Option value={key} key={key}>
                            {LEVELS_TYPES[key]}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item label="What are you doing now?">
                <AutoComplete
                    value={task}
                    onChange={(v) => setTask(v)}
                    style={{ width: 200 }}
                    options={[
                        { value: 'work' },
                        { value: 'eating' },
                        { value: 'walking' },
                        { value: 'resting' },
                        { value: 'watching tv' },
                        { value: 'reading' },
                    ]}
                    placeholder="What are you doing now?"
                />
            </Form.Item>
            <Form.Item>
                <Button
                    onClick={async () => {
                        await Axios.post('/api/add', {
                            value: LEVELS_VALUES[level],
                            task,
                            date: moment().format('YYYY-MM-DD'),
                            time: moment().format(),
                            userId,
                        });
                        revalidate();
                        schedulePushNotification();
                    }}
                    type="primary"
                >
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
}
