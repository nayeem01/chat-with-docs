import React from "react";

export default function Toast({ notification }: { notification: string }) {
  return (
    <div className="toast toast-start hidden" id="myToast">
      <div className="alert alert-success">
        <span>{notification}</span>
      </div>
    </div>
  );
}
