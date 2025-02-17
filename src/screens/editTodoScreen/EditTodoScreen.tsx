import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Button from '../../components/button/Button';
import useEditTodo from '../../hooks/useEditTodo/useEditTodo';
import Input from '../../components/input/Input';
import moment from 'moment';
import Header from '../../components/header/Header';
import {Calendar} from 'react-native-calendars';
import {DayPressEvent} from '../../types/types';
import {calenderTheme, style} from './EditTodoScreenStyles';

export default function EditTodo() {
  const {
    title,
    setTitle,
    notes,
    setNotes,
    selectedTag,
    setSelectedTag,
    date,
    setDate,
    handleEditTodo,
    open,
    setOpen,
    isDropdownVisible,
    setDropdownVisible,
  } = useEditTodo();

  const Time = moment(new Date()).valueOf();
  const newTime = moment(Time).format('h:mm A');

  const modleFunction = () => {
    return (
      <Modal transparent={true} animationType="slide" visible={open}>
        <TouchableWithoutFeedback onPress={() => setOpen(false)}>
          <Animated.View style={style.modelcontainer} />
        </TouchableWithoutFeedback>
        <View>
          <View style={style.modelDiv}>
            <TouchableOpacity style={style.line} onPress={() => setOpen(false)}>
              {' '}
            </TouchableOpacity>
            <Text style={style.titleModel}>Add Date</Text>
            <Calendar
              style={style.calendar}
              theme={calenderTheme}
              monthFormat={'MMMM'}
              firstDay={1}
              hideExtraDays={true}
              minDate={new Date().toISOString().split('T')[0]}
              onDayPress={(day: DayPressEvent) => {
                const newDate = moment(day.dateString).format('MMM DD, YYYY');
                setDate(newDate);
              }}
            />
            {date && <Text style={style.selectedDate}>{date}</Text>}
            <Button text="Set Date & Time" onclick={() => setOpen(false)} />
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={style.container}>
      <View>
        <Header title="Edit Task" />
        <View style={style.mainDiv}>
          <View style={style.subDiv}>
            <Input
              text="Task Title"
              value={title}
              onChangeText={setTitle}
              place="Input task title..."
            />
          </View>
          <View style={style.subDiv}>
            <Text style={style.title}>Notes</Text>
            <TextInput
              value={notes}
              onChangeText={setNotes}
              multiline={true}
              style={style.inputnotes}
              placeholder="Input task notes..."
              placeholderTextColor="#0B0A11B2"
            />
          </View>
          <View>
            <View style={style.subDiv}>
              <Text style={style.title}>Tags</Text>
              <TouchableOpacity
                style={style.dropdownContainer}
                onPress={() => setDropdownVisible(!isDropdownVisible)}>
                <Text style={style.dropdownText}>
                  {selectedTag ? selectedTag : '- Select tags -'}
                </Text>
              </TouchableOpacity>
              {isDropdownVisible && (
                <View style={style.dropdownMenu}>
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedTag('Urgent');
                      setDropdownVisible(false);
                    }}>
                    <Text style={style.dropdownItem}>Urgent</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedTag('Normal');
                      setDropdownVisible(false);
                    }}>
                    <Text style={style.dropdownItem}>Normal</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
          <View style={style.subDiv}>
            <Text style={style.remind}>Remind Me</Text>
            <View style={style.dateContainer}>
              <Text style={style.dateLabel}>Date & Time</Text>
              <TouchableOpacity
                style={style.datePicker}
                onPress={() => setOpen(true)}>
                <Text style={style.dateText}>
                  {date} - {newTime}
                </Text>
                <Icon name="edit" size={20} color="#000" style={style.icon} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <View>
        <Button text="Save Task" onclick={handleEditTodo} />
      </View>
      {open && modleFunction()}
    </View>
  );
}
