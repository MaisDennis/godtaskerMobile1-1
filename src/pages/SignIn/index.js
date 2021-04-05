import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// -----------------------------------------------------------------------------
import { signInRequest } from '~/store/modules/auth/actions';
import Background from '~/components/Background';
import logo from '~/assets/detective/detectiveBlack.png';
import godtaskerFont from '~/assets/detective/godtaskerFontPlainGreySmall.png';
import {
  AlignView,
  ButtonText,
  Container,
  Wrapper,
  FormWorker, FormInputWorkerPassword,
  ImageLogo, ImageGodtaskerFont,
  PhoneMask,
  SubmitButton, SignUpButton, SignUpText, StyledScrollView,
  Title,
} from './styles';
// -----------------------------------------------------------------------------
export default function SignIn({ navigation }) {
  const dispatch = useDispatch();
  const [phonenumber, setPhonenumber] = useState('');
  const [password, setPassword] = useState('');
  const loading = useSelector(state => state.auth.loading);
  const signed = useSelector(state => state.auth.signed);
  // const test = route.params.phonenumber;
  // console.tron.log(route.params)
  function handleSubmit() {
    const unmaskedPhoneNumber = (
      maskedPhoneNumber => maskedPhoneNumber.replace(/[()\s-]/g, '')
    )
    const countryCode = '+55'
    const parsedUnmaskedPhoneNumber = countryCode+unmaskedPhoneNumber(phonenumber)
    // console.tron.log(parsedUnmaskedPhoneNumber)
    dispatch(
      signInRequest(
        parsedUnmaskedPhoneNumber, password
      )
    );
  }

  function handleSignUp() {
    navigation.navigate('SignUp',
      // {
      //   phonenumber: test
      // }
    )
  }

  if (signed) {
    navigation.navigate('Home')
  }
  // -----------------------------------------------------------------------------
  return (
    <Background>
      <Container>
        <StyledScrollView>
          <AlignView>
          <ImageLogo source={logo} />
          <ImageGodtaskerFont source={godtaskerFont} />
          <Wrapper>
            <Title>Login</Title>
            <FormWorker>
              <PhoneMask
                type={'cel-phone'}
                options={{
                  maskType: 'BRL',
                  withDDD: true,
                  dddMask: '(99) ',
                }}
                placeholder="Número de Whatsapp"
                returnKeyType="next"
                value={phonenumber}
                onChangeText={setPhonenumber}
                placeholderTextColor={'#ccc'}
              />
              <FormInputWorkerPassword
                // icon="unlock"
                secureTextEntry={true}
                placeholder="Sua senha"
                returnKeyType="send"
                onSubmitEditing={handleSubmit}
                value={password}
                onChangeText={setPassword}
              />
              <SubmitButton
                loading={loading}
                onPress={handleSubmit}
              >
                <ButtonText>Acessar</ButtonText>
              </SubmitButton>
              <SignUpButton
                onPress={handleSignUp}
              >
                <SignUpText>Criar conta gratuita!</SignUpText>
              </SignUpButton>
            </FormWorker>
          </Wrapper>
          </AlignView>
        </StyledScrollView>
      </Container>
    </Background>
  );
}
