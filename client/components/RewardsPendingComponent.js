import React, { useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Card, Icon, Button } from "react-native-elements";
import { REWARDS } from "../shared/rewards";
import { useSelector, useDispatch } from "react-redux";
import {
  addPoints,
  approveRewardsQ,
  deleteRewardsQ,
  updateReward,
  deleteReward,
  fetchRewards,
} from "../redux/ActionCreators";
import socket from "./WebSocketComponent";

export default function RewardsPending() {
  const rewards = useSelector((state) => state.Rewards.rewards);
  const rewardsQ = useSelector((state) => state.rewardsQueue);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   //dispatch(resetChores());
  //   dispatch(fetchRewards());
  // }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={rewards.filter((item) => item.completed == "pending")}
        extraData={rewards}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={styles.itemText}>
              <Text>{item.name}</Text>
            </View>
            <View style={styles.itemPoints}>
              <Text
                style={{
                  textAlign: "center",
                  color: item.points < 0 ? "red" : "green",
                }}
              >
                ({item.points})
              </Text>
            </View>
            <Button
              icon={
                <Icon
                  name="check"
                  type="font-awesome"
                  color="green"
                  size={14}
                />
              }
              buttonStyle={styles.itemButton}
              onPress={() => {
                dispatch(updateReward({ ...item, completed: "completed" }));
                socket.emit("rewards", {
                  id: `REWARD: FULFILLING ${item.name}`,
                });
                dispatch(addPoints(item.points));
              }}
            />
            <Button
              icon={
                <Icon name="times" type="font-awesome" color="red" size={14} />
              }
              buttonStyle={styles.itemButton}
              onPress={() => {
                dispatch(deleteReward(item._id));
                socket.emit("rewards", {
                  id: `REWARD: Deleting ${item.name}`,
                });
              }}
            />
          </View>
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
