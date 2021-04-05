import styled from 'styled-components/native';

export const AlignView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 40%;
  height: 100%;
  /* background: #4433ee; */
`;

export const HeaderContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  /* background: #F5F5; */
`;

export const HeaderText = styled.Text`
  color: #222;
  font-size: ${Platform.OS === 'ios' ? '13px' : '12px'};
  margin: 0 auto;
  padding: 2px;
  /* background: #F5F5; */
`;

export const HeaderImage = styled.Image`
  height: 36px;
  width: 108px;
  margin: 0 auto;
  /* background: #f00; */
`;
