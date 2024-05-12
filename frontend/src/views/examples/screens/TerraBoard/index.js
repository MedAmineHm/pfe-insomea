import React from "react";
import { ReactFlowProvider } from "reactflow";

import BoardContainer from "components/BoardContainer";
import DrawBoard from "components/DrawBoard";

const TerraBoard = () => {
  return (
    <ReactFlowProvider>
      <BoardContainer>
        <DrawBoard />
      </BoardContainer>
    </ReactFlowProvider>
  );
};

export default TerraBoard;
