import { Feather } from '@expo/vector-icons';
import { FlatList, FlatListProps, Platform } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

import { ITransactionProps } from '../../models/transaction.model';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  width: 100%;
  height: ${Platform.OS === 'ios' ? RFPercentage(42) : RFPercentage(35)}px;
  background-color: ${({ theme }) => theme.colors.primaty};
`;

export const UserWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  padding: 0 24px;
  margin-top: ${Platform.OS === 'ios' ? getStatusBarHeight() + RFValue(28) : getStatusBarHeight()}px;
`;

export const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const User = styled.View`
  margin-left: 17px;
`;

export const Photo = styled.Image`
  width: ${RFValue(48)}px;
  height: ${RFValue(48)}px;
  border-radius: 10px;
`;

export const UserGreeting = styled.Text`
  line-height: 25px;
  color: ${({ theme }) => theme.colors.shape};

  font-size: ${RFValue(17)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const UserName = styled.Text`
  line-height: 25px;
  color: ${({ theme }) => theme.colors.shape};

  font-size: ${RFValue(17)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
`;

export const LogoutButtom = styled(BorderlessButton)`
  
`;

export const Icon = styled(Feather)`
  color: ${({ theme }) => theme.colors.secundary};
  font-size: ${RFValue(24)}px;
`;

export const HightlightCards = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: { paddingHorizontal: 24 },
})`
  width: 100%;
  position: absolute;
  margin-top: ${Platform.OS === 'ios' ? RFPercentage(20) : RFPercentage(15)}px;
`;


export const Transaction = styled.View`
  flex: 1;
  padding: 0 24px;
  margin-top: ${RFPercentage(10)}px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const TransactionsList = styled(
  FlatList as new (props: FlatListProps<ITransactionProps>) => FlatList<ITransactionProps>
).attrs({
  showsVerticalScrollIndicator: false
})`
  margin-bottom: ${getBottomSpace() != 0 ? getBottomSpace() : 15}px;
`;

export const LoadContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;