import { useEffect } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from "react-native";
import { observer } from "mobx-react-lite";
import { useStore } from "@/store/Store";
import images from "@/assets/images/image";

const screenWidth = Dimensions.get("window").width;

const Details = observer(() => {
  const store = useStore();
  const params = useLocalSearchParams();
  const navigation = useNavigation();
  const { id, name } = params;

  const character = store.charStack.find((item) => item.id === id)

  useEffect(() => {
    /* Set the header title to the character's name */
    if (name) {
      navigation.setOptions({ title: name });
    }
  }, [name, navigation]);

  return (
    <View style={styles.container}>
      <ImageBackground source={images.paperBg} style={styles.imageBackground}>
        <View style={styles.itemsContainer}>
          <Image
            source={{
              uri: character?.picture,
            }}
            style={styles.image}
            resizeMode="contain"
          />
          {character?.guessedCorrectly ? (
            <View style={styles.textContainer}>
              <Text style={styles.text}>House: {character?.house}</Text>
              <Text style={styles.text}>
                Date of birth: {character?.dateOfBirth}
              </Text>
              <Text style={styles.text}>Actor: {character?.actor}</Text>
              <Text style={styles.text}>Species: {character?.species}</Text>
            </View>
          ) : (
            <View style={styles.imageAccessDeniedContained}>
              <Image
                source={images.accessDenied}
                style={styles.imageAccessDenied}
                resizeMode="contain"
              />
            </View>
          )}
        </View>
      </ImageBackground>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageBackground: {
    flex: 1,
    width: screenWidth,
    padding: 10,
  },
  image: {
    height: screenWidth / 1.6,
    width: screenWidth / 2.4,
  },
  imageAccessDeniedContained: {
    justifyContent: "center",
    alignItems: "center",
  },
  imageAccessDenied: {
    height: screenWidth / 1.6,
    width: screenWidth / 1.8,
  },
  itemsContainer: {
    flexDirection: "row",
  },
  textContainer: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 20,
  },
  text: {
    textTransform: "capitalize",
    fontWeight: "600",
    marginVertical: 15,
  },
});

export default Details;
