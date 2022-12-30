import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

interface ITransactionTypeStylesProps {
  type: 'up' | 'down';
  isActive: boolean;
}


export const Container = styled(TouchableOpacity) <ITransactionTypeStylesProps>`
  width: 48%;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  padding: 16px;
  
  ${({ isActive, type }) => isActive && type === 'up' && css`
    background-color: ${({ theme }) => theme.colors.sucess_light};
  `}

  ${({ isActive, type }) => isActive && type === 'down' && css`
    background-color: ${({ theme }) => theme.colors.attention_light};
  `}

  border: 1px solid ${({ theme }) => theme.colors.text};
  border-radius: 5px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};

`;

export const Icon = styled(Feather) <ITransactionTypeStylesProps>`
  color: ${({ theme, type }) =>
    type === 'up' ?
      theme.colors.sucess : theme.colors.attention
  };
  
  font-size: ${RFValue(24)}px;
  margin-right: 12px;
`;