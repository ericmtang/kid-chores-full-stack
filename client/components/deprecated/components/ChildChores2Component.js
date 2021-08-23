import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ScrollView,
  CheckBox,
} from "react-native";
import { Card } from "react-native-elements";
import { CHORES } from "../shared/chores";
import { useSelector, useDispatch } from "react-redux";
import { completeChore } from "../redux/ActionCreators"
import ListItemSwipeable from "react-native-elements/dist/list/ListItemSwipeable";

export default function ChildChores() {
  // const [chores, setChores] = useState(CHORES);
  const chores = useSelector((state) => state.chores);
  console.log(chores)
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <FlatList
        data={chores}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{item.name}</Text>
            { item.completed != null && <Text style={styles.itemText}>Done: {item.completed}</Text>}
            <CheckBox
              value={item.completed !== null}
              onValueChange={() => dispatch(completeChore(item.id))}
            />
          </View>
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
  itemCheckBox: {
    alignSelf: "flex-end",
  },
});
