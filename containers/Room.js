import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Flatlist,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
// icon
import { FontAwesome } from "@expo/vector-icons";
// caroussel
import Gallery from "../components/Gallery";
import Swiper from "react-native-swiper";

const Room = ({ route }) => {
  const { id } = route.params;
  const [data, setData] = useState({});
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
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
  //<Image source={{ uri: `${item.photos}` }} style={styles.image} />
  return (
    <ScrollView>
      {isLoading === true ? (
        <Text>Chargement en cours ...</Text>
      ) : (
        <>
          <View style={styles.room}>
            {console.log(data.photos[1])}
            <Swiper style={{ height: 300 }} showsPagination={false}>
              {data.photos.map((photo, index) => {
                console.log(photo);
                return (
                  <Image source={{ uri: `${photo}` }} style={styles.image} />
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
            <Text numberOfLines={4}>{data.description}</Text>
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
});
