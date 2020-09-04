import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";
// clavier
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// image et permission
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
// icons
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
// api
import axios from "axios";
// token
import AsyncStorage from "@react-native-community/async-storage";
// components
import Button from "../components/Button";
import ButtonWhite from "../components/ButtonWhite";
import Input from "../components/Input";
import { TouchableOpacity } from "react-native-gesture-handler";

// connexion
// nono@airbnb-api.com      pass

const Profile = ({ setToken }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [image, setImage] = useState(null);
  const [picture, setPicture] = useState(null);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [maj, setMaj] = useState(false);
  const [newImage, setNewImage] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const token = await AsyncStorage.getItem("token");
      const userId = await AsyncStorage.getItem("userId");

      try {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setData(response.data);
        setIsLoading(false);
      } catch (error) {}
    };
    fetchData();
  }, []);

  const deconnexion = async () => {
    const token = await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("userId");
    setToken(token);
  };

  const getLibraryPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === "granted") {
      const result = await ImagePicker.launchImageLibraryAsync();
      if (result.cancelled === false) {
        setImage(result.uri);
        setNewImage(result);
        updatePicture();
      }
    }
  };

  const getCameraPermissionAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status === "granted") {
      const result = await ImagePicker.launchCameraAsync();
      if (!result.cancelled) {
        setPicture(result.uri);
        updatePicture();
      }
    }
  };

  const updatePicture = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const userId = await AsyncStorage.getItem("userId");

      const uri = newImage.uri; // on stocke dans la variable uri le chemin de la photo
      const uriParts = uri.split("."); // le tableau contient 2 élements : 1er élément = le chemin de la photo jusqu'au point / 2ème élément : le format de la photo (après le point)
      const fileType = uriParts[1]; // on stocke dans la variable fileType le format de la photo (ici : jpg)
      const formData = new FormData();

      formData.append("photo", {
        uri,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
        // les clés name et type doivent être obligatoirement précisées
      });

      const response = await axios.put(
        `https://express-airbnb-api.herokuapp.com/user/upload_picture/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.photo[0].url) {
        alert("Photo envoyée");
      }
    } catch (error) {}
  };

  const setUpdate = async () => {
    const token = await AsyncStorage.getItem("token");
    const userId = await AsyncStorage.getItem("userId");

    try {
      await axios.put(
        `https://express-airbnb-api.herokuapp.com/user/update/${userId}`,
        {
          email: email,
          username: username,
          name: name,
          description: description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMaj(true);

      setTimeout(() => {
        setMaj(false);
      }, 2000);
      setName("");
      setUsername("");
      setEmail("");
      setDescription("");
    } catch (error) {
      console.log(error.message);
    }
  };

  return isLoading === true ? (
    <>
      <Text>Chargement en cours ...</Text>
      <Button titleButton="Deconnexion" handleSubmit={deconnexion} />
    </>
  ) : (
    <KeyboardAwareScrollView>
      <View
        style={{
          flex: 1,
          alignItems: "center",
        }}
      >
        <View style={styles.presentation}>
          <View style={styles.image}>
            <TouchableOpacity
              onPress={() => {
                alert("Bravo ! vous savez clicker sur une image");
              }}
            >
              {image === null ? (
                data.photo && data.photo.length < 1 ? (
                  <Image
                    source={{
                      uri: `https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQVfb8KqwpIM3DPRt_se1JTivXZRIIHT-SRog&usqp=CAU`,
                    }}
                    style={{ width: 80, height: 80 }}
                  />
                ) : (
                  <Image
                    source={{
                      uri: `${data.photo[0].url}`,
                    }}
                    style={{ width: 80, height: 80 }}
                  />
                )
              ) : (
                <Image
                  source={{
                    uri: `${image}`,
                  }}
                  style={{ width: 80, height: 80 }}
                />
              )}
            </TouchableOpacity>
            <Entypo
              name="images"
              size={20}
              color="grey"
              style={styles.gallery}
              onPress={() => {
                getLibraryPermissionsAsync();
              }}
            />
            <Ionicons
              name="ios-camera"
              size={24}
              color="grey"
              style={styles.camera}
              onPress={() => {
                getCameraPermissionAsync();
              }}
            />
          </View>

          <Input
            placeholder={data.name}
            placeholderTextColor="grey"
            setFunction={setName}
          />
          <Input
            placeholder={data.username}
            placeholderTextColor="grey"
            setFunction={setUsername}
          />
          <Input
            placeholder={data.email}
            placeholderTextColor="grey"
            setFunction={setEmail}
          />
          <TextInput
            style={styles.inputDescription}
            placeholder={`${data.description}`}
            placeholderTextColor="grey"
            multiline={true}
            onChangeText={(text) => {
              setDescription(text);
            }}
          />
          <ButtonWhite titleButton="Mettre a jour" handleSubmit={setUpdate} />
          {maj && <Text style={styles.maj}>Mise à jour effectuée !</Text>}
          <Button titleButton="Deconnexion" handleSubmit={deconnexion} />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  presentation: {
    marginTop: 40,
    width: "100%",
  },

  image: {
    justifyContent: "flex-end",
    position: "relative",
    alignItems: "center",
    marginHorizontal: 80,
    marginVertical: 20,
  },
  gallery: { position: "absolute", right: -10, top: 28 },
  camera: { position: "absolute", left: -10, top: 28 },
  inputDescription: {
    backgroundColor: "#e4e4e4",
    marginHorizontal: 50,
    marginVertical: 10,
    padding: 10,
    height: 110,
  },
  maj: { textAlign: "center", color: "green" },
});
