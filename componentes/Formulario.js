import React, { useState } from 'react';
import { Text, StyleSheet, View, TextInput, Button, TouchableHighlight, Alert, ScrollView, SegmentedControlIOSBase } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import shortid from 'shortid';

const Formulario = ({citas, setCitas,guardarMostrarForm}) => {

    const [paciente, guardarPaciente] = useState('');
    const [propietario, guardarPropietario] = useState('');
    const [telefono, guardarTelefono] = useState('');
    const [sintomas, guardarSintomas] = useState('');
    const [fecha, guardarFecha] = useState('');
    const [hora, guardarHora] = useState('');
    
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };
  
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };
  
    const confirmarFecha = (date) => {
        const opciones = {year: 'numeric', month: 'long', day: '2-digit'};
        guardarFecha(date.toLocaleDateString('es-ES', opciones));
        hideDatePicker();
    };

    //Muestra u oculta time picker
    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };
    
    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    const confirmarHora = (time) => {
        const opciones = {hour: 'numeric', minute: '2-digit', hour12: false};
        guardarHora(time.toLocaleString('en-US', opciones));
        hideTimePicker();
    };

    //Muestra una alerta en caso que falle
    const mostrarAlerta = () => {
        //una alerta esta compuesta por : titulo, cuerpo
        Alert.alert(
            'Error', //titulo
            'Todos los campos son obligatorios', //Mensaje
            [{
                text: 'OK' //Arreglo de botones
            }]
        )

    }

    //Crear nueva cita
    const crearNuevaCita = () => {
        console.log('Desde crear nueva cita')
        if (paciente.trim() === '' || propietario.trim() === ''|| telefono.trim() === '' || 
            fecha.trim === '' || hora.trim === '' || sintomas.trim() === '') {
            //Falla la validacion
            console.log('Algo fallo')
            mostrarAlerta();
            return
        }

        //Crear una nueva cita
        const cita = {paciente,propietario,telefono,fecha,hora,sintomas};
        cita.id = shortid.generate();

        //console.log(cita);
        //Agregar al state
        const citasNuevo = [...citas, cita];
        setCitas(citasNuevo);

        //Ocultar el formulario
        guardarMostrarForm(false);

        //Resetear el formulario

        // Alert.alert(
        //     'OK', //titulo
        //     'Se creo la nueva cita ', //Mensaje
        //     [{
        //         text: 'OK' //Arreglo de botones
        //     }]
        //)
    }
    //La direncia entre el flatlist y el scrollView es que el primero renderia solo lo que esta en pantalla
    //(una lista de 100 clientes si solo se ven 10 los otros 90 los renderiza mientras haces scroll)
    //mientras que el scrollView renderiza todo
    return ( 
        <>
        <ScrollView style={styles.formulario}>
            <View>
                <Text style={styles.label}>Paciente</Text>
                <TextInput 
                    style={styles.input}
                    onChangeText={ texto => guardarPaciente(texto)}
                />
            </View>
            <View>
                <Text style={styles.label}>Dueño</Text>
                <TextInput 
                    style={styles.input}
                    onChangeText={ texto => guardarPropietario(texto)}
                />
            </View>
            <View>
                <Text style={styles.label}>Contacto</Text>
                <TextInput 
                    style={styles.input}
                    onChangeText={ texto => guardarTelefono(texto)}
                    keyboardType='numeric'
                />
            </View>
            <View>
            <Text style={styles.label}>Fecha</Text>
                <Button title="Seleccionar Fecha" onPress={showDatePicker} />
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={confirmarFecha}
                    onCancel={hideDatePicker}
                    locale='es-Es'
                    headerTextIOS="Elige la Fecha"
                    cancelTextIOS="Cancelar"
                    confirmTextIOS="Confirmar"
                />
                <Text>{fecha}</Text>
            </View>
            <View>
                <Text style={styles.label}>Hora</Text>
                <Button title="Seleccionar Hora" onPress={showTimePicker} />
                <DateTimePickerModal
                    isVisible={isTimePickerVisible}
                    mode="time"
                    onConfirm={confirmarHora}
                    onCancel={hideTimePicker}
                    locale='es-Es'
                    headerTextIOS="Elige una Hora"
                    cancelTextIOS="Cancelar"
                    confirmTextIOS="Confirmar"
                    is24Hour
                />
                <Text>{hora}</Text>
            </View>
            <View>
                <Text style={styles.label}>Síntomas</Text>
                <TextInput 
                multiline
                    style={styles.input}
                    onChangeText={(texto) => guardarSintomas(texto)}
                />
            </View>
            <View> 
                <TouchableHighlight onPress={() => crearNuevaCita()} style={styles.btnSubmit}>
                    <Text style={styles.textoSubmit}>Crear Nueva Cita</Text>
                </TouchableHighlight>
            </View> 
        </ScrollView>
        </>
     );
}
 
const styles = StyleSheet.create({
    formulario:{
        backgroundColor: '#FFF',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginHorizontal: '2.5%' //cuando es en % se pasa por comillas
    },
    label:{
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 20
    },
    input: {
        marginTop: 10,
        height: 50,
        borderColor: '#e1e1e1',
        borderWidth: 1,
        borderStyle: 'solid'
    },
    btnSubmit:{
        padding: 10,
        backgroundColor: '#7D024E',
        marginVertical: 10
    },
    textoSubmit: {
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center'
    }
})
export default Formulario;