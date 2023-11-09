import { useState } from "react";
import TextInput from "../../components/CustomInput";
import { Text, View, StyleSheet } from "react-native";
import CustomButton from "../../components/CustomButton";
import { authService } from "../../services/auth";
import Message from "../../utils/toast";
import { AxiosError } from "axios";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../utils/colors";

const Cadastro: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigation = useNavigation();

  const signup = async () => {
    {
      try {
        setLoading(true);
        await authService.signup(name, email, password);
        Message.showSuccess("Usuário criado com sucesso");
      } catch (error) {
        Message.showError("erro ao criar usuario tente mais tarde");
        if (error instanceof AxiosError) {
          console.error(error?.response?.data);
        }
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ marginBottom: 56, color: colors.white, fontSize: 24 }}>
        CRIAR CONTA
      </Text>

      <TextInput
        value={name}
        onChangeText={(value: string) => {
          setName(value);
        }}
        placeholder="Nome Completo"
      />

      <View style={{ marginVertical: 24, width: "100%" }}>
        <TextInput
          value={email}
          onChangeText={(value: string) => {
            setEmail(value);
          }}
          placeholder="Email"
        />
      </View>
      <TextInput
        value={password}
        onChangeText={(value: string) => {
          setPassword(value);
        }}
        placeholder="Senha"
      />
      <View style={{ marginVertical: 24, width: "100%" }}>
        <TextInput
          value={confirmPassword}
          onChangeText={(value: string) => {
            setConfirmPassword(value);
          }}
          placeholder="Confirme sua senha"
        />
      </View>
      <CustomButton
        title="CONFIRMAR"
        type="primary"
        isLoading={loading}
        disabled={loading}
        handlePress={signup}
      />

      <View style={{ marginTop: 24, width: "100%" }}>
        <CustomButton
          title="Já Tenho Conta"
          type="secondary"
          disabled={loading}
          handlePress={() => {
            navigation.navigate("Login");
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  separator: {
    paddingTop: 56,
    paddingBottom: 24,
  },
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: "center",
    display: "flex",
    paddingHorizontal: 24,
    justifyContent: "center",
  },
});

export default Cadastro;
