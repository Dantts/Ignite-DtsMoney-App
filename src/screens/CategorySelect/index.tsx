import React from 'react';
import { FlatList } from 'react-native';

import { Buttom } from '../../components/Form/Buttom';
import { ICategoryProps } from '../../models/category.model';
import { categories } from '../../Utils/categories';
import { Category, Container, Footer, Header, Icon, Name, Separator, Title } from './styles';

type ICategoryCustomProps = Omit<ICategoryProps, 'icon' | 'color'>

interface ICategorySelectProps {
  category: ICategoryCustomProps;
  setCategory: (category: ICategoryCustomProps) => void;
  closeSelectCategory: () => void;
}

export const CategorySelect = ({ category, setCategory, closeSelectCategory }: ICategorySelectProps) => {

  const handleCategorySelected = (category: ICategoryCustomProps) => {
    setCategory(category)
  }

  return (
    <Container>
      <Header>
        <Title>Categoria</Title>
      </Header>

      <FlatList
        data={categories}
        style={{ flex: 1, width: '100%' }}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <Category
            onPress={() => handleCategorySelected(item)}
            isActive={category.key === item.key}
          >
            <Icon name={item.icon} />

            <Name>{item.name}</Name>
          </Category>
        )}
        ItemSeparatorComponent={() => (<Separator />)}
      />

      <Footer>
        <Buttom
          title='Selecionar'
          onPress={closeSelectCategory}
        />
      </Footer>
    </Container>
  )
}