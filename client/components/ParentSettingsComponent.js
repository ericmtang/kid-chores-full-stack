import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Modal,
} from "react-native";
import { Icon, Card, Button, Input } from "react-native-elements";
import { useSelector, useDispatch } from "react-redux";
import {
  resetSettings,
  resetBehaviors,
  resetChores,
  resetRewards,
  resetBehaviorQ,
  resetRewardsQ,
  logoutUser,
  fetchChores,
  fetchRewards,
  fetchBehaviors
} from "../redux/ActionCreators";

export default function ParentSettings({ navigation }) {
  const settings = useSelector((state) => state.settings);
  console.log(settings);
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <Button
          title=" Reset Points"
          icon={
            <Icon name="wrench" type="font-awesome" size={15} color="white" />
          }
          onPress={() => dispatch(resetSettings())}
        />
      </View>
      <View style={styles.button}>
        <Button
          title=" Reset Chores"
          icon={
            <Icon name="wrench" type="font-awesome" size={15} color="white" />
          }
          onPress={() => dispatch(resetChores())}
        />
      </View>
      <View style={styles.button}>
        <Button
          title=" Reset Behaviors"
          icon={
            <Icon name="wrench" type="font-awesome" size={15} color="white" />
          }
          onPress={() => dispatch(resetBehaviors())}
        />
      </View>
      <View style={styles.button}>
        <Button
          title=" Reset Behaviors Queue"
          icon={
            <Icon name="wrench" type="font-awesome" size={15} color="white" />
          }
          onPress={() => dispatch(resetBehaviorQ())}
        />
      </View>
      <View style={styles.button}>
        <Button
          title=" Reset Rewards"
          icon={
            <Icon name="wrench" type="font-awesome" size={15} color="white" />
          }
          onPress={() => dispatch(resetRewards())}
        />
      </View>
      <View style={styles.button}>
        <Button
          title=" Reset Rewards Queue"
          icon={
            <Icon name="wrench" type="font-awesome" size={15} color="white" />
          }
          onPress={() => dispatch(resetRewardsQ())}
        />
      </View>
      <View style={styles.button}>
        <Button
          title=" Re-Fetch Data"
          icon={
            <Icon name="recycle" type="font-awesome" size={15} color="white" />
          }
          onPress={() => {
            dispatch(fetchChores());
            dispatch(fetchBehaviors());
            dispatch(fetchRewards());
          }}
        />
      </View>
      <View style={styles.button}>
        <Button
          title=" Logout"
          icon={
            <Icon name="sign-out" type="font-awesome" size={15} color="white" />
          }
          onPress={() => {
            dispatch(logoutUser());
            navigation.replace("Login");
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  list: { marginBottom: 10 },
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
  itemButton: {
    padding: 10,
    alignSelf: "flex-end",
    margin: 1,
  },
  modal: {
    justifyContent: "center",
    margin: 20,
  },
  button: {
    margin: 5,
  },
});
