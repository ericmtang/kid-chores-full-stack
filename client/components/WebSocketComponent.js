import io from "socket.io-client";
import { baseUrlNoPort } from "../shared/baseUrl";
import {
  fetchRewards,
  fetchBehaviors,
  fetchChores,
} from "../redux/ActionCreators";
import { useSelector, useDispatch } from "react-redux";

//const dispatch = useDispatch();

const PORT = 3001;
//const socket = socketIOClient(`${baseUrlNoPort}:${PORT}`);
//const socket = io("http://localhost:3001", { transports: ["websocket"] });
const socket = io(`${baseUrlNoPort}:${PORT}`, { transports: ["websocket"] });
socket.on("connect", () => console.log("Socket connected", socket.id));
socket.on("connect_error", (err) => console.log("connect_error", err));
socket.on("error", (err) => console.log("error", err));
/*
socket.on("chores", (data) => {
  console.log("CHORES socket connect sent:", data);
  dispatch(fetchChores);
  //store.dispatch(justJoined(welcome_gift.success));
});
socket.on("behaviors", (data) => {
  console.log("BEHAVIORS socket connect sent");
  //store.dispatch(justJoined(welcome_gift.success));
});
socket.on("rewards", (data) => {
  console.log("REWARDS socket connect sent");
  //store.dispatch(justJoined(welcome_gift.success));
});
*/
socket.emit("chores", { id: "websocket init" });

export default socket;
