import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { Link } from "expo-router";

const Bento = () => {
  return (
    <SafeAreaView style={{ backgroundColor: Colors.primary }}>
      <View style={styles.container}>
        <View style={styles.upgradeCard}>
          <View>
            <Text
              style={{ color: Colors.white, fontSize: 25, fontWeight: "900" }}
            >
              Discover what you{"\n"}want to Do ...
            </Text>
            <TouchableOpacity
              style={{
                marginTop: 20,
                backgroundColor: Colors.white,
                padding: 10,
                borderRadius: 20,
                width: "100%",
              }}
            >
              <Text style={{ textAlign: "center", fontSize: 20 }}>
                Upgrade <Text style={{ color: Colors.secondary }}>Plan</Text>
              </Text>
            </TouchableOpacity>
          </View>

          <View>
            <Text
              style={{ color: Colors.white, fontSize: 100, fontWeight: "900" }}
            >
              {" "}
              K
            </Text>
          </View>
        </View>
        {/* This are the other bentos */}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            width: "88%",
            marginLeft: "9.5%",
            gap: 20,
          }}
        >
          <Link href={"/voiceRecord"} style={styles.neutralBento}>
            <View>
              <View style={styles.first}>
                <Image
                  style={{ height: 20, width: 20 }}
                  source={require("../assets/chat.png")}
                />
              </View>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: 18,
                    fontWeight: "900",
                  }}
                >
                  Start {"\n"}a new Chat
                </Text>
                <Image
                  style={{ height: 30, width: 30 }}
                  source={require("../assets/arrow.png")}
                />
              </View>
            </View>
          </Link>
          <Link href={"/voiceRecord"} style={styles.neutralBento}>
            <View>
              <View style={styles.first}>
                <Image
                  style={{ height: 20, width: 20 }}
                  source={require("../assets/mic.png")}
                />
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: 18,
                    fontWeight: "900",
                  }}
                >
                  Search {"\n"}by Voice
                </Text>
                <Image
                  style={{ height: 30, width: 30 }}
                  source={require("../assets/arrow.png")}
                />
              </View>
            </View>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Bento;

const styles = StyleSheet.create({
  container: {},
  upgradeCard: {
    backgroundColor: Colors.secondary,
    width: "80%",
    marginLeft: "9.8%",
    borderRadius: 20,
    padding: 20,
    display: "flex",
    flexDirection: "row",
  },
  neutralBento: {
    backgroundColor: Colors.primary,
    borderWidth: 2,
    borderColor: Colors.white,
    width: "43%",
    borderRadius: 20,
    padding: 20,
    marginTop: 20,
  },
  first: {
    height: 40,
    width: 40,
    borderRadius: 50,
    borderColor: Colors.white,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
});
