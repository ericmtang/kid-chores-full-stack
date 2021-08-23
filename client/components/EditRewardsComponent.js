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
import { deleteReward, addReward, editReward, chooseReward, updateReward } from "../redux/ActionCreators";
import socket from "./WebSocketComponent";

export default function EditRewards() {
  const rewards = useSelector((state) => state.Rewards.rewards);
  //console.log(rewards, rewards.length);
  const dispatch = useDispatch();

  const [modal, setModal] = useState(false);
  const [newReward, setNewReward] = useState({
    _id: "",
    name: "",
    points: 0,
  });

  const toggleModal = (event) => {
    setModal(!modal);
  };

  const resetForm = () => {
    setNewReward({ name: "", points: "" });
  };

  const submitForm = () => {
    console.log("submitForm: ", newReward);
    if (newReward._id === "") {
      const now = new Date();
      dispatch(
        chooseReward({
          ...newReward,
          completed: "template",
          points: Number(newReward.points),
        })
      );
      toggleModal();
    } else {
      dispatch(
        updateReward({
          ...newReward,
          points: Number(newReward.points),
        })
      );
      toggleModal();
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={rewards.filter((rew) => rew.completed == "template")}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>
              {item.name} ({item.points})
            </Text>
            <Button
              icon={
                <Icon
                  name="pencil"
                  type="font-awesome"
                  color="white"
                  size={14}
                />
              }
              buttonStyle={styles.itemButton}
              onPress={() => {
                setNewReward(item);
                toggleModal();
              }}
            />
            <Button
              icon={
                <Icon
                  name="trash"
                  type="font-awesome"
                  color="white"
                  size={14}
                />
              }
              buttonStyle={styles.itemButton}
              onPress={() => dispatch(deleteReward(item._id))}
            />
          </View>
        )}
        keyExtractor={(item) => item._id.toString()}
      />
      <Button
        title=" Add Reward"
        icon={<Icon name="plus" type="font-awesome" size={15} color="white" />}
        onPress={(event) => toggleModal(event)}
      />
      <Modal
        animationType={"slide"}
        transparent={false}
        visible={modal}
        onRequestClose={() => toggleModal()}
      >
        <View style={styles.modal}>
          <Input
            placeholder="New Reward"
            leftIcon={{ type: "font-awesome", name: "thumbs-up" }}
            leftIconContainerStyle={{ paddingRight: 10 }}
            onChangeText={(chore) =>
              setNewReward({ ...newReward, name: chore })
            }
            value={newReward.name}
          />
          <Input
            placeholder="Point Cost"
            keyboardType="numeric"
            leftIcon={{ type: "font-awesome", name: "dollar" }}
            leftIconContainerStyle={{ paddingRight: 10 }}
            onChangeText={(points) =>
              setNewReward({ ...newReward, points: points })
            }
            value={newReward.points}
          />
          <View style={{ margin: 10 }}>
            <Button
              onPress={() => {
                submitForm();
                resetForm();
              }}
              color="#5637DD"
              title="Submit"
            />
          </View>
          <View style={{ margin: 10 }}>
            <Button
              onPress={() => toggleModal()}
              color="#808080"
              title="Cancel"
            />
          </View>
        </View>
      </Modal>
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
});
