// Format each drug in drugs array to represent as box

import {Image, StyleSheet, Text, View} from 'react-native';
import PriceFormattedText from './PriceFormattedText';
import {AutoSizeText, ResizeTextMode} from 'react-native-auto-size-text';
// import {logo} from "../assets/images/images_util"
const logoPodorozhnyk = require('../assets/images/logo_podorozhnyk.png');
const logoAnc = require('../assets/images/logo_anc.png');
const logo911 = require('../assets/images/logo_911.png');

const getImage = (apteka: string) => {
  if (apteka === 'podorozhnyk') {
    return logoPodorozhnyk;
  }
  if (apteka === 'anc') {
    return logoAnc;
  }
  if (apteka === '911') {
    return logo911;
  }
};

const DrugBox = ({name, price, store, picture}: any) => {
  const logoPath = getImage(store);

  return (
    <View style={[styles.box, styles.shadow]}>
      <View style={{flexDirection: 'row'}}>
        <View
          style={{
            flexDirection: 'column',
            width: '60%',
            alignContent: 'center',
            justifyContent: 'space-between',
          }}>
          <AutoSizeText
            fontSizePresets={[17, 16, 13]}
            numberOfLines={3}
            mode={ResizeTextMode.preset_font_sizes}
            style={styles.text}>
            {name}
          </AutoSizeText>
          <PriceFormattedText price={price} />
        </View>
        <View style={{width: '40%'}}>
          <Image
            source={{
              uri: picture,
            }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
      </View>
      <Image source={logoPath} style={styles.logo} />
    </View>
  );
};

export default DrugBox;

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
    elevation: 4,
  },
  logo: {
    alignSelf: 'flex-end',
    position: 'absolute',
    // marginBottom: 150,
    width: 50,
    height: 50,
    top: -6,
    right: -6,
    borderRadius: 90,
  },
  text: {
    // fontSize: 15,
    fontFamily: 'Montserrat-Bold',
    paddingLeft: 15,
    width: '100%',
    color: 'black',
  },
  image: {
    width: 95, 
    height: 90, 
  },
});

const customStyles = {
  fontSize: 15,
  fontFamily: 'Montserrat-Bold',
  paddingLeft: 15,
  width: '60%',
  color: 'black',
};
