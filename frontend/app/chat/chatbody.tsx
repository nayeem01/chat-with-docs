"use client";
import Image from "next/image";
import React, { useState } from "react";
import { ws } from "./socket";
import Typewriter from "./Typewriter";
interface Message {
  body: string;
  sender: string;
}

export default function ChatBody() {
  const [mymessages, setMymessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const sendMessage = () => {
    ws.send(
      JSON.stringify({
        body: message,

        sender: "You",
      })
    );
    setMessage("");
  };

  ws.onmessage = function (event) {
    const msData = JSON.parse(event.data);
    setMymessages((prevMessages) => [...prevMessages, msData]);
  };

  const handleKeyboardEvent = (event: any) => {
    if (event.key === "Enter") sendMessage();
  };

  const handleChanges = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setMessage(event.target.value);
  };

  return (
    <div className="drawer-content flex flex-col">
      <main className="flex-1 overflow-y-auto md:pt-4 pt-4 px-6 bg-base-200 ">
        {/* Chat start */}

        {/* Dynamic user messages */}
        {mymessages.map((message, index) => {
          if (message.sender === "AI") {
            return (
              <div className="chat chat-start" key={index}>
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img alt="Ai avatar" src="/assets/bot.jpg" />
                  </div>
                </div>
                <div className="chat-header">AI</div>
                <div className="chat-bubble chat-bubble-primary">
                  <Typewriter text={message.body} delay={15} infinite={false} />
                  {/* {message.body} */}
                </div>
              </div>
            );
          } else {
            return (
              <div className="chat chat-end" key={index}>
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <Image
                      alt="User avatar"
                      src="/assets/person.jpg"
                      width="64"
                      height="64"
                    />
                  </div>
                </div>
                <div className="chat-header">{message.sender}</div>
                <div className="chat-bubble chat-bubble-primary">
                  {message.body}
                </div>
              </div>
            );
          }
        })}
      </main>

      {/* Input field and send button fixed at bottom */}
      <div className="flex join fixed w-2/3 bottom-0 p-5">
        <input
          type="text"
          placeholder="Send a message"
          value={message}
          onChange={handleChanges}
          className="input input-bordered input-accent w-full xs"
          onKeyDown={handleKeyboardEvent}
        />
        <button
          className="btn btn-outline btn-accent ml-2"
          onClick={sendMessage}
        >
          Send
          <Image
            alt="Send icon"
            src="/assets/send.svg"
            width="16"
            height="16"
          />
        </button>
      </div>
    </div>
  );
}

{
  /* {message.toLowerCase().startsWith("AI") && (
            <div className="badge badge-info gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-4 h-4 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
              LLM
            </div>
          )} */
}
