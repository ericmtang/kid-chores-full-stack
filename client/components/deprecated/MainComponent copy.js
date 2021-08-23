import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { createAppContainer } from "react-navigation";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { Icon, Header } from "react-native-elements";
import ChildChores from "../ChildChoresComponent";
//import ChildBehavior from "./ChildBehavior2Component";
//import ChildRewards from "./ChildRewardsComponent";
import ParentChores from "../ParentChoresComponent";
//import ParentBehavior from "./ParentBehavior2Component";
//import ParentRewards from "./ParentRewardsComponent"
import ParentSettings from "../ParentSettingsComponent";
import EditChores from "../EditChoresComponent";
import EditBehavior from "../EditBehaviorComponent";
import EditRewards from "../EditRewardsComponent";
import RewardsApproved from "../RewardsApprovedComponent";
import RewardsPending from "../RewardsPendingComponent";
import RewardsPendingRO from "../RewardsPendingROComponent";
import RewardsChooser from "../RewardsChooserComponent";
import BehaviorApproved from "../BehaviorApprovedComponent";
import BehaviorPending from "../BehaviorPendingComponent";
import BehaviorPendingRO from "../BehaviorPendingROComponent";
import BehaviorChooser from "../BehaviorChooserComponent";
import LoginScreen from "../LoginComponent";
import RegisterScreen from "../RegisterComponent";
import { useSelector, useDispatch } from "react-redux";
import { createStackNavigator } from "react-navigation-stack";

function PendingRewards() {
  const rewards = useSelector((state) => state.Rewards.rewards);
  return rewards.filter((item) => item.completed == "pending").length;
}
function CompletedRewards() {
  const rewards = useSelector((state) => state.Rewards.rewards);
  return rewards.filter((item) => item.completed == "completed").length;
}
function PendingBehaviors() {
  const behaviors = useSelector((state) => state.Behaviors.behaviors);
  return behaviors.filter((item) => item.completed == "pending").length;
}
function CompletedBehaviors() {
  const behaviors = useSelector((state) => state.Behaviors.behaviors);
  return behaviors.filter((item) => item.completed == "completed").length;
}

const ChildRewards = createMaterialTopTabNavigator(
  {
    Choose: {
      screen: RewardsChooser,
    },
    Waiting: {
      screen: RewardsPendingRO,
      navigationOptions: {
        tabBarLabel: (
          <Text style={{ color: "white", fontSize: 13 }}>
            WAITING (<PendingRewards />)
          </Text>
        ),
      },
    },
    Received: {
      screen: RewardsApproved,
      navigationOptions: {
        tabBarLabel: (
          <Text style={{ color: "white", fontSize: 13 }}>
            RECEIVED (<CompletedRewards />)
          </Text>
        ),
      },
    },
  },
  {
    tabBarOptions: {
      style: { backgroundColor: "#19b5fe" },
    },
  }
);

const ParentRewards = createMaterialTopTabNavigator(
  {
    Pending: {
      screen: RewardsPending,
      navigationOptions: {
        tabBarLabel: (
          <Text style={{ color: "white", fontSize: 13 }}>
            PENDING (<PendingRewards />)
          </Text>
        ),
      },
    },
    Fulfilled: {
      screen: RewardsApproved,
      navigationOptions: {
        tabBarLabel: (
          <Text style={{ color: "white", fontSize: 13 }}>
            FULFILLED (<CompletedRewards />)
          </Text>
        ),
      },
    },
  },
  {
    tabBarOptions: {
      style: { backgroundColor: "#19b5fe" },
    },
  }
);

const ChildBehavior = createMaterialTopTabNavigator(
  {
    Report: {
      screen: BehaviorChooser,
    },
    Pending: {
      screen: BehaviorPendingRO,
      navigationOptions: {
        tabBarLabel: (
          <Text style={{ color: "white", fontSize: 13 }}>
            PENDING (<PendingBehaviors />)
          </Text>
        ),
      },
    },
    Confirmed: {
      screen: BehaviorApproved,
      navigationOptions: {
        tabBarLabel: (
          <Text style={{ color: "white", fontSize: 13 }}>
            CONFIRMED (<CompletedBehaviors />)
          </Text>
        ),
      },
    },
  },
  {
    tabBarOptions: {
      style: { backgroundColor: "#19b5fe" },
    },
  }
);

