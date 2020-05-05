import React from 'react';
import { AutoComplete } from 'antd';

export const SelectTask = ({ task, setTask }) => {
    return (
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
    );
};
