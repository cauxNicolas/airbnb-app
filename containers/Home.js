import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
// connexion
import axios from "axios";
// token
import AsyncStorage from "@react-native-community/async-storage";
// icon
import { FontAwesome } from "@expo/vector-icons";
// navigation
import { useNavigation } from "@react-navigation/native";

const Home = ({ setToken }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://airbnb-api.herokuapp.com/api/room?city=paris"
      );
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const deconnexion = async () => {
    const token = await AsyncStorage.removeItem("token");

    setToken(token);
  };

  const screenRoom = (value) => {
    navigation.navigate("Room", { id: value });
  };

  const displayStars = (stars) => {
    const tab = [];
    for (let i = 1; i <= 5; i++) {
      if (stars < i) {
        tab.push(
          <FontAwesome
            style={styles.icons}
            name="star"
            size={20}
            color="#bbbbbd"
          />
        );
      } else {
        tab.push(
          <FontAwesome
            style={styles.icons}
            name="star"
            size={20}
            color="#de5961"
          />
        );
      }
    }
    return tab;
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      {isLoading === true ? (
        <Text>Chargement en cours ...</Text>
      ) : (
        <>
          <View>
            <Text onPress={deconnexion}>Deconnexion</Text>
          </View>
          <FlatList
            data={data.rooms}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity onPress={() => screenRoom(item._id)}>
                  <View style={styles.room}>
                    <View style={styles.blockImg}>
                      <Image
                        source={{
                          uri: `${item.photos[0]}`,
                        }}
                        style={styles.image}
                      />
                      <Text style={styles.price}>{item.price} €</Text>
                    </View>
                    <View style={styles.description}>
                      <View>
                        <Text numberOfLines={1} style={styles.title}>
                          {item.title}
                        </Text>
                        <View style={styles.row}>
                          <Text style={styles.stars}>
                            {displayStars(item.ratingValue)}
                          </Text>
                          <Text style={styles.reviews}>
                            {item.reviews} avis
                          </Text>
                        </View>
                      </View>
                      <Image
                        source={{ uri: `${item.user.account.photos[0]}` }}
                        style={styles.avatar}
                      />
                    </View>
                    <View style={styles.bottom}></View>
                  </View>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item) => item.id}
          />
        </>
      )}
    </SafeAreaView>
  );
};

export default Home;

const avatarSize = 55;

const styles = StyleSheet.create({
  safeAreaView: { flex: 1 },
  blockImg: { marginHorizontal: 20 },
  room: { marginBottom: 40, position: "relative" },
  description: {
    marginVertical: 10,
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { width: "80%", fontSize: 16, fontWeight: "600", marginBottom: 8 },
  icons: { marginTop: 10 },
  image: { width: "100%", height: 250 },
  price: {
    position: "absolute",
    top: 180,
    left: 0,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 18,
    color: "white",
    fontWeight: "800",
    backgroundColor: "#de5961",
  },
  avatar: { width: avatarSize, height: avatarSize, borderRadius: 100 },
  row: { flexDirection: "row", alignItems: "center" },
  stars: { marginRight: 20 },
  reviews: { color: "#bbbbbd" },
  bottom: {
    borderBottomColor: "#bbbbbd",
    borderBottomWidth: 1,
    marginHorizontal: 30,
    marginVertical: 15,
  },
});
