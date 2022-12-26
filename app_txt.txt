import { StatusBar} from 'expo-status-bar';

import { StyleSheet,
         Text, 
         View, 
         TextInput,
         TouchableOpacity,
         FlatList} from 'react-native';

import {useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import Toast from 'react-native-toast-message';


export default function App() {
  const [nome, setName] = useState('');
  const [numero, setNumero] = useState('');
  const [data, setData] = useState([]);

  async function save_info(params) {
    const id = uuid.v4(); 
    const Newdata  = {
      nome,
      numero
    }

    await AsyncStorage.setItem("@saved_data:data",JSON.stringify(Newdata));
    
    console.log("salvo")
  }

 
  
  async function get_info() {
    const response = await AsyncStorage.getAllKeys();
    const info = await AsyncStorage.getItem("@saved_data:data");
    const data = JSON.parse(info)
   /*  console.log(JSON.parse(info)); */
    setData(data);
  }

  useEffect(() => {
    get_info();

  },[]);
  
  return (
    <View style={styles.container}>

      <View style={styles.titulo_background}>
        <Text style={styles.titulo}>Agenda Telefonica - DDM</Text>
        <StatusBar style="auto" />
      </View>

      <View style={styles.view_main}>
        <View style={styles.view_input}>
          <TextInput  style={styles.gray_color} placeholder='Digite seu nome' onChangeText={setName}>

          </TextInput>
        </View>

        <View style={styles.view_input2}>
          <TextInput activeOpacity={1} style={styles.gray_color} placeholder='Digite seu numero' onChangeText={setNumero}>

          </TextInput>
        </View>

        <TouchableOpacity style={styles.adicionar} onPress={() => save_info()}>
          <Text style={styles.adicionar_title}>Adicionar</Text>
        </TouchableOpacity>
      </View>

      <View>

      </View>

      <View style={styles.gray_block}>
      </View>

      <View  style={styles.lista_contatos}>
      Lista de Contatos
      </View>

      <View style={styles.box_contatos}>
        <View>
          <Text style={styles.nome} >{data.nome}</Text>
          <Text style={styles.numero}>{data.numero}</Text>
        </View>

        <View>

        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  titulo_background:
  {
   
    width: '100%',
    height: '35px',
    backgroundColor: '#613EEA',
    justifyContent:  'center',
    marginBottom: '2%',
  },
  titulo:
  {

    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: '20px',
    textAlign: 'center',
    letterSpacing: '-0.165',

    color: 'white',
  },
  view_main:
  {
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  view_input:
  {
    borderStyle: 'solid',
    borderWidth: "0.5px",
    borderColor: "#A6AAB4",
    borderRadius: "6px",
    width: '241px',
    height: '35px',
    justifyContent: 'center',
    alignItems: 'flex-start',

  },
  view_input2:
  {
    borderStyle: 'solid',
    borderWidth: "0.5px",
    borderColor: "#A6AAB4",
    borderRadius: "6px",
    width: '241px',
    height: '35px',
    marginTop: '18px',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  adicionar:
  {
    borderRadius: "6px",
    backgroundColor: '#613EEA',
    marginTop: '18px',
    width: '241px',
    height: '35px',
    justifyContent: 'center',
    alignItems: 'center', 
  },
  adicionar_title:
  {

    fontFamily: 'Sarabun',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '16px',
    textAlign: 'center',
    letterSpacing: '0.1px',
    color: 'white',
  
  },
  gray_color:
  {
    color: '#A6AAB4',
    width: '241px',
    height: '35px',
    outlineStyle: 'none'
  },
  gray_block:
  {
    width: "100%",
    height: "10px",
    backgroundColor: "#C4C4C4",
    marginTop: "10px",
    marginBottom: "10px",
  },
  nome:
  {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: '15px',
  },
  numero:
  {
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '14px',
  },
  lista_contatos:
  {
    textAlign: "center",
    letterSpacing: '0.1px',
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: "bold",
    fontSize: '25px',
    lineHeight: '30px',
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

    justifyContent: "center",
    alignItems: "center",
  }
  },
);
