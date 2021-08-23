import React, { useState } from "react";
import { FlatList, StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { Card } from "react-native-elements";
import { REWARDS } from "../shared/rewards";
import { useSelector, useDispatch } from "react-redux";
import { addPoints } from "../redux/ActionCreators"

export default function ChildRewards() {
  const rewards = useSelector((state) => state.rewards);
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <FlatList
        data={rewards}
        renderItem={({ item }) => (
            <TouchableOpacity style={styles.item} onPress={()=>dispatch(addPoints(item.points))}>
            <Text style={styles.itemText}>{item.name}</Text>
            <Text style={styles.itemPoints} style={{color: item.points < 0 ? "red" : "green"}}>{item.points}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 22,
  },
  item: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#ffffff",
    padding: 10,
    margin: 5,
    fontSize: 20,
    borderRadius: 5,
  },
  itemText: {
    flex: 1,
    textAlign: "auto",
    alignSelf: "center",
  },
  itemPoints: {
    padding: 10,
    alignSelf: "flex-end",
    margin: 1,
  },
});
