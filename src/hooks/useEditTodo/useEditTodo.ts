import {useState} from 'react';
import {Alert} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../store/store';
import {updateTodo} from '../../store/slices/todoSlice';
import {useNavigation} from '@react-navigation/native';
import {NativeProp} from '../../types/types';
import moment from 'moment';

export default function useEditTodo() {
  const AllData = useAppSelector(store => store.todoSlice.UpdateTodos) || null;
  const Navigation = useNavigation<NativeProp>();
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState<string | undefined>(AllData?.title);
  const [notes, setNotes] = useState<string | undefined>(AllData?.notes);
  const [selectedTag, setSelectedTag] = useState<string | undefined>(
    AllData?.tags,
  );
  const [date, setDate] = useState(AllData?.createdAt);
  const [open, setOpen] = useState<boolean>(false);
  const [isDropdownVisible, setDropdownVisible] = useState<boolean>(false);

  const handleEditTodo = () => {
    if (title === undefined || title?.trim() === '') {
      Alert.alert('Title is required');
      return;
    }
    if (title.length <= 3) {
      Alert.alert('Title should be at least 4 characters long');
      return;
    }
    if (notes === undefined || notes.trim() === '') {
      Alert.alert('Notes are required');
      return;
    }
    if (notes.length <= 5) {
      Alert.alert('Notes should be at least 6 characters long');
      return;
    }
    if (selectedTag === '- Select tags -') {
      Alert.alert('Please select a valid tag');
      return;
    }
    if (!date) {
      Alert.alert('Please select a date');
      return;
    }
    if (new Date(date) < new Date()) {
      Alert.alert('You cannot select a past date');
      return;
    }

    const time1 = new Date();
    const time = moment(time1).valueOf();
    const formatTime = moment(time).format('hh.mm A');

    let data = {
      id: AllData?.id,
      title: title,
      notes: notes,
      tags: selectedTag,
      createdAt: date,
      time: formatTime,
    };

    dispatch(updateTodo(data));
    Navigation.navigate('HomeScreen', {screen: 'Home'});

    setTitle('');
    setNotes('');
    setSelectedTag('- Select tags -');
    setDate('');
  };
  return {
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
  };
}
