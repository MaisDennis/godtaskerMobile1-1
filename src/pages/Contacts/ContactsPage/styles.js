import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Feather'
import { TouchableOpacity } from 'react-native'

export const AddIcon = styled(Icon)`
font-weight: 700;
margin: 0 16px;
color: #666;
`;

export const Container = styled.SafeAreaView`
  height: 100%;
`;

export const Header = styled.View`
display: flex;
flex-direction: row;
align-items: center;
justify-content: space-between;
height: 42px; /* maintain in px. */
width: 100%;
background-color: #f5f5f5;
/* background-color: #f5f; */
`;

export const HeaderTouchable = styled(TouchableOpacity)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content:  flex-end;
  width: 15%;
  /* background-color: #f5f; */
`;

export const HeaderTabView = styled.View`
display: flex;
flex-direction: row;
justify-content: space-between;
width: 100%;
height: 5%;
width: 100%;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: true,
  contentContainerStyle: { padding: 0, margin: 0 },
})`
  height: 100%;
`;

export const SearchBarTextInput = styled.TextInput`
  height: 80%;
  width: 65%;
  border-radius: 4px;
  padding: 4px 12px;
  margin: 0 auto;
  background-color: #ddd;
`;

export const Title = styled.Text`
  font-weight: bold;
  font-size: 12px;
  color: #999;
  margin: 12px auto 0;
`;

export const UpperTabView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: auto;
  width: 25%;
  border-radius: 16px;
  margin: 4px auto;
  background-color: #666;
`;
export const UpperTabText = styled.Text`
font-size: 12px;
color: #fff;
`;
