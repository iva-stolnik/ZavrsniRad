import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { newTime } from "../services/time";
import { OverlayTrigger, Tooltip, Spinner } from "react-bootstrap";

const ChatInput = ({ nickName, onSendMessage, currentRoom }) => {
  //textual message
  const addNewMsg = (e) => {
    let input = document.getElementById("input-value");
    if (e.key === "Enter" && input.value !== "") {
      onSendMessage({
        name: nickName,
        time: newTime(),
        text: input.value,
        id: localStorage.getItem("myUserID"),
        color: localStorage.getItem("color"),
        room: currentRoom,
      });
      //clean input value
      input.value = "";
    }
  };

  //voice message to text
  const record = () => {
    const content = document.getElementById("mic");
    const spinner = document.querySelector(".micSpinner");
    //if browser doesn't support speechRecognition
    try {
      const speechRecognition =
        window.webkitSpeechRecognition || window.SpeechRecognition;
      const recognition = new speechRecognition();

      recognition.lang = "hr";

      recognition.onstart = () => {
        console.log("You can talk now, I am listening");
        spinner.hidden = false;
      };

      recognition.onspeechend = () => {
        spinner.hidden = true;
      };

      recognition.onresult = (event) => {
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript;
        let voiceMessage = window.confirm(
          "Želiš li poslati poruku:  \n" + transcript
        );
        content.value = transcript;
        console.log("I dont listen anymore :)");
        //if user confirms voice message send it as text message
        if (voiceMessage === true) {
          onSendMessage({
            name: nickName,
            time: newTime(),
            text: transcript,
            id: localStorage.getItem("myUserID"),
            color: localStorage.getItem("color"),
            room: currentRoom,
          });
        }
      };

      recognition.onerror = (event) => {
        console.log("Speech recognition error detected: " + event.error);
        console.log("I dont listen anymore :)");
        spinner.hidden = true;
      };

      recognition.start();
    } catch (error) {
      console.log(error);
      alert("Isprobaj ovu funkcionalnost na nekom drugom browseru :)");
    }
  };

  //set image as temporary background
  const fileSelectorHandler = (e) => {
    //creating blob (file-like object of immutable, raw data) for uploaded image
    let blob = new Blob([e.target.files[0]], { type: "image/png" });
    let blobUrl = URL.createObjectURL(blob);
    let chatWindow = document.querySelector(".chat-view");

    localStorage.setItem("backgroundImage", blobUrl);
    chatWindow.style.background = `url(${localStorage.getItem(
      "backgroundImage"
    )}) center/cover no-repeat`;

    URL.revokeObjectURL(blob);
  };

  // tooltip for upload button because ::after and ::before are already in use
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Upload temporary background image
    </Tooltip>
  );

  return (
    <div className="chat-send-msg">
      <input
        type="file"
        id="uploadImage"
        name="uploadImage"
        hidden
        onChange={(e) => fileSelectorHandler(e)}
      />
      <OverlayTrigger
        placement="bottom-start"
        delay={{ show: 150, hide: 200 }}
        overlay={renderTooltip}
      >
        <label
          htmlFor="uploadImage"
          className="label-upload-image"
          style={{
            backgroundColor: `${localStorage.getItem("color")}D4`,
          }}
        />
      </OverlayTrigger>
      <input
        type="text"
        className="chat-input"
        style={{ borderColor: `${localStorage.getItem("color")}D4` }}
        onKeyDown={addNewMsg}
        id="input-value"
      />
      <i className="fas fa-microphone" id="mic" onClick={record}></i>
      <Spinner
        animation="grow"
        style={{
          backgroundColor: `${localStorage.getItem("color")}`,
        }}
        hidden
        className="micSpinner"
      />
    </div>
  );
};

ChatInput.propTypes = {
  nickName: PropTypes.string,
  currentRoom: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    nickName: state.member,
    currentRoom: state.currentRoom,
  };
}

export default connect(mapStateToProps)(ChatInput);
