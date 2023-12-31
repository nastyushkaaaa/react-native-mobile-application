import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { authSignInUser } from "../../redux/auth/authOperations";

export const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isNotVisiblePassword, setIsVisiblePassword] = useState(true);
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);
  const [changeEmailColor, setChangeEmailColor] = useState(false);
  const [changePasswordColor, setChangePasswordColor] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [isFieldsEmpty, setIsFieldsEmpty] = useState(true);

  const dispatch = useDispatch();

  const handleFocus = (variant) => {
    switch (variant) {
      case "email":
        setIsFocusedEmail(true);
        break;
      case "password":
        setIsFocusedPassword(true);
        break;
      default:
        break;
    }
  };

  const toggleVisibility = () => {
    setIsVisiblePassword(!isNotVisiblePassword);
  };

  const handleBlur = (variant) => {
    switch (variant) {
      case "email":
        setIsFocusedEmail(false);
        break;
      case "password":
        setIsFocusedPassword(false);
        break;
      default:
        break;
    }
  };

  const changeColor = (variant) => {
    switch (variant) {
      case "email":
        setChangeEmailColor(true);
        break;
      case "password":
        setChangePasswordColor(true);
        break;
      default:
        break;
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = () => {
    if (email !== "" && password !== "" && isValidEmail(email)) {
      console.log(email, password);
      dispatch(authSignInUser({ email, password }));
      setIsFieldsEmpty(false);
      reset();
      navigation.navigate("Home", { screen: "PostsScreen" });
    } else {
      reset();
    }
  };

  const reset = () => {
    setEmail("");
    setPassword("");
  };

  const handleKeyboardShow = () => {
    setKeyboardVisible(true);
  };

  const handleKeyboardHide = () => {
    setKeyboardVisible(false);
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      handleKeyboardShow
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      handleKeyboardHide
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.screen}>
        <ImageBackground
          source={require("../images/bgImg.jpg")}
          style={styles.bgImg}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View
              style={[
                styles.container,
                isFocusedEmail || isFocusedPassword
                  ? styles.openKeyBoardContainer
                  : null,
                !isKeyboardVisible ? styles.closeKeyBoardContainer : null,
              ]}
            >
              <View style={styles.titleContainer}>
                <Text style={styles.title}>Увійти</Text>
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Адреса електронної пошти"
                  onChangeText={(newText) => setEmail(newText)}
                  defaultValue={email}
                  onBlur={() => handleBlur("email")}
                  onFocus={() => handleFocus("email")}
                  onChange={() => changeColor("email")}
                  style={[
                    styles.input,
                    isFocusedEmail ? styles.focusInput : null,
                    changeEmailColor ? styles.changeInput : null,
                  ]}
                  cursorColor={"#212121"}
                  inputMode="email"
                />
                <View style={styles.passwordContainer}>
                  <TextInput
                    placeholder="Пароль"
                    onChangeText={(newText) => setPassword(newText)}
                    defaultValue={password}
                    secureTextEntry={isNotVisiblePassword}
                    onBlur={() => handleBlur("password")}
                    onFocus={() => handleFocus("password")}
                    onChange={() => changeColor("password")}
                    style={[
                      styles.input,
                      isFocusedPassword ? styles.focusInput : null,
                      changePasswordColor ? styles.changeInput : null,
                    ]}
                    cursorColor={"#212121"}
                  />
                  <TouchableOpacity
                    style={styles.showPasswordButton}
                    onPress={() => toggleVisibility()}
                  >
                    {isNotVisiblePassword ? (
                      <Text style={styles.logIn}>Показати</Text>
                    ) : (
                      <Text style={styles.logIn}>Сховати</Text>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.btnContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleSubmit()}
                >
                  <Text style={styles.buttonText}>Увійти</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate("RegistrationScreen")}
                >
                  <Text style={styles.logIn}>
                    Немає акануту?{" "}
                    <Text style={styles.underlinedText}>Зареєструватися</Text>
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-end",
    paddingBottom: 0,
  },
  bgImg: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  container: {
    marginBottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 43,
    width: "100%",
    height: 489,
    marginBottom: 0,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  openKeyBoardContainer: {
    bottom: 42,
  },
  closeKeyBoardContainer: {
    bottom: 0,
  },
  title: {
    padding: 0,
    margin: 0,
    marginTop: 92,
    fontSize: 30,
    fontWeight: 500,
  },
  inputContainer: {
    display: "flex",
    gap: 16,
    marginTop: 0,
    width: 343,
  },
  input: {
    height: 50,
    padding: 16,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#E8E8E8",
    borderRadius: 5,
    backgroundColor: "#F6F6F6",
    color: "#E8E8E8",
    fontSize: 16,
  },
  changeInput: {
    color: "#212121",
  },
  focusInput: {
    backgroundColor: "#fff",
    borderColor: "#FF6C00",
    color: "#212121",
  },
  passwordContainer: {
    position: "relative",
    width: 343,
  },
  showPasswordButton: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    paddingRight: 16,
  },

  btnContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    gap: 16,
    marginBottom: 145,
  },
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: 0,
    width: 343,
    height: 51,
    borderRadius: 100,
    backgroundColor: "#FF6C00",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  logIn: {
    margin: 0,
    color: "#1B4371",
    fontSize: 16,
  },
  underlinedText: {
    textDecorationLine: "underline",
  },
});
