import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import Background from "./login/Background";
import Logo from "./login/Logo";
import Header from "./login/Header";
import Button from "./login/Button";
import TextInput from "./login/TextInput";
import BackButton from "./login/BackButton";
import { theme } from "./login/theme";
import { nameValidator } from "./login/nameValidator";
import { passwordValidator } from "./login/passwordValidator";
import { loginUser, logoutUser } from "../redux/ActionCreators";

export default function LoginScreen({ navigation }) {
  const [name, setName] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const authorization = useSelector((state) => state.Auth);
  const dispatch = useDispatch();
  console.log("LoginAuthSelector:", authorization);

  const onLoginPressed = () => {
    console.log("LoginPressed");
    const nameError = nameValidator(name.value);
    const passwordError = passwordValidator(password.value);
    if (nameError || passwordError) {
      setName({ ...name, error: nameError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    dispatch(loginUser({ username: name.value, password: password.value }));
    /*
    navigation.reset({
      index: 0,
      routes: [{ name: "Dashboard" }],
    });
    */
  };

  if (authorization.token) {
    if (authorization.isParent) {
      return (
        <Background>
          <Logo />
          <Header>Welcome Back, {authorization.firstName}!</Header>
          <Button mode="contained" onPress={() => navigation.navigate("Parent")}>
            Continue To App
          </Button>
          <Button mode="contained" onPress={() => dispatch(logoutUser())}>
            Logout
          </Button>
          <View style={styles.row}>
            <Text>

            </Text>
          </View>
        </Background>
      );
    } else {
      return (
        <Background>
          <Logo />
          <Header>Welcome Back, {authorization.firstName}!</Header>
          <Button mode="contained" onPress={() => navigation.navigate("Child")}>
            Continue To App
          </Button>
          <Button mode="contained" onPress={() => dispatch(logoutUser())}>
            Logout
          </Button>
          <View style={styles.row}>
            <Text></Text>
          </View>
        </Background>
      );
    }
  } else {
    return (
      <Background>
        <Logo />
        <Header>Welcome to Kid Credit!</Header>
        <TextInput
          label="Username"
          returnKeyType="next"
          value={name.value}
          onChangeText={(text) => setName({ value: text, error: "" })}
          error={!!name.error}
          errorText={name.error}
          autoCapitalize="none"
          autoCompleteType="name"
          textContentType="username"
          keyboardType="email-address"
        />
        <TextInput
          label="Password"
          returnKeyType="done"
          value={password.value}
          onChangeText={(text) => setPassword({ value: text, error: "" })}
          error={!!password.error}
          errorText={password.error}
          secureTextEntry
        />
        {/*
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate("ResetPasswordScreen")}
        >
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      */}
        <Button mode="contained" onPress={onLoginPressed}>
          Login
        </Button>
        <View style={styles.row}>
          <Text>Don’t have an account? </Text>
          <TouchableOpacity onPress={() => navigation.replace("Register")}>
            <Text style={styles.link}>Sign up a new family!</Text>
          </TouchableOpacity>
        </View>
      </Background>
    );
  }
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 24,
  },
  row: {
    flexDirection: "column",
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});
