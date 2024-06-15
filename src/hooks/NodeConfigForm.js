import React, { useEffect, useState } from "react";
import axios from "axios";

const useLoadNodeConfigFormOptions = (node) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [options, setOptions] = useState();

  useEffect(() => {
    const loadOptions = async () => {
      try {
        const options = await axios.get(
          "http://localhost:3001/azure/vm-sizes/eastus/options"
        );
        console.log({ options });
      } catch (e) {
        console.error(e);
      }
    };

    loadOptions();
  }, []);

  return { options, isLoading, isError };
};

export { useLoadNodeConfigFormOptions };
