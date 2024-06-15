import React from "react";
import { Box, Button, Group, Modal } from "@mantine/core";

import classes from "./styles.module.css";
import NodeConfigForm from "./NodeConfigForm";
import { useLoadNodeConfigFormOptions } from "../../hooks/NodeConfigForm";

const ConfigModal = ({ opened, close, onConfirm, selectedNode, nodes }) => {
  // const { options, isLoading, isError } = useLoadNodeConfigFormOptions();

  return (
    <Modal
      opened={opened}
      onClose={close}
      title={`Config: ${selectedNode?.data?.values?.location}`}
      size="lg"
      style={{ zIndex: 1000000000000 }}
    >
      <Box className={classes.container}>
        <Box className={classes.formContainer}>
          <NodeConfigForm
            node={selectedNode}
            close={close}
            onConfirm={onConfirm}
            nodes={nodes}
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfigModal;
