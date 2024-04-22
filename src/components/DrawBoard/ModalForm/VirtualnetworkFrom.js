import { TextInput } from "@mantine/core";

const VirtualnetworkForm = ({ form, label, nodeId }) => {
  return (
    <>
      <TextInput
        type="text"
        withAsterisk
        label="Address Space"
        placeholder="Address Space"
        {...form.getInputProps(`${nodeId}_addressSpace`)}
      />
      <TextInput
        type="text"
        withAsterisk
        label="Resource group name"
        placeholder="Resource group name"
        {...form.getInputProps(`${nodeId}_Resourcegroupname22`)}
      />
      <TextInput
        type="text"
        withAsterisk
        label="virtual network name"
        placeholder="Resource group name"
        {...form.getInputProps(`${nodeId}_Resourcegroupname444`)}
      />
    </>
  );
};

export default VirtualnetworkForm;
