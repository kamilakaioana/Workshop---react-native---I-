import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { useAuth } from "../../hooks/useAuth";
import { ProfileImagesEnum } from "../../interfaces/enuns";
import { useState } from "react";
import ModalEditProfile from "../Modais/modalEditProfile";
import { IEditUserParams, userService } from "../../services/user";
import Message from "../../utils/toast";
import { AxiosError } from "axios";
import { colors } from "../../utils/colors";

const imageProfilePath = {
  [ProfileImagesEnum.POTION]: require("../../../assets/potion.png"),
  [ProfileImagesEnum.PUMPKIN]: require("../../../assets/pumpkin.png"),
  [ProfileImagesEnum.GHOST]: require("../../../assets/ghost.png"),
  [ProfileImagesEnum.VAMP]: require("../../../assets/vamp.png"),
};

const ProfileCard: React.FC = () => {
  const { user, signOut, updateUserSelf } = useAuth();
  const [toggleModal, setToggleModal] = useState<boolean>(false);
  const handleEditUser = async (params: IEditUserParams) => {
    try {
      await userService.editUser(params);
      updateUserSelf();
      Message.showSuccess("User atualizado com sucesso");
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(error.response?.data);
        Message.showError("Erro ao atualizar usuário tente mais tarde.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.signout}>
        <Text
          style={{
            color: colors.purpleDark,
            fontSize: 16,
          }}
          onPress={signOut}
        >
          Sair
        </Text>
      </TouchableOpacity>
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.containerImage}
          onPress={() => setToggleModal(!toggleModal)}
        >
          <Image
            style={{ width: 70, height: 70 }}
            resizeMode="cover"
            source={
              user?.profile.image
                ? imageProfilePath[user.profile.image]
                : imageProfilePath[ProfileImagesEnum.POTION]
            }
          />
        </TouchableOpacity>
        <View
          style={{
            paddingHorizontal: 12,
            flexDirection: "column",
            flex: 1,
          }}
        >
          <Text style={styles.nameUserTitle}>{user.name}</Text>
          <Text style={{ fontWeight: "bold", marginTop: 4 }}>Bio</Text>
          <Text style={{ fontSize: 12 }}>
            {user?.profile?.bio ? user?.profile?.bio : "-"}
          </Text>
        </View>
      </View>
      <ModalEditProfile
        user={user}
        showModal={toggleModal}
        toggleModal={() => setToggleModal(!toggleModal)}
        onConfirm={(user) => handleEditUser(user)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F0D8F7",
  },
  containerImage: {
    backgroundColor: "#252424",

    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  signout: {
    alignSelf: "flex-end",
    paddingTop: 16,
    paddingRight: 16,
  },
  content: {
    display: "flex",
    flexDirection: "row",
    paddingLeft: 16,
    paddingBottom: 16,
  },
  nameUserTitle: {
    fontSize: 18,
    color: colors.purpleDark,
    fontWeight: "bold",
    textAlign: "left",
  },
});

export default ProfileCard;
