import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('HomeTabs'); 
    }, 10000);
    
    return () => clearTimeout(timer); 
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: 'https://s3-alpha-sig.figma.com/img/a1b3/7b59/96cc333ccc3bfbafd88a7250a4c5e066?Expires=1731283200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=F3vimFB-boHzTfIgsiEx0BoBq2LosHrskRT7dGxV4ugbGf18pg3O9JylcjhUxXUbkVxIBbhb8Gq6-NkMG3TQA03qeaaYm6CMSo-5JzVgDLHOiAR7IecO4dRcCOPF~VEb~x7tYsqfpwKYgA2GC8WAfPN5n6RiBRrcJcIurI8sOGYRKqvOJZTfK9N58t7NbxB0VL6QmyAig3T2rxHDpkLrBg0Zxl9MtYLGWLNW8bSnMzU9NZbFRQKroUSttPNSC7eyYAHDFUGQOgvnhVVCMWdBzAarMyazrXif7CkAYz-L26h714TzhXBwEupoMjPrs7ie2KFlGFAdA-O1l3mzuElYZg__' }} // Replace with your image URL or local path
            style={styles.image}
          />
        </View>
        <Text style={styles.title}>Scan, Pay & Enjoy!</Text>
        <Text style={styles.description}>
          Scan products you want to buy at your favorite store & pay by your phone & enjoy happy, friendly Shopping!
        </Text>
        <View style={styles.dotsContainer}>
          <View style={[styles.dot, styles.inactiveDot]} />
          <View style={[styles.dot, styles.inactiveDot]} />
          <View style={[styles.dot, styles.activeDot]} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF3F0', 
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: 20,
  },
  imageContainer: {
    width: width * 0.7, 
    height: width * 0.7, 
    borderRadius: width * 0.35, 
    overflow: 'hidden', 
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    backgroundColor: 'white', 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover', 
  },
  title: {
    fontSize: 26, 
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10, 
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  dotsContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  inactiveDot: {
    backgroundColor: '#F4CAC3',
  },
  activeDot: {
    backgroundColor: '#5A6BF9',
  },
});

export default SplashScreen;
