import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const ChatWindow = ({ currentRoom, messages, memberJoinedOrLeftMsg }) => {
  let inputValue;

  const myMessage = (message, index) => {
    return (
      <div className="message-container message-container-me" key={index}>
        <div className="message-name message-name-me">{message.name}</div>
        <div
          className="message-text message-text-me"
          style={{
            borderBottom: `5px solid ${message.color}D4`,
          }}
        >
          <div> {inputValue}</div>
          <div className="message-time">{message.time}</div>
        </div>
      </div>
    );
  };

  const otherUserMessage = (message, index) => {
    return (
      <div
        key={index}
        className={`${
          checkPreviousUser(messages, index)
            ? "message-container"
            : "message-container-no-space"
        }`}
      >
        {checkPreviousUser(messages, index) ? (
          <div className="message-name">{message.name}</div>
        ) : (
          ""
        )}
        <div
          className="message-text message-text-others"
          style={{
            borderBottom: `5px solid ${message.color}D4`,
          }}
        >
          <div> {inputValue}</div>
          <div className="message-time">{message.time}</div>
        </div>
      </div>
    );
  };

  const checkPreviousUser = (messages, index) => {
    //show current user name above message and add some space between if it's first msg in array
    //or previous message is from other user so it can differ
    //or if current user changes room
    return (
      index === 0 ||
      messages[index].id !== messages[index - 1].id ||
      messages[index].room !== messages[index - 1].room
    );
  };

  useEffect(() => {
    let objDiv = document.querySelector(".chat-view");
    objDiv.scrollTop = objDiv.scrollHeight;
  });

  return (
    <>
      <p className="state-member-change">{memberJoinedOrLeftMsg}</p>
      <div className="chat-channel">
        <h4 className="room-name">
          <small>Soba</small> <br /> "{currentRoom}"
        </h4>
      </div>
      <div
        className="chat-view"
        style={{
          borderColor: `${localStorage.getItem("color")}D9`,
          //if there is background in localStorage
          background: `url(${localStorage.getItem(
            "backgroundImage"
          )}) center/cover no-repeat`,
        }}
      >
        {messages.map((message, index) => {
          let messageText = message.text;

          //check if message is youtube link to show it as iframe
          if (message.text.startsWith("https://www.youtube.com")) {
            let youtubeLink = messageText.replace(
              "https://www.youtube.com/watch?v=",
              "https://www.youtube-nocookie.com/embed/"
            );

            inputValue = (
              <iframe
                width="100"
                height="70"
                className="youtube-iframe"
                src={youtubeLink}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            );
          }

          //check if message starts with http to show it as a link
          else if (messageText.startsWith("http")) {
            let URL = messageText;
            inputValue = (
              <a href={URL} target="_blank" rel="noreferrer">
                {URL}
              </a>
            );
          } else {
            inputValue = messageText;
          }

          //if message is from other user align it left
          if (message.id !== localStorage.getItem("myUserID")) {
            return otherUserMessage(message, index);
          }
          //if message is mine align it right
          return myMessage(message, index);
        })}
      </div>
    </>
  );
};

ChatWindow.propTypes = {
  messages: PropTypes.array,
  currentRoom: PropTypes.string,
  memberJoinedOrLeftMsg: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    messages: state.messages,
    memberJoinedOrLeftMsg: state.memberJoinedOrLeftMsg,
    currentRoom: state.currentRoom,
  };
}

export default connect(mapStateToProps)(ChatWindow);
