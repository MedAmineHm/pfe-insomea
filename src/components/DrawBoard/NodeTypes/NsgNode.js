import React, { memo } from "react";
import { Handle, Position } from "reactflow";
import { Image } from "@mantine/core";

const vmImg =
  "https://www.devopspertise.com/img/blog/title-azure-devops-automated-network-security-group-nsg-backup.png";

const NsgNode = ({ data, selected = false, isConnectable }) => {
  return (
    <>
      <div
        style={{
          padding: 10,
          height: 138,
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

export default memo(NsgNode);
