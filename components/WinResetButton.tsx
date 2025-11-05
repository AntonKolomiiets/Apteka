import images from "@/assets/images/image";
import { useStore } from "@/store/Store";
import { observer } from "mobx-react-lite";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native";

const screenWidth = Dimensions.get("window").width;

const WinResetButton = observer(() => {
  const store = useStore();

  return (
    <View>
      <Pressable
        style={({ pressed }) => [
          { transform: [{ scale: pressed ? 0.95 : 1 }] },
          styles.button,
        ]}
        onPress={() => store.resetAll()}
      >
        <Image source={images.winButton} style={styles.image} />
        <Text style={styles.text}>Reset</Text>
      </Pressable>
    </View>
  );
});

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
    transform: [{ scale: 0.7 }],
    height: screenWidth / 5,
    width: screenWidth / 2,
    position: "relative",
  },
  text: {
    position: "absolute",
    color: "#ebdcbb",
    fontWeight: "bold",
    paddingBottom: 5,
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

export default WinResetButton;
