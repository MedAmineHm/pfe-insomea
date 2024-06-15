import React from "react";
import { Box } from "@mantine/core";
import { Editor } from "@monaco-editor/react";

const CodeTab = ({ code, isLoading, isError }) => {
  return (
    <Box>
      <Editor
        theme="vs-dark"
        height={"calc(100vh - 170px)"}
        defaultLanguage={"hcl"}
        value={code}
        options={{
          readOnly: true,
          fontSize: "12px",
          minimap: {
            enabled: false,
          },
        }}
      />
    </Box>
  );
};

export default CodeTab;
