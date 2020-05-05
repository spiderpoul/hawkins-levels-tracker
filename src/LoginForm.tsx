import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, notification } from 'antd';
import { writeStorage } from '@rehooks/local-storage';
import Axios from 'axios';
import styled from '@emotion/styled';
import { mutate } from 'swr';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const CreateAcc = styled.span`
    color: blue;
    cursor: hover;
`;

export const LoginForm = () => {
    const [isNeedToSignUp, setIsNeedToSignUp] = useState(false);
    const [form] = Form.useForm();

    const onFinish: any = async ({ login, password }) => {
        let res;
        try {
            if (!isNeedToSignUp) {
                res = await Axios.post('/api/login', { login, password });
            } else {
                res = await Axios.post('/api/createUser', {
                    login,
                    password,
                });
            }

            mutate('userId', res.data?.userId);

            writeStorage('auth_hawkins_app', { login, password });
        } catch (e) {
            notification.error({
                message: 'Authorization failed',
                description:
                    res?.data?.error ||
                    'Please try to use another login/password or register',
            });
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            {...layout}
            name="basic"
            form={form}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            style={{ maxWidth: 400 }}
        >
            <Form.Item
                label="Username"
                name="login"
                rules={[
                    { required: true, message: 'Please input your username!' },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                    { required: true, message: 'Please input your password!' },
                ]}
            >
                <Input.Password />
            </Form.Item>

            {isNeedToSignUp && (
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                                if (
                                    !value ||
                                    getFieldValue('password') === value
                                ) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    'The two passwords that you entered do not match!'
                                );
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>
            )}

            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: '100%', marginBottom: 10 }}
                >
                    {isNeedToSignUp ? 'Create new user' : 'Login'}
                </Button>
                Or{' '}
                <CreateAcc
                    onClick={() => {
                        setIsNeedToSignUp(true);
                        form.resetFields();
                    }}
                >
                    register now!
                </CreateAcc>
            </Form.Item>
        </Form>
    );
};
