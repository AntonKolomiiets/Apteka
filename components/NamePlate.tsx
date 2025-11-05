import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import images from "@/assets/images/image";

const screenWidth = Dimensions.get("window").width;

const NamePlate = ({ name }: any) => {
  return (
    <View style={[styles.container, styles.shadow]}>
      <Image source={images.namePlate} style={styles.image} />
      <Text style={styles.text}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    marginBottom: 26,
  },
  image: {
    transform: [{ scaleX: 1.2, }],
    width: screenWidth / 2.2,
    height: screenWidth / 8.1,
    position: "relative",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    position: "absolute",
  },
  shadow: {
    // iOS Shadow Properties
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 3.84,

    // Android Shadow Properties
    elevation: 5,
  },
});

export default NamePlate;
