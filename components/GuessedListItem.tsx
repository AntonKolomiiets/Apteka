import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Link } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { useStore } from "@/store/Store";
import { observer } from "mobx-react-lite";

const screenWidth = Dimensions.get("window").width;

const GuessedListItem = observer(({ item }: any) => {
  const store = useStore();

  const resetCurrentCharacter = () => {
    item.reSetIsGuessed();
    store.reSetIsWin();
    store.chooseRandomCharacter(item.id)
  };

  return (
    <View style={styles.container}>
      <Link
        href={{
          pathname: "../details",
          params: { id: item.id, name: item.name },
        }}
        asChild
      >
        <TouchableOpacity style={{ borderWidth: 0 }}>
          <View style={{ flexDirection: "row" }}>
            <View>
              <Image
                source={{
                  uri: item.picture,
                }}
                style={styles.baseImage}
                resizeMode="cover"
              />
            </View>
            <View style={styles.dataContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.textName}>{item.name}</Text>
                <Text style={styles.textAttempts}>
                  Attempts: {item.attempts}
                </Text>
              </View>
              <View style={styles.iconContainer}>
                {!item.guessedCorrectly && (
                  <TouchableOpacity onPress={resetCurrentCharacter}>
                    <MaterialIcons name="autorenew" size={30} color="black" />
                  </TouchableOpacity>
                )}
                {item.guessedCorrectly ? (
                  <MaterialIcons
                    name="check-circle"
                    size={30}
                    color="#00985a"
                  />
                ) : (
                  <MaterialIcons name="cancel" size={30} color="#e00000" />
                )}
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Link>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    margin: 5,
    marginLeft: 25,
    width: screenWidth / 1.3,
  },
  dataContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
  },
  iconContainer: {
    flexDirection: "row",
    marginRight: 45,
  },
  baseImage: {
    height: screenWidth / 7,
    width: screenWidth / 9.5,
  },
  textContainer: {
    paddingLeft: 10,
  },
  textName: {
    margin: 1,
    marginVertical: 4,
    fontSize: 17,
    fontWeight: "500",
  },
  textAttempts: {
    margin: 1,
    marginVertical: 4,
    color: "#767675",
  },
});

export default GuessedListItem;
