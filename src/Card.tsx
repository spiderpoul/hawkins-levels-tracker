import React, { useState, useEffect } from 'react';
import { Card, Space, Popconfirm } from 'antd';
import {
    EditOutlined,
    DeleteOutlined,
    CheckOutlined,
    CloseOutlined,
} from '@ant-design/icons';
import { LEVELS_VALUES } from './constants';
import { SelectLevel } from './SelectLevel';
import { SelectTask } from './SelectTask';
import { useUser } from './hooks/useUser';
import Axios from 'axios';
import { LEVELS_TYPES } from './models';
import { useLevels } from './hooks/useLevels';

export const getType: any = (v) =>
    Object.keys(LEVELS_VALUES).find((x) => LEVELS_VALUES[x] === v);

export const CardItem = ({ item }) => {
    const { token } = useUser();
    const [isEditMode, setIsEditMode] = useState(false);
    const [level, setLevel] = useState(LEVELS_TYPES.Acceptance);
    const [task, setTask] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { revalidate } = useLevels();

    useEffect(() => {
        setLevel(getType(item.value));
        setTask(item.task);
    }, [item.task, item.value]);

    return (
        <Card
            style={{ marginBottom: 16 }}
            size="default"
            hoverable
            loading={isLoading}
            actions={[
                <CheckOutlined
                    style={{ display: isEditMode ? 'block' : 'none' }}
                    onClick={async () => {
                        setIsLoading(true);
                        await Axios.post('/api/update', {
                            level: {
                                value: LEVELS_VALUES[level as any],
                                task,
                            },
                            id: item.id,
                            token,
                        });
                        revalidate();
                        setIsEditMode(false);
                        setIsLoading(false);
                    }}
                />,
                !isEditMode ? (
                    <EditOutlined
                        onClick={() => setIsEditMode(true)}
                        key="edit"
                    />
                ) : (
                    <CloseOutlined onClick={() => setIsEditMode(false)} />
                ),
                <Popconfirm
                    title="Are you sure delete this item?"
                    onConfirm={async () => {
                        setIsLoading(true);
                        await Axios.post('/api/delete', {
                            id: item.id,
                            token,
                        });
                        revalidate();
                        setIsLoading(false);
                    }}
                    okText="Yes"
                    cancelText="No"
                >
                    <DeleteOutlined />
                </Popconfirm>,
            ]}
        >
            <Card.Meta
                title={item?.date}
                description={!isEditMode && getType(item?.value)}
            />
            {!isEditMode ? (
                <>{item?.task}</>
            ) : (
                <Space style={{ marginTop: 16 }}>
                    <SelectLevel level={level} setLevel={setLevel} />
                    <SelectTask setTask={setTask} task={task} />
                </Space>
            )}
        </Card>
    );
};
