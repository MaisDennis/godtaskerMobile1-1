import { Platform, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { TextInputMask as InputMask } from 'react-native-masked-text'
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Feather';
// -----------------------------------------------------------------------------
import Input from '~/components/Input';
import Button from '~/components/Button';
// -----------------------------------------------------------------------------

export const AllIcon = styled(Icon)`
  font-size: 16px;
  margin: 16px 0 4px;
  color: #999;
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
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0 auto;
  /* background-color: #44ee33; */
`;

export const Form = styled.ScrollView`
  display: flex;
  flex-direction: column;
  width: 100%;
  /* background-color: #4433ee; */

`;
export const FormInput = styled(Input)`
  height: 56px;
  width: 80%;
  border: 1px solid #999;
  margin: 8px auto;
  color: #222;
  background-color: #f5f5f5;
  /* background: #c4ce3b; */
`;

export const HrLine = styled.View`
  height: 0;
  border: .5px solid #666;
  width: 50%;
  margin: 12px 0;
`;
export const Options = styled(Picker)`
  height: 56px;
  width: 80%;
  border-radius: 4px;
  border: 1px solid #999;
  margin: 8px auto;
  color: #222;
  background-color: #ccc;
  /* background: #c4ce3b; */
`;
export const PhoneMask = styled(InputMask)`
  height: 56px;
  width: 80%;
  border: 1px solid #999;
  margin: 8px auto;
  padding-left: 12px;
  color: #222;
  background-color: #f5f5f5;
  /* background: #c4ce3b; */
`;
export const SubmitButton = styled(Button)`
  margin: 16px;
  width: 148px;
`;
export const SignUpErrorText = styled.Text`
  color: #f3c775;
  /* font-weight: bold; */
  font-size: 16px;
`;

export const Wrapper = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: auto;
  width: 100%;
  min-width: 320px;
  border-radius: 4px;
  padding-bottom: 24px;
  margin: 24px auto;
  background-color: #f5f5f5;
`;
