import React from 'react';
import { Layout, Menu, DatePicker, Space, Typography } from 'antd';
import Axios from 'axios';
import useSWR from 'swr';
import moment, { Moment } from 'moment';

import { Chart } from './Chart';
import { prepareData, getQueryByDate } from './utils';
import { FormComponent } from './Form';
import { Cards } from './Cards';

import './App.scss';
import 'antd/dist/antd.css';

const { Header, Content, Footer } = Layout;

function App() {
    const { data: date, mutate: mutateDate } = useSWR('date', {
        initialData: moment(),
    });
    const { data } = useSWR(getQueryByDate(date as Moment), Axios.get);

    return (
        <Layout className="layout">
            <Header>
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                >
                    <Menu.Item key="1">Main</Menu.Item>
                </Menu>
            </Header>
            <Content>
                <div className="site-layout-content">
                    <Typography.Title level={2}>
                        Hawkins levels app
                    </Typography.Title>
                    <FormComponent />
                    <Typography.Title level={3}>Statistics</Typography.Title>
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
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Pavel Uvarov App</Footer>
        </Layout>
    );
}

export default App;
