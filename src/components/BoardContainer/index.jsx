import React, { useState } from "react";
import {
  AppShell,
  Burger,
  Button,
  Group,
  Image,
  Modal,
  TextInput,
  Box,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import axios from "axios";
import BoardNavbar from "../BoardNavbar";

const logoUrl =
  "https://arunpotti.files.wordpress.com/2021/12/microsoft_azure.svg_.png";

const BoardContainer = ({ children }) => {
  const [opened, { toggle }] = useDisclosure();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [architectureName, setArchitectureName] = useState("");

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:3001/architecture", {
        name,
        description,
      });
      setArchitectureName(response.data.name); // Update architecture name state
      handleModalClose();
    } catch (error) {
      console.error("There was an error creating the architecture!", error);
    }
  };

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" position="apart" sx={{ width: "100%" }}>
          <Group>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <Image src={logoUrl} w={100} h={40} />
          </Group>
          <Group>
            <Button onClick={handleModalOpen}>Add New Architecture</Button>
            {architectureName && (
              <Text ml="md" fw={500}>
                Created: {architectureName}
              </Text>
            )}
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <BoardNavbar />
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>

      <Modal
        opened={isModalOpen}
        onClose={handleModalClose}
        title="Add New Architecture"
      >
        <Box>
          <TextInput
            label="Name"
            value={name}
            onChange={(event) => setName(event.currentTarget.value)}
            required
          />
          <TextInput
            label="Description"
            value={description}
            onChange={(event) => setDescription(event.currentTarget.value)}
            required
          />
          <Button mt="md" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </Modal>
    </AppShell>
  );
};

export default BoardContainer;
