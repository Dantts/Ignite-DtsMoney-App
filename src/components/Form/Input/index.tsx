import React from 'react';
import { TextInputProps } from 'react-native';

import { Container } from './styles';

type IInputProps = TextInputProps;

export const Input = ({ ...rest }: IInputProps) => {
  return (
    <Container {...rest} />
  )
}
