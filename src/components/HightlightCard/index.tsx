import React from 'react';

import { Amount, Container, Footer, Header, Icon, LastTransaction, Title } from './styles';

interface HightlightCardProps {
  title: string;
  amount: string | undefined;
  lastTransaction: string | undefined;
  type: "up" | "down" | "total";
}

const icon = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle',
  total: 'dollar-sign'
}

const cardMessage = {
  up: 'Última entrada dia ',
  down: 'Última saída dia ',
  total: '01 á '
}

export const HightlightCard = ({ type, title, amount, lastTransaction }: HightlightCardProps) => {

  const getCurrentDay = () => {
    return Intl.DateTimeFormat("pt-BR", {
      day: '2-digit',
      month: 'long'
    }).format(new Date())
  }

  return <Container type={type}>
    <Header>
      <Title type={type}>{title}</Title>
      <Icon name={icon[type]} type={type} />
    </Header>

    <Footer>
      <Amount type={type}>{amount || "R$ 0,00"}</Amount>
      <LastTransaction type={type}>{cardMessage[type] + (lastTransaction || getCurrentDay())}</LastTransaction>
    </Footer>
  </Container>
}