import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import CustomInput from "../CustomInput";
import TextArea from "../TextArea";

import CustomButton from "../CustomButton";
import { ProfileImagesEnum } from "../../interfaces/enuns";
import { IEditUserParams } from "../../services/user";
import { colors } from "../../utils/colors";
import { IUser } from "../../interfaces/interfaces";

interface IModalEditProfileProps {
  toggleModal: () => void;
  showModal: boolean;
  onConfirm?: (user: IEditUserParams) => void;
  user: IUser;
}

const ModalEditProfile: React.FC<IModalEditProfileProps> = ({
  showModal,
  onConfirm,
  toggleModal,
  user,
}) => {
  const [name, setName] = useState<string>(user.name);
  const [bio, setBio] = useState<string>(user.profile.bio);
  const [imageId, setImageId] = useState<ProfileImagesEnum | undefined>(
    user.profile.image
  );

  const imageProfilePath = {
    [ProfileImagesEnum.POTION]: require("../../../assets/potion.png"),
    [ProfileImagesEnum.PUMPKIN]: require("../../../assets/pumpkin.png"),
    [ProfileImagesEnum.GHOST]: require("../../../assets/ghost.png"),
    [ProfileImagesEnum.VAMP]: require("../../../assets/vamp.png"),
  };

  const sanitizeOnClose = () => {
    setName(user.name);
    setBio(user.profile.bio);
    setImageId(user.profile.image);
    toggleModal();
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}
        onRequestClose={() => {
          toggleModal();
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={{ alignSelf: "flex-end" }}
              hitSlop={24}
              onPress={() => sanitizeOnClose()}
            >
              <FontAwesome name="close" color={colors.black} size={24} />
            </TouchableOpacity>
            <Text style={styles.modalText}>Alterar perfil</Text>
            <View style={styles.imagesContainer}>
              {Object.values(ProfileImagesEnum).map((imgName) => {
                return (
                  <TouchableOpacity
                    onPress={() => setImageId(imgName)}
                    key={imgName}
                    style={{
                      ...(imgName === imageId ? styles.imageSelected : {}),
                      ...styles.imageContent,
                    }}
                  >
                    <Image
                      source={imageProfilePath[imgName]}
                      style={{ width: 50, height: 50 }}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
            <CustomInput
              value={name}
              onChangeText={(value: string) => {
                setName(value);
              }}
              placeholder="Nome Completo"
            />
            <View style={{ marginVertical: 24 }}>
              <TextArea
                content={bio}
                onChange={setBio}
                numberOfLines={6}
                placeholder="Edite sua bio"
              />
            </View>
            <CustomButton
              title="Confirmar"
              type="primary"
              handlePress={() => {
                onConfirm?.({ bio, image: imageId, name });
                sanitizeOnClose();
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  imageSelected: {
    borderColor: colors.purpleLight,
    borderWidth: 3,
  },
  centeredView: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: colors.backgroundLight,
    borderRadius: 20,
    padding: 12,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    paddingBottom: 24,
  },

  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: colors.primary,
    fontSize: 24,
  },

  imagesContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingBottom: 24,
  },
  imageContent: {
    alignItems: "center",
    width: 60,
    height: 60,
    paddingHorizontal: 4,
    marginBottom: 4,
    borderRadius: 6,
    justifyContent: "center",
  },
});

export default ModalEditProfile;
