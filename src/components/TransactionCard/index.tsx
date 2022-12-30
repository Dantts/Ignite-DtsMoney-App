import React from 'react';

import { ITransactionProps } from '../../models/transaction.model';
import { categories } from '../../Utils/categories';
import { Amount, Category, CategoryName, Container, Date, Footer, Icon, Title } from './styles';


interface TransactionCardProps {
  data: ITransactionProps;
}

export const TransactionCard = ({ data }: TransactionCardProps) => {
  const category = categories.filter(cat => cat.key === data.category)[0]

  return (
    <Container>
      <Title>{data.name}</Title>

      <Amount type={data.type}>{data.type === 'negative' && '- '}{data.amount}</Amount>

      <Footer>
        <Category>
          <Icon name={category.icon} />
          <CategoryName>{category.name}</CategoryName>
        </Category>

        <Date>{data.createdAt}</Date>
      </Footer>
    </Container>
  )
}
