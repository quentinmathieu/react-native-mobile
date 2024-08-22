import React, {useEffect, useState} from 'react';
import {FlatList, View, StyleSheet} from 'react-native';
import { Link } from 'expo-router';

import axios from 'axios';


type Product = {
  id: string;
  name: string;
};

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<Product[]>([]);

  const getProducts = async () => {
    try {
      const response = await axios.get(
          `https://sf-ecommerce.maqu6194.odns.fr/api/products`
        );
      console.log(response.data["hydra:member"]);
      setData(response.data["hydra:member"]);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <View style={{flex: 1, padding: 24}}>
      {(
        <FlatList
          data={data}
          keyExtractor={({id}) => id}
          renderItem={({item}) => (
            <Link style={styles.link} href={{
              pathname: '/details/[id]',
              params: { id: item.id },
            }}>
              {item.name}
            </Link>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  link: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center'
  },})

export default App;