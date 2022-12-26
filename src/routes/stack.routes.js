import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Cadastro } from '../screens/cadastro_de_numero';
import { Pagina_agenda } from '../screens/lista_dos_agendamentos_cadastrados';
const { Screen, Navigator} = createNativeStackNavigator();


export function Stackroutes(){
    return(
        <Navigator>
            <Screen
            name="Screen_Cadastro"
            component={Cadastro}
            />

            <Screen
            name="Listade_Agendamentos"
            component={Pagina_agenda}
            />
        </Navigator>
    )
}