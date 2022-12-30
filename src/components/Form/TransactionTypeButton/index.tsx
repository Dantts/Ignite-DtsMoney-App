import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { Container, Icon, Title } from './styles';

interface ITransactionTypeButton extends TouchableOpacityProps {
  isActive: boolean;
  type: 'up' | 'down';
  title: string;
}

const icons = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle'
}

export const TransactionTypeButton = ({ title, type, isActive, ...rest }: ITransactionTypeButton) => {
  return (
    <Container
      type={type}
      isActive={isActive}
      {...rest}
    >
      <Icon
        name={icons[type]}
        type={type}
      />
      <Title>
        {title}
      </Title>
    </Container>
  )
}