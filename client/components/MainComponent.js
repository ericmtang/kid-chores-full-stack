import React, { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { createAppContainer } from "react-navigation";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { Icon, Header } from "react-native-elements";
import ChildChores from "./ChildChoresComponent";
//import ChildBehavior from "./ChildBehavior2Component";
//import ChildRewards from "./ChildRewardsComponent";
import ParentChores from "./ParentChoresComponent";
//import ParentBehavior from "./ParentBehavior2Component";
//import ParentRewards from "./ParentRewardsComponent"
import ParentSettings from "./ParentSettingsComponent";
import EditChores from "./EditChoresComponent";
import EditBehavior from "./EditBehaviorComponent";
import EditRewards from "./EditRewardsComponent";
import RewardsApproved from "./RewardsApprovedComponent";
import RewardsPending from "./RewardsPendingComponent";
import RewardsPendingRO from "./RewardsPendingROComponent";
import RewardsChooser from "./RewardsChooserComponent";
import BehaviorApproved from "./BehaviorApprovedComponent";
import BehaviorPending from "./BehaviorPendingComponent";
import BehaviorPendingRO from "./BehaviorPendingROComponent";
import BehaviorChooser from "./BehaviorChooserComponent";
import LoginScreen from "./LoginComponent";
import RegisterScreen from "./RegisterComponent";
import HeaderDropdown from "./HeaderDropdown";
import ChildViewHeader from "./ChildViewHeader";
import ParentViewHeader from "./ParentViewHeader";
import { useSelector, useDispatch } from "react-redux";
import { createStackNavigator } from "react-navigation-stack";
import socket from "./WebSocketComponent";
import {
  fetchBehaviors,
  fetchChores,
  fetchRewards,
  fetchFamily
} from "../redux/ActionCreators";

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
      tabStyle: {
        minHeight: 40,
        height: 40,
      },
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
      tabStyle: {
        minHeight: 40,
        height: 40,
      },
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
      tabStyle: {
        minHeight: 40,
        height: 40,
      },
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
      tabStyle: {
        minHeight: 40,
        height: 40,
      },
    },
  }
);

const ParentNavigator = createMaterialTopTabNavigator(
  {
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
  },
  {
    tabBarOptions: {
      tabStyle: {
        minHeight: 40,
        height: 40,
      },
    },
  }
);

const ListEditNavigator = createMaterialTopTabNavigator(
  {
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
  },
  {
    tabBarOptions: {
      tabStyle: {
        minHeight: 40,
        height: 40,
      },
    },
  }
);

const ChildNavigator = createMaterialTopTabNavigator(
  {
    Chores: { screen: ChildChores },
    Behaviors: { screen: ChildBehavior },
    Rewards: { screen: ChildRewards },
  },
  {
    tabBarOptions: {
      tabStyle: {
        minHeight: 40,
        height: 40,
      },
    },
  }
);

const SettingsNavigator = createMaterialTopTabNavigator({
  Settings: { screen: ParentSettings },
});

const MainNavigator = createMaterialBottomTabNavigator(
  {
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
    initialRouteName: "Parent",
    activeColor: "#f0edf6",
    inactiveColor: "#3e2465",
    barStyle: { backgroundColor: "#694fad" },
  }
);

const LoginNavigator = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        headerShown: false,
      },
    },
    Register: { screen: RegisterScreen },
    Parent: {
      screen: MainNavigator,
      navigationOptions: {
        headerTitle: () => <ParentViewHeader />,
        headerStyle: {
          backgroundColor: "#3c99dc",
        },
        headerLeft: () => null,
      },
    },

    Child: {
      screen: ChildNavigator,
      navigationOptions: {
        headerTitle: () => <ChildViewHeader />,
        headerStyle: {
          backgroundColor: "#3c99dc",
        },
        headerLeft: () => null,
      },
    },
  },
  {
    initialRouteName: "Login",
  }
);

const AppNavigator = createAppContainer(LoginNavigator);

export default function Main() {
  const points = useSelector((state) => state.settings.pointsToday);
  const rewards = useSelector((state) => state.Rewards.rewards);
  const user = useSelector((state) => state.Auth);
  console.log("Main/settings: " + points);
  const now = new Date();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchChores());
    dispatch(fetchRewards());
    dispatch(fetchBehaviors());
    dispatch(fetchFamily());
  }, []);

  socket.on("chores", (data) => {
    console.log("CHORES SOCKET RECEIVED FROM SERVER:", data, user.firstName);
    dispatch(fetchChores());
  });

  socket.on("behaviors", (data) => {
    console.log("BEHAVIORS SOCKET RECEIVED FROM SERVER:", data, user.firstName);
    dispatch(fetchBehaviors());
  });

  socket.on("rewards", (data) => {
    console.log("REWARDS SOCKET RECEIVED FROM SERVER:", data, user.firstName);
    dispatch(fetchRewards());
  });

  socket.on("family", (data) => {
    console.log("FAMILY SOCKET RECEIVED FROM SERVER:", data, user.firstName);
    dispatch(fetchFamily());
  });

  return (
    <View style={styles.container}>
      {/*
      <Header
        leftComponent={
          <Text style={{ color: "#fff" }}>{now.toLocaleDateString()}</Text>
        }
        centerComponent={{ text: "GOOD KID!", style: { color: "#fff" } }}
        rightComponent={
          <Text style={styles.headerScore}>Points: {points}</Text>
        }
      />
      */}
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
