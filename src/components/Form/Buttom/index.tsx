import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { Container, Title } from './styles';

interface IButtomProps extends TouchableOpacityProps {
  title: string;
}

export const Buttom = ({ title, ...rest }: IButtomProps) => {
  return (
    <Container {...rest}>
      <Title>
        {title}
      </Title>
    </Container>
  );
}