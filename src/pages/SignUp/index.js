import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Alert } from 'react-native';
// import * as Yup from 'yup';
// -----------------------------------------------------------------------------
import Background from '~/components/Background';
// import logo from '~/assets/detective/detectiveBlack.png';
// import godtaskerFont from '~/assets/detective/godtaskerFontPlainGreySmall.png';
import {
  AllIcon,
  ButtonText,
  Container,
  Form, FormInput,
  GenderDiv,
  LabelText,
  // ImageGodtaskerFont, ImageLogo,
  Options,
  PhoneMask,
  RadioButtonView, RadioButtonTag, RadioButtonTagConfirmPhoto,
  RadioButtonLabel, RadioButtonOuter, RadioButtonInner0,
  RadioButtonInner1, RadioButtonInner2, RadioButtonInner3,
  RadioButtonInner4, RadioButtonLabelText,
  SignUpErrorText,
  SubmitButton,
  Wrapper,
} from './styles';
import { signUpRequest } from '~/store/modules/auth/actions';
// import { goBack } from '../../services/NavigationService';
// -----------------------------------------------------------------------------
export default function SignUp({ navigation, route }) {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [phonenumber, setPhonenumber] = useState();
  const [email, setEmail] = useState();
  const [birthDate, setBirthDate] = useState();
  const [gender, setGender] = useState("feminino");
  const [signUpError, setSignUpError] = useState();
  // const test = route.params.phonenumber;
  // console.log(test)

  const genderOptions = [ 'feminino', 'masculino', 'alien', 'outro', '']

  function handleSubmit() {
    // console.log(schema)
    try {
    const unmaskedPhoneNumber = (
      maskedPhoneNumber => maskedPhoneNumber.replace(/[()\s-]/g, '')
    )
    const countryCode = '+55'
    const parsedPhonenumber = countryCode+unmaskedPhoneNumber(phonenumber)

      dispatch(signUpRequest(
        firstName, lastName, userName, password,
        parsedPhonenumber, email, birthDate, gender
      ));
      navigation.goBack();
    }
    catch (error) {
      Alert.alert('Erro nos dados')
    }

  }
  // -----------------------------------------------------------------------------
  return (
    <Background>
      <Container>
        {/* <ImageLogo source={logo} />
        <ImageGodtaskerFont source={godtaskerFont} /> */}
        <Form contentContainerStyle={{ alignItems: 'center' }}>
          <Wrapper>
            <AllIcon name='user'/>
            <FormInput
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Nome"
              placeholderTextColor="#ccc"
              returnKeyType="next"
              value={firstName}
              onChangeText={setFirstName}
            />
            <FormInput
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Sobrenome"
              placeholderTextColor="#ccc"
              returnKeyType="next"
              value={lastName}
              onChangeText={setLastName}
            />
            <FormInput
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Nome de usuário"
              placeholderTextColor="#ccc"
              returnKeyType="next"
              value={userName}
              onChangeText={setUserName}
            />
            {/* <HrLine/> */}
            <AllIcon name='info'/>
            <PhoneMask
              type={'cel-phone'}
              options={{
                maskType: 'BRL',
                withDDD: true,
                dddMask: '(99) ',
              }}
              placeholder="DDD + Número de whatsapp"
              placeholderTextColor="#ccc"

              returnKeyType="next"
              value={phonenumber}
              onChangeText={setPhonenumber}
            />
            <PhoneMask
              type={'datetime'}
              options={{
                format: 'DD/MM/YYYY',
              }}
              placeholder="Data de nascimento (DD/MM/YYYY)"
              placeholderTextColor="#ccc"
              returnKeyType="next"
              value={birthDate}
              onChangeText={setBirthDate}
            />
            <GenderDiv>
              <LabelText>Gênero</LabelText>
              <RadioButtonView>
                <RadioButtonTag onPress={() => setGender('feminino')}>
                  <RadioButtonLabel>feminino</RadioButtonLabel>
                  <RadioButtonOuter>
                    <RadioButtonInner1 switch={gender}/>
                  </RadioButtonOuter>
                </RadioButtonTag>
                <RadioButtonTag onPress={() => setGender('masculino')}>
                  <RadioButtonLabel>masculino</RadioButtonLabel>
                  <RadioButtonOuter>
                    <RadioButtonInner2 switch={gender}/>
                  </RadioButtonOuter>
                </RadioButtonTag>
                <RadioButtonTag onPress={() => setGender('alien')}>
                  <RadioButtonLabel>alien</RadioButtonLabel>
                  <RadioButtonOuter>
                    <RadioButtonInner3 switch={gender}/>
                  </RadioButtonOuter>
                </RadioButtonTag>
                <RadioButtonTag onPress={() => setGender('outro')}>
                  <RadioButtonLabel>outro</RadioButtonLabel>
                  <RadioButtonOuter>
                    <RadioButtonInner4 switch={gender}/>
                  </RadioButtonOuter>
                </RadioButtonTag>
              </RadioButtonView>
            </GenderDiv>
            <FormInput
              keboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="e-mail"
              value={email}
              onChangeText={setEmail}
            />
            {/* <HrLine/> */}
            <AllIcon name='unlock'/>
          <FormInput
            secureTextEntry
            placeholder="Sua senha secreta"
            returnKeyType="send"
            value={password}
            onChangeText={setPassword}
          />
          <FormInput
            secureTextEntry
            placeholder="Confirmar a senha"
            returnKeyType="send"
            onSubmitEditing={handleSubmit}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          {signUpError && (
            <SignUpErrorText>{signUpError}</SignUpErrorText>
          )}
          <SubmitButton onPress={handleSubmit}>
            <ButtonText>Enviar</ButtonText>
          </SubmitButton>
          </Wrapper>
        </Form>
      </Container>
    </Background>
  );
}
