import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Colors } from "@/constants/Colors";

const RecentSearch = () => {
  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <Image
          style={styles.icon}
          source={require("../assets/mic.png")}
        />
        <Text style={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sit amet.
        </Text>
        <Image
          style={styles.arrow}
          source={require("../assets/arrow.png")}
        />
      </View>
    </View>
  );
};

export default RecentSearch;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary,
    padding: 20,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 15,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  icon: {
    height: 24,
    width: 24,
    marginRight: 10,
  },
  text: {
    flex: 1,
    color: Colors.primary,
    fontSize: 16,
    lineHeight: 22,
  },
  arrow: {
    height: 24,
    width: 24,
    tintColor: Colors.primary,
  },
});
