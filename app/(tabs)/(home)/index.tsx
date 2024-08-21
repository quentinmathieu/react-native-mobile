import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View} from 'react-native';
import axios from 'axios';

const baseUrl = 'https://sf-ecommerce.maqu6194.odns.fr/api/products';

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
      // const json = await response.json();
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
            <Text>
              {item.name}
            </Text>
          )}
        />
      )}
    </View>
  );
};

export default App;