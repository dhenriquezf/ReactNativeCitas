
import React, { useState } from 'react';
//importo texto y stylos de react-native
import { Text, StyleSheet, View, FlatList, TouchableHighlight, TouchableWithoutFeedback, Platform, Keyboard } from 'react-native';
import Cita from './componentes/Cita';
import Formulario from './componentes/Formulario';


//no existe un body como html, lo mas cercano es un view (es como un div de html)
const App = () => {
  const [mostrarForm, guardarMostrarForm] = useState(false);
  //definir el state de citas
  const [citas, setCitas] = useState([]);

  //datos de prueba
  // [
  //   {id: "1", paciente: "Hook", propietario: 'Juan', sintomas: "No Come"},
  //   {id: "2", paciente: "Redux", propietario: 'Itzel', sintomas: "No Duerme"},
  //   {id: "3", paciente: "Native", propietario: 'Jouse', sintomas: "No Canta"}
  // ]

  //Elimina los pacientes del state
  const eliminarPaciente = id => {
    setCitas((citasActuales) => {
      return citasActuales.filter( cita => cita.id !== id);
    }) 
  }
  //Muestra u oculta formulario
  const mostrarFormulario = () => {
    guardarMostrarForm(!mostrarForm);
  }

  const cerrarTeclado = () => {
    Keyboard.dismiss();
  }

  return (
    <TouchableWithoutFeedback onPress={() => cerrarTeclado()}>
      <View style={styles.contenedor}>
        <Text style={styles.titulo}>Administrador de citas</Text>

        <View> 
            <TouchableHighlight onPress={() => mostrarFormulario()} style={styles.btnMostrar}>
                <Text style={styles.textoMostrar}>{mostrarForm ? 'Cancelar Crear Cita': 'Crear Nueva Cita'}</Text>
            </TouchableHighlight>
        </View> 

        <View style={styles.contenido}>

          { mostrarForm ? (
            <>
              <Text style={styles.titulo}>Crear Nueva Cita</Text>
              <Formulario 
                //si no se pasan estos parametros no los tomara el componente Formulario (parametros)
                citas={citas}
                setCitas={setCitas}
                guardarMostrarForm={guardarMostrarForm}
              />
            </>
          ) : (
            <>
              <Text style={styles.titulo}>{citas.length > 0 ? 'Administra tus citas': 'No hay citas, agrega una'}</Text>

              <FlatList //flatlist es como un map pero optimizado para moviles, renderiza solo lo que esta en pantalla
                style={styles.listado}
                data={citas}
                //le pasamos el elemento
                renderItem={({item}) => <Cita cita={item} eliminarPaciente={eliminarPaciente}/>}
                keyExtractor={ cita => cita.id}
              />
            </>
          )}        
        </View>
        
      </View>
    </TouchableWithoutFeedback>
    
  );
};

//crear constante para los estilos
//para lo estilo se ocupa flexBox
const styles = StyleSheet.create({
  contenedor:{
    backgroundColor: '#AA076B',
    flex: 1
  },
  //se crea como si fuera un objeto de JS
  titulo: {
    color: '#FFF',
    marginTop: Platform.OS === 'ios' ? 40 : 10, //lo toma automatico como pixeles
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  lista: {
    color: '#FFF',
    marginTop: 45,
    textAlign: 'center'
  },
  contenido:{
    flex: 1, //toma y crece todo el espacio que este disponible
    marginHorizontal: '2.5%'
  },
  listado:{
    flex: 1
  },
  btnMostrar:{
    padding: 10,
    backgroundColor: '#7D024E',
    marginVertical: 10
  },
  textoMostrar: {
      color: '#FFF',
      fontWeight: 'bold',
      textAlign: 'center'
  }
})

export default App;
