import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
// import { useSearchParams } from "expo-router";
import { ClickCountContext } from "./ClickCountContext";
// import { ClickCountContext } from "../context/ClickCountContext";

type Product = {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  price: number;
  rating: {
    rate: number;
    count: number;
  };
};

export default function Home() {
  //   const { username } = useSearchParams(); // Get username from route params
  const { clickCount, setClickCount, yourName } = useContext(ClickCountContext); // Use context for managing click count
  const [products, setProducts] = useState<any[]>([]);

  // Fetch sports-related products from Fakestore API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://www.thesportsdb.com/api/v1/json/3/search_all_leagues.php?c=England"
        );
        const data = await response.json();
        const firstFiveItems = data.countries.slice(5, 10); // Get the first 5 items
        setProducts(firstFiveItems); // Set only the first 5 items in state
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);
  // Handle item clicks
  const handleItemClick = () => {
    // console.log(clickCount);
    setClickCount(clickCount + 1); // Update click count using context
  };

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Text style={styles.topBarText}>Hello, {" " + yourName}👋 </Text>
      </View>

      {/* Product List */}
      <FlatList
        data={products}
        keyExtractor={(item) => item.idLeague.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={handleItemClick}>
            <Image source={{ uri: item.strFanart1 }} style={styles.cardImage} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.strLeague}</Text>
              <Text style={styles.cardDescription}>
                {item.strDescriptionFR}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Floating Button */}
      <TouchableOpacity style={styles.floatingButton}>
        <Text style={styles.floatingButtonText}>{clickCount}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topBar: {
    height: 60,
    // marginTop: 10,
    backgroundColor: "#db2024",
    justifyContent: "flex-end",
    paddingLeft: 20,
    // alignItems: "",
  },
  topBarText: {
    color: "#fff",
    fontSize: 22,
    marginTop: 30,
    fontWeight: "bold",
  },
  card: {
    margin: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    overflow: "hidden",
    elevation: 2,
  },
  cardImage: {
    height: 150,
    width: "100%",
  },
  cardContent: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 14,
    color: "#555",
  },
  floatingButton: {
    position: "absolute",
    bottom: 10,
    right: 20,
    width: "20%",
    height: 60,
    borderRadius: 10,

    backgroundColor: "#db2024",
    justifyContent: "center",
    alignItems: "center",
  },
  floatingButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
