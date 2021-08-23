import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Card } from "react-native-elements";
import { useSelector, useDispatch } from "react-redux";
import { addPoints } from "../../../redux/ActionCreators";
import Accordion from "react-native-collapsible/Accordion";

export default function ChildBehavior() {
  const behaviors = useSelector((state) => state.behaviors);
  const behaviorQ = useSelector((state) => state.behaviorQueue);
  console.log("ChildBehavior: ", behaviors, behaviorQ);
  const dispatch = useDispatch();
  const [activeSections, setActiveSections] = useState([2]);
  const [sections, setSections] = useState([
    {
      title: "Confirmed Behaviors",
      content: behaviorQ.filter(item=>item.approval !== null)
    },
    {
      title: "Pending Behaviors",
      content: behaviorQ.filter(item=>item.approval === null)
    },
    {
      title: "Select Behaviors",
      content: behaviors,
    },
  ]);

  const renderHeader = (section, _, isActive) => {
    console.log("renderHeader");
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{section.title} ({section.content.length})</Text>
      </View>
    );
  };

  const renderContent = (section, _, isActive) => {
    console.log("renderContent", section.content, activeSections);
    return (
      <View style={styles.container}>
        <FlatList
          data={section.content}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => dispatch(addPoints(item.points))}
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
    );
  };

  const updateSections = (activeSections) => {
    setActiveSections(activeSections);
  };

  return (
    <Accordion
      sections={sections}
      activeSections={activeSections}
      renderHeader={renderHeader}
      renderContent={renderContent}
      onChange={updateSections}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 22,
  },
  item: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    padding: 10,
    margin: 5,
    fontSize: 20,
    borderRadius: 5,
  },
  itemText: {
    flex: 1,
    flexBasis: 250,
    flexGrow: 1,
    backgroundColor: "aliceblue",
  },
  itemPoints: {
    flex: 1,
    flexBasis: 25,
    alignSelf: "flex-end",
    flexShrink: 1,
    backgroundColor: "pink",
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
