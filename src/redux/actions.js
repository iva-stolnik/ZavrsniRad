export const LOGIN = "LOGIN";
export const ADD_NEW_MEMBER = "ADD_NEW_MEMBER";
export const REMOVE_MEMBER = "REMOVE_MEMBER";
export const CHANGE_MEMBERS = "CHANGE_MEMBERS";
export const ADD_NEW_MSG = "ADD_NEW_MSG";
export const CHECK_HISTORY_MSG = "CHECK_HISTORY_MSG";
export const CHANGE_ROOM = "CHANGE_ROOM";
export const LOGOUT = "LOGOUT";

//add this user to state
export function loginUser(userName) {
  return { type: LOGIN, payload: userName };
}

//add new message
export function addNewMessage(data) {
  return {
    type: ADD_NEW_MSG,
    payload: data,
  };
}

//add messages from history
export function checkHistoryMessages(data) {
  return {
    type: ADD_NEW_MSG,
    payload: data,
  };
}

//add new member or members who are already online
export function addNewMemberToRoom(member) {
  return {
    type: ADD_NEW_MEMBER,
    payload: member,
  };
}

//member has joined message
export function memberHasJoinedRoomMessage(member) {
  return {
    type: CHANGE_MEMBERS,
    payload: `${member.clientData.name} has joined.`,
  };
}

//member has left room
export function removeMemberFromRoom(member) {
  return {
    type: REMOVE_MEMBER,
    payload: member,
  };
}
//member has left message
export function memberHasLeftRoomMessage(member) {
  return {
    type: CHANGE_MEMBERS,
    payload: `${member.clientData.name} has left.`,
  };
}
//reset message for user that has joined or left chat room
export function resetMembersMessage() {
  return {
    type: CHANGE_MEMBERS,
    payload: "",
  };
}

//change room
export function changeThisRoom(room) {
  return {
    type: CHANGE_ROOM,
    payload: room,
  };
}

export function userLogout() {
  /*     setLoginValue("")
   */ return {
    type: LOGOUT,
    payload: localStorage.getItem("myUserID"),
  };
}
