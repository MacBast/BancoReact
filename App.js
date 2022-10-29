import { StyleSheet, Text, Button, View, TextInput, Picker, Switch, Image, TouchableOpacity } from 'react-native';
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
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:'#AAEBD7' }}>
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

function AccountScreen({ route }) {
  
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: "",
      holderAccount: "",
      date: "",
      balance: "",
    },
  });

  const getNroAccount = () => Math.floor(Math.random() * 100);

  const [nroAccount, setNroAccount] = useState(getNroAccount());
  const [complete, setComplete] = useState(false);
  const [data, setData] = useState({});

  const onSubmit = (data) => {
    setComplete(!complete);
    setData(data);
    reset();
  };

  
  const handleResult = (data) => {
    return (
      
      <View style={{ marginTop: 50 }}>
        <Text key={data.nroAccount} style={styles.inputs}>
          Número de cuenta {nroAccount}
        </Text>
        <Text key={data.nroAccount} style={styles.inputs}>
          Identificación: {data.id}
        </Text>
        <Text key={data.nroAccount} style={styles.inputs}>
          Titular de la cuenta: {data.holderAccount}
        </Text>
        <Text key={data.nroAccount} style={styles.inputs}>
          Fecha: {data.date}
        </Text>
        <Text key={data.nroAccount} style={styles.inputs}>
          Saldo: {data.balance}
        </Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#AAEBD7' }}>
      <Image
        style={{ width: 150, height: 150, marginBottom: 15 }}
        source={require("./assets/cuenta.png")}
      /> 
      {/* <Image style={styles.images} source={require("../assets/card.png")} /> */}
      <View
        style={{
          display: !complete ? "flex" : "none",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <Text style={{ color: "#358266", fontWeight: 700, fontSize: 25, marginTop: 10, textAlign: 'center' }}>
          Bienvenido {route.params.user}
        </Text>
        <Text style={{ color: "#358266", fontSize: 14, marginTop: 5 }}>
          Ingrese los siguientes datos para su transacción
        </Text>

        <View style={styles.content}>
          <TextInput defaultValue={nroAccount} style={styles.inputs} disabled />
          <Controller
            control={control}
            rules={{
              required: true,
              maxLength: 12,
              minLength: 3,
              pattern: /^[0-9]+$/i,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  styles.inputs,
                  {
                    borderColor:
                      errors.id?.type == "required" ||
                        errors.id?.type == "pattern" ||
                        errors.id?.type == "minLength" ||
                        errors.id?.type == "maxLength"
                        ? "red"
                        : "#11A88C",
                  },
                ]}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Identificación ..."
              />
            )}
            name="id"
          />

          {errors.id?.type == "required" && (
            <Text style={{ color: "red" }}>The id is required</Text>
          )}
          {errors.id?.type == "pattern" && (
            <Text style={{ color: "red" }}>Only numbers</Text>
          )}
          {errors.id?.type == "maxLength" && (
            <Text style={{ color: "red" }}>Max 12 characters</Text>
          )}
          {errors.id?.type == "minLength" && (
            <Text style={{ color: "red" }}>Min 3 characters</Text>
          )}

          <Controller
            control={control}
            rules={{
              required: true,
              maxLength: 20,
              minLength: 3,
              pattern: /^[A-Za-z\s]+$/g,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  styles.inputs,
                  {
                    borderColor:
                      errors.holderAccount?.type == "required" ||
                        errors.holderAccount?.type == "pattern" ||
                        errors.holderAccount?.type == "minLength" ||
                        errors.holderAccount?.type == "maxLength"
                        ? "red"
                        : "#11A88C",
                  },
                ]}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Titular de la cuenta ..."
              />
            )}
            name="holderAccount"
          />

          {errors.holderAccount?.type == "required" && (
            <Text style={{ color: "red" }}>The Holder Account is required</Text>
          )}
          {errors.holderAccount?.type == "pattern" && (
            <Text style={{ color: "red" }}>Only letters and/or spaces</Text>
          )}
          {errors.holderAccount?.type == "maxLength" && (
            <Text style={{ color: "red" }}>Max 20 characters</Text>
          )}
          {errors.holderAccount?.type == "minLength" && (
            <Text style={{ color: "red" }}>Min 3 characters</Text>
          )}

          <Controller
            control={control}
            rules={{
              required: true,
              pattern: /^([0-2][0-9]|3[0-1])(\/|-)(0[1-9]|1[0-2])\2(\d{4})$/i,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  styles.inputs,
                  {
                    borderColor:
                      errors.date?.type == "required" ||
                        errors.date?.type == "pattern"
                        ? "red"
                        : "#11A88C",
                  },
                ]}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Fecha (dd/mm/yy)"
              />
            )}
            name="date"
          />

          {errors.date?.type == "required" && (
            <Text style={{ color: "red" }}>The date is required</Text>
          )}
          {errors.date?.type == "pattern" && (
            <Text style={{ color: "red" }}>Only date</Text>
          )}
          <Controller
            control={control}
            rules={{
              required: true,
              pattern:
                /^(1[0-9][0-9][0-9][0-9][0-9][0-9]|1[0-9][0-9][0-9][0-9][0-9][0-9][0-9]|100000000)$/,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  styles.inputs,
                  {
                    borderColor:
                      errors.balance?.type == "required" ||
                        errors.balance?.type == "pattern" ||
                        errors.balance?.type == "minLength" ||
                        errors.balance?.type == "maxLength"
                        ? "red"
                        : "#11A88C",
                  },
                ]}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Saldo ..."
              />
            )}
            name="balance"
          />

          {errors.balance?.type == "required" && (
            <Text style={{ color: "red" }}>The balance is required</Text>
          )}
          {errors.balance?.type == "pattern" && (
            <Text style={{ color: "red" }}>
              Only numbers between 1 million and 100 million
            </Text>
          )}

          <Button style={styles.colorBtn}
            title="Validar"
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </View>
      <View style={{ display: complete ? "flex" : "none" }}>
        <Text style={{ color: "#358266", fontWeight: 700, fontSize: 25, textAlign: 'center' }}>
          Bien Echo!!
        </Text>
        {handleResult(data)}
        <Button
          style={styles.button}
          onPress={() => setComplete(!complete)}
        >
          <Text style={styles.buttonText}>Atras</Text>
        </Button>
      </View>
    </View>
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
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#AAEBD7' }}>
      <Text style={{ color: "#277EF5", fontWeight: 700, fontSize: 30 }}>Movimientos</Text>
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
    borderColor: '#11A88C',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    textAlign: 'center',
    marginBottom: 5,
    
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
    borderColor: 'black',
    backgroundColor: '#007BFF',
    padding: 15,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
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
    borderColor: '#11A88C',
    borderRadius: 10,
  },
  content: {
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
    marginTop: 5,
  },
 
});

