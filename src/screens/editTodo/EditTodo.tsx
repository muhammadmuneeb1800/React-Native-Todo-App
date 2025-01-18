import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function EditTodo() {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  return (
    <View style={style.container}>
      <Text style={style.add}>Edit Task</Text>
      <View style={style.mainDiv}>
        <View style={style.subDiv}>
          <Text style={style.title}>Task Title</Text>
          <TextInput style={style.input} placeholder="Input task title..." />
        </View>
        <View style={style.subDiv}>
          <Text style={style.title}>Notes</Text>
          <TextInput
            multiline={true}
            style={style.inputnotes}
            placeholder="Input task notes..."
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
                {date.toLocaleDateString()} - {date.toLocaleTimeString()}
              </Text>
              <Icon name="edit" size={20} color="#000" style={style.icon} />
            </TouchableOpacity>
          </View>
          <DatePicker
            modal
            open={open}
            date={date}
            onConfirm={selectedDate => {
              setOpen(false);
              setDate(selectedDate);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
        </View>
      </View>
      <TouchableOpacity style={style.addTask}>
        <Text style={style.addText}>Save Task</Text>
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  add: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: '700',
    color: '#0B0A11',
    textAlign: 'center',
    lineHeight: 24,
  },
  mainDiv: {
    marginTop: 35,
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
    marginBottom: 15,
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
    marginTop: 110,
    textAlign: 'center',
  },
  addText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'center',
  },
});
