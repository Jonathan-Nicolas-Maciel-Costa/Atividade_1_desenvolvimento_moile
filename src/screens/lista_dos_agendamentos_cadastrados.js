import React from 'react';
import { StatusBar} from 'expo-status-bar';

import { StyleSheet,
         Text, 
         View, 
         TextInput,
         TouchableOpacity,
         FlatList,
         Image,
         Button} from 'react-native';

import {useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

import { Agenda } from '../components/Agenda';

export function Pagina_agenda( ) {
  var [data, setData] = useState([]);
  var [datanumber, setDtotal] = useState();
  var [datalist, setLista] = useState();
  var [start, setStart] = useState(0);


  async function get_info() {
    const response = await AsyncStorage.getAllKeys();
    const info = await AsyncStorage.getItem("@saved_data:data");
    data = JSON.parse(info);
   /*  console.log(JSON.parse(info)); */
   setData(data)
   try{
    setDtotal(parseInt(data.length));
    console.log(data.length, "<<<");
    setStart(1)
   }
   catch(err){
    console.log(err);
    setDtotal(0);
    setStart(0)
   }
   
   if (start == 1)
   {
    var data_total = [] 
    console.log(data)
    for (var i = 0; i < data.length;  i++)
    {
       console.log(data[i]);
       console.log(data[i].id, "<<<");
       data_total[i] = data[i]

    }
    console.log(datalist, '<<<')
    setLista(data_total)
   }
   else
   {

   }
   
  }


  useEffect(() => {
   
    get_info()
  },[]);
  

   const movieItems = [];
   for (var i=0; i < datanumber; i++) {
        
        movieItems.push(<Agenda nome={data[i].nome} numero={data[i].numero} id={data[i].id}/>);
       
    }

  return (
    <View style={{ textAlign: "center", letterSpacing: '0.1px', fontFamily: 'Roboto', fontStyle: 'normal', fontWeight: "bold", fontSize: '25px', backgroundColor: "white", height:"100%"}}>
      Lista de Contatos

      {
        movieItems
      }

      <FlatList
        data={data}
        keyExtractor={item=>item.id}
      />

    </View>
    
  );
}
