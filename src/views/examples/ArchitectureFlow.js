import React, { useState, useRef, useCallback } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
} from "react-flow-renderer";

const POSITION_ADJUSTMENT = 50;

const Toolbox = ({ reactFlowInstance }) => {
  const azureComponents = [
    { id: "vm", label: "Virtual Machine", type: "vm" },
    { id: "storage", label: "Storage Account", type: "storage" },
    // Ajoutez d'autres composants Azure
  ];

  const onDragStart = useCallback((event, nodeType) => {
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify({ type: nodeType })
    );
    event.dataTransfer.effectAllowed = "move";
  }, []);

  return (
    <div
      className="toolbox"
      style={{
        position: "absolute",
        left: 10,
        top: 10,
        padding: 10,
        background: "#f0f0f0",
        border: "1px solid #ddd",
        borderRadius: 5,
      }}
    >
      <h4>Azure Components</h4>
      {azureComponents.map((component) => (
        <div
          key={component.id}
          draggable
          onDragStart={(event) => onDragStart(event, component.type)}
          style={{
            marginBottom: 10,
            padding: "8px 12px",
            cursor: "move",
            background: "#fff",
            border: "1px solid #ccc",
            borderRadius: 3,
          }}
        >
          {component.label}
        </div>
      ))}
    </div>
  );
};

const ArchitectureFlow = () => {
  const [elements, setElements] = useState([]);
  const reactFlowWrapper = useRef(null);

  const onElementsRemove = useCallback(
    (elementsToRemove) => {
      setElements((els) =>
        els.filter(
          (el) => !elementsToRemove.some((toRemove) => toRemove.id === el.id)
        )
      );
    },
    [setElements]
  );

  const onConnect = useCallback(
    (params) =>
      setElements((els) => addEdge({ ...params, type: "smoothstep" }, els)),
    [setElements]
  );

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const data = event.dataTransfer.getData("application/reactflow");
      const { type } = JSON.parse(data);

      const position = {
        x: event.clientX,
        y: event.clientY - POSITION_ADJUSTMENT,
      };

      const newNode = {
        id: `${type}-${new Date().getTime()}`,
        type,
        position,
        data: { label: type },
      };

      setElements((els) => els.concat(newNode));
    },
    [setElements]
  );

  const generateVMCode = (data, position) => {
    return `
resource "azurerm_virtual_machine" "${data.label}" {
  name                  = "${data.label}"
  // Autres propriétés de la machine virtuelle
  // ...
  location              = "West Europe"
  // Utilisez les coordonnées de position pour définir la position de la ressource
  // position.x et position.y peuvent être utilisés ici
}
`;
  };

  const generateStorageCode = (data, position) => {
    return `
resource "azurerm_storage_account" "${data.label}" {
  name                  = "${data.label}"
  // Autres propriétés du compte de stockage
  // ...
  location              = "West Europe"
  // Utilisez les coordonnées de position pour définir la position de la ressource
  // position.x et position.y peuvent être utilisés ici
}
`;
  };

  const generateTerraformCode = () => {
    const terraformCode = elements
      .map((element) => {
        const { type, data, position } = element;
        switch (type) {
          case "vm":
            return generateVMCode(data, position);
          case "storage":
            return generateStorageCode(data, position);
          // Ajoutez d'autres cas au besoin
          default:
            return "";
        }
      })
      .join("\n");

    console.log("Code Terraform généré :");
    console.log(terraformCode);
  };

  // Appeler la fonction de génération du code Terraform au rendu initial
  generateTerraformCode();

  return (
    <div style={{ position: "relative", height: "800px", padding: 20 }}>
      {/* Left Toolbox */}
      <Toolbox reactFlowInstance={reactFlowWrapper.current} />

      {/* Main Flow Area */}
      <ReactFlow
        elements={elements}
        onLoad={(reactFlowInstance) => {
          reactFlowWrapper.current = reactFlowInstance;
          reactFlowInstance.fitView();
        }}
        onElementsRemove={onElementsRemove}
        onConnect={onConnect}
        snapToGrid
        snapGrid={[15, 15]}
        style={{ border: "1px solid #ddd", borderRadius: 5 }}
        onDrop={onDrop}
        onDragOver={(event) => event.preventDefault()}
      >
        {/* Background */}
        <Background color="#fff" gap={16} />

        {/* MiniMap */}
        <MiniMap
          nodeStrokeColor={(n) => {
            if (n.style?.background) return n.style.background;
            if (n.type === "input") return "#0041d0";
            if (n.type === "output") return "#ff0072";
            if (n.type === "default") return "#1a192b";

            return "#eee";
          }}
          nodeColor={(n) => {
            if (n.style?.background) return n.style.background;

            return "#fff";
          }}
          nodeBorderRadius={2}
        />

        {/* Controls */}
        <Controls />
      </ReactFlow>

      {/* Button to generate Terraform code */}
      <button
        onClick={generateTerraformCode}
        style={{
          position: "absolute",
          bottom: 10,
          right: 10,
          padding: "8px 12px",
          background: "#4caf50",
          color: "#fff",
          border: "none",
          borderRadius: 3,
          cursor: "pointer",
        }}
      >
        Generate Terraform Code
      </button>
    </div>
  );
};

export default ArchitectureFlow;
