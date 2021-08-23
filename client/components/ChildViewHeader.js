import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View, ScrollView } from "react-native";
import { Card, CheckBox } from "react-native-elements";
import { CHORES } from "../shared/chores";
import { useSelector, useDispatch } from "react-redux";
import {
  completeChore,
  updateChore,
  fetchChores,
  resetChores,
  logoutUser,
} from "../redux/ActionCreators";
import ListItemSwipeable from "react-native-elements/dist/list/ListItemSwipeable";
import socket from "./WebSocketComponent";
import { MaterialIcons } from "@expo/vector-icons";
import { withNavigation } from "react-navigation";

function ChildViewHeader({ navigation }) {
  const user = useSelector((state) => state.Auth);
  const behaviors = useSelector((state) => state.Behaviors.behaviors);
  //console.log("CVH Behaviors:", behaviors)
  const bPoints = behaviors
    .filter((item) => (item.completed == "completed"))
    .reduce((acc, cur) => ({points: acc.points + cur.points}));
  const rewards = useSelector((state) => state.Rewards.rewards);
  const rPoints = rewards
    .filter((item) => (item.completed == "completed"))
    .reduce((acc, cur) => ({points: acc.points + cur.points}));
  const points = rPoints.points + bPoints.points;
  console.log("CVH Points: ", rPoints, bPoints, points);
  const dispatch = useDispatch();

  return (
    <View style={styles.header}>
      <MaterialIcons
        name="logout"
        size={24}
        onPress={() => {
          dispatch(logoutUser());
          navigation.navigate("Login");
        }}
        style={styles.icon}
      />
      <View>
        <Text style={styles.headerText}>{user.firstName}'s Chores</Text>
      </View>
      <Text style={styles.points}>${points}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#fff",
    letterSpacing: 0.5,
  },
  icon: {
    color: "#fff",
    position: "absolute",
    left: 16,
  },
  points: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#fff",
    letterSpacing: 0.5,
    position: "absolute",
    right: 16,
  },
});

export default withNavigation(ChildViewHeader);
