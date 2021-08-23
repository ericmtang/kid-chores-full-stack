import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  SectionList,
} from "react-native";
import { Card } from "react-native-elements";
import { useSelector, useDispatch } from "react-redux";
import { addPoints } from "../redux/ActionCreators";
import Accordion from "react-native-collapsible/Accordion";

export default function ParentBehavior() {
  const behaviors = useSelector((state) => state.behaviors);
  const behaviorQ = useSelector((state) => state.behaviorQueue);
  console.log("ParentBehavior: ", behaviors, behaviorQ);
  const dispatch = useDispatch();
  const [activeSections, setActiveSections] = useState([2]);
  const [updatedList, setUpdatedList] = useState(false);
  const [sections, setSections] = useState([
    {
      title: "Approved Behaviors",
      content: behaviorQ.filter((item) => item.approval !== null),
      listType: "renderApproved",
    },
    {
      title: "Behaviors Pending Approval",
      content: behaviorQ.filter((item) => item.approval === null),
      listType: "renderPending",
    },
    {
      title: "Add Behavior to Score",
      content: behaviors,
      listType: "renderBehaviors",
    },
  ]);

  const renderHeader = (section, _, isActive) => {
    console.log("renderHeader");
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{section.title}</Text>
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

  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

  const updateSections = (activeSections) => {
    setActiveSections(activeSections);
  };

  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id.toString()}
        renderItem={(item) => renderContent(item)}
        renderSectionHeader={(item) => (
          <Text style={styles.header}>
            {item.title}
          </Text>
        )}
      />
    </SafeAreaView>
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
