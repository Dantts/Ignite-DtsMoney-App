import React from 'react';

import { Amount, Container, Title } from './styles';

interface HistoryCardProps {
  title: string;
  color: string;
  amount: string
}

export const HistoryCard = ({ title, color, amount }: HistoryCardProps) => {
  return (
    <Container color={color}>
      <Title>{title}</Title>
      <Amount>{amount}</Amount>
    </Container>
  )
}
