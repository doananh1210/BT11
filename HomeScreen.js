import React from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

const articleImages = [
  { id: '1', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiZBqkUEkQLS9fED5rYwF9vlD_BBOrmvSZlg&s' },
  { id: '2', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQU20r49XeQNiYKF1NQ0wo2zNETUm0nmKHMA&s' },
  { id: '3', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbpdV5eKcBMzjs7ltDev4YxvWvnNxcFk7wUg&s' },
];

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello 👋</Text>
          <Text style={styles.name}>Christie Doe</Text>
        </View>
        <Image
          style={styles.profilePic}
          source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2XIdzcCqf4c6NvHwGtQinSC57DTg0cs0Wew&s' }}
        />
      </View>

      <Text style={styles.sectionTitle}>Your Insights</Text>
      <View style={styles.insightsContainer}>
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Scan')}>
          <Ionicons name="scan-outline" size={50} color="purple" />
          <Text style={styles.cardTitle}>Scan New</Text>
          <Text style={styles.cardSubtitle}>Scanned 483</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('CounterfeitScreen')}>
          <Ionicons name="warning-outline" size={50} color="orange" />
          <Text style={styles.cardTitle}>Counterfeits</Text>
          <Text style={styles.cardSubtitle}>Counterfeited 32</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('SuccessScreen')}>
          <Ionicons name="checkmark-circle" size={50} color="green" />
          <Text style={styles.cardTitle}>Success</Text>
          <Text style={styles.cardSubtitle}>Checkouts 8</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('DirectoryScreen')}>
          <Ionicons name="calendar" size={50} color="blue" />
          <Text style={styles.cardTitle}>Directory</Text>
          <Text style={styles.cardSubtitle}>History 26</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.exploreMoreContainer}>
        <View style={styles.exploreMore}>
          <Text style={styles.exploreText}>Explore More</Text>
          <TouchableOpacity style={styles.arrowButton}>
            <Icon name="arrow-right" size={18} color="#000" />
          </TouchableOpacity>
        </View>
        <FlatList
          data={articleImages}
          renderItem={({ item }) => (
            <Image style={styles.articleImage} source={{ uri: item.image }} />
          )}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.articleList}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  name: {
    fontSize: 16,
    color: 'gray',
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  insightsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 130, 
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 5,
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    minWidth: '45%',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    textAlign: 'center',
  },
  cardSubtitle: {
    fontSize: 12,
    color: 'gray',
    textAlign: 'center',
  },
  exploreMoreContainer: {
    marginBottom: 20, 
  },
  exploreMore: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10, 
  },
  exploreText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  arrowButton: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 20,
  },
  articleList: {
    marginBottom: 30,
  },
  articleImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginHorizontal: 10,
  },
});
