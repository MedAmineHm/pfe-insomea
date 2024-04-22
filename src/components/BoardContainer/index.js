import React, { useState, useEffect } from "react";
import {
  AppShell,
  Burger,
  Group,
  Image,
  Button,
  TextInput,
  Modal,
  Paper,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import BoardNavbar from "../BoardNavbar";

const logoUrl =
  "https://arunpotti.files.wordpress.com/2021/12/microsoft_azure.svg_.png";

const BoardContainer = ({ children }) => {
  const [opened, { toggle }] = useDisclosure();
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [architectureName, setArchitectureName] = useState("");
  const [architectureDescription, setArchitectureDescription] = useState("");
  const [createdArchitecture, setCreatedArchitecture] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    const savedArchitectureName = localStorage.getItem("createdArchitecture");
    if (savedArchitectureName) {
      setCreatedArchitecture(savedArchitectureName);
    }
  }, []);

  const handleAddNewClick = () => {
    setArchitectureName("");
    setArchitectureDescription("");
    closeDeleteConfirmation(); // Close delete confirmation if open
    toggle();
  };

  const handleEditClick = () => {
    setArchitectureName(createdArchitecture);
    setIsEditFormOpen(true);
    closeDeleteConfirmation(); // Close delete confirmation if open
  };

  const validateForm = () => {
    const errors = {};

    if (!architectureName.trim()) {
      errors.architectureName = "Architecture Name is required";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      console.log("Creating architecture:", architectureName);
      setCreatedArchitecture(architectureName);
      localStorage.setItem("createdArchitecture", architectureName);
      toggle();
    }
  };

  const handleEditSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      console.log("Editing architecture:", architectureName);
      setCreatedArchitecture(architectureName);
      localStorage.setItem("createdArchitecture", architectureName);
      setIsEditFormOpen(false);
    }
  };

  const handleCloseForm = () => {
    toggle();
    setIsEditFormOpen(false);
    setArchitectureName("");
    setArchitectureDescription("");
    setValidationErrors({});
  };

  const openDeleteConfirmation = () => {
    setConfirmDelete(true);
  };

  const closeDeleteConfirmation = () => {
    setConfirmDelete(false);
  };

  const handleDeleteArchitecture = () => {
    console.log("Deleting architecture:", createdArchitecture);
    if (createdArchitecture) {
      setCreatedArchitecture("");
      localStorage.removeItem("createdArchitecture");
      closeDeleteConfirmation();
    } else {
      setValidationErrors({ deleteError: "Failed to delete architecture." });
    }
  };

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Image src={logoUrl} w={100} h={40} />
          <Button variant="outline" onClick={handleAddNewClick}>
            Add New Architecture
          </Button>
          {createdArchitecture && (
            <div>
              <span
                style={{
                  marginLeft: 10,
                  color: "#3a3b3c",
                  fontWeight: "bold",
                  fontSize: "18px",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
                onClick={handleEditClick}
              >
                {createdArchitecture}
              </span>
              <Button
                style={{ marginLeft: 10 }}
                variant="outline"
                color="red"
                onClick={openDeleteConfirmation}
              >
                Delete
              </Button>
            </div>
          )}
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <BoardNavbar />
      </AppShell.Navbar>
      <AppShell.Main>
        {children}
        <Modal opened={opened || isEditFormOpen} onClose={handleCloseForm}>
          <Paper padding="lg" shadow="lg" style={{ maxWidth: 400 }}>
            <ArchitectureForm
              architectureName={architectureName}
              setArchitectureName={setArchitectureName}
              architectureDescription={architectureDescription}
              setArchitectureDescription={setArchitectureDescription}
              handleSubmit={isEditFormOpen ? handleEditSubmit : handleSubmit}
              handleCloseForm={handleCloseForm}
              validationErrors={validationErrors}
            />
          </Paper>
        </Modal>
        {createdArchitecture && (
          <Modal opened={confirmDelete} onClose={closeDeleteConfirmation}>
            <Paper padding="lg" shadow="lg" style={{ maxWidth: 400 }}>
              <Title order={4} align="center">
                Are you sure you want to delete the architecture named "
                {createdArchitecture}"?
              </Title>

              <div style={{ textAlign: "center", marginTop: 20 }}>
                <Button
                  style={{ marginRight: 10 }}
                  variant="outline"
                  onClick={closeDeleteConfirmation}
                >
                  Cancel
                </Button>
                <Button color="red" onClick={handleDeleteArchitecture}>
                  Delete
                </Button>
              </div>
              {validationErrors.deleteError && (
                <Text align="center" color="red" style={{ marginTop: 10 }}>
                  {validationErrors.deleteError}
                </Text>
              )}
            </Paper>
          </Modal>
        )}
      </AppShell.Main>
    </AppShell>
  );
};

const ArchitectureForm = ({
  architectureName,
  setArchitectureName,
  architectureDescription,
  setArchitectureDescription,
  handleSubmit,
  handleCloseForm,
  validationErrors,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        label="Architecture Name"
        value={architectureName}
        onChange={(e) => setArchitectureName(e.target.value)}
        error={validationErrors.architectureName}
        required
      />
      {validationErrors.architectureName && (
        <div style={{ color: "red", marginTop: 5 }}>
          {validationErrors.architectureName}
        </div>
      )}

      <TextInput
        label="Description"
        value={architectureDescription}
        onChange={(e) => setArchitectureDescription(e.target.value)}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 16,
        }}
      >
        <Button type="submit">Save</Button>
        <Button variant="outline" onClick={handleCloseForm}>
          Close
        </Button>
      </div>
    </form>
  );
};

export default BoardContainer;
