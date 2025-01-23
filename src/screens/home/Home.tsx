import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useAppDispatch, useAppSelector} from '../../store/store';
import {TodoData} from '../../types/types';
import FlateList from '../../components/flateList/FlateList';
import {GetTodos} from '../../store/slices/todoSlice';

export default function Home() {
  const Data = useAppSelector(store => store.todoSlice.todos) || null;
  const [isData, setIsData] = useState<boolean>(true);
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState<TodoData[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(GetTodos());
  }, [dispatch]);

  useEffect(() => {
    setFilteredData(Data);
  }, [Data]);

  useEffect(() => {
    if (Data.length > 0) {
      setIsData(true);
    } else {
      setIsData(false);
    }
  }, [Data]);

  const handleFilter = (text: string) => {
    setSearchText(text);
    const filtered = Data.filter(data =>
      data.title?.toUpperCase().includes(text.toUpperCase()),
    );
    setFilteredData(filtered);
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
          <FlateList filteredData={filteredData} />
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
});
