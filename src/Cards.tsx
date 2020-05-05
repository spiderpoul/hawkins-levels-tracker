import React from 'react';
import { Skeleton } from 'antd';
import moment from 'moment';
import styled from '@emotion/styled';
import { useLevels } from './hooks/useLevels';
import { CardItem } from './Card';

const CardsContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 24px;
    margin-top: 36px;
`;

export const Cards = () => {
    const { data, isLoading } = useLevels();

    const preparedData = data?.map((item = {} as any) => ({
        date: moment(item.data.time).format('HH:mm DD MMM YYYY'),
        value: item.data?.value,
        task: item.data?.task,
        id: item.ref['@ref']?.id,
    }));

    return (
        <CardsContainer>
            {isLoading && <Skeleton loading={isLoading} avatar active />}
            {preparedData?.map((item) => (
                <CardItem key={item.id} item={item} />
            ))}
        </CardsContainer>
    );
};
