import {
  View,
  Text,
  StyleSheet,
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
              theme={{
                backgroundColor: '#ffffff',
                calendarBackground: '#ffffff',
                textSectionTitleColor: '#b6c1cd',
                textSectionTitleDisabledColor: '#d9e1e8',
                selectedDayBackgroundColor: 'green',
                selectedDayTextColor: 'green',
                todayTextColor: 'green',
                dayTextColor: '#2d4150',
                textDisabledColor: '#d9e1e8',
                dotColor: '#00adf5',
                selectedDotColor: '#ffffff',
                arrowColor: '#2d4150',
                disabledArrowColor: '#d9e1e8',
                monthTextColor: '#000',
                textMonthFontWeight: 'bold',
                textDayFontWeight: '300',
                textDayHeaderFontWeight: '300',
                textDayFontSize: 16,
                textMonthFontSize: 20,
                textDayHeaderFontSize: 14,
              }}
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

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  mainDiv: {
    marginTop: 25,
  },
  subDiv: {
    marginTop: 10,
  },
  title: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
    color: '#0B0A11',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#B7B7B7',
    paddingHorizontal: 10,
    borderRadius: 4,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 18,
    marginBottom: 10,
  },
  inputnotes: {
    borderWidth: 1,
    borderColor: '#B7B7B7',
    paddingHorizontal: 10,
    borderRadius: 4,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 18,
    marginBottom: 10,
    textAlignVertical: 'top',
    height: 120,
  },
  drop: {
    width: 100,
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: '#B7B7B7',
    borderRadius: 4,
    padding: 10,
  },
  dropdownText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#6D6D6D',
  },
  dropdownMenu: {
    borderWidth: 1,
    borderColor: '#B7B7B7',
    borderRadius: 4,
    marginTop: 5,
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  dropdownItem: {
    padding: 10,
    fontSize: 14,
    fontWeight: '400',
    color: '#0B0A11',
  },
  remind: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 18,
    color: '#0B0A11',
    marginBottom: 8,
    marginTop: 12,
  },
  dateContainer: {
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#B7B7B7',
    borderRadius: 4,
    padding: 10,
  },
  dateLabel: {
    fontSize: 14,
    fontWeight: '400',
    color: '#6D6D6D',
  },
  datePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 5,
  },
  dateText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0B0A11',
    marginRight: 5,
    lineHeight: 22,
  },
  icon: {
    marginLeft: 10,
  },
  addTask: {
    backgroundColor: '#7EBB4F',
    borderWidth: 1,
    borderColor: '#7EBB4F',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    textAlign: 'center',
  },
  addText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'center',
  },
  modelcontainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    height: 3,
    borderRadius: 5,
    backgroundColor: '#ddd',
    width: 35,
    marginHorizontal: 'auto',
    marginBottom: 10,
  },
  modelDiv: {
    backgroundColor: '#fff',
    width: '100%',
    height: 'auto',
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  titleModel: {
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 23,
    marginVertical: 10,
  },
  calendar: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  selectedDate: {
    fontSize: 16,
    color: '#333',
    fontWeight: '700',
    textAlign: 'center',
    marginVertical: 15,
  },
  noDateSelected: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginVertical: 10,
  },
  modelText: {
    fontSize: 20,
    fontWeight: '600',
    marginVertical: 20,
    textAlign: 'center',
    lineHeight: 24,
  },
});
