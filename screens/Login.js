import React, { useState } from "react";
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard, Text, Alert } from "react-native";
import { colors } from "../constants/theme";
import InputField from "../components/InputField";
import ButtonPrimary from "../components/ButtonPrimary";
import ButtonSecondary from "../components/ButtonSecondary";
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";
import api from "../utils/api";
import { MyContext } from "../context/Provider";

const Login = ({ navigation }) => {
  const [input, setInput] = useState({ email: "", password: "" });

  const handleRegister = () => {
    navigation.navigate("Register");
  };

  const handleLogin = async saveToken => {
    //Check credentials and get JWT from server
    api
      .post("/login", input)
      .then(response => {
        //Store JTW in the context and go to the main screen
        saveToken(response.data.token).then(data => {
          //navigation.navigate("Home");
        });
      })
      .catch(err => Alert.alert("Invalid credentials!"));
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.login}>
        <View style={styles.container}>
          <View style={styles.title}>
            <Text style={styles.headerBold}>Welcome!</Text>
            <Text style={styles.textSecondary}>Sign in to continue</Text>
          </View>
          <InputField
            placeholder="Email"
            icon={faEnvelope}
            value={input.email}
            onChangeText={text => setInput({ ...input, email: text })}
          />
          <InputField
            placeholder="Password"
            icon={faKey}
            isPassword={true}
            value={input.password}
            onChangeText={text => setInput({ ...input, password: text })}
          />

          <MyContext.Consumer>
            {context => <ButtonPrimary title="Login" onPress={() => handleLogin(context.saveToken)} />}
          </MyContext.Consumer>
        </View>
        <View style={styles.footer}>
          <ButtonSecondary title="Forgot password?" />
          <ButtonSecondary title="Sign up here!" onPress={handleRegister} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  login: {
    paddingTop: "20%",
    backgroundColor: colors.background,
    flex: 1,
    alignItems: "center"
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  container: {
    width: "85%"
  },
  headerBold: {
    fontSize: 34,
    color: "white",
    fontWeight: "bold"
  },
  textSecondary: {
    color: colors.textSecondary,
    fontSize: 16,
    marginTop: 10
  }
});

export default Login;
