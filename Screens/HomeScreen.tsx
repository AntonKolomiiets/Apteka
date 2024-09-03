import {Button, StyleSheet, Text, View, Image} from 'react-native';
import RedButton from '../components/RedButton';
import AptekaButton from '../components/AptekaButton';
// home screen with drugsote search
// "Compare prises" button -> navigate


const HomeScreen = ({navigation}: any) => {

  const navigateToCompare = () => navigation.navigate('Details')

  return (
    <View style={styles.main}>
      <Text style={styles.subheader}>{"Оберіть мережу та зробіть замовлення"}</Text>
      <AptekaButton text={"Аптека 911"} subtext={"Здорова країна"} image={"911"}/>
      <AptekaButton text={"Подорожник"} subtext={"Мережа аптек"} image={"podorozhnyk"}/>
      <AptekaButton text={"Аптека АНЦ"} subtext={"Аптека ніжних цін"} image={"anc"}/>
      <View style={styles.buttonContainer}>
      <RedButton title={"Порівняти ціни"} buttonAction={navigateToCompare}/>
      </View>
    </View>
  );
};

export default HomeScreen

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  subheader: {
    alignSelf: "center",
    fontSize: 12,
    margin: 10,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: "6%",
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200, // Adjust width as needed
    height: 130, // Adjust height as needed
  },
})