import { StyleSheet, Text, View, Image } from 'react-native';

const LandingPage = () => {
    return (
      <View style={styles.container}>
        <Text>Thyme to Dine</Text>
        <Image source={require('./assets/stew.gif')} />
      </View>
    );
}

export default LandingPage

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });