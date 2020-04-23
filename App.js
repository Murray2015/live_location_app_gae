import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Permission from "expo-permissions";
import * as Location from "expo-location";
import haversine from "haversine-distance";

const xKm = 0.5;
const nCoins = 20;
const scoreSensitivity = 500; // If dist between user and coin < scoreSensitivity then userScore++;
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function App() {
  const [locPermission, setLocPermission] = useState(false);
  const [userLoc, setUserLoc] = useState();
  const [coinLocs, setCoinLocs] = useState();
  const [userScore, setUserScore] = useState(0);
  const [userSpeed, setUserSpeed] = useState(0);
  const [userHeading, setUserHeading] = useState(0);

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

  useEffect(() => {
    Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.Balanced,
        timeInterval: 5000,
        distanceInterval: 10,
      },
      (locationObject) => {
        setUserLoc({
          latitude: locationObject.coords.latitude,
          longitude: locationObject.coords.longitude,
        });
        setUserSpeed(Math.round(locationObject.coords.speed));
        setUserHeading(Math.round(locationObject.coords.heading));
        console.log("location object is ", locationObject);
      }
    );
  }, []);

  // Check distance between user and coins, and update scores
  useEffect(() => {
    userLoc &&
      coinLocs &&
      coinLocs.forEach((coinLoc) => {
        const dist = haversine(coinLoc, userLoc);
        if (dist < scoreSensitivity) {
          setUserScore(userScore + 1);
        }
        console.log("dists:", dist, "score:", userScore);
      });
  }, [userLoc]);

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
      <View style={styles.diagnostics}>
        <Text style={styles.score}>Score: {userScore}</Text>
        <Text style={styles.score}>Speed (m/s): {userSpeed}</Text>
        <Text style={styles.score}>Heading (deg): {userHeading}</Text>
      </View>
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
    width: screenWidth * 0.8,
    height: screenHeight * 0.8,
  },
  diagnostics: {
    flexDirection: "row",
    width: screenWidth * 0.8,
    justifyContent: "space-between",
  },
  score: {
    position: "relative",
    top: -35,
    backgroundColor: "white",
    padding: 5,
    borderRadius: 7,
    borderColor: "black",
    borderWidth: 2,
    borderStyle: "solid",
    textAlign: "center",
  },
});
