import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { changeThisRoom } from "../redux/actions";

const ChatSidebar = ({
  myUser,
  members,
  rooms,
  currentRoom,
  changeThisRoom,
}) => {
  let otherUsers = members.filter((member) => member.id !== myUser.clientId);

  const changeRoom = (room) => {
    //don't reload current room
    if (room === currentRoom) {
      return;
    }
    changeThisRoom(room);
  };

  return (
    <div
      className="chat-sidebar"
      style={{ borderColor: `${localStorage.getItem("color")}B3` }}
    >
      <h5>Članovi chata:</h5>
      <div className="sidebar-members-container">
        {otherUsers.map((member, index) => {
          return (
            <div key={index}>
              <span className="sidebar-members-span">
                {member.clientData.name}
              </span>
            </div>
          );
        })}
      </div>
      <hr />
      <h5>Chat sobe:</h5>
      <div className="sidebar-members-container2">
        {rooms.map((room, index) => {
          return (
            <div key={index}>
              <span
                className={`sidebar-rooms-span ${
                  room === currentRoom ? "bold-room-name" : ""
                }`}
                onClick={() => changeRoom(room)}
              >
                {room}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

ChatSidebar.propTypes = {
  members: PropTypes.array,
  rooms: PropTypes.array,
  currentRoom: PropTypes.string,
  changeThisRoom: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    members: state.members,
    rooms: state.rooms,
    currentRoom: state.currentRoom,
  };
}

const mapDispatchToProps = {
  changeThisRoom,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatSidebar);
