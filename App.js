import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import MapView from "react-native-maps";
import * as Permission from "expo-permissions";
import * as Location from "expo-location";

export default function App() {
  const [locPermission, setLocPermission] = useState(false);
  const [randomPoints, setRandomPoints] = useState([]);

  // Get user permission to display their location on map, and change state to render map
  useEffect(() => {
    (async () => {
      const { status } = await Permission.askAsync(Permission.LOCATION);
      setLocPermission(true);
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });
      const { latitude, longitude } = location.coords;
      console.log("lat lon ", latitude, longitude);
      const add1kmToDeg = 1 / 111;
      // getGeocodeAsync({latitude, longitude})
    })();
  }, []);

  // Create and display noPoints random point xKm from the userLoc
  function createAndDisplayPoints(userLoc, xKm, noPoints) {
    // Create vars for bounds, randPoints array
    // Get user location
    // Get bounds xKm away from userLoc
    // loop noPoints times
    // create a random point with Math.random() within bounds
    // push to randPoints array
    // Set state
    setRandomPoints(randPoints);
  }

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
          userLocationAnnotationTitle={"hihi"}
          showsScale={true}
          loadingEnabled={true}
        />
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
