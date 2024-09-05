import {StyleSheet, View, Text, Image, Pressable} from 'react-native';
import images from '../assets/images/image';
import {useNavigation} from '@react-navigation/native';

const getImage = (apteka: string) => {
  if (apteka === 'podorozhnyk') {
    return images.logoPodorozhnyk;
  }
  if (apteka === 'anc') {
    return images.logoAnc;
  }
  if (apteka === '911') {
    return images.logo911;
  }
};

const getUri = (apteka: string): string => {
  const uriMap: {[key: string]: string} = {
    podorozhnyk: 'https://podorozhnyk.ua',
    anc: 'https://anc.ua/',
    '911': 'https://apteka911.ua/ua',
  };
  return uriMap[apteka];
};

const AptekaButton = ({text, subtext, image}: any) => {
  const navigation = useNavigation();
  const logoPath = getImage(image);

  const handlePress = () => {
    const condition = true; // Replace with your actual condition
    const shopUri = getUri(image);

    // Navigate to AptekaShop screen with shopUri as a parameter
    navigation.navigate('AptekaShop', {shopUri});
  };

  return (
    <Pressable
      style={({pressed}) => [
        {
          transform: [{scale: pressed ? 0.97 : 1}],
        },
      ]}
      onPress={() => handlePress('')}>
      <View style={[styles.box, styles.shadow]}>
        <View style={{flexDirection: 'row'}}>
          <Image source={logoPath} style={styles.logo} />
          <View style={{alignSelf: 'center'}}>
            <Text style={styles.text}>{text}</Text>
            <Text style={styles.subtext}>{subtext}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default AptekaButton;

const styles = StyleSheet.create({
  box: {
    alignSelf: 'center',
    width: '93%',
    height: 110,
    borderRadius: 8,
    backgroundColor: 'white',
    margin: 5,
    justifyContent: 'center',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 1.5,
    elevation: 0,
  },
  text: {
    fontSize: 12,
    fontFamily: 'Montserrat-bold',
    paddingLeft: 5,
    color: 'black',
    padding: 6,
    marginLeft: 5,
  },
  subtext: {
    fontSize: 10,
    fontFamily: 'Montserrat-regular',
    paddingLeft: 5,
    color: 'black',
    padding: 6,
    marginLeft: 5,
  },
  logo: {
    width: 85,
    height: 85,
    borderRadius: 90,
    marginLeft: 10,
  },
});
