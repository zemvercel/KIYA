import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Header from "@/components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import Bento from "@/components/Bento";
import RecentSearch from "@/components/RecentSearch";

const index = () => {
  return (
    <SafeAreaView style={{ backgroundColor: Colors.primary }}>
      <View style={styles.container}>
        <View style={{ marginBottom: -40 }}>
          <Header />
        </View>
        <Bento />
        <Text
          style={{
            color: Colors.white,
            marginLeft: 45,
            marginTop: 20,
            fontSize: 22,
            fontWeight: "900",
          }}
        >
          Recent Search
        </Text>
        <ScrollView>
          <RecentSearch />
          <RecentSearch />
          <RecentSearch />
          <RecentSearch />
          <RecentSearch />
          <RecentSearch />
          <RecentSearch />
          <RecentSearch />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    height: "100%",
    width: "100%",
  },
});
