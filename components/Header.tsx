import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

const Header = () => {
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.first}>
          <Image
            style={styles.hamburger}
            source={require("../assets/hamburger.png")}
          />
        </View>
      </View>

      <View>
        <Text
          style={{ fontSize: 24, fontWeight: "900", color: Colors.secondary }}
        >
          KIYA
        </Text>
      </View>

      <View style={styles.last}>
        <Image
          style={{ height: 40, width: 40, borderRadius: 50 }}
          source={{
            uri: "https://images.unsplash.com/photo-1719937051230-8798ae2ebe86?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
          }}
        />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 40,
  },
  first: {
    height: 40,
    width: 40,
    borderRadius: 50,
    borderColor: Colors.white,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  last: {},
  hamburger: {
    width: 20,
    height: 20,
  },
});
