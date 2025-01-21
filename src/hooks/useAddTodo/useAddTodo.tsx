import {useState} from 'react';
import {Alert} from 'react-native';
import {useAppDispatch} from '../../store/store';
import {AddTodo} from '../../store/slices/dataSlice';
import {useNavigation} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';

type RootStackParam = {
  HomeScreen: {
    screen: 'Home';
  };
};

type NativeProp = BottomTabNavigationProp<RootStackParam>;

export default function useAddTodo() {
  const [title, setTitle] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string>('- Select tags -');
  const [date, setDate] = useState<Date>(new Date());
  const [open, setOpen] = useState<boolean>(false);
  const [isDropdownVisible, setDropdownVisible] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const Navigation = useNavigation<NativeProp>();

  const handleAddTodo = () => {
    if (title === '') {
      Alert.alert('Title is required');
      return;
    }
    if (notes === '') {
      Alert.alert('Notes are required');
      return;
    }
    if (selectedTag === '- Select tags -') {
      Alert.alert('Tags are required');
      return;
    }

    const yesterday = new Date(date);
    yesterday.setDate(date.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);

    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate.getTime() < yesterday.getTime()) {
      Alert.alert('You cannot select a past date');
      return;
    }

    let data = {
      title: title,
      notes: notes,
      tags: selectedTag,
      date: date,
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
