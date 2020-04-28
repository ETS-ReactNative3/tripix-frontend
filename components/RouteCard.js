import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faClock, faLandmark } from "@fortawesome/free-solid-svg-icons";

const RouteCard = ({ item, handleSelect }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => handleSelect(item.route_id)}>
      <ImageBackground
        source={{
          url: `http://31.220.45.114/tripix/public/api/getphoto?photo_reference=${item.photo_ref}`,
        }}
        style={styles.image}
      />
      <View style={styles.data}>
        <View style={{ alignItems: "flex-end" }}>
          <View style={styles.details}>
            <Text style={styles.text}>{item.duration} min</Text>
            <FontAwesomeIcon icon={faClock} style={styles.icon} />
            <Text style={styles.text}>{item.number_attractions}</Text>
            <FontAwesomeIcon icon={faLandmark} style={styles.icon} />
          </View>
        </View>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <View style={styles.textContainer}>
            <Text adjustsFontSizeToFit allowFontScaling minimumFontScale={0.5} numberOfLines={3} style={styles.textName}>
              {item.location}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 120,
    marginVertical: 8,
    borderRadius: 10,
    overflow: "hidden",
  },
  data: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  textContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    height: "100%",
  },
  details: {
    backgroundColor: "rgba(255,255,255,0.35)",
    borderRadius: 10,
    padding: 4,
    position: "absolute",
    right: 10,
    top: 10,
    flexDirection: "row",
    paddingHorizontal: 8,
  },
  text: {
    color: "white",
    fontWeight: "bold",
    marginHorizontal: 5,
  },
  icon: {
    color: "white",
  },
  textName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textShadowColor: "black",
    textShadowRadius: 10,
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    opacity: 0.5,
  },
});

export default RouteCard;
