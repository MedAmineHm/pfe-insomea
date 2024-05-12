import React from "react";
import { Box, Button, Group, Modal } from "@mantine/core";

import classes from "./styles.module.css";
import NodeConfigForm from "./NodeConfigForm";

const ConfigModal = ({ opened, close, onConfirm, selectedNode }) => {
  return (
    <Modal
      opened={opened}
      onClose={close}
      title={`Config: ${selectedNode?.data?.values?.location}`}
      size="lg"
    >
      <Box className={classes.container}>
        <Box className={classes.formContainer}>
          <NodeConfigForm
            node={selectedNode}
            close={close}
            onConfirm={onConfirm}
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfigModal;
