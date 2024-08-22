"use client";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import ChatBody from "./chatbody";

interface Message {
  body: string;
  sender: string;
  time: string;
}

export default function chatHome() {
  return (
    <>
      {/* <Navbar /> */}
      <div className="drawer  lg:drawer-open">
        <input
          id="left-sidebar-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <Sidebar />
        <ChatBody />
      </div>
    </>
  );
}
