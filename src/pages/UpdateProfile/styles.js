import { Platform, ScrollView, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { TextInputMask as InputMask } from 'react-native-masked-text'
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Feather';
// -----------------------------------------------------------------------------
import Input from '~/components/Input';
import Button from '~/components/Button';
// import { ImageBackgroundView } from '../Messages/MessagesConversationPage/styles';
// -----------------------------------------------------------------------------
export const AllIcon = styled(Icon)`
  font-size: 16px;
  margin: 16px 0 4px;
  color: #ccc;
  /* color: #44ccee */
`;
export const ButtonText = styled.Text`
font-size: 16px;
font-weight: bold;
/* background: #999; */
color: #fff;
`;

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'height',
})`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
  background-color: #f5f5f5;
`;

export const Form = styled.ScrollView`
  display: flex;
  flex-direction: column;
  width: 100%;
  /* background-color: #4433ee; */
`;
export const FormInput = styled.TextInput`
  height: 48px;
  width: 80%;
  padding-left: 16px;
  margin: 8px 0;
  border-radius: 4px;
  border: 1px solid #999;
  color: #222;
  background-color: #fff;
`;

export const ImageWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 4px 0;
  /* background-color: #f5f5; */
`;


export const Options = styled(Picker)`
  height: 48px;
  width: 80%;
  padding-left: 16px;
  margin: 8px 0;
  border-radius: 4px;
  border: 1px solid #999;
  color: #222;
  background-color: #ddd;
`;
export const PhoneMask = styled(InputMask)`
  height: 48px;
  width: 80%;
  padding-left: 16px;
  margin: 8px 0;
  border-radius: 4px;
  border: 1px solid #999;
  color: #222;
  background-color: #fff;
`;
export const SubmitButton = styled(TouchableOpacity)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 56px;
  width: 80%;
  border-radius: 4px;
  margin: 16px;
  background-color: #4433ee;

`;
export const SignUpErrorText = styled.Text`
  color: #f3c775;
  /* font-weight: bold; */
  font-size: 16px;
`;

export const UserImage = styled.Image`
  height: 76px;
  width: 76px;
  border-radius: 76px;
  border: 1px solid #fff;
  background-color: #fff;
`;

export const UserImageBackgroundView = styled(TouchableOpacity)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 80px;
  width: 80px;
  border-radius: 80px;
  border: 1px solid #666;
  /* background-color: #f00; */
`;
