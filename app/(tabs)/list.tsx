import {
  View,
  ImageBackground,
  StyleSheet,
  Dimensions,
  TextInput,
  Image,
  SafeAreaView,
} from "react-native";
import { observer } from "mobx-react-lite";
import { useStore } from "@/store/Store";
import { useState } from "react";
import images from "@/assets/images/image";
import GuessedList from "@/components/GuessedList";
import ScoreView from "@/components/ScoreView";

const screenWidth = Dimensions.get("window").width;

const List = observer(() => {
  const store = useStore();
  const [searchText, setSearchText] = useState("");

  const isGuessedList = store.charStack.filter(
    (item) => item.isGuessed === true
  );

  const filteredList = isGuessedList.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <ImageBackground
        source={images.hogwartsBg}
        style={styles.imageBackground}
      >
        <SafeAreaView style={styles.safearea}>
          <ScoreView />
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.input}
              placeholder="Filter characters..."
              placeholderTextColor="#888"
              value={searchText}
              onChangeText={(text) => setSearchText(text)}
            />
            <Image source={images.searchBg} style={styles.searchImage} />
          </View>
          <GuessedList
            filteredData={searchText ? filteredList : isGuessedList}
          />
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  safearea: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000077",
  },
  imageBackground: {
    flex: 1,
    width: screenWidth,
  },
  searchContainer: {
    marginTop: -25,
    justifyContent: "center",
    alignItems: "center",
  },
  searchImage: {
    transform: [{ scaleY: 0.45 }],
    width: screenWidth / 1.2,
    height: screenWidth / 3,
    position: "relative",
  },
  input: {
    height: screenWidth / 10,
    width: screenWidth / 1.5,
    borderColor: "#23373d00",
    borderWidth: 1, // For Debugging
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "#edcb9d00",
    color: "#000",
    position: "absolute",
    zIndex: 1,
  },
});

export default List;
