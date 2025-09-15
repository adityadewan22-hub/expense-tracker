import type { FC, ReactNode } from "react";

type ModalProps = {
  open: boolean;
  close: () => void;
  children: ReactNode;
};

const modal: FC<ModalProps> = ({ open, close, children }) => {
  if (!open) {
    return null;
  }
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
      onClick={close}
    >
      <div
        style={{
          background: "#fff",
          padding: "2rem",
          borderRadius: "8px",
          minWidth: "300px",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};
export default modal;
