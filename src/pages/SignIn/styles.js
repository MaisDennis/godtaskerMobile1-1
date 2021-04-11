import {
  KeyboardAvoidingView, Platform, SafeAreaView,
  TouchableOpacity, TextInput } from 'react-native';
import styled from 'styled-components/native';
import { TextInputMask as InputMask } from 'react-native-masked-text'
// -----------------------------------------------------------------------------
import Input from '~/components/Input';
import Button from '~/components/Button';
// -----------------------------------------------------------------------------
export const AlignView = styled.View`
  margin: 16px 0;
  /* background-color: #444; */
`;

export const ButtonText = styled.Text`
font-size: 16px;
font-weight: bold;
/* background: #999; */
color: #fff;
`;

// export const Container = styled.KeyboardAvoidingView.attrs({
//   enabled: Platform.OS === 'ios',
//   behavior: 'position',
// })`
//   flex: 1;
//   justify-content: center;
//   align-items: center;
// `;

export const Container = styled.SafeAreaView`
  height: 100%;
  /* background-color: #ff0; */
`;

export const Div1 = styled.View`
flex-direction: row;
width: 100%;
/* background: #5edc1f; */
`;

export const FormInputWorkerPassword = styled(TextInput)`
  height: 56px;
  width: 80%;
  /* border-radius: 4px; */
  border: 1px solid #999;
  margin: 8px auto;
  padding-left: 12px;
  color: #222;
  background-color: #f5f5f5;
  /* background: #c4ce3b; */
`;

export const FormWorker = styled.View`
  width: 100%;
  height: auto;
  margin: 0;
  /* background: #c4ce3b; */
`;

export const ImageLogo = styled.Image`
  width: 148px;
  height: 148px;
  margin: auto;
`;

export const ImageGodtaskerFont = styled.Image`
  width: 240px;
  height: 80px;
  margin: auto;
`;

export const PhoneMask = styled(InputMask)`
  height: 56px;
  width: 80%;
  /* border-radius: 4px; */
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  border: 1px solid #999;
  padding-left: 12px;
  margin: 8px auto;
  color: #222;
  background-color: #f5f5f5;
`;

export const SubmitButton = styled(TouchableOpacity)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 56px;
  width: 80%;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  margin: 8px auto;
  background-color: #666;
  /* width: 148px; */
  /* width: 50%; */
`;

export const StyledKeyboardAvoiding = styled(KeyboardAvoidingView)`
  /* background: #58595B; */
  width: 100%;
`;

export const SignUpButton = styled(Button)`
  height: 56px;
  width: auto;
  margin: 0 auto;
  padding: 0 16px;
  /* background-color: #f5f; */
`;

export const SignUpText = styled.Text`
  font-size: 16px;
  /* font-weight: bold; */
  color: #4433ee;
  /* color: #44ccee; */

`;

export const StyledScrollView = styled.ScrollView`
/* background: #F5F; */
`;

export const Title = styled.Text`
font-size: 16px;
font-weight: bold;
margin: 16px auto 8px;
/* background: #999; */
color: #58595B;
`;

export const Wrapper = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: auto;
  width: 80%;
  min-width: 320px;
  border-radius: 4px;
  padding-bottom: 12px;
  margin: 24px auto;
  background-color: #f5f5f5;
`;
