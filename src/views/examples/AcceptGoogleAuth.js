import React, { useEffect } from "react";
import { Box, Text } from "@mantine/core";
import { useNavigate, useSearchParams } from "react-router-dom";

const AcceptGoogleAuth = () => {
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      localStorage.setItem("token", token);
      navigate("/");
    } else navigate("/profile-page");
  }, []);

  return (
    <Box>
      <Text>Loading ....</Text>
    </Box>
  );
};

export default AcceptGoogleAuth;
