"use client";
import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";
import Toast from "../components/toast";
import ChatBody from "./chatbody";

export default function chatHome() {
  return (
    <>
      <Navbar />
      <div className="drawer  lg:drawer-open">
        <input
          id="left-sidebar-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <Sidebar />
        <ChatBody />
      </div>
      <Toast notification="Connected to WebSocket server" />
    </>
  );
}
