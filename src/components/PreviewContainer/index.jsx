import React, { useEffect, useState } from "react";
import { Box, Button, Grid } from "@mantine/core";

import classes from "./styles.module.css";
import CodeTab from "./CodeTab";
import { useDebouncedState } from "@mantine/hooks";
import { useGenerateTerraformCode } from "../../hooks/TerraformCodeGenerator";
import { processBoardResources } from "../../utils/terraform";

const PreviewContainer = ({ nodes, edges }) => {
  const [tab, setTab] = useState("code");
  const [boardNodes, setBoardNodes] = useDebouncedState([], 1000);
  const { terraformCode, isLoading, isError } =
    useGenerateTerraformCode(boardNodes);

  useEffect(() => {
    setBoardNodes(nodes);
  }, [nodes]);

  const isTabCode = tab === "code";
  const isTabCost = tab === "cost";

  return (
    <Box className={classes.container}>
      <Grid>
        <Grid.Col span={6}>
          <Button
            variant={isTabCode ? "filled" : "light"}
            size="xs"
            fullWidth
            onClick={() => setTab("code")}
          >
            CODE
          </Button>
        </Grid.Col>
        <Grid.Col span={6}>
          <Button
            variant={isTabCost ? "filled" : "light"}
            size="xs"
            fullWidth
            onClick={() => setTab("cost")}
          >
            COST
          </Button>
        </Grid.Col>
      </Grid>
      <Box className={classes.contentContainer}>
        {isTabCode && (
          <CodeTab
            code={terraformCode}
            isError={isError}
            isLoading={isLoading}
          />
        )}
      </Box>
    </Box>
  );
};

export default PreviewContainer;
