import React, { useEffect, useState } from "react";
import axios from "axios";
import { processBoardResources } from "../utils/terraform";

const useGenerateTerraformCode = (boardNodes, boardEdges) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [terraformCode, setTerraformCode] = useState();

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    const generateTerraformCode = async () => {
      try {
        // process board values
        const processedBoardResources = processBoardResources(
          boardNodes,
          boardEdges
        );

        const code = await axios.post(
          "http://57.152.98.72:3001/terraform/generate",
          { data: JSON.stringify(processedBoardResources) }
        );
        setTerraformCode(code.data.data);
        setIsLoading(false);
      } catch (e) {
        console.error(e);
        setIsLoading(false);
        setIsError(true);
      }
    };

    generateTerraformCode();
  }, [boardNodes, boardEdges]);

  return { terraformCode, isLoading, isError };
};

export { useGenerateTerraformCode };
