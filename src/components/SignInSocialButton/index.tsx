import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { SvgProps } from 'react-native-svg';

import { Buttom, ImageContainer, Text } from './styles';

interface SignInSocialButtonProps extends TouchableOpacityProps {
  title: string;
  svg: React.FC<SvgProps>
}

export const SignInSocialButton = ({ title, svg: Svg, ...rest }: SignInSocialButtonProps) => {
  return (
    <Buttom {...rest}>
      <ImageContainer>
        <Svg />
      </ImageContainer>
      <Text>
        {title}
      </Text>
    </Buttom>
  )
}
