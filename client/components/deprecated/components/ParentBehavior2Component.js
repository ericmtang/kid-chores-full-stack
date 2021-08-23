import React, { useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { Button, Icon } from "react-native-elements";
import { useSelector, useDispatch } from "react-redux";
import { addPoints, deleteBehaviorQ, addBehaviorQ, approveBehaviorQ } from "../redux/ActionCreators";
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

  useEffect(() => {
    setUpdatedList(!updatedList);
  }, [sections]);

  const renderHeader = (section) => {
    console.log("renderHeader");
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {section.title} ({section.content.length})
        </Text>
      </View>
    );
  };

  const renderApproved = (section) => {
    return (
      <View style={styles.container}>
        <FlatList
          data={behaviorQ.filter((item) => item.approval != null)}
          extraData={behaviorQ}
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

  const renderPending = (section) => {
    console.log("renderPending: ", section);
    return (
      <View style={styles.container}>
        <FlatList
          data={behaviorQ.filter((item) => item.approval == null)}
          extraData={behaviorQ}
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
                  dispatch(approveBehaviorQ(item.id));
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
                onPress={() => dispatch(deleteBehaviorQ(item.id))}
              />
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    );
  };

  const renderBehaviors = (section) => {
    return (
      <View style={styles.container}>
        <FlatList
          data={behaviors}
          extraData={behaviors}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => {
                const now = new Date()
                dispatch(addBehaviorQ({...item, id: now, approval: null}));
                /* dispatch(addPoints(item.points));
                dispatch(addBehaviorQ({...item, id: now, approval: now.toLocaleString("en-US", { hour12: true })}));*/
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
    );
  };

  const renderContent = (section, _, isActive) => {
    console.log("renderContent", section.content, section.listType);
    switch (section.listType) {
      case "renderApproved":
        return renderApproved(section);
      case "renderPending":
        return renderPending(section);
      case "renderBehaviors":
        return renderBehaviors(section);
      default:
        return renderBehaviors(section);
    }
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
    flexBasis: 180,
    flexGrow: 1,
    backgroundColor: "aliceblue",
  },
  itemPoints: {
    flex: 1,
    flexBasis: 25,
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
