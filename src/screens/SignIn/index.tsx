import React from 'react';
import { Alert } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import GoogleSvg from '../../assets/google.svg';
import LogoSvg from '../../assets/logo.svg';
import { SignInSocialButton } from '../../components/SignInSocialButton';
import { useAuth } from '../../hooks/AuthContext';
import { Container, Footer, FooterWrapper, Header, SignInTitle, Title, TitleWrapper } from './styles';

export const SignIn = () => {
  const { signInWithGoogle } = useAuth();

  const handleSignInWithGoogle = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possível conectar a conta Google.')
    }
  }

  // const handleSignInWithApple = async () => {
  //   try {
  //     await signInWithApple();
  //   } catch (error) {
  //     console.log(error);
  //     Alert.alert('Não foi possível conectar a conta Apple.')
  //   }
  // }

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg
            width={RFValue(120)}
            height={RFValue(68)}
          />

          <Title>
            Controle suas{'\n'}
            finanças de forma{'\n'}
            muito simples
          </Title>
        </TitleWrapper>

        <SignInTitle>
          Faça seu login com{'\n'}
          uma das contas abaixo
        </SignInTitle>
      </Header>

      <Footer>
        <FooterWrapper>
          <SignInSocialButton onPress={handleSignInWithGoogle} svg={GoogleSvg} title="Entrar com Google" />
          {/* <SignInSocialButton onPress={handleSignInWithApple} svg={AppleSvg} title="Entrar com Apple" /> */}
        </FooterWrapper>
      </Footer>
    </Container>
  );
}
