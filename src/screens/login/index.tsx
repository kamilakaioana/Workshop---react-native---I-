import { useState } from "react";
import {
  Image,
  StyleSheet,
  TextInput,
  View,
  Text,
  Keyboard,
} from "react-native";
import CustomButton from "../../components/CustomButton";
import { authService } from "../../services/auth";
import { useNavigation } from "@react-navigation/native";
import Message from "../../utils/toast";
import { useAuth } from "../../hooks/useAuth";
import { AxiosError } from "axios";
import { colors } from "../../utils/colors";
import CustomInput from "../../components/CustomInput";

export default function Login() {
  const [email, setEmail] = useState<string>("abacaxi12@email.com");
  const [password, setPassword] = useState<string>("@Teste123");
  const [loading, setLoading] = useState<boolean>(false);
  const { updateUserSelf } = useAuth();
  const navigation = useNavigation();

  const signin = async () => {
    Keyboard.dismiss();
    if (!email || !password) return;
    try {
      setLoading(true);
      await authService.login(email, password);
      updateUserSelf();
      Message.showSuccess("Login realizado com sucesso");
    } catch (error) {
      Message.showError("Error: verifique suas credenciais");
      if (error instanceof AxiosError) {
        console.error(error.response?.data);
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.appName}>BOOH</Text>
      <View>
        <Image
          source={require("../../../assets/ghost.png")}
          resizeMode="stretch"
          style={styles.logo}
        />
      </View>
      <CustomInput
        value={email}
        onChangeText={(value: string) => {
          setEmail(value);
        }}
        placeholder="Email"
      />

      <View style={styles.passwordInputContainer}>
        <CustomInput
          value={password}
          onChangeText={(value: string) => setPassword(value)}
          placeholder="Senha"
          textContentType="password"
          secureTextEntry={true}
        />
      </View>
      <CustomButton
        title="ENTRAR"
        type="primary"
        isLoading={loading}
        disabled={loading}
        handlePress={signin}
      />
      <View style={styles.registerButtonContainer}>
        <CustomButton
          title="Cadastrar"
          type="secondary"
          disabled={loading}
          handlePress={() => {
            navigation.navigate("Cadastro");
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: "center",
    display: "flex",
    paddingHorizontal: 24,
    justifyContent: "center",
  },
  logo: {
    width: 120,
    height: 120,
    marginTop: 16,
    marginBottom: 48,
  },
  passwordInputContainer: {
    marginVertical: 24,
    width: "100%",
  },
  registerButtonContainer: {
    marginTop: 24,
    width: "100%",
  },
  appName: {
    color: colors.white,
    fontSize: 24,
  },
});
