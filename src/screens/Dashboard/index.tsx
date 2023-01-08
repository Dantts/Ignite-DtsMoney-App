import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Text } from 'react-native';
import { useTheme } from 'styled-components';

import { HightlightCard } from '../../components/HightlightCard';
import { TransactionCard } from '../../components/TransactionCard';
import { useAuth } from '../../hooks/AuthContext';
import { ITransactionProps } from '../../models/transaction.model';
import { transactionKey } from '../../Utils/collectionsKeys';
import {
  Container,
  Header,
  HightlightCards,
  Icon,
  LoadContainer,
  LogoutButtom,
  Photo,
  Title,
  Transaction,
  TransactionsList,
  User,
  UserGreeting,
  UserInfo,
  UserName,
  UserWrapper,
} from './styles';

interface Highlight {
  amount: string;
  lastTransaction: string
}

interface IHighlightProps {
  entries: Highlight
  expensives: Highlight
  total: Highlight
}


export const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [transaction, setTransaction] = useState<ITransactionProps[]>([]);
  const [highlightData, setHighlightData] = useState<IHighlightProps>({} as IHighlightProps);

  const theme = useTheme();
  const { signOut, user } = useAuth();

  const getLastTransaction = (collection: ITransactionProps[], type: 'positive' | 'negative') => {
    if (collection.length === (0 || 1)) {
      return Intl.DateTimeFormat("pt-BR", {
        day: '2-digit',
        month: 'long'
      }).format(new Date())
    }

    const lastTransactionFilter = collection
      .filter(transaction => transaction.type === type);

    const lastTransaction = Math.min.apply(Math, lastTransactionFilter.map((transaction => new Date(transaction.createdAt).getTime())));

    return Intl.DateTimeFormat("pt-BR", {
      day: '2-digit',
      month: 'long'
    }).format(new Date(lastTransaction))
  }

  const getAllTransactions = async () => {
    let entriesTotal = 0;
    let expensiveTotal = 0;

    const storageData = await AsyncStorage.getItem(transactionKey + `_user:${user.id}`);

    const transactionData = storageData != (undefined || null) ? JSON.parse(storageData) : [];

    if (transactionData.length === 0) {
      setHighlightData({
        entries: {
          lastTransaction: undefined,
          amount: undefined
        },
        expensives: {
          lastTransaction: undefined,
          amount: undefined
        },
        total: {
          lastTransaction: undefined,
          amount: undefined
        }
      })
      setIsLoading(false);
      return;
    }

    const transactionFormatted: ITransactionProps[] = transactionData.map((transaction: ITransactionProps) => {
      transaction.type === 'positive' ?
        entriesTotal += Number(transaction.amount) : expensiveTotal += Number(transaction.amount)

      const amount = Number(transaction.amount).toLocaleString("pt-BR", {
        style: 'currency',
        currency: 'BRL'
      });

      const createdAt = Intl.DateTimeFormat("pt-BR", {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
      }).format(new Date(transaction.createdAt))

      return { ...transaction, amount, createdAt }
    })

    setTransaction(transactionFormatted);

    const lastTransactionEntries = getLastTransaction(transactionData, 'positive');

    const lastTransactionExpensives = getLastTransaction(transactionData, 'negative');

    setHighlightData({
      entries: {
        lastTransaction: lastTransactionEntries,
        amount: entriesTotal.toLocaleString("pt-BR", {
          style: 'currency',
          currency: 'BRL'
        })
      },
      expensives: {
        lastTransaction: lastTransactionExpensives,
        amount: expensiveTotal.toLocaleString("pt-BR", {
          style: 'currency',
          currency: 'BRL'
        })
      },
      total: {
        lastTransaction: lastTransactionExpensives,
        amount: (entriesTotal - expensiveTotal).toLocaleString("pt-BR", {
          style: 'currency',
          currency: 'BRL'
        })
      }
    })

    setIsLoading(false);
  }

  useFocusEffect(useCallback(() => {
    getAllTransactions()
  }, []))

  return (
    <Container>

      {isLoading ?
        <LoadContainer>
          <ActivityIndicator size={'large'} color={theme.colors.primaty} />
        </LoadContainer>
        : <>
          <Header>
            <UserWrapper>
              <UserInfo>
                <Photo source={{ uri: user.photo }} />
                <User>
                  <UserGreeting>Olá, </UserGreeting>
                  <UserName>{user.name}</UserName>
                </User>
              </UserInfo>

              <LogoutButtom onPress={signOut}>
                <Icon name="power" />
              </LogoutButtom>
            </UserWrapper>
          </Header>

          <HightlightCards>
            <HightlightCard
              type='up'
              title="Entradas"
              amount={highlightData.entries.amount}
              lastTransaction={highlightData.entries.lastTransaction}
            />
            <HightlightCard
              type='down'
              title='Saídas'
              amount={highlightData.expensives.amount}
              lastTransaction={highlightData.expensives.lastTransaction}
            />
            <HightlightCard
              type='total'
              title='Total'
              amount={highlightData.total.amount}
              lastTransaction={highlightData.expensives.lastTransaction}
            />
          </HightlightCards>

          <Transaction>
            <Title>
              Listagem
            </Title>
            {
              transaction.length !== 0 ?
                <TransactionsList
                  data={transaction}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <TransactionCard
                      data={item}
                    />)}
                />
                : <Text>Não há transações cadastradas.</Text>
            }

          </Transaction>
        </>
      }
    </Container >
  );
};
