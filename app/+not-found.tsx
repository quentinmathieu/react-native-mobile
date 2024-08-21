import { Link, Stack } from 'expo-router';
import { View, StyleSheet, Image, Text } from 'react-native';

export default function NotFoundScreen() {
    let randomInt = Math.floor(Math.random() * 10)+1;
    let imgUrl = `../assets/images/404/avatar-thinking-${randomInt}-svgrepo-com.svg`;

    return (
        <>
            <Stack.Screen options={{ title: "Oops! This screen doesn't exist." }} />
            <View style={styles.container}>
                <Text>Are you lost ?</Text>
                <Link href="/" style={styles.title}>Go to home screen</Link>
                <Image style={styles.img} source={imgUrl} /> 
            </View>
            <View>
                
            </View>
        </>
    );
}




const styles = StyleSheet.create({
container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
},
title:{
    paddingBottom: 10,
    fontSize: 20,
    textDecorationLine: 'underline'

},
img:{
    width: 300,
    height: 300
},
});
