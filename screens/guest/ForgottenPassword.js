import React, { useState } from "react";
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard, SafeAreaView, Alert } from "react-native";
import InputField from "../../components/ui/InputField";
import ButtonPrimary from "../../components/ui/ButtonPrimary";
import TitleSmall from "../../components/TitleSmall";
import LoginSubtitle from "../../components/LoginSubtitle";
import api from "../../utils/api";
import { colors } from "../../constants/theme";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { HeaderBackButton } from "@react-navigation/stack";

const ForgottenPassword = ({ route, navigation }) => {
  const [input, setInput] = useState({ email: route.params.email });

  const handleActivate = () => {
    api
      .post("/users/forgottenPassword", input)
      .then(() => navigation.navigate("ResetPassword", { email: input.email }))
      .catch((error) => Alert.alert(error.response.data.message));
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.login}>
        <View style={styles.container}>
          <View style={{ marginLeft: -10, marginVertical: 8 }}>
            <HeaderBackButton onPress={() => navigation.goBack()} />
          </View>
          <TitleSmall textBold="Forgotten" text=" password?" />
          <LoginSubtitle text="Type in your account's email address below and we will send you a password reset link." />

          <InputField
            placeholder="Email"
            icon={faEnvelope}
            value={input.email}
            onChangeText={(text) => setInput({ ...input, email: text })}
          />

          <ButtonPrimary title="Send reset link" onPress={handleActivate} />
        </View>
        <View style={styles.footer} />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  login: {
    backgroundColor: colors.background,
    flex: 1,
    alignItems: "center",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  container: {
    width: "88%",
  },
});

export default ForgottenPassword;
