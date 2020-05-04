import React, { useEffect, useState } from 'react';
import {
    Layout,
    Menu,
    DatePicker,
    Space,
    Typography,
    Skeleton,
    Avatar,
    Dropdown,
} from 'antd';
import Axios from 'axios';
import useSWR from 'swr';
import moment, { Moment } from 'moment';

import { Chart } from './Chart';
import { prepareData, getQueryByDate } from './utils';
import { FormComponent } from './Form';
import { Cards } from './Cards';

import './App.scss';
import 'antd/dist/antd.css';
import useLocalStorage from '@rehooks/local-storage';
import { LoginForm } from './LoginForm';
import logo from './img/logo.png';
import styled from '@emotion/styled';

const { Header, Content, Footer } = Layout;

const Logo = styled.img`
    width: 54px;
    height: auto;
    float: left;
    margin: 5px 0;
`;

function App() {
    const { data: date, mutate: mutateDate } = useSWR('date', {
        initialData: moment(),
    });
    const { data: userId, mutate: setUserId } = useSWR('userId', {
        initialData: null,
    });
    const { data } = useSWR(getQueryByDate(date as Moment, userId), Axios.get);
    const [auth, setAuth] = useLocalStorage<any>('auth_hawkins_app');
    const [isLogging, setIsLogging] = useState(false);

    useEffect(() => {
        if (auth) {
            setIsLogging(true);
            const { login, password } = auth as any;
            Axios.post('/api/login', { login, password })
                .then((res) => {
                    if (res) {
                        setUserId(res.data?.userId);
                    }
                })
                .catch(() => {})
                .finally(() => {
                    setIsLogging(false);
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Layout className="layout">
            <Header>
                <Logo src={logo} />
                {auth && (
                    <Dropdown
                        overlay={
                            <Menu>
                                <Menu.Item
                                    onClick={() => {
                                        setAuth(null);
                                        setUserId(null);
                                    }}
                                >
                                    Logout
                                </Menu.Item>
                            </Menu>
                        }
                    >
                        <Avatar
                            size={44}
                            style={{ float: 'right', margin: '10px 0' }}
                        >
                            {auth?.login[0]}
                        </Avatar>
                    </Dropdown>
                )}
            </Header>
            <Content>
                <div className="site-layout-content">
                    <Typography.Title level={2}>
                        Hawkins levels tracking app
                    </Typography.Title>
                    {isLogging && <Skeleton active />}
                    {!userId && !isLogging && <LoginForm />}
                    {userId && (
                        <>
                            <FormComponent />
                            <Typography.Title level={3}>
                                Statistics
                            </Typography.Title>
                            <Space style={{ marginLeft: 20, marginBottom: 24 }}>
                                Select date:{' '}
                                <DatePicker
                                    value={date}
                                    onChange={(v) => mutateDate(v as Moment)}
                                />
                            </Space>
                            <div style={{ width: '100%', height: 300 }}>
                                <Chart data={prepareData((data || {}).data)} />
                            </div>
                            <Cards />
                        </>
                    )}
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Pavel Uvarov App</Footer>
        </Layout>
    );
}

export default App;
