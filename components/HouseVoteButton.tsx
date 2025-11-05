import { Image, Pressable, StyleSheet, View, Dimensions, Text } from "react-native";
import images from "@/assets/images/image";

const screenWidth = Dimensions.get("window").width;

const HouseVoteButton = ({ image, onPressFunction, house }: any) => {
  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [
          { transform: [{ scale: pressed ? 0.95 : 1 }] },
          styles.button,
        ]}
        onPress={onPressFunction}
      >
        <Image source={images.guessButtonShort} style={styles.image} />
        <Image source={image} style={[styles.crest, styles.shadow]} />
        <Text style={styles.text}>{house}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    transform: [{ scaleX: 1.2, }],
    height: screenWidth / 4.5,
    width: screenWidth / 2.5,
    position: "relative",
  },
  crest: {
    transform: [{ scale: 0.8 }],
    height: screenWidth / 6.3,
    width: screenWidth / 7.6,
    top: 1,
    position: "absolute",
  },
  text: {
    fontSize: 16,
    fontWeight: "heavy",
    position: "absolute",
    bottom: 8,
  },
  shadow: {
    // iOS Shadow Properties
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1.35,
    shadowRadius: 1.84,

    // Android Shadow Properties
    elevation: 5,
  },
});

export default HouseVoteButton;
