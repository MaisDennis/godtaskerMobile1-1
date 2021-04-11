import React, { useState, useEffect } from 'react';
import { TouchableOpacity, ScrollView } from 'react-native'
import { useSelector } from 'react-redux';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
// -----------------------------------------------------------------------------
import TaskUser from '~/components/TasksUser';
import HeaderView from '~/components/HeaderView'
import godtaskerFont from '~/assets/detective/godtaskerFontPlainGreySmall.png';
import api from '~/services/api';
import {
  AddIcon,
  Container,
  List,
  Header, HeaderImage, HeaderTabView, HeaderTouchable,
  SpaceView,
  Title, TitleNumber,
  UpperTabView, UpperTabText,
} from './styles';
// -----------------------------------------------------------------------------
export default function UserPage({ navigation }) {
  const [tasks, setTasks] = useState([]);
  const [taskConditionIndex, setTaskConditionIndex] = useState();
  const user_id = useSelector(state => state.user.profile.id);
  const update_tasks = useSelector(state => state.task.tasks);

  useEffect(() => {
    loadTasks('', user_id);
  }, [ update_tasks ]);

  const formattedDate = fdate =>
  fdate == null
    ? '-'
    : format(fdate, "dd 'de' MMMM',' yyyy", { locale: pt });
  const todayDate = formattedDate(new Date())

  async function loadTasks(workerNameFilter, userID) {
    let response = await api.get(`tasks/user/unfinished`, {
      params: { workerNameFilter, userID }
    })
    setTasks(response.data);
    setTaskConditionIndex(1);
  }

  async function loadFinished(workerNameFilter, userID) {
    let response = await api.get(`tasks/user/finished`, {
      params: { workerNameFilter, userID }
    })
    setTasks(response.data);
    setTaskConditionIndex(2);
  }

  async function loadCanceled(workerNameFilter, userID) {
    let response = await api.get(`tasks/user/canceled`, {
      params: { workerNameFilter, userID }
    })
    setTasks(response.data);
    setTaskConditionIndex(3);
  }

  // async function loadAll(workerNameFilter, userID) {
  //   let response = await api.get(`tasks`, {
  //     params: { workerNameFilter, userID }
  //   })
  //   setTasks(response.data);
  // }

  function handleCreateTaskPage() {
    navigation.navigate('TaskCreate')
  }

  // -----------------------------------------------------------------------------
  return (
    <Container>
      <Header>
        <SpaceView>
          <HeaderImage
            source={godtaskerFont}
          />
        </SpaceView>

        <HeaderView data={todayDate}/>
        <HeaderTouchable onPress={() => loadTasks('', user_id)}>
          <AddIcon name='refresh-cw' size={21}/>
        </HeaderTouchable>
        <HeaderTouchable onPress={handleCreateTaskPage}>
          <AddIcon name='plus' size={21}/>
        </HeaderTouchable>
      </Header>

      <HeaderTabView>
        <UpperTabView onPress={() => loadTasks('', user_id)}>
            <UpperTabText>em aberto</UpperTabText>
        </UpperTabView>
        <UpperTabView onPress={() => loadFinished('', user_id)}>
          <UpperTabText>finalizadas</UpperTabText>
        </UpperTabView>
        <UpperTabView onPress={() => loadCanceled('', user_id)}>
          <UpperTabText>canceladas</UpperTabText>
        </UpperTabView>
      </HeaderTabView>
      { tasks == ''
        ? (
          <Title>Sem tarefas nessa condição.</Title>
        )
        : (
          <List
            data={tasks}
            keyExtractor={item => String(item.id)}
            renderItem={({ item, index }) => (
              <>
                <TitleNumber>{index+1}</TitleNumber>
                <TaskUser key={item.id} data={item} navigation={navigation} taskConditionIndex={taskConditionIndex}/>
              </>
            )}
          />
        )
      }
    </Container>
  );
}

