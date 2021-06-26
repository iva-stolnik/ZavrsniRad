import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  addNewMessage,
  addNewMemberToRoom,
  memberHasJoinedRoomMessage,
  removeMemberFromRoom,
  memberHasLeftRoomMessage,
  resetMembersMessage,
  checkHistoryMessages,
} from "../redux/actions";
import { Spinner } from "react-bootstrap";
import ChatSidebar from "../components/ChatSidebar";
import ChatWindow from "../components/ChatWindow";
import ChatInput from "../components/ChatInput";
import Logout from "../components/Logout";
import { getRandomColor } from "../services/randomColor";

const CLIENT_ID = "kj8qIysGnwAIVBkV";

class ChatAPP extends Component {
  constructor(props) {
    super(props);
    //creating new scaledrone with custom clientData
    this.drone = new window.Scaledrone(CLIENT_ID, {
      data: {
        name: this.props.member,
        color: localStorage.getItem("color") || getRandomColor(),
        id: localStorage.getItem("myUserID") || "",
      },
    });
  }
  //spinner status
  isLoading = true;

  componentDidMount() {
    this.drone.on("open", (error) => {
      if (error) {
        return console.error(error);
      }
      //if local storage is doesn't have user ID set it to this drone client ID (unique value)
      !localStorage.getItem("myUserID") &&
        localStorage.setItem("myUserID", this.drone.clientId);
    });

    this.drone.on("disconnect", () => {
      console.log(
        "User has disconnected, Scaledrone will try to reconnect soon"
      );
    });

    this.drone.on("reconnect", () => {
      console.log("User has been reconnected");
    });

    this.drone.on("close", (event) => {
      console.log("Connection was closed", event);
    });

    this.roomEvents();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentRoom !== this.props.currentRoom) {
      this.room.unsubscribe();
      this.roomEvents();
    }
  }

  roomEvents = () => {
    this.room = this.drone.subscribe(`observable-${this.props.currentRoom}`, {
      historyCount: 5,
    });
    this.isLoading = false;

    this.room.on("open", (error) => {
      if (error) {
        return console.error(error);
      }
      console.log(`Successfully joined ${this.props.currentRoom} room`);
    });

    this.room.on("history_message", ({ data }) => {
      this.props.checkHistoryMessages(data);
    });

    this.room.on("data", (msg) => {
      this.props.addNewMessage(msg);
    });

    this.room.on("members", (members) => {
      members.forEach((member) => {
        this.props.addNewMemberToRoom(member);
      });
    });

    this.room.on("member_join", (member) => {
      this.props.addNewMemberToRoom(member);
      this.props.memberHasJoinedRoomMessage(member);
      setTimeout(() => {
        this.props.resetMembersMessage();
      }, 1500);
    });

    this.room.on("member_leave", (member) => {
      this.props.removeMemberFromRoom(member);
      this.props.memberHasLeftRoomMessage(member);
      setTimeout(() => {
        this.props.resetMembersMessage();
      }, 1500);
    });
  };

  //get message from chatInput
  onSendMessage = (message) => {
    this.drone.publish({
      room: `observable-${this.props.currentRoom}`,
      message,
    });
  };

  closeSidebar = () => {
    document.querySelector(".chat-sidebar").classList.toggle("sidebar-hidden");
    document
      .querySelector(".chat-window")
      .classList.toggle("chat-window-all-screen");
  };

  componentWillUnmount() {
    this.drone.close();
  }

  render() {
    return (
      <>
        {this.isLoading ? (
          <div className="window-height">
            <Spinner
              animation="border"
              role="status"
              style={{ color: `${localStorage.getItem("color")}D9` }}
            >
              <span className="sr-only">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <div className="window-height">
            <div
              className="chat-main-container"
              style={{ borderColor: `${localStorage.getItem("color")}D9` }}
            >
              <div className="close-sidebar-icon" onClick={this.closeSidebar}>
                <i className="fas fa-bars"></i>
              </div>
              <Logout />
              <ChatSidebar myUser={this.drone} />
              <div className="chat-window">
                <ChatWindow myUser={this.drone} />
                <ChatInput onSendMessage={this.onSendMessage} />
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

ChatAPP.propTypes = {
  member: PropTypes.string.isRequired,
  members: PropTypes.array,
  messages: PropTypes.array,
  rooms: PropTypes.array,
  currentRoom: PropTypes.string,
  memberJoinedOrLeftMsg: PropTypes.string,
  addNewMessage: PropTypes.func,
  checkHistoryMessages: PropTypes.func,
  addNewMemberToRoom: PropTypes.func,
  memberHasJoinedRoomMessage: PropTypes.func,
  removeMemberFromRoom: PropTypes.func,
  memberHasLeftRoomMessage: PropTypes.func,
  resetMembersMessage: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    state: state,
    member: state.member,
    members: state.members,
    messages: state.messages,
    rooms: state.rooms,
    currentRoom: state.currentRoom,
    memberJoinedOrLeftMsg: state.memberJoinedOrLeftMsg,
  };
}

const mapDispatchToProps = {
  addNewMessage,
  addNewMemberToRoom,
  checkHistoryMessages,
  memberHasJoinedRoomMessage,
  removeMemberFromRoom,
  memberHasLeftRoomMessage,
  resetMembersMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatAPP);
