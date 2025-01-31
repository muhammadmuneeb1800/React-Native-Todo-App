import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import Icon2 from 'react-native-vector-icons/Entypo';
import {NavigationProps, TodoData} from '../../types/types';
import {DeleteTodo, updateId} from '../../store/slices/todoSlice';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch} from '../../store/store';

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
              <Icon2 name="dots-three-vertical" size={13} color={'#B7B7B7'} />
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
                    dispatch(DeleteTodo(item?.id));
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

const style = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 20,
    color: '#0B0A11',
  },
  top: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date: {
    marginTop: 7,
    color: 'gray',
    fontSize: 13,
    lineHeight: 14,
    fontWeight: '400',
    width: '100%',
  },
  notes: {
    marginTop: 7,
    color: '#0B0A11',
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '400',
    width: '100%',
    zIndex: -1,
  },
  tags: {
    marginTop: 10,
    color: '#fff',
    fontSize: 10,
    lineHeight: 12,
    fontWeight: '400',
    backgroundColor: '#BA1735',
    paddingVertical: 7,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#B7B7B7',
    width: 70,
    textAlign: 'center',
    marginBottom: 10,
  },
  tags1: {
    marginTop: 10,
    color: '#fff',
    fontSize: 10,
    lineHeight: 12,
    fontWeight: '400',
    backgroundColor: '#427DFE',
    paddingVertical: 7,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#B7B7B7',
    width: 70,
    textAlign: 'center',
    marginBottom: 10,
  },
  pop: {
    backgroundColor: '#fff',
    width: 105,
    position: 'absolute',
    top: 15,
    right: 20,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 15,
    elevation: 4,
    zIndex: 1,
  },
  edit: {
    color: '#0B0A11B2',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
    textAlign: 'center',
  },
  delete: {
    color: '#BA1735',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
    textAlign: 'center',
  },
  hr: {
    backgroundColor: '#545458',
    height: 1,
    marginVertical: 3,
  },
  hide: {
    display: 'none',
  },
  tagBtn: {
    width: 70,
  },
});
