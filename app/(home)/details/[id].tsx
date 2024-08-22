import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import React, {useEffect, useState} from 'react';
import { Redirect, useLocalSearchParams } from 'expo-router';


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
          `${process.env.EXPO_PUBLIC_API_URL}/${id}`
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
      const product : Product = {
        id: -1,
        name: "",
        price: 0,
        discount: "",
        salesPromotion: 0,
      }
      setData(product);
      console.error(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, [])
  
  
  return (
    <View style={styles.container}>
      { data != undefined && data.id == -1? (<Redirect href={"/(home)/"}></Redirect>) : ("")}
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