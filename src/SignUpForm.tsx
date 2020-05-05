import React from 'react';
import { Form, Input, Button, Checkbox, Tooltip, notification } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import Axios from 'axios';
import { writeStorage } from '@rehooks/local-storage';

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
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

export const SignUpForm = ({ back }) => {
    const [form] = Form.useForm();

    const onFinish: any = async ({ login, password, name, email }) => {
        let res;
        try {
            res = await Axios.post('/api/createUser', {
                login,
                password,
                name,
                email,
            });

            writeStorage('auth_hawkins_app', res.data?.token);
            notification.success({
                message: 'Account created successfully',
                description: 'Welcome to our app!',
            });
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

    return (
        <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            scrollToFirstError
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
                name="email"
                label="E-mail"
                rules={[
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="password"
                label="Password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
                hasFeedback
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={['password']}
                hasFeedback
                rules={[
                    {
                        required: true,
                        message: 'Please confirm your password!',
                    },
                    ({ getFieldValue }) => ({
                        validator(rule, value) {
                            if (!value || getFieldValue('password') === value) {
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

            <Form.Item
                name="name"
                label={
                    <span>
                        Name&nbsp;
                        <Tooltip title="What do you want others to call you?">
                            <QuestionCircleOutlined />
                        </Tooltip>
                    </span>
                }
                rules={[
                    {
                        required: true,
                        message: 'Please input your nickname!',
                        whitespace: true,
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[
                    {
                        validator: (_, value) =>
                            value
                                ? Promise.resolve()
                                : Promise.reject('Should accept agreement'),
                    },
                ]}
                {...tailFormItemLayout}
            >
                <Checkbox>
                    I have read the agreement about storing personal data -
                    we're use data only for authentication.
                </Checkbox>
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    Register
                </Button>
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
                <Button
                    type="default"
                    onClick={(e) => {
                        e.preventDefault();
                        back();
                    }}
                >
                    Back to sign in form
                </Button>
            </Form.Item>
        </Form>
    );
};
