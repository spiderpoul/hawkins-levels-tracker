import React from 'react';
import { Select } from 'antd';
import { LEVELS_TYPES } from './models';

export const SelectLevel = ({ level, setLevel }) => {
    return (
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
    );
};
