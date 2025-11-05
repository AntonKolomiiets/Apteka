import { Image, StyleSheet, View, Dimensions } from "react-native";
import images from "@/assets/images/image";

const screenHeight = Dimensions.get("screen").height;

const PictureContainer = ({ imageUri, scale }: any) => {
  return (
    <View style={styles.container}>
      <View style={[styles.box, styles.shadow]}>
        <Image
          source={{
            uri: imageUri,
          }}
          style={[styles.baseImage, { transform: [{ scale: scale }] }]}
          resizeMode="cover"
        />
        <Image
          source={images.frame}
          style={[styles.overlayImage, { transform: [{ scale: scale }] }]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    marginTop: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  baseImage: {
    marginTop: 5,

    width: screenHeight / 5.5,
    height: screenHeight / 3.7,
    position: "relative",
  },
  overlayImage: {
    width: screenHeight / 4.8,
    height: screenHeight / 3.5,
    position: "absolute",
  },
  shadow: {
    // iOS Shadow Properties
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1.55,
    shadowRadius: 3.84,

    // Android Shadow Properties
    elevation: 5,
  },
});

export default PictureContainer;
