
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather';

export const Container = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin: 4px 0px;
  background: #fff;
  /* background: #F5F5; */
`;

export const LeftDoubleView = styled.View`
display: flex;
flex-direction: row;
align-items: center;
height: 100%;
width: 20%;
background-color: #334466;
background-color: #E7EEFF;
`;

export const LeftView = styled.View`
display: flex;
flex-direction: row;
align-items: center;
height: 100%;
width: 20%;
background-color: #009966;
background-color: #f0fff0;
/* background: ${props => props.colorProp == true ? '#334466' : '#73c479'}; */
`;
export const AlignView = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  /* background-color: #73a6c4; */

`;

export const UserImageBackgroundView = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 52px;
  width: 52px;
  border-radius: 52px;
  border: 1px solid #009966;
  background-color: #fff;
`;
export const WorkerImageBackgroundView = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 52px;
  width: 52px;
  border-radius: 52px;
  border: 1px solid #334466;
  background-color: #fff;
`;

export const Image = styled.Image`
  height: 48px;
  width: 48px;
  border-radius: 48px;
  background-color: #f5f5f5;
`;
export const BodyView = styled.View`
display: flex;
flex-direction: row;
/* justify-content: space-around; */
height: 100%;
width: 80%;
/* background-color: #4433ee; */
`;
export const MainView = styled.View`
display: flex;
flex-direction: column;
height: 100%;
width: 80%;
padding: 8px;
/* background-color: #ee3; */
`;
export const TitleView = styled.View``;

export const TitleWrapper = styled.View`
display: flex;
flex-direction: row;
align-items: center;
width: 100%;
`;

export const TitleIcon = styled(Icon)`
  font-size: 18px;
  color: ${props => props.colorProp == true ? '#334466' : '#009966'};
`;

export const TitleText = styled.Text`
  color: #4433ee;
  font-weight: 700;
  padding: 4px;
  color: ${props => props.colorProp == true ? '#334466' : '#009966'};
`;
export const SenderText = styled.Text`
  font-weight: 700;
  padding: 4px;
`;
export const LastMessageView = styled.View`
min-height: 48px;
padding: 4px;
/* border: 1px solid #ccc; */
border-radius: 4px;
background-color: #f5f5f5;
`;
export const LastMessageTimeView = styled.View`
`;
export const LastMessageText = styled.Text`
  font-weight: 400;
  padding: 4px;
  /* background-color: #f5f5; */
`;
export const RightView = styled.View`
display: flex;
flex-direction: row;
/* justify-content: space-between; */
align-items: center;
width: 20%;
/* padding: 0 4px; */
/* background-color: #f00; */
`;
export const LastMessageTimeText = styled.Text`
  font-size: 12px;
`;
export const UnreadMessageCountView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 24px;
  width: 24px;
  margin: 0;
  border-radius: 24px;
  border: 1px solid #ccc;
  /* background-color: #fff; */
`;
export const MessageIcon = styled(Icon)`
color: #222;
font-size: 21px;
color: #ccc;
padding-top: 12px;
`;
export const UnreadMessageCountText = styled.Text`
  font-size: 12px;
  margin: auto;
  /* background-color: #f00; */
`;
