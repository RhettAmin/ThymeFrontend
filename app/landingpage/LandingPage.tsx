import { StyleSheet, Text, View, Image } from 'react-native';

const LandingPage = () => {
    return (
        <View style={styles.container}>
          <Text>Recipes</Text>
          <Text>Thyme to Dine</Text>
          <Text>About</Text>
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default LandingPage;