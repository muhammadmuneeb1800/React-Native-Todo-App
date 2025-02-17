import {View, Image, Text, TouchableOpacity, TextInput} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useAppDispatch, useAppSelector} from '../../store/store';
import {TodoData} from '../../types/types';
import FlateList from '../../components/flateList/FlateList';
import {getTodos} from '../../store/slices/todoSlice';
import {style} from './HomeScreenStyles';

export default function Home() {
  const Data = useAppSelector(store => store.todoSlice.todos) || null;
  const [isData, setIsData] = useState<boolean>(true);
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState<TodoData[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTodos());
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
          placeholderTextColor="#0B0A11B2"
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
            <Image source={require('../../assets/images/emptyState.png')} />
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
