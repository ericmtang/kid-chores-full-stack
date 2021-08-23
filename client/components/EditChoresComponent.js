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
import { CHORES } from "../shared/chores";
import { useSelector, useDispatch } from "react-redux";
import { deleteChore, addChore, editChore, chooseChore, updateChore } from "../redux/ActionCreators";
import socket from "./WebSocketComponent";

export default function EditChores() {
  // const [chores, setChores] = useState(CHORES);
  const chores = useSelector((state) => state.Chores.chores);
  //console.log(chores, chores.length);
  const dispatch = useDispatch();

  const [modal, setModal] = useState(false);
  const [newChore, setNewChore] = useState({
    _id: "",
    name: "",
    completed: null,
  });

  const toggleModal = () => {
    setModal(!modal);
  };

  const resetForm = () => {
    setNewChore({ _id: "", name: "", completed: null });
  };

  const submitForm = () => {
    console.log("submitForm: ", newChore);
    if (newChore._id === "") {
      const now = new Date();
      dispatch(
        chooseChore({
          ...newChore,
          completed: "template",
        })
      );
      socket.emit("chores", { id: `CHORE: Adding ${newChore.name}` });
      toggleModal();
    } else {
      dispatch(
        updateChore({
          ...newChore,
        })
      );
      socket.emit("chores", { id: `CHORE: Editing ${newChore.name}` });
      toggleModal();
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={chores}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item.name}</Text>
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
                setNewChore(item);
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
              onPress={() => {dispatch(deleteChore(item._id));
                socket.emit("chores", { id: `CHORE: Deleting ${item._id}` });}}
              
            />
          </View>
        )}
        keyExtractor={(item) => item._id.toString()}
      />
      <Button
        title=" Add Chore"
        icon={<Icon name="plus" type="font-awesome" size={15} color="white" />}
        onPress={() => toggleModal()}
      />
      <Modal
        animationType={"slide"}
        transparent={false}
        visible={modal}
        onRequestClose={() => toggleModal()}
      >
        <View style={styles.modal}>
          <Input
            placeholder="New Chore"
            leftIcon={{ type: "font-awesome", name: "check-square" }}
            leftIconContainerStyle={{ paddingRight: 10 }}
            onChangeText={(chore) => setNewChore({...newChore, name: chore })}
            value={newChore.name}
          ></Input>
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
