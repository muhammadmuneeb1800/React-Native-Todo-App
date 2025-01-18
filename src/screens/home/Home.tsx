import {
  View,
  StyleSheet,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/Entypo';
import {useAppSelector} from '../../store/store';
export default function Home() {
  const [isData, setIsData] = useState<boolean>(true);

  const Data = useAppSelector(store => store.dataSlice.todos);
  useEffect(() => {
    if (Data.length > 0) {
      setIsData(true);
    } else {
      setIsData(false);
    }
  }, [Data]);

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
        <TextInput style={style.input} placeholder="Search task here…" />
        <Icon name="search" size={20} color={'#B7B7B7'} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {isData ? (
          <View style={style.data}>
            <Text>
              {Data.map(item => {
                const formattedDate = item.dateTime
                  ? item.dateTime instanceof Date
                    ? item.dateTime.toLocaleString()
                    : item.dateTime
                  : 'No date available';
                return (
                  <View key={item.id}>
                    <View>
                      <Text>Data</Text>
                    </View>
                    <View style={style.top}>
                      <Text style={style.title}>{item.title}</Text>
                      <TouchableOpacity>
                        <Icon2
                          name="dots-three-vertical"
                          size={13}
                          color={'#B7B7B7'}
                        />
                      </TouchableOpacity>
                    </View>
                    <Text style={style.date}>{formattedDate}</Text>
                    <Text style={style.notes}>{item.notes}</Text>
                    <Text
                      style={[
                        item.tags === 'Urgent' ? style.tags : style.tags1,
                      ]}>
                      {item.tags}
                    </Text>
                  </View>
                );
              })}
            </Text>
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
      </ScrollView>
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
});
