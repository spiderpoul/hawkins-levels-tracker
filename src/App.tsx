import React from 'react';
import { Layout, Menu, AutoComplete, Select, Button, Form } from 'antd';
import Axios from 'axios';
import useSWR from 'swr';
import { useState } from 'react';
import { LEVELS_TYPES } from './models';
import { Chart } from './Chart';
import { LEVELS_VALUES } from './constants';
import { prepareData } from './utils';

import './App.scss';
import 'antd/dist/antd.css';

const { Header, Content, Footer } = Layout;

function App() {
    const [level, setLevel] = useState(LEVELS_TYPES.Peace);
    const [task, setTask] = useState('');
    const { data, revalidate } = useSWR('/api/db', Axios.get);

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
                    <Form style={{ marginLeft: 20 }}>
                        <Form.Item>
                            <Select
                                value={LEVELS_TYPES[level]}
                                onSelect={(v) => setLevel(v)}
                                style={{ width: 200 }}
                            >
                                {Object.keys(LEVELS_TYPES).map((key) => (
                                    <Select.Option
                                        value={key}
                                        key={key}
                                    >
                                        {LEVELS_TYPES[key]}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <AutoComplete
                                value={task}
                                onChange={(v) => setTask(v)}
                                style={{ width: 200 }}
                                options={[
                                    { value: 'work' },
                                    { value: 'eating' },
                                    { value: 'walking' },
                                ]}
                                placeholder="What are you doing now?"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                onClick={async () => {
                                    await Axios.post('/api/add', {
                                        level,
                                        task,
                                    });
                                    revalidate();
                                }}
                                type="primary"
                            >
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                    <div style={{ width: '100%', height: 300 }}>
                        <Chart data={prepareData((data || {}).data)} />
                    </div>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                Ant Design ©2018 Created by Ant UED
            </Footer>
        </Layout>
    );
}

export default App;
