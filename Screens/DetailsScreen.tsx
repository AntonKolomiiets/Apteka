import {
  Button,
  FlatList,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
  Image,
  ActivityIndicator,
  RefreshControl
} from 'react-native';
import {observer} from 'mobx-react-lite';
import {useStore} from '../store/Store';
import DrugBox from '../components/DrugBox';
import {useEffect, useLayoutEffect, useState, useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import HeaderSearchBar from '../components/HeaderSearchBar';
import {Select} from '@mobile-reality/react-native-select-pro';
import debounce from 'lodash.debounce';

// search screen includes:
// serchfield: TODO
// dropdown: city
// swith: "search analogs"
// results text
// search scrollview

const city = [
  {label: 'Київ', value: 'kyiv'},
  {label: 'Харків', value: 'kharkiv'},
  {label: 'Одеса', value: 'odesa'},
  {label: 'Львів', value: 'lviv'},
  {label: 'Кривий Ріг', value: 'kryvyi_rih'},
  {label: 'Миколаїв', value: 'mykolaiv'},
  {label: 'Дніпро', value: 'dnipro'},
  {label: 'Сімферополь', value: 'simferopol'},
];

const DetailsScreen = observer(() => {
  const rootStore = useStore();
  const [search, setSearch] = useState('');
  const [isSearch, setIsSearch] = useState(false);
  const [isSelect, setIsSelect] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const refreshing = false

  // const debouncedSearch = useCallback(
  //   debounce((text: string) => {
  //     // searchAPI(text);
  //     rootStore.searchApi(text);
  //     // searchPodorozhnyk(text);
  //   }, 300),
  //   [],
  // );

  // const navigation = useNavigation();
  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerShown: true,
  //     headerBackTitleVisible: false,
  //     headerSearchBarOptions: {
  //       placeholder: 'Пошук',
  //       headerBackTitleVisible: false,
  //       hideNavigationBar: false,
  //       hideWhenScrolling: false,
  //       autofocus: true,
  //       onChangeText: (event: any) => setSearch(event.nativeEvent.text),
  //     },
  //   });
  // }, [navigation]);

  // useEffect(() => {
  //   if (search && isSelect) {
  //     setIsSearch(true);
  //     debouncedSearch(search);
  //   } else {
  //     setIsSearch(false);
  //   }
  // }, [search, isSelect, debouncedSearch]);

  const handleSelect = () => {
    setIsSelect(!isSelect);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flexDirection: 'row', marginTop: 10}}>
        <View style={{width: '56%'}}>
          <Text
            style={{
              marginLeft: 10,
              fontFamily: 'Montserrat-Regular',
              fontSize: 10,
              color: 'black',
            }}>
            Обране місто:
          </Text>
          <View>
            <Select
              options={city}
              searchable={true}
              placeholderText="Пошук"
              styles={customStyles}
              onSelect={handleSelect}
              onRemove={handleSelect}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignContent: 'center',
          }}>
          <Text
            style={{
              alignSelf: 'center',
              fontFamily: 'Montserrat-Bold',
              fontSize: 11,
              marginLeft: Platform.OS === 'ios' ? 10 : 26,
              color: 'black',
            }}>
            Шукати аналоги
          </Text>
          <Switch
            style={styles.switch}
            onValueChange={toggleSwitch}
            value={isEnabled}
            trackColor={{false: '#767577', true: '#E67171'}}
            thumbColor={isEnabled ? '#CD1719' : '#999'}
          />
        </View>
      </View>
      {isSearch && (
        <View style={{flexDirection: 'row', marginBottom: 10}}>
          <Text
            style={{
              marginLeft: 10,
              fontFamily: 'Montserrat-Medium',
              fontSize: 12,
            }}>
            Результати пошуку за запитом
          </Text>
          <Text
            style={{
              marginLeft: 2,
              fontFamily: 'Montserrat-Medium',
              fontSize: 12,
            }}>
            «
          </Text>
          <Text
            style={{
              color: '#CD1719',
              fontFamily: 'Montserrat-Bold',
              fontSize: 12,
            }}>
            {search}
          </Text>
          <Text style={{fontFamily: 'Montserrat-Medium', fontSize: 12}}>»</Text>
        </View>
      )}
      {rootStore.isSearching && <ActivityIndicator/>}
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{paddingTop: Platform.OS === 'ios' ? 15 : 15}}
        refreshControl={
          <RefreshControl refreshing={refreshing}
          onRefresh={rootStore.debounceSearch}
          />
        }
        >
        <View>
          {rootStore.SortByPriceAcend.map(drug => (
            <DrugBox
              key={drug.id}
              name={drug.name}
              price={drug.price}
              store={drug.store}
              picture={drug.picture}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
});

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  search: {},
  switch: {
    transform:
      Platform.OS === 'ios'
        ? [{scaleX: 0.7}, {scaleY: 0.7}]
        : [{scaleX: 1}, {scaleY: 1}],
    alignSelf: 'center',
  },
});

const customStyles = {
  select: {
    container: {
      backgroundColor: '#f2f2f2',
      // borderRadius: 8,
      padding: 10,
      marginTop: 0,
      borderColor: 'gray',
      borderWidth: 0,
    },
    text: {
      fontSize: 13,
      fontFamily: 'Montserrat-Bold',
      marginTop: 0,
      marginBottom: 14,
      paddingTop: 0,
      color: '000000',
    },
  },
  optionsList: {
    borderColor: 'white',
    borderRadius: 4,
  },
  option: {
    container: {
      padding: 10,
      borderBottomWidth: 0,
      borderBottomColor: '#ddd',
    },
    text: {
      fontSize: 16,

      color: 'black',
    },
  },
  modalOptionsList: {
    maxHeight: 200,
  },
  noOptions: {
    text: {
      color: 'red',
    },
  },
  backdrop: {
    backgroundColor: '#22222222',
  },
};
