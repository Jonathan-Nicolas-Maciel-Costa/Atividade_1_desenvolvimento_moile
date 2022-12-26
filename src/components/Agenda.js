import { StatusBar} from 'expo-status-bar';
import { one } from '../../assets/images/1.png'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { StyleSheet,
         Text, 
         View, 
         TextInput,
         TouchableOpacity,
         FlatList,
         Image} from 'react-native';
import App from '../../App';

import {useState, useEffect } from 'react';
const holdy = require('../../static/icons/trash_can.svg')


export function Agenda(nome) {
  var [restart, setRestart] = useState(0);
  

  async function Delete(id) {
    console.log(id, "<<<<")
    const response = await AsyncStorage.getItem("@saved_data:data");
    const previusData = response ? JSON.parse(response) : [];

    console.log(previusData, "<<<<")

    const data = previusData.filter((previusData) => previusData.id !== id);

    await AsyncStorage.setItem("@saved_data:data", JSON.stringify(data));
    
    setRestart(restart + 1)
    console.log(restart )
    console.log(data, 'passou')
    
  }

  return (
  
    <View style={styles.box_center}>
      <View style={styles.box_contatos}>

        <View style={styles.View_name_number}>

          <View style={styles.nome_box}>
            <Text numberOfLines={1} style={styles.nome}>{nome.nome}</Text>
            </View>      
          <View style={styles.number_box}>
            <Text numberOfLines={1} style={styles.numero}> {nome.numero}</Text>
            </View>  

        </View>
        
        <TouchableOpacity style={styles.buttom_delete} onPress={() => Delete(nome.id)}>
          <Image source={holdy} style={styles.image} />
        </TouchableOpacity>
        
      </View> 
    </View>
  );
}

const styles = StyleSheet.create({
  nome:
  {
    flex: 1,
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: '15px',
    marginLeft: '24px',
    overflow: "hidden"
    
  },
  numero:
  {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '14px',
    marginLeft: '24px',
    overflow: "hidden",
  },
  box_center:
  {
    width:"100%",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: "1%",
  },
  box_contatos:
  {
    width: '228px',
    height: '61px',
    backgroundColor: "#F4F4F4",
    borderRadius: '10px',

    borderStyle: 'solid',
    borderWidth: "1px",
    borderColor: "#B6B4B4",
    borderRadius: "10px",
    flexDirection:  'row',
    justifyContent: "space-between",
    alignItems: "center",
    overflow: "hidden",
  },
  nome_box:
  {
    flexGrow: 1, 
    flexDirection: 'row'
    
  },
  image: {
    width: 20,
    height: 20,
  },
  buttom_delete:
  {
    width: 20,
    height: 20,
    marginRight: '5%',
  },
  View_name_number:
  {
    maxWidth:"170px",
    overflow: 'hidden',
    flexShrink: "0",
    alignItems: "flex-start",
    flexWrap:"nowrap"
  },
  },
);
