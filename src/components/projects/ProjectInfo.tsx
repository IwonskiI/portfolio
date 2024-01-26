import React, { ReactNode } from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function ProjectInfo(Project: ModalProps) {
  if (!Project.open) return null;
  return ReactDOM.createPortal(
    <>
      <div className="fixed inset-0 bg-gray-100/50 z-5" />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-50px bg-white z-5">
        <button onClick={Project.onClose}>X</button>
        {Project.children}
      </div>
    </>,
    document.getElementById("global-modal") as HTMLElement
  );
}
