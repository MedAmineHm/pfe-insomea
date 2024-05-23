// src/views/examples/screens/TerraBoard.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ReactFlowProvider } from "reactflow";

import BoardContainer from "components/BoardContainer";
import DrawBoard from "components/DrawBoard";
import { API_URL } from "config";

const TerraBoard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_URL}/endpoint`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <ReactFlowProvider>
      <div>
        {data ? (
          <div>
            <h2>Data Received:</h2>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        ) : (
          <p>Loading data...</p>
        )}
        <BoardContainer>
          <DrawBoard />
        </BoardContainer>
      </div>
    </ReactFlowProvider>
  );
};

export default TerraBoard;
