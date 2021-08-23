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
  setActiveChild,
} from "../redux/ActionCreators";
import ListItemSwipeable from "react-native-elements/dist/list/ListItemSwipeable";
import socket from "./WebSocketComponent";
import { MaterialIcons } from "@expo/vector-icons";
import { withNavigation } from "react-navigation";
import ModalDropdown from "./ModalDropdown";
import DropDownPicker from "react-native-dropdown-picker";

function ParentViewHeader({ navigation }) {
  const user = useSelector((state) => state.Auth);
  const family = useSelector((state) => state.Family.family);
  const dispatch = useDispatch();
  const behaviors = useSelector((state) => state.Behaviors.behaviors);
  //console.log("CVH Behaviors:", behaviors)
  const bPoints = behaviors
    .filter((item) => item.completed == "completed")
    .reduce((acc, cur) => ({ points: acc.points + cur.points }));
  const rewards = useSelector((state) => state.Rewards.rewards);
  const rPoints = rewards
    .filter((item) => item.completed == "completed")
    .reduce((acc, cur) => ({ points: acc.points + cur.points }));
  //const points = rPoints.points + bPoints.points;
  //console.log("PVH FAMILY:", family)

  const [points, setPoints] = useState(rPoints.points + bPoints.points);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(
    family
      .filter((obj) => obj.parent == false)
      .map(
        (obj) =>
          (obj = {
            ...obj,
            value: obj.firstname,
            label: `${obj.firstname}'s Profile: Points: ${points}`,
          })
      )
  );

  //console.log("PVH ListItems:", items);
  console.log("Child Picker", value);

  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      onChangeValue={(value) => {
        dispatch(
          setActiveChild(items.filter((obj) => obj.firstname == value)[0]._id)
        );
      }}
      listMode="MODAL"
      mode="BADGE"
      modalProps={{
        animationType: "fade",
      }}
      modalContentContainerStyle={{
        backgroundColor: "#fff",
        fontSize: 40,
      }}
      listItemContainerStyle={{
        height: 80,
      }}
      listItemLabelStyle={{
        fontSize: 20,
        fontWeight: "bold",
      }}
      selectItemLabelStyle={{
        fontSize: 20,
        fontWeight: "bold",
      }}
      itemSeparator="true"
    />
    // <View style={styles.header}>

    //   <ModalDropdown style={styles.dropdown_6} options={["Junior3", "Junior4"]}></ModalDropdown>

    //   <MaterialIcons
    //     name="logout"
    //     size={24}
    //     onPress={() => {
    //       dispatch(logoutUser());
    //       navigation.replace("Login");
    //     }}
    //     style={styles.icon}
    //   />
    //   <View>
    //     <Text style={styles.headerText}>{user.firstName}'s Chores</Text>
    //   </View>
    //   <Text style={styles.points}>${user.points}</Text>

    // </View>
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

export default withNavigation(ParentViewHeader);
