import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, notification } from 'antd';
import { writeStorage } from '@rehooks/local-storage';
import Axios from 'axios';
import { SignUpForm } from './SignUpForm';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

export const LoginForm = () => {
    const [isNeedToSignUp, setIsNeedToSignUp] = useState(false);
    const [form] = Form.useForm();

    const onFinish: any = async ({ login, password }) => {
        let res;
        try {
            res = await Axios.post('/api/login', {
                login,
                password,
            });

            writeStorage('auth_hawkins_app', res.data?.token);
            console.log(res);
        } catch (e) {
            notification.error({
                message: 'Authorization failed',
                description:
                    e?.response?.data?.error ||
                    'Please try to use another login/password or register',
            });
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return isNeedToSignUp ? (
        <SignUpForm back={() => setIsNeedToSignUp(false)} />
    ) : (
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

            <Form.Item
                {...tailFormItemLayout}
                name="remember"
                valuePropName="checked"
            >
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
                <Button style={{ width: 200 }} type="primary" htmlType="submit">
                    Login
                </Button>
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
                <Button
                    type="default"
                    onClick={(e) => {
                        e.preventDefault();
                        setIsNeedToSignUp(true);
                    }}
                >
                    or create a new account
                </Button>
            </Form.Item>
        </Form>
    );
};