const ParentBehavior = createMaterialTopTabNavigator(
  {
    Assign: {
      screen: BehaviorChooser,
    },
    Pending: {
      screen: BehaviorPending,
      navigationOptions: {
        tabBarLabel: (
          <Text style={{ color: "white", fontSize: 13 }}>
            PENDING (<PendingBehaviors />)
          </Text>
        ),
      },
    },
    Confirmed: {
      screen: BehaviorApproved,
      navigationOptions: {
        tabBarLabel: (
          <Text style={{ color: "white", fontSize: 13 }}>
            CONFIRMED (<CompletedBehaviors />)
          </Text>
        ),
      },
    },
  },
  {
    tabBarOptions: {
      style: { backgroundColor: "#19b5fe" },
    },
  }
);

const ParentNavigator = createMaterialTopTabNavigator({
  ChoreList: {
    screen: ParentChores,
    navigationOptions: {
      tabBarLabel: "Chore List",
    },
  },
  BehaviorList: {
    screen: ParentBehavior,
    navigationOptions: {
      tabBarLabel: "Behavior List",
    },
  },
  Settings: {
    screen: ParentRewards,
    navigationOptions: {
      tabBarLabel: "Rewards",
    },
  },
});

const ListEditNavigator = createMaterialTopTabNavigator({
  ChoreList: {
    screen: EditChores,
    navigationOptions: {
      tabBarLabel: "Chore List",
    },
  },
  BehaviorList: {
    screen: EditBehavior,
    navigationOptions: {
      tabBarLabel: "Behavior List",
    },
  },
  RewardsList: {
    screen: EditRewards,
    navigationOptions: {
      tabBarLabel: "Rewards List",
    },
  },
});

const ChildNavigator = createMaterialTopTabNavigator({
  Chores: { screen: ChildChores },
  Behaviors: { screen: ChildBehavior },
  Rewards: { screen: ChildRewards },
});

const SettingsNavigator = createMaterialTopTabNavigator({
  Settings: { screen: ParentSettings },
});

const LoginNavigator = createStackNavigator(
  {
    Login: { screen: LoginScreen },
    Register: { screen: RegisterScreen },
    Chores: { screen: ChildChores },
  },
  {
    initialRouteName: "Login",
  }
);

const MainNavigator = createMaterialBottomTabNavigator(
  {
    Login: {
      screen: LoginNavigator,
      navigationOptions: {
        tabBarLabel: "Login",
        tabBarIcon: ({ tintColor }) => (
          <Icon
            name="sign-in"
            type="font-awesome"
            size={20}
            color={tintColor}
          />
        ),
      },
    },
    Child: {
      screen: ChildNavigator,
      navigationOptions: {
        tabBarLabel: "Child",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="child" type="font-awesome" size={20} color={tintColor} />
        ),
      },
    },
    Parent: {
      screen: ParentNavigator,
      navigationOptions: {
        tabBarLabel: "Parents",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="home" type="font-awesome" size={24} color={tintColor} />
        ),
      },
    },
    ListEdit: {
      screen: ListEditNavigator,
      navigationOptions: {
        tabBarLabel: "List Editor",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="list" type="font-awesome" size={24} color={tintColor} />
        ),
      },
    },
    Settings: {
      screen: SettingsNavigator,
      navigationOptions: {
        tabBarLabel: "Settings",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="gear" type="font-awesome" size={24} color={tintColor} />
        ),
      },
    },
  },
  {
    initialRouteName: "Login",
    activeColor: "#f0edf6",
    inactiveColor: "#3e2465",
    barStyle: { backgroundColor: "#694fad" },
  }
);

const AppNavigator = createAppContainer(MainNavigator);

export default function Main() {
  const points = useSelector((state) => state.settings.pointsToday);
  const rewards = useSelector((state) => state.rewards);
  console.log("Main/settings: " + points);
  const now = new Date();
  return (
    <View style={styles.container}>
      <Header
        leftComponent={
          <Text style={{ color: "#fff" }}>{now.toLocaleDateString()}</Text>
        }
        centerComponent={{ text: "GOOD KID!", style: { color: "#fff" } }}
        rightComponent={
          <Text style={styles.headerScore}>Points: {points}</Text>
        }
      />
      <AppNavigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  drawerHeader: {
    backgroundColor: "#5637DD",
    height: 140,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
  },
  drawerHeaderText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  drawerImage: {
    margin: 10,
    height: 60,
    width: 60,
  },
  stackIcon: {
    marginLeft: 10,
    color: "#fff",
    fontSize: 24,
  },
  headerScore: {
    color: "#000",
    backgroundColor: "#fff",
    padding: 3,
    borderRadius: 3,
  },
});
