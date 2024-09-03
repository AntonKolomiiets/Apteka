import {View} from 'react-native';
import WebView from 'react-native-webview';
import {useRoute} from '@react-navigation/native';

const AptekaShop = () => {
  const route = useRoute();
  const {shopUri} = route.params as {shopUri: string};
  return (
    <View style={{flex: 1}}>
      <WebView
        source={{
          uri: `${shopUri}`,
        }}
      />
    </View>
  );
};

export default AptekaShop;
