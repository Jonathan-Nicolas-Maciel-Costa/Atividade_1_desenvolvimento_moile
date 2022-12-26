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
import { Agenda } from '../../src/components/Agenda';

const person = require("../../static/icons/person.svg")
const old_phone = require("../../static/icons/old_phone.svg")

export function Cadastro( {navigation} ) {
  function openScreen()
  {
    navigation.navigate('Listade_Agendamentos')
  }
  
  const [nome, setName] = useState('');
  const [numero, setNumero] = useState('');
  const [data, setData] = useState([]);
  const [datanumber, setDtotal] = useState();
  const [datalist, setLista] = useState();
  const [start, setStart] = useState(0);

  async function save_info(params) {
    const id = uuid.v4(); 
    const Newdata  = {
      id,
      nome,
      numero
    }

    const response = await AsyncStorage.getItem("@saved_data:data");
    const previusData = response ? JSON.parse(response) : [];

    const data = [...previusData, Newdata];

    await AsyncStorage.setItem("@saved_data:data",JSON.stringify(data));
    
    console.log("salvo")
    console.log(data)
    setDtotal(data.length);
  }

 
  
  async function get_info() {
    const response = await AsyncStorage.getAllKeys();
    const info = await AsyncStorage.getItem("@saved_data:data");
    const data = JSON.parse(info);
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
    const lista_data =  [data]
    
  },[]);
  

   const movieItems = [];
   for (var i=0; i < datanumber; i++) {

        try{
          movieItems.push(<Agenda nome={data[i].nome} numero={data[i].numero} id={data[i].id}/>);
        }
        catch(err)
        {
          console.log(err)
        }
    }

  return (
    <View style={styles.container}>
      

      <View style={styles.titulo_background}>
        <Text style={styles.titulo}>Agenda Telefonica - DDM</Text>
        
        <StatusBar style="auto" />
      </View>


      <View style={styles.view_main}>
        <View style={styles.view_input}>
          <Image source={person} style={styles.image_person}/>
          <TextInput  style={styles.gray_color} placeholder='Digite seu nome' onChangeText={setName}>
          </TextInput>
        </View>

        <View style={styles.view_input2}>
          <Image source={old_phone} style={styles.image_phone}/>
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
    
      <Button
        title='Ver de numeros Registrados'
        onPress={openScreen}
      />
    
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
    flexDirection: 'row',
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
    flexDirection: 'row',
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
  image_person:
  {
    width: "18px",
    height: '16px',
    marginTop: "auto",
    marginBottom: "auto",
    marginLeft: "5%",
    marginRight: "5%",
  },
  image_phone:
  {
    width: "20px",
    height: "20px",
    marginTop: "auto",
    marginBottom: "auto",
    marginLeft: "5%",
    marginRight: "5%",
  },
}
);