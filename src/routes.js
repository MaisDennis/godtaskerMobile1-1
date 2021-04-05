import 'react-native-gesture-handler';
import * as React from 'react';
// import { Alert, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  // HeaderStyleInterpolators,
  TransitionPresets,
} from '@react-navigation/stack';
// import { format } from 'date-fns';
// import pt from 'date-fns/locale/pt';
// -----------------------------------------------------------------------------
import ContactCreate from './pages/Contacts/ContactCreatePage';
import ContactEdit from './pages/Contacts/ContactEditPage';
import ContactTasks from './pages/Contacts/ContactTasksPage';

import MessagesConversationPage from './pages/Messages/MessagesConversationPage/index';

import SignInPhone from './pages/SignInPhone';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import UpdateProfile from './pages/UpdateProfile';
import UpdateProfilePhoto from './pages/UpdateProfilePhoto';

import TaskCreate from './pages/Tasks/TaskCreatePage';
import TaskEdit from './pages/Tasks/TaskEditPage';
import Confirm from './pages/Confirm';

import TabRoutes from '~/components/TabRoutes';
import HeaderView from './components/HeaderView'

import TestPage from './pages/TestPage';

import { Header, SpaceView } from './pages/RoutesStyles/styles'

import godtaskerFont from '~/assets/detective/godtaskerFontPlainGreySmall.png';
// -----------------------------------------------------------------------------
const Stack = createStackNavigator();
// -----------------------------------------------------------------------------
export default function App() {
  const signed = useSelector(state => state.auth.signed);
  // console.log(signed)
  // -----------------------------------------------------------------------------
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={signed === true ? 'Home' : 'SignIn'}
        // initialRouteName={'SignIn'}
        screenOptions={{
          headerTitleAlign: "center",
          ...TransitionPresets.ModalTransition,
        }}
      >
      <Stack.Screen name="SignInPhone" component={SignInPhone}
        options={{
          title: 'Entrar',
          headerShown: false,
        }}
      />
      <Stack.Screen name="SignIn" component={SignIn}
        options={{
          title: 'Entrar',
          headerShown: false,
        }}
      />
      <Stack.Screen name="SignUp" component={SignUp}
        options={{
          headerTitle: (() => (
            <Header>

            </Header>
          )),
          headerShown: true,
          headerBackTitleVisible: false,
          headerTintColor: '#fff',
          headerStyle: {
            height: 42,
            backgroundColor: '#222',
          },
        }}
      />
      <Stack.Screen name="TestPage" component={TestPage}
        options={{
          title: 'Entrar',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Home"
        component={TabRoutes}
        options={{
          headerShown: false,
          // headerTitle: (props => (
          // <HeaderView/>
          // )),
          // headerRight: (props => (
          //   <Text style={{'color': '#fff'}}>Hello</Text>
          // )),
          // headerStyleInterpolator: HeaderStyleInterpolators.forFade,
          // headerTintColor: '#fff',
          // // headerBackTitleVisible: false,
          // headerStyle: {
          //   backgroundColor: '#222',
          //   height: 90,
          // },
        }}
      />
      <Stack.Screen
        name="TaskCreate"
        component={TaskCreate}
        options={{
          headerTitle: (() => (
            <Header>
              <SpaceView/>
              <HeaderView data={'Criar uma tarefa'}/>
              <SpaceView/>
            </Header>
          )),
          headerShown: true,
          headerBackTitleVisible: false,
          headerTintColor: '#222',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 24,
          },
          headerStyle: {
            height: 42,
            backgroundColor: '#f5f5f5',
          },
        }}
      />
      <Stack.Screen
        name="TaskEdit"
        component={TaskEdit}
        options={{
          headerTitle: (() => (
            <Header>
              <SpaceView/>
              <HeaderView data={'Editar a tarefa'}/>
              <SpaceView/>
            </Header>
          )),
          headerShown: true,
          headerBackTitleVisible: false,
          headerTintColor: '#222',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 24,
          },
          headerStyle: {
            backgroundColor: '#f5f5f5',
            height: 42,
          },
        }}
      />
      <Stack.Screen
        name="Confirm"
        component={Confirm}
        options={{
          headerTitle: (() => (
            <Header>
              <SpaceView/>
              <HeaderView data={'Finalizar a tarefa'}/>
              <SpaceView/>
            </Header>
          )),
          headerShown: true,
          headerBackTitleVisible: false,
          headerTintColor: '#222',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 24,
          },
          headerStyle: {
            backgroundColor: '#f5f5f5',
            height: 90,
          },
        }}
      />

      <Stack.Screen
        name="ContactEdit"
        component={ContactEdit}
        options={{
          headerTitle: (() => (
            <Header>
              <SpaceView/>
              <HeaderView data={'Editar contato'}/>
              <SpaceView/>
            </Header>
          )),
          headerShown: true,
          headerBackTitleVisible: false,
          headerTintColor: '#222',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 24,
          },
          headerStyle: {
            backgroundColor: '#f5f5f5',
            height: 90,
          },
        }}
      />
      <Stack.Screen
        name="ContactTasks"
        component={ContactTasks}
        options={{
          headerTitle: (() => (
            <Header>
              <SpaceView/>
              <HeaderView data={'Tarefas do contato'}/>
              <SpaceView/>
            </Header>
          )),
          headerShown: true,
          headerBackTitleVisible: false,
          headerTintColor: '#222',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 24,
          },
          headerStyle: {
            backgroundColor: '#f5f5f5',
            height: 90,
          },
        }}
      />
      <Stack.Screen
        name="MessagesConversationPage"
        component={MessagesConversationPage}
        options={{
          headerTitle: (() => (
            <Header>
              <SpaceView/>
              <HeaderView data={'Mensagens'}/>
              <SpaceView/>
            </Header>
          )),
          headerShown: true,
          headerBackTitleVisible: false,
          headerTintColor: '#222',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 24,
          },
          headerStyle: {
            backgroundColor: '#f5f5f5',
            height: 42,
          },
        }}
      />
      <Stack.Screen
        name="UpdateProfile"
        component={UpdateProfile}
        options={{
          headerTitle: (() => (
          <Header>
            <SpaceView/>
            <HeaderView data={'Editar o perfil'}/>
            <SpaceView/>
        </Header>
          )),
          headerShown: true,
          headerBackTitleVisible: false,
          headerTintColor: '#222',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 24,
          },
          headerStyle: {
            height: 42,
            // backgroundColor: '#73c479',
            backgroundColor: '#f5f5f5',
          },
        }}
      />
      <Stack.Screen
        name="ContactCreate"
        component={ContactCreate}
        options={{
          headerTitle: (() => (
          <Header>
            <SpaceView/>
            <HeaderView data={'Adicionar um contato'}/>
            <SpaceView/>
          </Header>
            )),
            headerShown: true,
            headerBackTitleVisible: false,
            headerTintColor: '#222',
            headerStyle: {
              backgroundColor: '#f5f5f5',
              height: 42,
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 24,
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
