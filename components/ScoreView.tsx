import { useStore } from "@/store/Store";
import { observer } from "mobx-react-lite";
import {
  View,
  StyleSheet,

} from "react-native";
import ScoreContainer from "@/components/ScoreSontainer";

const ScoreView = observer(() => {
  const store = useStore();
  return (
    <View style={styles.scoreView}>
      <ScoreContainer score={store.attemptsSum} text={"Total"} />
      <ScoreContainer score={store.attemptsSuccesfull} text={"Success"} />
      <ScoreContainer score={store.attemptsFailed} text={"Failed"} />
    </View>
  );
});

const styles = StyleSheet.create({
  scoreView: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 15,
  },
});

export default ScoreView

