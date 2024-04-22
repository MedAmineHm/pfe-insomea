import { TextInput } from "@mantine/core";

const ResourcegroupForm = ({ form, label, nodeId }) => {
  return (
    <>
      <TextInput
        withAsterisk
        label="Resource Name"
        placeholder="Resource Name"
        {...form.getInputProps(`${nodeId}_resourceName`)}
      />

      <TextInput
        type="text"
        withAsterisk
        label="Resource group name"
        placeholder="Resource group name"
        {...form.getInputProps(`${nodeId}_Resourcegroupname`)}
      />
    </>
  );
};

export default ResourcegroupForm;
