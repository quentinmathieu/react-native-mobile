import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import React, {useEffect, useState} from 'react';
import { useLocalSearchParams } from 'expo-router';
import { redirect } from 'react-router-dom';


import axios from 'axios';


type Product = {
  id: number;
  name: string;
  price: number;
  discount: string;
  salesPromotion: number;
};

export default function DetailsScreen(){

  const { id } = useLocalSearchParams();
  const [data, setData] = useState<Product>(
  );

  const getProduct = async () => {
    try {
      const response = await axios.get(
          `https://sf-ecommerce.maqu6194.odns.fr/api/products/${id}`
        );
      const product : Product = {
        id: response.data.id,
        name: response.data.name,
        price: response.data.price,
        discount: (response.data.discount) ? "Discount !" : "",
        salesPromotion: response.data.salesPromotion,
      }
      setData(product);
    } catch (error) {
      console.error(error);

      // Doesnt work T^T
      return redirect("/settings")
    }
  };

  useEffect(() => {
    getProduct();
  }, [])
  
  
  return (
    <View style={styles.container}>
      {data ? (
        <>
          <Text>Details of : {data.name}</Text>
          <Text>{ data.price }€</Text>
          <Text>{ data.discount }</Text>
          <Text>{ data.salesPromotion }% sales</Text>
        </>
      ) :  (<ActivityIndicator size="large" color="rgb(244, 81, 30)" />
      ) }
    </View>
  );
    
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});