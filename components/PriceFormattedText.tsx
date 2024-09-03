import {StyleSheet, Text, View} from 'react-native';

const PriceFormattedText = ({price}: any) => {
  const wholeNumbers = Math.floor(price);
  const numberAfterComa = (price % 1).toFixed(2).substring(2);
  return (
    <View style={styles.container}>
      <Text style={styles.text1}>{wholeNumbers}</Text>
      <Text style={styles.text2}>'</Text>
      <Text style={styles.text2}>{numberAfterComa}</Text>
    </View>
  );
};

export default PriceFormattedText;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingLeft: 15,
    
  },
  text1: {
    fontSize: 24,
    fontFamily: 'Montserrat-Bold',
    marginTop: -1,
    color: "#e57171"
  },
  text2: {
    fontSize: 18,
    fontFamily: 'Montserrat-Bold',
    paddingLeft: 2,
    color: "#e57171"
  },
});
