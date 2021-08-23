import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Card, Button, Icon } from "react-native-elements";
import { useSelector, useDispatch } from "react-redux";
import {
  addPoints,
  deleteRewardsQ,
  addRewardsQ,
  approveRewardsQ,
} from "../../redux/ActionCreators";
import Accordion from "react-native-collapsible/Accordion";
import { List } from "react-native-paper";
import CollapsibleView from "@eliav2/react-native-collapsible-view";

export default function ParentRewards() {
  const rewards = useSelector((state) => state.rewards);
  const rewardsQ = useSelector((state) => state.rewardsQueue);
  console.log("ParentRewards: ", rewards, rewardsQ);
  const dispatch = useDispatch();

  return (
    <ScrollView>
      <CollapsibleView
        title={
          "Pending Fulfillment (" +
          rewardsQ.filter((item) => item.fulfilled === null).length +
          ")"
        }
      >
        <View style={styles.container}>
          <FlatList
            data={rewardsQ.filter((item) => item.fulfilled === null)}
            extraData={rewardsQ}
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
                    dispatch(approveRewardsQ(item.id));
                    dispatch(addPoints(item.points));
                  }}
                />
                <Button
                  icon={
                    <Icon
                      name="times"
                      type="font-awesome"
                      color="red"
                      size={14}
                    />
                  }
                  buttonStyle={styles.itemButton}
                  onPress={() => dispatch(deleteRewardsQ(item.id))}
                />
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </CollapsibleView>
      <CollapsibleView
        title={
          "Fufilled Rewards (" +
          rewardsQ.filter((item) => item.fulfilled !== null).length +
          ")"
        }
      >
        <View style={styles.container}>
          <FlatList
            data={rewardsQ.filter((item) => item.fulfilled !== null)}
            extraData={rewardsQ}
            renderItem={({ item }) => (
              <View style={styles.item}>
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
              </View>
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </CollapsibleView>
      <CollapsibleView
        title={"Add Reward for Approval (" + rewards.length + ")"}
      >
        <View style={styles.container}>
          <FlatList
            data={rewards}
            extraData={rewards}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.item}
                onPress={() => {
                  const now = new Date();
                  dispatch(addRewardsQ({ ...item, id: now, fulfilled: null }));
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
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </CollapsibleView>
    </ScrollView>
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
    backgroundColor: "aliceblue",
  },
  itemPoints: {
    flex: 1,
    flexBasis: 30,
    flexShrink: 1,
    backgroundColor: "pink",
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
