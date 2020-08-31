import React, { useEffect, useState } from "react";
import { Text } from "react-native";
// map
import MapView from "react-native-maps";
// gps
import * as Location from "expo-location";
// data
import axios from "axios";

const AroundMe = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [coords, setCoords] = useState({});
  const [data, setData] = useState({});

  useEffect(() => {
    const askPermission = async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status === "granted") {
        let location = await Location.getCurrentPositionAsync({});

        const obj = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };

        const lati = location.coords.latitude;
        const longi = location.coords.longitude;

        try {
          const response = await axios.get(
            `https://airbnb-api.herokuapp.com/api/room/around?latitude=${lati}&longitude=${longi}`
          );

          setData(response.data);
        } catch (error) {
          console.log(error.response.data);
        }

        setCoords(obj);
        setIsLoading(false);
      } else {
        console.log("location not ok");
      }
    };
    askPermission();
  }, []);

  return (
    <>
      {isLoading === true ? (
        <Text>Chargement en cours ...</Text>
      ) : (
        <MapView
          style={{ flex: 1 }} // permet de centrer la map sur paris
          initialRegion={{
            // reacteur 48.870736, 2.373032 - paris 48.857677, 2.350950
            latitude: coords.latitude,
            longitude: coords.longitude,
            latitudeDelta: 0.15,
            longitudeDelta: 0.15,
          }}
          showsUserLocation={true}
        >
          {data.map((room, index) => {
            return (
              <MapView.Marker
                onPress={() => {
                  navigation.navigate("Room", { id: room._id });
                }}
                title={room.title}
                key={index}
                coordinate={{
                  latitude: room.loc[1],
                  longitude: room.loc[0],
                }}
              ></MapView.Marker>
            );
          })}
        </MapView>
      )}
    </>
  );
};

export default AroundMe;
