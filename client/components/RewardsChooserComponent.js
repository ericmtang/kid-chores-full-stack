import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { Card } from "react-native-elements";
import { REWARDS } from "../shared/rewards";
import { useSelector, useDispatch } from "react-redux";
import { addPoints, addRewardsQ, fetchRewards, chooseReward } from "../redux/ActionCreators"
import socket from "./WebSocketComponent";

export default function RewardsChooser() {
    const rewards = useSelector((state) => state.Rewards.rewards);
    const rewardsQ = useSelector((state) => state.rewardsQueue);
    const dispatch = useDispatch();

    // useEffect(() => {
    //   dispatch(fetchRewards());
    // }, []);
  
  return (
    <View style={styles.container}>
    <FlatList
      data={rewards.filter((rew) => rew.completed == "template")}
      extraData={rewards}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.item}
          onPress={() => {
            const now = new Date();
            dispatch(chooseReward({ ...item, completed: "pending" }));
            socket.emit("rewards", {
              id: `REWARD: Choosing ${item.name}`,
            });
            /* dispatch(addPoints(item.points));
                dispatch(addRewardsQ({...item, id: now, fulfilled: now.toLocaleString("en-US", { hour12: true })}));*/
          }}
        >
          <View style={styles.itemText}>
            <Text>{item.name}</Text>
          </View>
          <View style={styles.itemPoints}>
            <Text
              style={{
                textAlign: "right",
                color: item.points < 0 ? "red" : "green",
              }}
            >
              {item.points}
            </Text>
          </View>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item._id.toString()}
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
      alignItems: "center",
    },
    itemText: {
      flex: 1,
      flexBasis: 140,
      flexGrow: 1,
    },
    itemPoints: {
      flex: 1,
      flexBasis: 30,
      flexShrink: 1,
    },
    itemButton: {
      flex: 1,
      flexBasis: 25,
      padding: 10,
      alignSelf: "flex-end",
      margin: 1,
      backgroundColor: "white",
      borderColor: "black",
      borderWidth: 1,
    },
    header: {
      backgroundColor: "#F5FCFF",
      padding: 10,
    },
    content: {
      padding: 20,
      backgroundColor: "#fff",
    },
    headerText: {
      textAlign: "center",
      fontSize: 16,
      fontWeight: "500",
    },
});
