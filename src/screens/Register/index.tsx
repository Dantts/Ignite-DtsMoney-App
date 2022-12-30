import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from 'react-native';
import uuId from 'react-native-uuid';
import * as Yup from 'yup';

import { Buttom } from '../../components/Form/Buttom';
import { CategorySelectButtom } from '../../components/Form/CategorySelectButtom';
import { InputForm } from '../../components/Form/InputForm';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';
import { transactionKey } from '../../Utils/collectionsKeys';
import { CategorySelect } from '../CategorySelect';
import { Container, Fields, Form, Header, Title, TransactionsTypesContainer } from './styles';

interface IFormDataProps {
  name: string;
  amount: string;
}

const yupSchema = Yup.object().shape({
  name: Yup.string().required("Nome é obrigatorio."),
  amount: Yup.number()
    .typeError("Informe um valor númerico.")
    .positive("O valor tem que ser positivo.")
    .required("Preço é obrigatorio.")
})


export const Register = () => {

  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState({
    key: 'category',
    name: "categoria",
  });

  const navigation = useNavigation<any>();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(yupSchema)
  });


  const handleTransactionsTypesSelect = (type: 'positive' | 'negative') => {
    setTransactionType(type);
  }

  const handleCloseSelectCategoryModal = () => {
    setCategoryModalOpen(false);
  }

  const handleOpenSelectCategoryModal = () => {
    setCategoryModalOpen(true);
  }

  const handleRegister = async (form: IFormDataProps) => {
    if (!transactionType) {
      return Alert.alert("Selecione o tipo da transação.")
    }

    if (category.key === "category") {
      return Alert.alert("Selecione a categoria.")
    }

    const newTransaction = {
      id: String(uuId.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      createdAt: new Date()
    }

    try {
      const currentTransactions = JSON.parse(await AsyncStorage.getItem(transactionKey)) || [];
      await AsyncStorage.setItem(transactionKey, JSON.stringify([...currentTransactions, newTransaction]));
      console.log(currentTransactions);

      reset()
      setTransactionType('');
      setCategory({
        key: 'category',
        name: "categoria",
      })

      navigation.navigate("Listagem");

    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível salvar.")
    }
  }

  // useEffect(() => {
  //   const siela = async () => {
  //     AsyncStorage.removeItem(transactionKey)
  //   }

  //   siela()
  // }, [])

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>

        <Form>
          <Fields>
            <InputForm
              name='name'
              control={control}
              placeholder='Nome'
              autoCapitalize='sentences'
              autoCorrect={false}
              error={errors.name && (errors.name.message as string)}
            />
            <InputForm
              keyboardType='numeric'
              name='amount'
              control={control}
              placeholder='Preço'
              error={errors.amount && (errors.amount.message as string)}
            />

            <TransactionsTypesContainer>
              <TransactionTypeButton
                type='up'
                title='Income'
                isActive={transactionType === 'positive'}
                onPress={() => handleTransactionsTypesSelect('positive')}
              />

              <TransactionTypeButton
                type='down'
                title='Ontcome'
                isActive={transactionType === 'negative'}
                onPress={() => handleTransactionsTypesSelect('negative')}
              />
            </TransactionsTypesContainer>

            <CategorySelectButtom
              title={category.name}
              activeOpacity={0.7}
              onPress={handleOpenSelectCategoryModal}
            />

          </Fields>
          <Buttom
            title="Enviar"
            onPress={handleSubmit(handleRegister)}
          />
        </Form>

        <Modal visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectCategoryModal}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  )
}
