import React, { memo } from "react";
import { Handle, Position } from "reactflow";
import { Image } from "@mantine/core";

const vmImg =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTefgWAwpvk2wdqXFWTY8mnSa59o6lWg3xwWgPeEXh4bg&s";

const VmNode = ({ data, selected = false, isConnectable }) => {
  return (
    <>
      <div
        style={{
          padding: 10,
          height: 128,
          backgroundColor: selected ? "#4a9e65" : "#d1d1d1",
        }}
      >
        <Image src={vmImg} width={80} h={60} fit="contain" />
        <p style={{ textAlign: "center", color: selected ? "#fff" : "#000" }}>
          {data.label}
        </p>
      </div>

      <Handle
        type="source"
        position={Position.Top}
        id="in"
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Left}
        id="in"
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="in"
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="in"
        isConnectable={isConnectable}
      />
    </>
  );
};

export default memo(VmNode);
