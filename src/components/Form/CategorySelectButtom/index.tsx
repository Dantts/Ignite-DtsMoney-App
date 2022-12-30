import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { Container, Icon, Title } from './styles';

interface ICategorySelectProps extends TouchableOpacityProps {
  title: string
}

export const CategorySelectButtom = ({ title, ...rest }: ICategorySelectProps) => {
  return (
    <Container {...rest}>
      <Title>{title}</Title>
      <Icon name="chevron-down" />
    </Container>
  )
}