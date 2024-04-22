import { Autocomplete } from "@mantine/core";

const LocationForm = ({ form, label, nodeId }) => {
  console.log(form.getInputProps(`${nodeId}_location`));
  return (
    <div>
      <Autocomplete
        withAsterisk
        label={label}
        placeholder={label}
        data={["React", "Angular", "Vue", "Svelte"]}
        {...form.getInputProps(`${nodeId}_location`)}
      />
    </div>
  );
};

export default LocationForm;
