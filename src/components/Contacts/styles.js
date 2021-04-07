import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather';
import Button from '~/components/Button';

export const Body = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 66px;
  width: 100%;
  /* background: #F5F5; */
`;

export const BottomTabView = styled.View`
display: flex;
flex-direction: row;
width: 100%;
/* background-color: #ff4; */

`;
export const ButtonsView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 36px;
  width: 60%;
  margin: 0 auto;
  padding: 0 12px;
  /* background-color: #ccc; */
`;

export const ButtonsText = styled.Text`
  font-weight: 600;
  color: #18A0FB;
`;

export const ContactText = styled.Text`
  font-weight: 700;
  margin-left: 12px;
`;

export const ContactsIcon = styled(Icon)`
  font-size: 24px;
  margin: 0 auto;
  color: #18A0FB;
`;

export const Container = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 8px 0;
  padding: 0;
  background: #fff;
  /* background: #F5F5; */
`;

export const Image = styled.Image`
  height: 32px;
  width: 32px;
  border-radius: 32px;
  border-width: 1px;
  border-color: #fff;
  background-color: #f5f5f5;

`;
export const ImageBackgroundView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 36px;
  width: 36px;
  border-radius: 36px;
  border-width: 1px;
  border-color: #334466;
  background-color: #fff;
`;


export const OthersView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
  width: 10%;
  background-color: #fff;
`;

export const TabView = styled.View`
  height: 100%;
  width: 5%;
  /* background-color: #334466; */
  background-color: #E7EEFF;

`;
export const UserInfoView = styled.View`
  display: flex;
  flex-direction: row;
  /* justify-content: space-between; */
  align-items: center;
  height: 100%;
  width: 85%;
  padding: 0 12px;
  /* background-color: #4433ee; */
`;
