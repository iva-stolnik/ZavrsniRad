import {
  LOGIN,
  ADD_NEW_MEMBER,
  REMOVE_MEMBER,
  CHANGE_MEMBERS,
  CHECK_HISTORY_MSG,
  ADD_NEW_MSG,
  CHANGE_ROOM,
  LOGOUT,
} from "./actions";

const initialState = {
  member: "",
  members: [],
  messages: [],
  rooms: ["General", "Fun 'n' games", "Casual", "Learning"],
  currentRoom: "General",
  memberJoinedOrLeftMsg: "",
};
export function reducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN: {
      return {
        ...state,
        member: action.payload,
      };
    }
    case ADD_NEW_MEMBER: {
      return {
        ...state,
        members: [...state.members, action.payload],
      };
    }
    case REMOVE_MEMBER: {
      const novoStanje = state.members.filter(
        (m) => m.id !== action.payload.id
      );
      return {
        ...state,
        members: [...novoStanje],
      };
    }
    case CHANGE_MEMBERS: {
      return {
        ...state,
        memberJoinedOrLeftMsg: action.payload,
      };
    }
    case CHECK_HISTORY_MSG: {
      return {
        messages: [action.payload],
      };
    }
    case ADD_NEW_MSG: {
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    }
    case CHANGE_ROOM: {
      return {
        ...state,
        members: [],
        messages: [],
        currentRoom: action.payload,
      };
    }
    case LOGOUT: {
      let clearStorage = ["myUser", "color", "myUserID", "backgroundImage"];
      clearStorage.forEach((item) => {
        localStorage.removeItem(item);
      });
      return {
        ...initialState,
      };
    }
    default:
      return { ...state };
  }
}
