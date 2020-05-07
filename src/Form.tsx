import React, { useState } from 'react';
import { Button, Form, Skeleton } from 'antd';

import { LEVELS_TYPES } from './models';
import {
    schedulePushNotification,
    updateRecord,
    requestToSendPush,
} from './utils';
import { useLevels } from './hooks/useLevels';
import { useUser } from './hooks/useUser';
import { SelectLevel } from './SelectLevel';
import { SelectTask } from './SelectTask';

export function FormComponent() {
    const [level, setLevel] = useState(LEVELS_TYPES.Peace);
    const [task, setTask] = useState('');
    const [loading, setLoading] = useState(false);
    const { token } = useUser();
    const { revalidate } = useLevels();

    return (
        <Form style={{ marginLeft: 20 }}>
            <Skeleton loading={loading}>
                <Form.Item label="Select level">
                    <SelectLevel level={level} setLevel={setLevel} />
                </Form.Item>
                <Form.Item label="What are you doing now?">
                    <SelectTask task={task} setTask={setTask} />
                </Form.Item>
            </Skeleton>
            <Form.Item>
                <Button
                    onClick={async () => {
                        setLoading(true);
                        await updateRecord({
                            level,
                            task,
                            token,
                            url: '/api/add',
                        });
                        revalidate();
                        schedulePushNotification();
                        setLoading(false);
                        await requestToSendPush(token);
                    }}
                    type="primary"
                >
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
}
