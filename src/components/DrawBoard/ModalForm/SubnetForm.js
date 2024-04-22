import { TextInput } from "@mantine/core";

const SubnetForm = ({ form, label, nodeId }) => {
  return (
    <>
      <TextInput
        type="text"
        withAsterisk
        label={label}
        placeholder="Adress Prefixes"
        {...form.getInputProps(`${nodeId}_adressspace`)}
      />
      <TextInput
        type="text"
        withAsterisk
        label="Virtual network name"
        placeholder="Virtual network name"
        {...form.getInputProps(`${nodeId}_Virtualnetworkname`)}
      />
    </>
  );
};

export default SubnetForm;
