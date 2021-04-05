/* eslint-disable react/prop-types */
import React, { useEffect, useState, useMemo } from 'react';
import { TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { format, parseISO } from 'date-fns';
import CheckBox from '@react-native-community/checkbox';
import Modal from 'react-native-modal';
import firestore from '@react-native-firebase/firestore';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/Feather';
// -----------------------------------------------------------------------------
// import Button from '~/components/Button';
import {
  AsideView, AlignBottomView, AlignView,
  AlignDatesView, AlignDetailsView, AlignCheckBoxView, AcceptButton,
  ButtonView, ButtonText, BottomHeaderView,
  BellIcon, ButtonIcon, ButtonWrapper,
  ConfirmButton, CheckBoxView, Container,
  DescriptionView, DescriptionBorderView, DescriptionSpan,
  DatesAndButtonView, DueTimeView, DueTime, DetailsView,
  HeaderView, HrLine,
  Image, ImageView, ImageWrapper, InnerStatusView,
  Label, LabelInitiated, LabelEnded,
  ModalView, ModalText, MessageButton, MiddleHeaderView, MainHeaderView,
  NameText,
  OuterStatusView,
  RejectTaskInput, RejectButton,
  StartTimeView, StartTime,
  TopHeaderView, TagView, TitleView, TaskIcon,
  TitleText, TaskAttributesView,
  UnreadMessageCountText, UserView, UserImage, UserImageBackground,
} from './styles';
import { updateTasks } from '~/store/modules/task/actions';
import api from '~/services/api';
// import message from '../../store/modules/message/reducer';
// import firebase from '~/services/firebase'
// -----------------------------------------------------------------------------
const taskAttributesArray = [ 'baixa', 'média', 'alta', '-']
const formattedDate = fdate =>
  fdate == null
    ? '-'
    : format(parseISO(fdate), "dd'-'MMM'-'yyyy", { locale: pt });

const formattedDateTime = fdate =>
  fdate == null
    ? '-'
    : format(parseISO(fdate), "dd'-'MMM'-'yyyy HH:mm", { locale: pt });

export default function Task({ data, navigation, taskConditionIndex }) {
  const dispatch = useDispatch();
  const userData = data.user
  const dueDate = parseISO(data.due_date);
  const subTasks = data.sub_task_list

  const [toggleTask, setToggleTask] = useState();
  const [toggleModal, setToggleModal] = useState(false);
  const [toggleConfirmModal, setToggleConfirmModal] = useState(false);
  const [rejectTaskInputValue, setRejectTaskInputValue] = useState();
  const [updateStatus, setUpdateStatus] = useState();
  const [messageBell, setMessageBell] = useState();
  const[statusResult, setStatusResult] = useState(0);

  useEffect (() => {
    handleMessageBell()
  }, [data])

  useMemo(() => {
    return handleStatus()
  }, [updateStatus]);

  async function handleMessageBell() {
    // const response = await api.get(`messages/${data.message_id}`)
    // setMessageBell(response.data.messages)

    const unsubscribe = firestore()
      .collection(`messages/task/${data.id}`)
      .orderBy('createdAt')
      .onSnapshot((querySnapshot) => {
        try {
          const data = querySnapshot.docs.map(d => ({
            ...d.data(),
          }));
          // lastMessageRef.current.scrollToEnd({ animated: false })
          setMessageBell(data)
        }
        catch {
          console.log('Error from querySnapshot')
        }

      })
    return unsubscribe;
  }

  async function handleStatus() {
    let weige = 0;
    subTasks.map(s => {
      if(s.complete === true) {
        weige = weige + s.weige_percentage
      }
    })

    const response = await api.put(`tasks/${data.id}`, {
      status_bar: Math.round(weige)
    })
    setStatusResult(response.data.status_bar)
    // return Math.round(weige);
    return;
  }

  const pastDueDate = () => {
    let flag = false;
    new Date() > dueDate ? flag = true : flag = false
    return flag
  }

  async function updateBell(editedSubTaskList) {
    await api.put(`tasks/${data.id}`, {
      sub_task_list: editedSubTaskList
    })
  }

  function handleToggleTask() {
    setToggleTask(!toggleTask)
    if(hasUnread(data.sub_task_list) !== 0) {
      const editedSubTaskList = data.sub_task_list
      editedSubTaskList.map(e => {
        e.worker_read = true
      })
      updateBell(editedSubTaskList)
    }
  }

  async function handletoggleCheckBox(value, position) {
    const editedSubTaskList = data.sub_task_list
    editedSubTaskList[position].complete = value
    editedSubTaskList[position].user_read = false

    await api.put(`tasks/${data.id}`, {
      sub_task_list: editedSubTaskList,
    })
    dispatch(updateTasks(new Date()))
    setUpdateStatus(new Date())
  }

  function handleMessage() {
    navigation.navigate('MessagesConversationPage', {
      id: data.id,
      user_id: data.user.id,
      user_name: data.user.user_name,
      worker_id: data.worker.id,
      worker_name: data.worker.worker_name,
      worker_phonenumber: data.workerphonenumber,
      message_id: data.message_id,
      messages: data.messages,
      avatar: data.user.avatar,
    });
  }

  function handleConfirm() {
    if(data.confirm_photo) {
      navigation.navigate('Confirm', {
        task_id: data.id, taskName: data.name
      });
    } else {
      setToggleConfirmModal(!toggleConfirmModal)
    }
  }

  async function handleConfirmWithoutPhoto() {
    await api.put(`tasks/confirm/${data.id}`);
    setToggleConfirmModal(!toggleConfirmModal)
    dispatch(updateTasks(new Date()))
  }

  async function handleToggleAccept() {
    // setToggleAccept(!toggleAccept)
    await api.put(`tasks/${data.id}/notification/worker`, {
      status: {
        status: 2,
        comment: `Accepted on ${new Date()}`,
      },
      initiated_at: new Date(),
    })
    dispatch(updateTasks(new Date()))
  }

  async function handleCancelTask() {
    await api.put(`tasks/${data.id}/notification/worker`, {
      status: {
        status: 4,
        canceled_by: "worker",
        comment: `Declined. Comment: ${rejectTaskInputValue}`,
      },
      canceled_at: new Date(),
    });
    setToggleModal(!toggleModal)
    dispatch(updateTasks(new Date()))
  }

  const hasUnread = (array) => {
    try {
      let sum = 0;
      for(let i = 0; i < array.length; i++) {
        if(array[i].worker_read === false) {
          sum += 1
        }
      }
      return sum
    } catch(error) {
      return
    }
  }
  // -----------------------------------------------------------------------------
  return (
    <Container taskConditionIndex={taskConditionIndex}>
      <TouchableOpacity onPress={handleToggleTask}>
        <TopHeaderView taskConditionIndex={taskConditionIndex}>
          <TitleView>
            <TaskIcon name="clipboard" pastDueDate={pastDueDate()}/>
            <TitleText pastDueDate={pastDueDate()}>{data.name} </TitleText>
          </TitleView>
        </TopHeaderView>

        <HeaderView>
          <MainHeaderView>
            <MiddleHeaderView>
              <UserView>
                <Label>De:</Label>
                { userData === undefined || userData.avatar === null
                  ? (
                    <UserImage/>
                    // <SenderText>Hi</SenderText>
                  )
                  : (
                    <UserImageBackground>
                      { Platform.OS === 'ios'
                        ? (<UserImage source={{ sourceURL: userData.avatar.url }}/>)
                        : (<UserImage source={{ uri: userData.avatar.url }}/>)
                      }
                    </UserImageBackground>
                  )
                }
                <NameText pastDueDate={pastDueDate()}>{data.user.user_name}</NameText>
              </UserView>

              <AlignDatesView>
                <DatesAndButtonView>
                  <TagView>
                    { data.initiated_at
                      ? (
                        <>
                          <LabelInitiated>Início:</LabelInitiated>
                          <StartTimeView>
                            <StartTime>{formattedDate(data.initiated_at)}</StartTime>
                          </StartTimeView>
                        </>
                      )
                      : (
                        <>
                          <Label>Início:</Label>
                          <StartTimeView initiated={data.initiated_at}>
                            <StartTime>{formattedDate(data.start_date)}</StartTime>
                          </StartTimeView>
                        </>
                      )
                    }
                  </TagView>
                  <TagView>
                   { data.end_date
                      ? (
                        <>
                          <LabelEnded pastDueDate={pastDueDate()}>Finalizou!</LabelEnded>
                          <DueTimeView pastDueDate={pastDueDate()}>
                            <DueTime>{formattedDate(data.end_date)}</DueTime>
                          </DueTimeView>
                        </>
                      )
                      : (
                        <>
                          <Label>Prazo:</Label>
                          <DueTimeView pastDueDate={pastDueDate()}>
                            <DueTime>{formattedDate(data.due_date)}</DueTime>
                          </DueTimeView>
                        </>
                      )
                    }
                  </TagView>
                </DatesAndButtonView>
                <DatesAndButtonView>
                  <TagView>
                    <Label>Prioridade:</Label>
                    <TaskAttributesView taskAttributes={data.task_attributes[0]-1}>
                      <DueTime>{taskAttributesArray[JSON.stringify(data.task_attributes[0]-1)]}</DueTime>
                    </TaskAttributesView>
                  </TagView>
                  <TagView>
                    <Label>Urgência:</Label>
                    <TaskAttributesView taskAttributes={data.task_attributes[1]-1}>
                      <DueTime>{taskAttributesArray[data.task_attributes[1]-1]}</DueTime>
                    </TaskAttributesView>
                  </TagView>
                </DatesAndButtonView>
              </AlignDatesView>
            </MiddleHeaderView>

            <BottomHeaderView>
              <OuterStatusView>
                <InnerStatusView
                  statusResult={statusResult}
                  colors={['#ffdd33', '#ff892e']}
                  start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                  style={{ width: `${statusResult}%`}}
                ></InnerStatusView>
              </OuterStatusView>
              <StartTime>{statusResult}%</StartTime>
            </BottomHeaderView>
          </MainHeaderView>

          <AsideView>
            <AlignView>
              { (hasUnread(data.sub_task_list) === 0)
                ? (
                  null
                )
                : (
                  <BellIcon name="bell">
                    <UnreadMessageCountText>{hasUnread(data.sub_task_list)}</UnreadMessageCountText>
                  </BellIcon>
                )
              }
              { (hasUnread(messageBell) === 0)
                ? (
                  null
                )
                : (
                  <BellIcon name="message-circle">
                    <UnreadMessageCountText>{hasUnread(messageBell)}</UnreadMessageCountText>
                  </BellIcon>
                )
              }
            </AlignView>
          </AsideView>
        </HeaderView>
      </TouchableOpacity>
      { toggleTask && (
        <>
          <DescriptionView>
            {/* ------------------------------------------------------------ */}
            <HrLine/>
            <Label>Descrição</Label>
            <DescriptionBorderView pastDueDate={pastDueDate()}>
              <DescriptionSpan>{data.description}</DescriptionSpan>
            </DescriptionBorderView>
          </DescriptionView>
          <DescriptionView>
            <Label>Sub-tarefas</Label>
            <DescriptionBorderView pastDueDate={pastDueDate()}>
              { data.sub_task_list.map((s, index) => (
                <AlignCheckBoxView key={s.id}>
                  <CheckBoxView>
                    { data.status && data.status.status !== 1 && (
                      <CheckBox
                        disabled={false}
                        value={s.complete}
                        onValueChange={
                          (newValue) => handletoggleCheckBox(newValue, index)
                        }
                      />
                    )}
                    <DescriptionSpan>{s.weige_percentage}%</DescriptionSpan>
                    <DescriptionSpan type="check-box">{s.description}</DescriptionSpan>
                  </CheckBoxView>
                </AlignCheckBoxView>
              ))}
            </DescriptionBorderView>
          </DescriptionView>

          <AlignDetailsView>
            <DetailsView>
              <TagView>
                <Label>Prazo com horário:</Label>
                <DueTimeView pastDueDate={pastDueDate()}>
                  <DueTime>{formattedDateTime(data.due_date)}</DueTime>
                </DueTimeView>
              </TagView>
            </DetailsView>
            <DetailsView>
              <TagView>
                <Label>Complexidade:</Label>
                <TaskAttributesView taskAttributes={data.task_attributes[1]-1}>
                  <DueTime>{taskAttributesArray[data.task_attributes[1]-1]}</DueTime>
                </TaskAttributesView>
              </TagView>
            </DetailsView>

            <DetailsView>
              <TagView>
                <Label>Confirmação com foto?</Label>
                { data.confirm_photo
                  ? <NameText>Sim</NameText>
                  : <NameText>Não</NameText>
                }
              </TagView>
            </DetailsView>
          </AlignDetailsView>
          {/* -------------------------------------------------------------- */}
          <HrLine/>
          { data.status && data.status.status !== 1
            ? (
              <DatesAndButtonView>
                <ButtonView onPress={handleMessage}>
                  <ConfirmButton >
                    <ButtonIcon name="message-circle"/>
                  </ConfirmButton>
                </ButtonView>
                { taskConditionIndex === 1
                  ? (
                    <ButtonView onPress={handleConfirm}>
                      <ConfirmButton>
                        <ButtonIcon name="check-circle"/>
                      </ConfirmButton>
                    </ButtonView>
                  )
                  : (
                    <ButtonView>
                      <ConfirmButton>
                        <ButtonIcon name="trash-2" style={{color: '#ccc'}}/>
                      </ConfirmButton>
                    </ButtonView>
                  )

                }
              </DatesAndButtonView>
            )
            : (
              <ButtonWrapper>
                { taskConditionIndex === 1
                  ? (
                    <>
                      <ModalText>Tem certeza de que quer recusar a tarefa?</ModalText>
                      <ButtonView onPress={handleToggleAccept}>
                        <AcceptButton>
                          <ButtonText>Aceitar</ButtonText>
                        </AcceptButton>
                      </ButtonView>
                      <ButtonView onPress={() => setToggleModal(!toggleModal)}>
                        <RejectButton>
                        <ButtonText>Recusar</ButtonText>
                        </RejectButton>
                      </ButtonView>
                    </>
                  )
                  : (
                    null
                  )
                }
              </ButtonWrapper>
            )
          }
          { data.signature &&
            <ImageWrapper>
              <Label>Foto de confirmação:</Label>
              <ImageView>
                { Platform.OS === 'ios'
                  ? (<Image source={{ sourceURL: data.signature.url }}/>)
                  : (<Image source={{ uri: data.signature.url }}/>)
                }
              </ImageView>
            </ImageWrapper>
          }
          <Modal isVisible={toggleModal}>
            <ModalView>
              <ModalText>Tem certeza de que quer recusar a tarefa?</ModalText>
              <RejectTaskInput
                placeholder="Comentário"
                value={rejectTaskInputValue}
                onChangeText={setRejectTaskInputValue}
                mutiline={true}
              />
              <DatesAndButtonView>
                <ButtonView onPress={handleCancelTask}>
                  <AcceptButton>
                    <ButtonText>Sim</ButtonText>
                  </AcceptButton>
                </ButtonView>
                <ButtonView onPress={() => setToggleModal(!toggleModal)}>
                  <RejectButton>
                  <ButtonText>Voltar</ButtonText>
                  </RejectButton>
                </ButtonView>
              </DatesAndButtonView>
            </ModalView>
          </Modal>

          <Modal isVisible={toggleConfirmModal}>
            <ModalView>
              <ModalText>Tem certeza de que deseja confirmar e finalizar a tarefa?</ModalText>
                {/* <DescriptionBorderView pastDueDate={pastDueDate()}> */}
                {/* </DescriptionBorderView> */}
              <DatesAndButtonView>
                <ButtonView onPress={handleConfirmWithoutPhoto}>
                  <AcceptButton>
                    <ButtonText>Sim</ButtonText>
                  </AcceptButton>
                </ButtonView>
                <ButtonView onPress={() => setToggleConfirmModal(!toggleConfirmModal)}>
                  <RejectButton>
                    <ButtonText>Voltar</ButtonText>
                  </RejectButton>
                </ButtonView>
              </DatesAndButtonView>
            </ModalView>
          </Modal>
        </>
      )}
    </Container>
  );
}