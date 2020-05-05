import React from 'react';
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
import useSWR from 'swr';
import moment, { Moment } from 'moment';

import { Chart } from './Chart';
import { prepareData } from './utils';
import { FormComponent } from './Form';
import { Cards } from './Cards';

import './App.scss';
import 'antd/dist/antd.css';
import { LoginForm } from './LoginForm';
import logo from './img/logo.png';
import styled from '@emotion/styled';
import { useUser } from './hooks/useUser';
import { useLevels } from './hooks/useLevels';

const { Header, Content, Footer } = Layout;

const Logo = styled.img`
    width: 54px;
    height: auto;
    float: left;
    margin: 5px 0;
`;

const AvaText = styled.span`
    font-weight: bold;
`;

function App() {
    const { data: date, mutate: mutateDate } = useSWR('date', {
        initialData: moment(),
    });

    const { token, isAuthorizing, clearToken, user } = useUser();
    const { data: levels, isLoading } = useLevels();

    return (
        <Layout className="layout">
            <Header>
                <Logo src={logo} />
                {token && (
                    <Dropdown
                        overlay={
                            <Menu>
                                <Menu.Item onClick={clearToken}>
                                    Logout
                                </Menu.Item>
                            </Menu>
                        }
                    >
                        <Avatar
                            size={44}
                            style={{ float: 'right', margin: '10px 0' }}
                        >
                            <AvaText>{user?.login[0].toUpperCase()}</AvaText>
                        </Avatar>
                    </Dropdown>
                )}
            </Header>
            <Content>
                <div className="site-layout-content">
                    <Typography.Title level={2}>
                        Hawkins levels tracking app
                    </Typography.Title>
                    {isAuthorizing && <Skeleton active />}
                    {!token && !isAuthorizing && <LoginForm />}
                    {token && (
                        <>
                            <Typography.Paragraph>
                                Hello {user?.login}, how you are doing?
                            </Typography.Paragraph>
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
                                {isLoading ? (
                                    <Skeleton active />
                                ) : (
                                    <Chart data={prepareData(levels)} />
                                )}
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
