import React, { memo } from "react";
import { NodeResizeControl } from "reactflow";

const controlStyle = {
  background: "transparent",
  border: "none",
};

const SubnetNode = ({ data, selected = false }) => {
  return (
    <>
      <NodeResizeControl style={controlStyle} minWidth={100} minHeight={50}>
        <ResizeIcon />
      </NodeResizeControl>

      <span
        style={{
          color: "red",
          background: selected ? "#0a7bab" : "#ffffff",
          border: "1px solid #000",
          padding: "2px 10px",
          position: "relative",
          top: -10,
          left: 10,
        }}
      >
        {data.label}
      </span>
    </>
  );
};

function ResizeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="#ff0071"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ position: "absolute", right: 5, bottom: 5 }}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <polyline points="16 20 20 20 20 16" />
      <line x1="14" y1="14" x2="20" y2="20" />
      <polyline points="8 4 4 4 4 8" />
      <line x1="4" y1="4" x2="10" y2="10" />
    </svg>
  );
}

export default memo(SubnetNode);
