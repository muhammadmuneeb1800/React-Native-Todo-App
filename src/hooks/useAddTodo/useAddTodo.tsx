import {useState} from 'react';
import {Alert} from 'react-native';
import {useAppDispatch} from '../../store/store';
import {AddTodo} from '../../store/slices/todoSlice';
import {useNavigation} from '@react-navigation/native';
import {NativeProp} from '../../types/types';
import auth from '@react-native-firebase/auth';
import moment from 'moment';

export default function useAddTodo() {
  const dispatch = useAppDispatch();
  const user = auth().currentUser?.uid;
  const Navigation = useNavigation<NativeProp>();
  const [title, setTitle] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string>('- Select tags -');
  const [date, setDate] = useState<Date>(new Date());
  const [open, setOpen] = useState<boolean>(false);
  const [isDropdownVisible, setDropdownVisible] = useState<boolean>(false);

  const handleAddTodo = () => {
    if (title.trim() === '') {
      Alert.alert('Title is required');
      return;
    }
    if (title.length <= 3) {
      Alert.alert('Title should be at least 4 characters long');
      return;
    }
    if (notes.trim() === '') {
      Alert.alert('Notes are required');
      return;
    }
    if (notes.length <= 5) {
      Alert.alert('Notes should be at least 6 characters long');
      return;
    }
    if (selectedTag === '- Select tags -') {
      Alert.alert('Tags are required');
      return;
    }
    if (!date) {
      Alert.alert('You cannot select a past date');
      return;
    }
    if (new Date(date) < new Date()) {
      Alert.alert('You cannot select a past date');
      return;
    }

    const newDate = new Date(date);
    const formateDate = moment(newDate).format('MMM DD, YYYY');
    const time1 = new Date();
    const time = moment(time1).valueOf();
    const formatTime = moment(time).format('hh.mm A');

    let data = {
      user_id: user,
      title: title,
      notes: notes,
      tags: selectedTag,
      createdAt: formateDate,
      time: formatTime,
    };

    dispatch(AddTodo(data));
    Navigation.navigate('HomeScreen', {screen: 'Home'});
    setTitle('');
    setNotes('');
    setSelectedTag('- Select tags -');
    setDate(new Date());
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
    handleAddTodo,
    open,
    setOpen,
    isDropdownVisible,
    setDropdownVisible,
  };
}
