import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/Entypo';
import {useAppDispatch, useAppSelector} from '../../store/store';
import {DeleteTodo, GetTodos, updateId} from '../../store/slices/dataSlice';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {TodoData} from '../../types/types';

type RootState = {
  EditTodo?: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootState>;
export default function Home() {
  const Data = useAppSelector(store => store.dataSlice.todos) || null;

  const [isData, setIsData] = useState<boolean>(true);
  const [open, setOpen] = useState(false);
  const [openItemId, setOpenItemId] = useState<string | null | undefined>(null);
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(Data);

  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    if (Data.length > 0) {
      setIsData(true);
    } else {
      setIsData(false);
    }
  }, [Data]);

  useEffect(() => {
    dispatch(GetTodos());
  }, [dispatch]);

  const handleFilter = (text: string) => {
    setSearchText(text);
    const filtered = Data.filter(data =>
      data.title?.toUpperCase().includes(text.toUpperCase()),
    );
    setFilteredData(filtered);
  };

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
          {item?.dateTime?.toLocaleString() || 'No date'}
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
    <View style={style.container}>
      <View style={style.mainDiv}>
        <TouchableOpacity>
          <Icon name="align-left" size={20} color={'#B7B7B7'} />
        </TouchableOpacity>
        <View>
          <Image
            style={style.img}
            source={require('../../assets/images/taskismall.png')}
          />
        </View>
        <TouchableOpacity>
          <Icon name="ellipsis-v" size={16} color={'#B7B7B7'} />
        </TouchableOpacity>
      </View>
      <View style={style.inputDiv}>
        <TextInput
          style={style.input}
          placeholder="Search task here…"
          value={searchText}
          onChangeText={text => handleFilter(text)}
        />
        <Icon name="search" size={20} color={'#B7B7B7'} />
      </View>
      {isData ? (
        <View style={style.data}>
          <FlatList
            data={filteredData}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            refreshing={true}
          />
        </View>
      ) : (
        <>
          <View style={style.nodata}>
            <Image source={require('../../assets/images/EmptyState.png')} />
            <Text style={style.notask}>No Task</Text>
            <Text style={style.looks}>
              Looks like you don't have a task, please add task
            </Text>
          </View>
        </>
      )}
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  mainDiv: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  img: {
    width: 70,
    height: 20,
    resizeMode: 'contain',
  },
  inputDiv: {
    marginTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: '#B7B7B7',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    height: 45,
  },
  input: {
    width: '90%',
    color: '#0B0A11B2',
  },
  data: {
    paddingHorizontal: 10,
    marginTop: 20,
  },
  nodata: {
    marginTop: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notask: {
    marginTop: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 24,
    color: '#0B0A11',
  },
  looks: {
    color: '#0B0A11B2',
    marginTop: 9,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '400',
    textAlign: 'center',
    width: 240,
  },
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
    color: '#0B0A11',
    fontSize: 12,
    lineHeight: 15,
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
