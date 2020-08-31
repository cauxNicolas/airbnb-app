import React, { useState, useEffect } from "react";
import axios from "axios";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
// icon
import { FontAwesome } from "@expo/vector-icons";
// caroussel
import Swiper from "react-native-swiper";
// map
import MapView from "react-native-maps";
// gps
import * as Location from "expo-location";

const Room = ({ route }) => {
  const { id } = route.params;
  const [data, setData] = useState({});
  const [isLoading, setIsloading] = useState(true);
  const [discoverText, setdiscoverText] = useState(false);
  const [coords, setCoords] = useState({});

  useEffect(() => {
    const askPermission = async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status === "granted") {
        let location = await Location.getCurrentPositionAsync({});
        const obj = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };
        setCoords(obj);
      } else {
        console.log(" pas ok");
      }
    };
    askPermission();
    const fetchdata = async () => {
      const response = await axios.get(
        `https://airbnb-api.herokuapp.com/api/room/${id}`
      );
      setData(response.data);
      setIsloading(false);
    };
    fetchdata();
  }, []);

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
            key={i}
          />
        );
      } else {
        tab.push(
          <FontAwesome
            style={styles.icons}
            name="star"
            size={20}
            color="#de5961"
            key={i}
          />
        );
      }
    }
    return tab;
  };

  return (
    <ScrollView>
      {isLoading === true ? (
        <Text>Chargement en cours ...</Text>
      ) : (
        <>
          <View style={styles.room}>
            <Swiper style={{ height: 300 }} showsPagination={false}>
              {data.photos.map((photo, index) => {
                return (
                  <View key={index}>
                    <Image source={{ uri: `${photo}` }} style={styles.image} />
                  </View>
                );
              })}
            </Swiper>
            <Text style={styles.price}>{data.price} €</Text>
          </View>
          <View style={[styles.row, styles.padding20, styles.top20]}>
            <View>
              <Text numberOfLines={1} style={styles.title}>
                {data.title}
              </Text>
              <View style={styles.row}>
                <Text style={styles.stars}>
                  {displayStars(data.ratingValue)}
                </Text>
                <Text style={styles.reviews}>{data.reviews} avis</Text>
              </View>
            </View>
            <Image
              source={{ uri: `${data.user.account.photos}` }}
              style={styles.avatar}
            />
          </View>
          <View style={[styles.padding20, styles.top20]}>
            <Text
              numberOfLines={discoverText === false ? 3 : null}
              onPress={() => {
                setdiscoverText(!discoverText);
              }}
            >
              {data.description}
            </Text>
          </View>
          <View style={styles.padding20}>
            <MapView
              style={styles.map}
              //provider={PROVIDER_GOOGLE}
              // permet de centrer la map sur paris
              initialRegion={{
                // reacteur 48.870736, 2.373032 - paris 48.857677, 2.350950
                latitude: coords.latitude,
                longitude: coords.longitude,
                latitudeDelta: 0.07,
                longitudeDelta: 0.07,
              }}
              showsUserLocation={true}
            >
              {/* <MapView.Marker
                coordinate={{
                  latitude: data.city.loc[1],
                  longitude: data.city.loc[0],
                }}
              >
                <Image
                  source={require("../assets/img/marker.png")}
                  style={{ width: 22, height: 30 }}
                />
              </MapView.Marker> */}
              <MapView.Marker
                coordinate={{
                  latitude: data.loc[1],
                  longitude: data.loc[0],
                }}
              />
            </MapView>
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default Room;

const avatarSize = 55;

const styles = StyleSheet.create({
  room: { position: "relative" },
  image: { width: "100%", height: 300 },
  price: {
    position: "absolute",
    top: 220,
    left: 0,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 18,
    color: "white",
    fontWeight: "800",
    backgroundColor: "#de5961",
  },
  padding20: { marginHorizontal: 20 },
  top20: { marginTop: 20 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    //justifyContent: "space-between",
  },
  title: { width: "90%", fontSize: 16, fontWeight: "600", marginBottom: 8 },
  stars: { marginRight: 20 },
  reviews: { color: "#bbbbbd" },

  avatar: { width: avatarSize, height: avatarSize, borderRadius: 100 },
  map: {
    width: "100%",
    height: 150,
    marginVertical: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
