import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import React, {useState} from 'react';
import Icon2 from 'react-native-vector-icons/Entypo';
import {NavigationProps, TodoData} from '../../types/types';
import {deleteTodo, updateId} from '../../store/slices/todoSlice';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch} from '../../store/store';
import {COLORS} from '../../constants/colors';
import {style} from './FlateStyle';

export default function FlateList(props: {filteredData: TodoData[]}) {
  const [open, setOpen] = useState(false);
  const [openItemId, setOpenItemId] = useState<string | null | undefined>(null);
  const navigation = useNavigation<NavigationProps>();
  const dispatch = useAppDispatch();

  const renderItem = ({item}: {item: TodoData}) => {
    return (
      <View key={item?.id}>
        <View style={style.top}>
          <View>
            <Text style={style.title}>{item?.title}</Text>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => {
                setOpen(!open);
                setOpenItemId(item.id);
              }}>
              <Icon2
                name="dots-three-vertical"
                size={13}
                color={COLORS.light}
              />
            </TouchableOpacity>
            {open && openItemId === item?.id ? (
              <View style={style.pop}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('EditTodo');
                    dispatch(updateId(item?.id));
                    setOpen(false);
                  }}>
                  <Text style={style.edit}>Edit Task</Text>
                </TouchableOpacity>
                <View style={style.hr}> </View>
                <TouchableOpacity
                  onPress={() => {
                    dispatch(deleteTodo(item?.id));
                  }}>
                  <Text style={style.delete}>Delete Task</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <>
                <Text style={style.hide}>No Data</Text>
              </>
            )}
          </View>
        </View>
        <Text style={style.date}>
          {item?.createdAt} - {item?.time}
        </Text>
        <Text style={style.notes}>{item?.notes}</Text>
        <TouchableOpacity style={style.tagBtn}>
          <Text style={[item?.tags === 'Urgent' ? style.tags : style.tags1]}>
            {item?.tags}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <FlatList
      data={props.filteredData}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      refreshing={true}
    />
  );
}
