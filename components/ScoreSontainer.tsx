import { Image, StyleSheet, View, Text, Dimensions, Platform } from "react-native";
import images from "@/assets/images/image";

const screenWidth = Dimensions.get("window").width;

const ScoreContainer = ({ score, text }: any) => {
  return (
    <View style={styles.container}>
      <Image source={images.numberBG} style={[styles.image, styles.shadow]} />
      <Text style={styles.score}>{score}</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: screenWidth / 4.8,
    width: screenWidth / 5,
    position: "relative",
    transform: Platform.OS === 'android' ? [{ rotate: '90deg' }] : [],
  },
  score: {
    position: "absolute",
    fontSize: 25,
    top: 18,
  },
  text: {
    position: "absolute",
    fontSize: 16,
    top: 45,
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

export default ScoreContainer;
