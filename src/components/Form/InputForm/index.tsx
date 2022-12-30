import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { TextInputProps } from 'react-native';

import { Input } from '../Input';
import { Container, Error } from './styles';

interface IInputFormProps extends TextInputProps {
  control: Control;
  name: string;
  error?: string;
}

export const InputForm = ({ name, control, error, ...rest }: IInputFormProps) => {
  return (
    <Container>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            {...rest}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {error && <Error>{error}</Error>}
    </Container>
  )
}