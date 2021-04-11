import 'react-native-gesture-handler';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
// -----------------------------------------------------------------------------
import Confirm from './pages/Confirm';
import ContactCreate from './pages/Contacts/ContactCreatePage';
import ContactEdit from './pages/Contacts/ContactEditPage';
import ContactTasks from './pages/Contacts/ContactTasksPage';

import MessagesConversationPage from './pages/Messages/MessagesConversationPage/index';

import SignInPhone from './pages/SignInPhone';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

import TabRoutes from '~/components/TabRoutes';
import TestPage from './pages/TestPage';
import TaskCreate from './pages/Tasks/TaskCreatePage';
import TaskEdit from './pages/Tasks/TaskEditPage';

import UpdateProfile from './pages/UpdateProfile';
// import UpdateProfilePhoto from './pages/UpdateProfilePhoto';

import HeaderView from './components/HeaderRoutesView'
// -----------------------------------------------------------------------------
const Stack = createStackNavigator();
const headerBackVisible = false;
const headerHeight = 42;
const headerBackFontSize = 12;
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
          headerTitle: (() => (<HeaderView data={'Criar um usuário'}/>)),
          headerShown: true,
          headerStyle: {
            height: headerHeight,
            backgroundColor: '#f5f5f5',
          },
          headerBackTitleVisible: headerBackVisible,
          headerBackTitle: "Voltar",
          headerBackTitleStyle: {
            fontSize: headerBackFontSize,
            marginLeft: 8,
            color: '#4433ee',
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
        }}
      />
      <Stack.Screen
        name="TaskCreate"
        component={TaskCreate}
        options={{
          headerTitle: (() => (<HeaderView data={'Criar uma tarefa'}/>)),
          headerShown: true,
          headerStyle: {
            height: headerHeight,
            backgroundColor: '#f5f5f5',
          },
          headerBackTitleVisible: headerBackVisible,
          headerBackTitle: "Voltar",
          headerBackTitleStyle: {
            fontSize: headerBackFontSize,
            marginLeft: 8,
            color: '#4433ee',
          },
        }}
      />
      <Stack.Screen
        name="TaskEdit"
        component={TaskEdit}
        options={{
          headerTitle: (() => (<HeaderView data={'Editar a tarefa'}/>)),
          headerShown: true,
          headerStyle: {
            height: headerHeight,
            backgroundColor: '#f5f5f5',
          },
          headerBackTitleVisible: headerBackVisible,
          headerBackTitle: "Voltar",
          headerBackTitleStyle: {
            fontSize: headerBackFontSize,
            marginLeft: 8,
            color: '#4433ee',
          },
        }}
      />
      <Stack.Screen
        name="Confirm"
        component={Confirm}
        options={{
          headerTitle: (() => (<HeaderView data={'Finalizar a tarefa'}/>)),
          headerShown: true,
          headerStyle: {
            height: headerHeight,
            backgroundColor: '#f5f5f5',
          },
          headerBackTitleVisible: headerBackVisible,
          headerBackTitle: "Voltar",
          headerBackTitleStyle: {
            fontSize: headerBackFontSize,
            marginLeft: 8,
            color: '#4433ee',
          },
        }}
      />
      <Stack.Screen
        name="ContactCreate"
        component={ContactCreate}
        options={{
          headerTitle: (() => (<HeaderView data={'Adicionar um contato'}/>)),
            headerShown: true,
            headerStyle: {
              height: headerHeight,
              backgroundColor: '#f5f5f5',
            },
            headerBackTitleVisible: headerBackVisible,
            headerBackTitle: "Voltar",
            headerBackTitleStyle: {
              fontSize: headerBackFontSize,
              marginLeft: 8,
              color: '#4433ee',
            },
          }}
        />
      <Stack.Screen
        name="ContactEdit"
        component={ContactEdit}
        options={{
          headerTitle: (() => (<HeaderView data={'Editar contato'}/>)),
          headerShown: true,
          headerStyle: {
            height: headerHeight,
            backgroundColor: '#f5f5f5',
          },
          headerBackTitleVisible: headerBackVisible,
          headerBackTitle: "Voltar",
          headerBackTitleStyle: {
            fontSize: headerBackFontSize,
            marginLeft: 8,
            color: '#4433ee',
          },
        }}
      />
      <Stack.Screen
        name="ContactTasks"
        component={ContactTasks}
        options={{
          headerTitle: (() => (<HeaderView data={'Tarefas do contato'}/>)),
          headerShown: true,
          headerStyle: {
            height: headerHeight,
            backgroundColor: '#f5f5f5',
          },
          headerBackTitleVisible: headerBackVisible,
          headerBackTitle: "Voltar",
          headerBackTitleStyle: {
            fontSize: headerBackFontSize,
            marginLeft: 8,
            color: '#4433ee',
          },
        }}
      />
      <Stack.Screen
        name="MessagesConversationPage"
        component={MessagesConversationPage}
        options={{
          headerTitle: (() => (<HeaderView data={'Mensagens'}/>)),
          headerShown: true,
          headerStyle: {
            height: headerHeight,
            backgroundColor: '#f5f5f5',
          },
          headerBackTitleVisible: headerBackVisible,
          headerBackTitle: "Voltar",
          headerBackTitleStyle: {
            fontSize: headerBackFontSize,
            marginLeft: 8,
            color: '#4433ee',
          },
        }}
      />
      <Stack.Screen
        name="UpdateProfile"
        component={UpdateProfile}
        options={{
          headerTitle: (() => (<HeaderView data={'Editar o perfil'}/>)),
          headerShown: true,
          headerStyle: {
            height: headerHeight,
            backgroundColor: '#f5f5f5',
          },
          headerBackTitleVisible: headerBackVisible,
          headerBackTitle: "Voltar",
          headerBackTitleStyle: {
            fontSize: headerBackFontSize,
            marginLeft: 8,
            color: '#4433ee',
          },
        }}
      />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
