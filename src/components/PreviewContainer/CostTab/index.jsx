import { Box, Button, LoadingOverlay } from "@mantine/core";
import React from "react";

const CostTab = ({
  terraformCost,
  isError,
  isLoading,
  refreshTerraformCost,
}) => {
  return (
    <Box pos="relative">
      <LoadingOverlay
        visible={isLoading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />

      <Button onClick={refreshTerraformCost}>Refresh</Button>
      <p>{terraformCost}</p>
    </Box>
  );
};

export default CostTab;
