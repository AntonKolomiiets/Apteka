import React, { useState } from 'react';
import { TextInput, StyleSheet, View } from 'react-native';

const HeaderSearchBar = ({ onSearch }: any) => {
  const [search, setSearch] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.search}
        placeholder="Пошук"
        clearButtonMode="always"
        value={search}
        onChangeText={(text) => {
          setSearch(text);
          onSearch(text);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  search: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: 384,
    alignSelf: 'center',
    marginTop: 40,
  },
});

export default HeaderSearchBar;
