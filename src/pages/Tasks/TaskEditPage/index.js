import React, { useState } from 'react'
import { Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { parseISO } from 'date-fns';
// -----------------------------------------------------------------------------
import {
  AddSubTaskIcon,
  Container,
  DateOptionsView, DateOptions,
  FormScrollView,
  Input, ItemWrapperView,
  LabelText,
  Options,
  RadioButtonView, RadioButtonTag, RadioButtonTagConfirmPhoto,
  RadioButtonLabel, RadioButtonOuter, RadioButtonInner0,
  RadioButtonInner1, RadioButtonInner2, RadioButtonInner3,
  RadioButtonInner4, RadioButtonLabelText,
  SubTaskView, SubTaskItemView, SubTaskButtonView, SubTaskLabelText,
  SubTaskInput, SubTaskText, SubTaskWeigeText,
  SubTaskIcon, SubTaskButton,
  SubmitButton, SubmitButtonText,
  TextWeigeView, TitleText,
  WeigeView, WeigeTagView, WeigeText, WeigeButton,
} from './styles'
import NumberInput from '~/components/NumberInput'
// import SubTasks from '~/components/SubTasks'
import { updateTasks } from '~/store/modules/task/actions';
import api from '~/services/api';

export default function TaskEditPage({ navigation, route }) {
  const dispatch = useDispatch();
  const data = route.params;

  const [name, setName] = useState(data.name);
  const [description, setDescription] = useState(data.description);
  const [prior, setPrior] = useState(data.task_attributes[0]);
  const [urgent, setUrgent] = useState(data.task_attributes[1]);
  const [complex, setComplex] = useState(data.task_attributes[2]);
  const [startDate, setStartDate] = useState(parseISO(data.start_date));
  const [dueDate, setDueDate] = useState(parseISO(data.due_date));

  const [subTaskList, setSubTaskList] = useState(data.sub_task_list);
  const [editSubTaskIndex, setEditSubTaskIndex] = useState();
  const [toggleAddSubTask, setToggleAddSubTask] = useState(false);
  const [addSubTaskInputValue, setAddSubTaskInputValue] = useState();
  const [addWeigeInputValue, setAddWeigeInputValue] = useState(1);
  const [editSubTaskInputValue, setEditSubTaskInputValue] = useState();
  const [editWeigeInputValue, setEditWeigeInputValue] = useState(1);
  const [subTaskToggleEdit, setSubTaskToggleEdit] = useState(false);

  const taskAttributesArray = [ "baixa", "média", "alta", "" ]

  function handleAddSubTask() {
    let editedSubTaskList = subTaskList
    const sub_task_id = Math.floor(Math.random() * 1000000)
    editedSubTaskList.push({
      id: sub_task_id,
      description: addSubTaskInputValue,
      weige: editWeigeInputValue,
      complete: false,
      user_read: true,
    })
    setSubTaskList(editedSubTaskList)
    setAddSubTaskInputValue();
    // console.log(subTaskList)
    navigation.navigate('TaskEdit');
    // dispatch(updateTasks(new Date()))
  }

  function handleOpenEditSubTask(position) {
    setEditSubTaskIndex(position)
    setSubTaskToggleEdit(!subTaskToggleEdit)
    setEditSubTaskInputValue(subTaskList[position].description)
    setEditWeigeInputValue(subTaskList[position].weige)
  }

  function handleEditSubTask(position) {
    let editedSubTaskList = subTaskList.map((s, index) => {
      if (index === position) {
        s.description = editSubTaskInputValue;
        s.weige = editWeigeInputValue;
      }
      return s;
    })
    setSubTaskList(editedSubTaskList)
    setEditSubTaskIndex(null);
    setSubTaskToggleEdit(false);
    // navigation.navigate('TaskEdit',{
    //   sub_task_list: subTaskList,
    // });
  }

  function handleDeleteSubTask(position) {
    let editedSubTaskList = subTaskList
    editedSubTaskList.splice(position, 1)
    setSubTaskList(editedSubTaskList)
    navigation.navigate('TaskEdit',{
      sub_task_list: subTaskList,
    });
  }

  function weigeToPercentage(subTasks) {
    let weigeSum = 0;
    for(let i = 0; i < subTasks.length; i++) {
      weigeSum += parseFloat(subTasks[i].weige)
    }

    for(let i = 0; i < subTasks.length; i++) {
      subTasks[i].weige_percentage = (Math.round((parseFloat(subTasks[i].weige) / weigeSum)*1000) /10)
    }
    return weigeSum;
  }

  async function handleSubmit() {
    try {
      weigeToPercentage(subTaskList)

      await api.put(`tasks/${data.id}/notification/user`, {
        name: name,
        description: description,
        sub_task_list: subTaskList,
        task_attributes: [prior, urgent, complex],
        start_date: startDate,
        due_date: dueDate,
      });
      // dispatch(updateTasks(new Date()))
      // navigation.goBack();
      Alert.alert('Tarefa editada com sucesso!')
    }
    catch(error) {
      console.log(error)
      Alert.alert('Erro ao editar a tarefa.')
    }

  }
  // ---------------------------------------------------------------------------
  return (
    <Container>
      <FormScrollView contentContainerStyle={{ alignItems: 'center'}}>
        <ItemWrapperView>
          <LabelText>Tarefa:</LabelText>
          <Input
            value={name}
            onChangeText={setName}
          ></Input>
        </ItemWrapperView>
        <ItemWrapperView>
          <LabelText>Descrição:</LabelText>
          <Input
            value={description}
            onChangeText={setDescription}
          ></Input>
        </ItemWrapperView>

        <ItemWrapperView>
          <LabelText>Adicionar sub-tarefa:</LabelText>
          <SubTaskView>
            <TextWeigeView>
              <SubTaskInput
                value={addSubTaskInputValue}
                onChangeText={setAddSubTaskInputValue}
                mutiline={true}
              />
              <WeigeView>
                <WeigeTagView>
                  <WeigeText>Peso:</WeigeText>
                  <NumberInput
                    numberInputValue={addWeigeInputValue}
                    setNumberInputValue={setAddWeigeInputValue}
                  />
                </WeigeTagView>
                <WeigeButton onPress={handleAddSubTask}>
                  <AddSubTaskIcon name="check-circle" size={55}/>
                </WeigeButton>
              </WeigeView>
            </TextWeigeView>
          </SubTaskView>
          <LabelText>Sub-tarefas:</LabelText>
          { subTaskList.map((s, index) => (
            <SubTaskView key={index}>
              {
                subTaskToggleEdit && (editSubTaskIndex === index)
                ? (
                  <SubTaskItemView>
                    <SubTaskView>
                    <SubTaskLabelText>{index+1}</SubTaskLabelText>
                    <SubTaskText>{s.description}</SubTaskText>
                    </SubTaskView>
                    <WeigeView>
                      <WeigeTagView>
                        <WeigeText>Peso:</WeigeText>
                        <SubTaskWeigeText>{s.weige}</SubTaskWeigeText>
                      </WeigeTagView>
                      <SubTaskButtonView>
                        <SubTaskButton onPress={() => handleOpenEditSubTask(index)}>
                          <SubTaskIcon name="edit"/>
                        </SubTaskButton>
                        <SubTaskButton onPress={() => handleDeleteSubTask(index)}>
                          <SubTaskIcon name="x-circle"/>
                        </SubTaskButton>
                      </SubTaskButtonView>
                    </WeigeView>
                    <SubTaskView>
                      <TextWeigeView>
                        <SubTaskInput
                          value={editSubTaskInputValue}
                          onChangeText={setEditSubTaskInputValue}
                          mutiline={true}
                        />
                        <WeigeView>
                          <WeigeTagView>
                            <WeigeText>Peso:</WeigeText>
                            <NumberInput
                              numberInputValue={editWeigeInputValue}
                              setNumberInputValue={setEditWeigeInputValue}
                            />
                          </WeigeTagView>
                          <WeigeButton onPress={() => handleEditSubTask(index)}>
                            <AddSubTaskIcon name="check-circle" size={55}/>
                          </WeigeButton>
                        </WeigeView>
                      </TextWeigeView>
                    </SubTaskView>
                  </SubTaskItemView>
                )
                : (
                  <SubTaskItemView>
                    <SubTaskView>
                      <SubTaskLabelText>{index+1}</SubTaskLabelText>
                      <SubTaskText>{s.description}</SubTaskText>
                    </SubTaskView>
                    <WeigeView>
                      <WeigeTagView>
                        <WeigeText>Peso:</WeigeText>
                        <SubTaskWeigeText>{s.weige}</SubTaskWeigeText>
                      </WeigeTagView>
                      <SubTaskButtonView>
                        <SubTaskButton onPress={() => handleOpenEditSubTask(index)}>
                          <SubTaskIcon name="edit"/>
                        </SubTaskButton>
                        <SubTaskButton onPress={() => handleDeleteSubTask(index)}>
                          <SubTaskIcon name="x-circle"/>
                        </SubTaskButton>
                      </SubTaskButtonView>
                    </WeigeView>
                  </SubTaskItemView>
                )
              }
            </SubTaskView>
          ))}
          <LabelText>(não esquecer de confirmar as alterações em sub-tarefas para que sejam salvas)</LabelText>
        </ItemWrapperView>

        <ItemWrapperView>
          <LabelText>Início:</LabelText>
          <DateOptionsView>
            <DateOptions
              date={startDate}
              onDateChange={setStartDate}
              locale='pt'
              is24hourSource='locale'
              androidVariant="nativeAndroid"
              textColor="#666"
              textSize="30"
            />
          </DateOptionsView>
        </ItemWrapperView>

        <ItemWrapperView>
          <LabelText>Prazo:</LabelText>
          <DateOptionsView>
            <DateOptions
              date={dueDate}
              onDateChange={setDueDate}
              locale='pt'
              is24hourSource='locale'
              androidVariant="nativeAndroid"
              textColor="#666"
              textSize="30"
            />
          </DateOptionsView>
        </ItemWrapperView>

        <ItemWrapperView>
          <LabelText>Prioridades:</LabelText>
          <RadioButtonView>
            <RadioButtonTag onPress={() => setPrior(1)}>
              <RadioButtonLabel>baixa</RadioButtonLabel>
              <RadioButtonOuter>
                <RadioButtonInner1 switch={prior}/>
              </RadioButtonOuter>
            </RadioButtonTag>
            <RadioButtonTag onPress={() => setPrior(2)}>
              <RadioButtonLabel>média</RadioButtonLabel>
              <RadioButtonOuter>
                <RadioButtonInner2 switch={prior}/>
              </RadioButtonOuter>
            </RadioButtonTag>
            <RadioButtonTag onPress={() => setPrior(3)}>
              <RadioButtonLabel>alta</RadioButtonLabel>
              <RadioButtonOuter>
                <RadioButtonInner3 switch={prior}/>
              </RadioButtonOuter>
            </RadioButtonTag>
            <RadioButtonTag onPress={() => setPrior(4)}>
              <RadioButtonLabel>n/a</RadioButtonLabel>
              <RadioButtonOuter>
                <RadioButtonInner4 switch={prior}/>
              </RadioButtonOuter>
            </RadioButtonTag>
          </RadioButtonView>
        </ItemWrapperView>

        <ItemWrapperView>
          <LabelText>Urgência:</LabelText>
          <RadioButtonView>
            <RadioButtonTag onPress={() => setUrgent(1)}>
              <RadioButtonLabel>baixa</RadioButtonLabel>
              <RadioButtonOuter>
                <RadioButtonInner1 switch={urgent}/>
              </RadioButtonOuter>
            </RadioButtonTag>
            <RadioButtonTag onPress={() => setUrgent(2)}>
              <RadioButtonLabel>média</RadioButtonLabel>
              <RadioButtonOuter>
                <RadioButtonInner2 switch={urgent}/>
              </RadioButtonOuter>
            </RadioButtonTag>
            <RadioButtonTag onPress={() => setUrgent(3)}>
              <RadioButtonLabel>alta</RadioButtonLabel>
              <RadioButtonOuter>
                <RadioButtonInner3 switch={urgent}/>
              </RadioButtonOuter>
            </RadioButtonTag>
            <RadioButtonTag onPress={() => setUrgent(4)}>
              <RadioButtonLabel>n/a</RadioButtonLabel>
              <RadioButtonOuter>
                <RadioButtonInner4 switch={urgent}/>
              </RadioButtonOuter>
            </RadioButtonTag>
          </RadioButtonView>
        </ItemWrapperView>

        <ItemWrapperView>
          <LabelText>Complexidade:</LabelText>
          <RadioButtonView>
            <RadioButtonTag onPress={() => setComplex(1)}>
              <RadioButtonLabel>baixa</RadioButtonLabel>
              <RadioButtonOuter>
                <RadioButtonInner1 switch={complex}/>
              </RadioButtonOuter>
            </RadioButtonTag>
            <RadioButtonTag onPress={() => setComplex(2)}>
              <RadioButtonLabel>média</RadioButtonLabel>
              <RadioButtonOuter>
                <RadioButtonInner2 switch={complex}/>
              </RadioButtonOuter>
            </RadioButtonTag>
            <RadioButtonTag onPress={() => setComplex(3)}>
              <RadioButtonLabel>alta</RadioButtonLabel>
              <RadioButtonOuter>
                <RadioButtonInner3 switch={complex}/>
              </RadioButtonOuter>
            </RadioButtonTag>
            <RadioButtonTag onPress={() => setComplex(4)}>
              <RadioButtonLabel>n/a</RadioButtonLabel>
              <RadioButtonOuter>
                <RadioButtonInner4 switch={complex}/>
              </RadioButtonOuter>
            </RadioButtonTag>
          </RadioButtonView>
        </ItemWrapperView>

        <ItemWrapperView>
          <LabelText>Funcionário:</LabelText>
          <TitleText>{data.worker.worker_name}</TitleText>
        </ItemWrapperView>

        <ItemWrapperView>
          <SubmitButton onPress={handleSubmit}>
            <SubmitButtonText>Enviar</SubmitButtonText>
          </SubmitButton>
        </ItemWrapperView>

      </FormScrollView>
    </Container>
  )
}
