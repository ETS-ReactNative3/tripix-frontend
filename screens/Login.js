import React, { useState } from "react";
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard, Text, Alert, SafeAreaView } from "react-native";
import { colors } from "../constants/theme";
import InputField from "../components/InputField";
import ButtonPrimary from "../components/ButtonPrimary";
import ButtonSecondary from "../components/ButtonSecondary";
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";
import api from "../utils/api";
import { MyContext } from "../context/Provider";
import LoginTitle from "../components/LoginTitle";
import LoginSubtitle from "../components/LoginSubtitle";

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
      <SafeAreaView style={styles.login}>
        <View style={styles.container}>
          <View style={styles.title}>
            <LoginTitle text="Welcome!" />
            <LoginSubtitle text="Sign in to continue" />
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
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  login: {
    backgroundColor: colors.background,
    flex: 1,
    alignItems: "center"
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  container: {
    paddingTop: 30,
    width: "85%"
  },
  textSecondary: {
    color: colors.textSecondary,
    fontSize: 17,
    marginVertical: 20
  }
});

export default Login;
