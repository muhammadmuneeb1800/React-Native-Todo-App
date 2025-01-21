import {useState} from 'react';
import {Alert} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../store/store';
import {UpdateTodo} from '../../store/slices/dataSlice';
import {useNavigation} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';

type RootStackParam = {
  HomeScreen: {
    screen: 'Home';
  };
};

type NativeProp = BottomTabNavigationProp<RootStackParam>;

export default function useEditTodo() {
  const AllData = useAppSelector(store => store.dataSlice.UpdateTodos) || null;

  const [title, setTitle] = useState<string | undefined>(AllData?.title);
  const [notes, setNotes] = useState<string | undefined>(AllData?.notes);
  const [selectedTag, setSelectedTag] = useState<string | undefined>(
    AllData?.tags,
  );
  const [date, setDate] = useState<Date>(
    new Date(AllData?.dateTime || Date.now()),
  );
  const [open, setOpen] = useState<boolean>(false);
  const [isDropdownVisible, setDropdownVisible] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const Navigation = useNavigation<NativeProp>();

  const handleEditTodo = () => {
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

    if (!date) {
      Alert.alert('You cannot select a past date');
      return;
    }

    let data = {
      id: AllData?.id,
      title: title,
      notes: notes,
      tags: selectedTag,
      date: date,
    };
    dispatch(UpdateTodo(data));
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
    handleEditTodo,
    open,
    setOpen,
    isDropdownVisible,
    setDropdownVisible,
  };
}
