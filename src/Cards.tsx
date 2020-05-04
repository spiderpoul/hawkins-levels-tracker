import React from 'react';
import { Card, Dropdown, Menu, Skeleton } from 'antd';
import { EditOutlined, EllipsisOutlined } from '@ant-design/icons';
import useSWR from 'swr';
import Axios from 'axios';
import { LEVELS_VALUES } from './constants';
import moment from 'moment';
import styled from '@emotion/styled';
import { getQueryByDate } from './utils';

const CardsContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 24px;
    margin-top: 36px;
`;

export const Cards = () => {
    const { data: date } = useSWR('date');
    const { data: userId } = useSWR('userId');
    const { data, isValidating } = useSWR(
        getQueryByDate(date, userId),
        Axios.get
    );

    const preparedData = data?.data?.map((item = {} as any) => ({
        date: moment(item?.ts / 1000).format('HH:mm DD MMM YYYY'),
        value: item.data?.value,
        task: item.data?.task,
    }));

    return (
        <CardsContainer>
            {isValidating && <Skeleton loading={isValidating} avatar active />}
            {preparedData?.map((item) => (
                <Card
                    style={{ marginBottom: 16 }}
                    loading={isValidating}
                    size="default"
                    hoverable
                    actions={[
                        <EditOutlined key="edit" />,
                        <Dropdown
                            overlay={
                                <Menu>
                                    <Menu.Item>Delete</Menu.Item>
                                </Menu>
                            }
                        >
                            <EllipsisOutlined key="ellipsis" />
                        </Dropdown>,
                    ]}
                >
                    <Card.Meta
                        title={item?.date}
                        description={Object.keys(LEVELS_VALUES).find(
                            (x) => LEVELS_VALUES[x] === item?.value
                        )}
                    />
                    {item?.task}
                </Card>
            ))}
        </CardsContainer>
    );
};
