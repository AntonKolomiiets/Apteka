import {
  Image,
  Pressable,
  StyleSheet,
  View,
  Dimensions,
  Text,
} from "react-native";
import images from "@/assets/images/image";

const screenWidth = Dimensions.get("window").width;

const NoHouseButton = ({ onPressFunction }: any) => {
  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [
          { transform: [{ scale: pressed ? 0.95 : 1 }] },
          styles.button,
        ]}
        onPress={onPressFunction}
      >
        <Image source={images.guessButtonLong} style={styles.image} />
        <Text style={styles.text}>Not in House</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    transform: [{ scaleY: 0.92 }],
    height: screenWidth / 6.2,
    width: screenWidth / 1.05,
    position: "relative",
  },
  text: {
    fontSize: 20,
    fontWeight: "heavy",
    position: "absolute",
  },
  shadow: {
    // iOS Shadow Propertie
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1.35,
    shadowRadius: 1.84,

    // Android Shadow Properties
    elevation: 5,
  },
});

export default NoHouseButton;
