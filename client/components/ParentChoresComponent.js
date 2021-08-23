import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, Text, View, ScrollView } from "react-native";
import { Card, CheckBox } from "react-native-elements";
import { CHORES } from "../shared/chores";
import { useSelector, useDispatch } from "react-redux";
import {
  completeChore,
  updateChore,
  fetchChores,
} from "../redux/ActionCreators";
import ListItemSwipeable from "react-native-elements/dist/list/ListItemSwipeable";
import socket from "./WebSocketComponent";

export default function ParentChores() {
  // const [chores, setChores] = useState(CHORES);
  const chores = useSelector((state) => state.Chores.chores);
  //const chores = useSelector((state) => state.Chores.chores.filter((obj)=>obj.user==state.Family.activeChild));
  const dispatch = useDispatch();
  console.log("ParentChoresSelector:", chores.length);
  // useEffect(() => {
  //   //dispatch(resetChores());
  //   dispatch(fetchChores());
  // }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={[...chores].sort(function (a, b) {
          return (
            (b.completed == "template") - (a.completed == "template") ||
            -(a > b) ||
            +(a < b)
          );
        })}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item.name}</Text>
            {item.completed == "completed" && (
              <Text style={styles.itemText}>Done: {item.updatedAt}</Text>
            )}
            <CheckBox
              checked={item.completed == "completed"}
              onPress={() => {
                //console.log("checkboxPress:", item)
                if (item.completed == "template") {
                  dispatch(updateChore({ ...item, completed: "completed" }));
                  socket.emit("chores", { id: "CHORE: Update to Completed" });
                } else if (item.completed == "completed") {
                  dispatch(updateChore({ ...item, completed: "template" }));
                  socket.emit("chores", { id: "CHORE: Update to Template" });
                }
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
  },
  itemText: {
    flex: 1,
    textAlign: "auto",
    alignSelf: "center",
  },
  itemCheckBox: {
    alignSelf: "flex-end",
  },
});
