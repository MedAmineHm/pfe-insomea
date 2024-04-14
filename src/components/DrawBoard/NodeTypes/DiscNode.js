import React, { memo } from "react";
import { Handle, Position } from "reactflow";
import { Image } from "@mantine/core";

const vmImg =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCmeJn27_bJKgT3rIh29oklzXxWqWB7i_EjP80yACkIQ&s";

const DiscNode = ({ data, selected = false, isConnectable }) => {
  return (
    <>
      <div
        style={{
          padding: 10,
          height: 98,
          backgroundColor: selected ? "#4a9e65" : "#d1d1d1",
        }}
      >
        <Image src={vmImg} width={70} h={60} fit="contain" />
        <p
          style={{
            textAlign: "center",
            color: selected ? "#fff" : "#000",
            marginTop: 5,
          }}
        >
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

export default memo(DiscNode);
