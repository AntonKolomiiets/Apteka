import {
  View,
  SafeAreaView,
  ImageBackground,
  ScrollView,
  RefreshControl,
  StyleSheet,
} from "react-native";
import { observer } from "mobx-react-lite";
import { useStore } from "@/store/Store";
import PictureContainer from "@/components/PictureContainer";
import images from "@/assets/images/image";
import NamePlate from "@/components/NamePlate";
import HouseVoteButton from "@/components/HouseVoteButton";
import NoHouseButton from "@/components/NoHouseButton";
import WinOverlay from "@/components/WinOverlay";
import ScoreView from "@/components/ScoreView";

const Index = observer(() => {
  const store = useStore();
  const refreshing = false;

  const handleAttemptIncrement = () => {
    store.currentCharacter?.incrementAttempt();
    store.calculateAttemptsSum();
  };

  const HandleRefreshCharater = () => {
    try {
      setTimeout(() => {
        store.chooseRandomCharacter();
      }, 1000);
    } catch (error) {
      console.error(error);
    }
  };

  const HandleGuessHouse = (house: string) => {
    handleAttemptIncrement();
    store.currentCharacter?.setIsGuessed();
    if (store.currentCharacter?.house === house) {
      console.log("Guessed correctly");
      store.currentCharacter?.setGuessedCorrectly();
      store.incrementAttemptsSuccesfull();
    } else {
      console.log("Guessed wrong");
      store.incrementAttemptsFailed();
    }
    store.chooseRandomCharacter();
  };

  return (
    <SafeAreaView style={styles.safearea}>
      <ImageBackground source={images.hogwartsBg} style={styles.imageBG}>
        <View style={styles.container}>
          <WinOverlay overlayVisible={store.isWin} />
          <ScoreView />
          <ScrollView
            style={styles.scrollview}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={HandleRefreshCharater}
              />
            }
          >
            {store.currentCharacter && (
              <PictureContainer
                imageUri={store.currentCharacter.picture}
                scale={1}
              />
            )}
          </ScrollView>
          {store.currentCharacter && (
            <NamePlate name={store.currentCharacter.name} />
          )}
          <View style={styles.buttonRow}>
            <HouseVoteButton
              image={images.gryffindor}
              house={"Gryffindor"}
              onPressFunction={() => HandleGuessHouse("Gryffindor")}
            />
            <HouseVoteButton
              image={images.slytherin}
              house={"Slytherin"}
              onPressFunction={() => HandleGuessHouse("Slytherin")}
            />
          </View>
          <View style={styles.buttonRow}>
            <HouseVoteButton
              image={images.ravenclaw}
              house={"Ravenclaw"}
              onPressFunction={() => HandleGuessHouse("Ravenclaw")}
            />
            <HouseVoteButton
              image={images.hufflepuff}
              house={"Hufflepuff"}
              onPressFunction={() => HandleGuessHouse("Hufflepuff")}
            />
          </View>

          <NoHouseButton onPressFunction={() => HandleGuessHouse("")} />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
    backgroundColor: "#000",
  },
  imageBG: {
    flex: 1,
    width: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000077",
  },
  scoreView: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 15,
  },
  scrollview: {
    width: "95%",
    margin: 0,
    padding: 0,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "95%",
  },
});

export default Index;
