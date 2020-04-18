import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Permission from "expo-permissions";
import * as Location from "expo-location";

const xKm = 2;
const nCoins = 20;

export default function App() {
  const [locPermission, setLocPermission] = useState(false);
  const [coinLocs, setCoinLocs] = useState();

  // Get user permission to display their location on map, and change state to render map
  useEffect(() => {
    (async () => {
      // Icon.getImageSource("sun", 20, "yellow").then((sun) =>
      //   setIconPngs({ sun })
      // );
      const { status } = await Permission.askAsync(Permission.LOCATION);
      setLocPermission(true);
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });
      const userLatitude = location.coords.latitude;
      const userLongitude = location.coords.longitude;
      const addXkmToDeg = xKm / 111;
      const bounds = {
        minLat: userLatitude - addXkmToDeg,
        minLon: userLongitude - addXkmToDeg,
        maxLat: userLatitude + addXkmToDeg,
        maxLon: userLongitude + addXkmToDeg,
      };
      // Create and display noPoints random point xKm from the userLoc
      let tempCoinLocs = [];
      function randCoin(bounds) {
        function randPoint(min, max) {
          return Math.random() * Math.abs(max - min) + min;
        }
        const randLon = randPoint(bounds.minLon, bounds.maxLon);
        const randLat = randPoint(bounds.minLat, bounds.maxLat);
        return {
          latitude: randLat,
          longitude: randLon,
        };
      }
      for (let i = 0; i < nCoins; i++) {
        tempCoinLocs.push(randCoin(bounds));
      }
      setCoinLocs(tempCoinLocs);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      {locPermission && (
        <MapView
          style={styles.mapStyle}
          mapPadding={{
            top: 5,
            right: 4,
            bottom: 3,
            left: 2,
          }}
          showsUserLocation={true}
          showsMyLocationButton={true}
          loadingEnabled={true}
          followUserLocation={true}
          showsScale={true}
          loadingEnabled={true}
        >
          {coinLocs &&
            coinLocs.map((point) => (
              <Marker
                coordinate={point}
                title={"Coin!"}
                key={"" + point.latitude + point.longitude}
                icon={require("./assets/images/coin1.png")}
              />
            ))}
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: Dimensions.get("window").width * 0.5,
    height: Dimensions.get("window").height * 0.5,
  },
});
