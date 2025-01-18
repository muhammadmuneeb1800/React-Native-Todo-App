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
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [date, setDate] = useState<Date>(new Date());

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
    if (!selectedTag) {
      Alert.alert('Tags are required');
      return;
    }
    if (!date) {
      Alert.alert('Due date is required');
      return;
    }

    let data = {
      title: title,
      notes: notes,
      tags: selectedTag,
      date: date,
    };
    dispatch(AddTodo(data));
    console.log(data);
    Navigation.navigate('HomeScreen', {screen: 'Home'});

    setTitle('');
    setNotes('');
    setSelectedTag(null);
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
  };
}
