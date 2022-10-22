import { StyleSheet, Text, Button, View, TextInput, Picker, Switch, Image } from 'react-native';
import { NavigationContainer, PreventRemoveProvider } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import React from "react";

function UserScreen({navigation}){

  const [user, setUser] = useState('');
  const [rol, setRol] = useState('');
  const [pass, setPass] = useState('');
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { usuario:'bastidasd', contra:'col2020' }
  })

  const onSubmit = () => {
    if (user == "bastidasd" && pass=="col2020") {
      setUser("");
      setRol("")
      setPass("")
      navigation.navigate('Cuenta', { rol: rol })
    }else{
      alert("Contraseña o usuario incorrecto")
    }
  };
  
  return(
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Image
            style={{ width: 200, height: 200, marginBottom: 15 }}
            source={require("./assets/bank.png")}
          />
      <Controller control={control}
          rules={{
            required: true, pattern: /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g, maxLength:10, minLength: 3
          }}
          render={({field:{onChange, onBlur}})=>(
            <TextInput
              style={[styles.inputs, {borderColor: errors.usuario?.type == "required" || errors.usuario?.type == "pattern" || errors.usuario?.type
              == "maxLength" || errors.usuario?.type == "minLength" ? 'red' : '#11A88C'}]}
              placeholder="Usuario"
              onChangeText={value => setUser(value)}
              onChange={onChange}
              onBlur={onBlur}
              value={user}
              />
          )}
            name='usuario'
          />
        {errors.usuario?.type == "required" && <Text style={{ color: 'red' }}> El Usuario es obligatorio</Text>}
        {errors.usuario?.type == "maxLength" && <Text style={{ color: 'red' }}> El Usuario no puede exceder 8 caracteres</Text>}
        {errors.usuario?.type == "minLength" && <Text style={{ color: 'red' }}>El Usuario minimo 3 caracteres</Text>}
        {errors.usuario?.type == "pattern" && <Text style={{ color: 'red' }}> El Usuario solo con letras y espacios</Text>}
      
        <TextInput
          style={styles.inputs}
          placeholder="Contraseña"
          secureTextEntry={true}
          onChangeText={value => setPass(value)}
          value={pass}
        />
        <Picker
          selectedValue={rol}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => setRol(itemValue)}
        >
          <Picker.Item label="Seleccione su Rol" value="" />
          <Picker.Item label="Administrador" value="radmin" />
          <Picker.Item label="Usuario" value="ruser" />
        </Picker>

        
        <Button style={styles.colorBtn}
          title="Iniciar Sesión"
          onPress={handleSubmit(onSubmit)}
        />
    </View>
  );
}

function ProfileScreen({ route }) {
  return (
    <View style={styles.container}>
      <Text>Perfil: {route.params.user}</Text>
    </View>
  );
}

function AccountScreen({ route }) {
  return (
    <View style={styles.container}>
      <Text>Cuenta: {route.params.user}</Text>
    </View>
  );
}

function Form () {
  const [values, setValues] = React.useState({
    Nrodecuenta: "",
    identificacion: "",
    titulardelacuenta: "",
    fecha: "",
    saldo: "",
  });
  function handleSubmit(evt) {
    evt.preventDefault();
    // Aquí puedes usar values para enviar la información
  }
  function handleChange(evt) {
    const { target } = evt;
    const { name, value } = target;
    const newValues = {
      ...values,
      [name]: value,
    };
    setValues(newValues);
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="nrodecuenta">Nro de cuenta</label>
      <input
        id="nrodecuenta"
        name="nrodecuenta"
        type="text"
        value={values.nrodecuenta}
        onChange={handleChange}
      />
      <label htmlFor="identificacion">Identificacion</label>
      <input
        id="identificacion"
        name="identificacion"
        type="numb"
        value={values.identificacion}
        onChange={handleChange}
      />
      <label htmlFor="titulardelacuenta">Titular de la cuenta</label>
      <input
        id="titulardelacuenta"
        name="titulardelacuenta"
        type="text"
        value={values.titulardelacuenta}
        onChange={handleChange}
      />
      <label htmlFor="fecha">Fecha</label>
      <input
        id="fecha"
        name="fecha"
        type="date"
        value={values.fecha}
        onChange={handleChange}
      />
      <label htmlFor="saldo">Saldo</label>
      <input
        id="saldo"
        name="saldo"
        type="num"
        value={values.saldo}
        onChange={handleChange}
      />


      <button style={styles.colorBtn} type="submit">Enviar</button>
    </form>
  );
}


function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text>Cuentas</Text>
      <Button
        title="Cuenta"
        onPress={() => navigation.navigate('Feed')}
      />
    </View>
  );
} 

function MovScreen() {
  return (
    <View style={styles.container}>
      <Text>Movimientos</Text>
    </View>
  );
}


const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      {/* tabBarStyle: desactiva el menú bottom */}
      <Tab.Screen name="User" component={UserScreen} options={{
        tabBarStyle: { display: "none" }
      }} />
      <Tab.Screen name="Cuenta" component={AccountScreen} />
      <Tab.Screen name="Moviemientos" component={MovScreen} />

    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeTabs} options={{ title: 'Sistema Bancario' }} />
        <Stack.Screen name="cuentas" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputs: {
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 10,
    padding: 10,
    textAlign: 'center',
    marginBottom: 5
  },
  formulario: {
    fontSize: 18,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    fontWeight: '600',
    paddingLeft: 20,
    borderWidth: 1,
    borderRadius: 7,
    paddingRight: 12,
  }, 
  colorBtn: {
    borderWidth: 1,
    borderColor: '#007BFF',
    backgroundColor: '#007BFF',
    padding: 15,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 7,
  },
  errorText: {
    fontSize: 14,
    color: 'red',
    marginBottom: 20,
    marginLeft: 20
  },
  picker:{
    height: 50, 
    width: 180, 
    margin:5, 
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 10,
  },
  imagen:{

  }
});

