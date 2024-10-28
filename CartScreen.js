import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CartScreen({ navigation }) {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      let savedCart = await AsyncStorage.getItem('cart');
      savedCart = savedCart ? JSON.parse(savedCart) : [];
      setCart(savedCart);
      calculateTotal(savedCart);
    };

    fetchCart();
  }, []);

  const calculateTotal = (cartItems) => {
    const totalValue = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotal(totalValue);
  };

  const increaseQuantity = async (id) => {
    const updatedCart = cart.map(item => {
      if (item.id === id) {
        item.quantity += 1;
      }
      return item;
    });
    setCart(updatedCart);
    calculateTotal(updatedCart);
    await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const decreaseQuantity = async (id) => {
    const updatedCart = cart.map(item => {
      if (item.id === id && item.quantity > 1) {
        item.quantity -= 1;
      }
      return item;
    });
    setCart(updatedCart);
    calculateTotal(updatedCart);
    await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemBrand}>{item.brand}</Text>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>₹ {item.price}</Text>
      </View>
      <View style={styles.quantityControl}>
        <TouchableOpacity onPress={() => decreaseQuantity(item.id)} style={styles.quantityButton}>
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantity}>{item.quantity}</Text>
        <TouchableOpacity onPress={() => increaseQuantity(item.id)} style={styles.quantityButton}>
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Your Cart 👍</Text>
      <FlatList
        data={cart}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
      <View style={styles.footer}>
        <Text style={styles.totalText}>Total</Text>
        <Text style={styles.totalValue}>₹ {total}</Text>
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutButtonText}>Proceed to checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
    paddingTop: 80, // Tăng khoảng cách phía trên để đẩy nội dung xuống
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
    alignSelf: 'center',
  },
  list: {
    paddingBottom: 20,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 15,
  },
  itemBrand: {
    fontSize: 12,
    color: 'gray',
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 14,
    color: '#ff6347',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 15,
    marginHorizontal: 5,
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantity: {
    fontSize: 16,
    paddingHorizontal: 10,
  },
  footer: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    alignItems: 'center',
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff6347',
    marginVertical: 10,
  },
  checkoutButton: {
    backgroundColor: '#ff6347',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
