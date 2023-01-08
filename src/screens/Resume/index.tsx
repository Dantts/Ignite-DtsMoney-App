import AsyncStorage from '@react-native-async-storage/async-storage';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useFocusEffect } from '@react-navigation/native';
import { addMonths, format, subMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Text } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { VictoryPie } from 'victory-native';

import { HistoryCard } from '../../components/HistoryCard';
import theme from '../../global/styles/theme';
import { useAuth } from '../../hooks/AuthContext';
import { ITransactionProps } from '../../models/transaction.model';
import { categories } from '../../Utils/categories';
import { transactionKey } from '../../Utils/collectionsKeys';
import {
  ChartContainer,
  Container,
  Content,
  Header,
  LoadContainer,
  Month,
  MonthSelect,
  MonthSelectButton,
  MonthSelectIcon,
  Title,
} from './styles';

interface CardCategoryProps {
  key: string;
  name: string;
  total: number;
  porcent: string;
  totalFormatted: string;
  color: string;
}

export const Resume = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [expensiveCategories, setexpensiveCategories] = useState<CardCategoryProps[]>([]);

  const loadData = async () => {
    setIsLoading(true)
    const storageData = await AsyncStorage.getItem(transactionKey + `_user:${user.id}`);

    const transactionData: ITransactionProps[] = storageData != (undefined || null) ? JSON.parse(storageData) : [];

    const expensives = transactionData.filter(expensive =>
      expensive.type === 'negative'
      && new Date(expensive.createdAt).getMonth() === selectedDate.getMonth()
      && new Date(expensive.createdAt).getFullYear() === selectedDate.getFullYear()
    );

    const totalExpensives = expensives.reduce((acc: number, expensive: ITransactionProps) => {
      return acc + Number(expensive.amount);
    }, 0)

    const totalByCategory: CardCategoryProps[] = [];

    categories.forEach(cat => {
      let catSum = 0;

      expensives.forEach((expensive: ITransactionProps) => {
        if (expensive.category === cat.key) {
          catSum += Number(expensive.amount);
        }
      })

      if (catSum > 0) {
        totalByCategory.push({
          key: cat.key,
          name: cat.name,
          total: catSum,
          porcent: (catSum / totalExpensives * 100).toFixed(0).concat("%"),
          totalFormatted: catSum.toLocaleString("pt-BR", {
            style: 'currency',
            currency: 'BRL'
          }),
          color: cat.color
        })
      }
    })

    setexpensiveCategories(totalByCategory);
    setIsLoading(false)
  }

  const handleDateChange = (action: 'next' | 'preview') => {
    if (action === 'next') {
      setSelectedDate(addMonths(selectedDate, 1));
    } else {
      setSelectedDate(subMonths(selectedDate, 1));
    }
  }

  useFocusEffect(useCallback(() => {
    loadData();
  }, [selectedDate]))

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      {isLoading ?
        <LoadContainer>
          <ActivityIndicator size={'large'} color={theme.colors.primaty} />
        </LoadContainer >
        :
        <Content
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: (useBottomTabBarHeight() / 2) }}
        >
          <MonthSelect>
            <MonthSelectButton onPress={() => handleDateChange('preview')}>
              <MonthSelectIcon name="chevron-left" />
            </MonthSelectButton>

            <Month>
              {
                format(selectedDate, 'MMMM, yyyy', {
                  locale: ptBR
                })
              }
            </Month>

            <MonthSelectButton onPress={() => handleDateChange('next')}>
              <MonthSelectIcon name="chevron-right" />
            </MonthSelectButton>
          </MonthSelect>

          <ChartContainer>
            <VictoryPie
              y="total"
              x="porcent"
              labelRadius={50}
              style={{
                labels: {
                  fontSize: RFValue(18),
                  fontWeight: 'bold',
                  fill: theme.colors.shape
                }
              }}
              data={expensiveCategories}
              colorScale={expensiveCategories.map(cat => cat.color)}
            />
          </ChartContainer>
          {
            expensiveCategories.length !== 0 ? expensiveCategories.map(category =>
              <HistoryCard key={category.key} title={category.name} amount={category.totalFormatted} color={category.color} />
            )
              : <Text>Não há transações cadastradas</Text>
          }
        </Content>
      }
    </Container>
  )
}
