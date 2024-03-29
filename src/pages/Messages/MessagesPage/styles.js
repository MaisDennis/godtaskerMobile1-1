import styled from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather'
import { TouchableOpacity } from 'react-native'

export const AddIcon = styled(FeatherIcon)`
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
  justify-content: center;
  height: 42px; /* maintain in px. */
  width: 100%;
  background-color: #f5f5f5;
  /* background-color: #f5f; */
`;

export const HeaderTabView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: auto;
  padding: 4px 0;
  /* background-color: #f5f; */
`;
export const HeaderTouchable = styled(TouchableOpacity)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  width: 15%;
  /* background-color: #f5f; */
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: true,
  contentContainerStyle: { padding: 0, margin: 0 },
})`
  height: 100%;
`;

export const SearchBarTextInput = styled.TextInput`
  height: 80%;
  width: 80%;
  border-radius: 4px;
  padding: 4px 12px;
  margin: 0 auto;
  background-color: #ddd;
`;

export const Title = styled.Text`
  font-weight: bold;
  font-size: ${Platform.OS === 'ios' ? '13px' : '12px'};
  color: #999;
  margin: 12px auto 0;
`;
