import { FlatList, Image, View, Dimensions, StyleSheet } from "react-native";
import images from "@/assets/images/image";
import GuessedListItem from "./GuessedListItem";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const GuessedList = ({ filteredData }: any) => {
  return (
    <View style={styles.container}>
      <Image source={images.listBg} style={styles.imageBG} />
      <FlatList
        style={styles.flatlist}
        data={filteredData}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <GuessedListItem item={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flatlist: {
    maxHeight: screenWidth / 1.1,
    position: "absolute",
    top: screenWidth / 40,
  },
  imageBG: {
    height: screenHeight / 1.7,
    width: screenWidth / 1.1,
    position: "relative",
    top: screenWidth / -7,
  },
});

export default GuessedList;
