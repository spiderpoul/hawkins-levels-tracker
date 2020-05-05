import React, { useState } from 'react';
import { Button, Form } from 'antd';

import { LEVELS_TYPES } from './models';
import { schedulePushNotification, updateRecord } from './utils';
import { useLevels } from './hooks/useLevels';
import { useUser } from './hooks/useUser';
import { SelectLevel } from './SelectLevel';
import { SelectTask } from './SelectTask';

export function FormComponent() {
    const [level, setLevel] = useState(LEVELS_TYPES.Peace);
    const [task, setTask] = useState('');
    const { token } = useUser();
    const { revalidate } = useLevels();

    return (
        <Form style={{ marginLeft: 20 }}>
            <Form.Item label="Select level">
                <SelectLevel level={level} setLevel={setLevel} />
            </Form.Item>
            <Form.Item label="What are you doing now?">
                <SelectTask task={task} setTask={setTask} />
            </Form.Item>
            <Form.Item>
                <Button
                    onClick={async () => {
                        await updateRecord({
                            level,
                            task,
                            token,
                            url: '/api/add',
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
