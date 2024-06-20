import React, { useState } from "react";
import { TextInput, Button, Box, Group } from "@mantine/core";

const NewArchitectureForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to backend or update state
    console.log("Form data submitted:", formData);
    onClose();
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextInput
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <TextInput
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        required
      />
      <Group position="right" mt="md">
        <Button type="submit">Submit</Button>
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
      </Group>
    </Box>
  );
};

export default NewArchitectureForm;
