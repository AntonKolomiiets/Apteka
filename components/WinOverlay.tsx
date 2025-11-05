import images from "@/assets/images/image";
import { observer } from "mobx-react-lite";
import { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
  Image,
} from "react-native";
import WinResetButton from "./WinResetButton";

const screenHeight = Dimensions.get("window").height;

const WinOverlay = observer(({ overlayVisible }: any) => {
  const slideAnim = useRef(new Animated.Value(screenHeight)).current;

  useEffect(() => {
    if (overlayVisible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: screenHeight,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    }
  }, [overlayVisible, slideAnim]);

  if (!overlayVisible) return null;

  return (
    <Animated.View
      style={[
        styles.overlayContainer,
        { transform: [{ translateY: slideAnim }] },
      ]}
    >
      <Image source={images.modalBg} style={styles.image} />
      <View style={styles.overlayView}>
        <Text style={styles.overlayTextHeader}>Congratulations!</Text>
        <Text style={styles.overlayText}>You Guessed All Characters!</Text>

        <WinResetButton />
      </View>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  overlayContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#00000088",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  image: {
    transform: [{ scale: 0.9 }, { scaleY: 1.2 }],
    position: "relative",
  },
  overlayView: {
    position: "absolute",
  },
  overlayTextHeader: {
    fontSize: 24,
    marginBottom: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
  overlayText: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#2196F3",
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default WinOverlay;
