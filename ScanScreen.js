import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

export default function ScanScreen({ navigation }) {
  const product = {
    id: '1',
    name: 'Orange Juice',
    brand: 'Lauren’s',
    price: 149,
    quantity: 1,
    imageUrl: 'https://s3-alpha-sig.figma.com/img/95fa/878b/d5bc6b7e5e42324b3bb5c2a6b4e4bf3b?Expires=1731283200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=oUJYZieA4xZaBghyNk9QxMzcUIDg62KqgM2SQaPxWqxXpdHznJJ9nGehDjK88iE4QKY7MOjDuwjx8J46m~o3WXP~5Bm3MhOW7zW7YYmLJxuE9ii4TKuwGFcbzXDCO8sXba6OyTb2u8NB9FZ-~iJji03U-ZaMID1Xt3YdITs9F8Gg9uBJjWxbVgpissWA5p2cU3JdVzYRJQ8hiSRAlbEBzM4vV0w1qpH~2inXNsKtha4aC~cjmxOOT-IsOMZ5bc9IwkygzSHHNWEtTMtpX3LZZgBHUpFpWxsEbZ1V8JOnw1ovG0~ltiOahvUO-2Jfj8CRdNHzJ9yLsrb3GflCtt27sw__',
  };
  const addToCart = async () => {
    try {
      let cart = await AsyncStorage.getItem('cart');
      cart = cart ? JSON.parse(cart) : [];

      const index = cart.findIndex(item => item.id === product.id);
      if (index >= 0) {
        cart[index].quantity += 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }
      await AsyncStorage.setItem('cart', JSON.stringify(cart));
      Alert.alert('Success', 'Product added to cart!');
      navigation.navigate('Cart'); 
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Could not add product to cart.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Scan Product</Text>
      <View style={styles.scanArea}>
        <Image
          style={styles.productImage}
          source={{ uri: product.imageUrl }}
        />
        <View style={styles.scanOverlay}>
          <View style={styles.overlayCornerTopLeft}></View>
          <View style={styles.overlayCornerTopRight}></View>
          <View style={styles.overlayCornerBottomLeft}></View>
          <View style={styles.overlayCornerBottomRight}></View>
        </View>
      </View>
      <View style={styles.productInfo}>
        <Image
          style={styles.thumbnail}
          source={{ uri: product.imageUrl }}
        />
        <View style={styles.productDetails}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productDescription}>{product.brand}</Text>
        </View>
        <TouchableOpacity style={styles.addButton} onPress={addToCart}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 40,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
  backText: {
    fontSize: 18,
    color: '#000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  scanArea: {
    width: width * 0.9,
    height: width * 0.9,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 30,
    backgroundColor: '#fff',
    position: 'relative',
  },
  productImage: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
  scanOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  overlayCornerTopLeft: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 40,
    height: 40,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderColor: '#4A90E2',
  },
  overlayCornerTopRight: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 40,
    height: 40,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderColor: '#4A90E2',
  },
  overlayCornerBottomLeft: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 40,
    height: 40,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderColor: '#4A90E2',
  },
  overlayCornerBottomRight: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 40,
    height: 40,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderColor: '#4A90E2',
  },
  productInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    width: '90%',
    marginBottom: 30,
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 15,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  productDescription: {
    fontSize: 12,
    color: 'gray',
  },
  addButton: {
    backgroundColor: '#4A90E2',
    padding: 10,
    borderRadius: 20,
  },
  addButtonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
});
