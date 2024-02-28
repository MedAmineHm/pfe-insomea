import React from "react";
import classnames from "classnames";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardImg,
  CardTitle,
  Label,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import Footer from "components/Footer/Footer.js";

export default function LoginPage() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [squares1to6, setSquares1to6] = React.useState("");
  const [squares7and8, setSquares7and8] = React.useState("");
  const [emailFocus, setEmailFocus] = React.useState(false);
  const [passwordFocus, setPasswordFocus] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    const userData = {
      email,
      password,
    };

    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:5000/auth/login",
        userData,
        { withCredentials: true }
      );

      const { user, token } = response.data;

      console.log("Login successful:", user);

      localStorage.setItem("token", token);

      navigate("/");
    } catch (error) {
      console.error("Error during login:", error);

      if (error.response && error.response.status === 401) {
        setError("Invalid credentials");
      } else if (error.response) {
        setError("An error occurred");
      } else if (error.request) {
        setError("Request error");
      } else {
        setError("Error message");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGmailLogin = async () => {
    try {
      setLoading(true);

      const authWindow = window.open(
        "http://localhost:5000/auth/google/login",
        "_blank"
      );

      window.addEventListener("message", handleMessage);
    } catch (error) {
      setError("Error during Gmail login");
      console.error("Error during Gmail login:", error);
      setLoading(false);
    }
  };

  const handleMessage = (event) => {
    if (event.data === "closeWindow") {
      handleGoogleLoginResponse();
    }
  };

  const handleGoogleLoginResponse = async () => {
    try {
      setLoading(true);

      setLoading(false);

      console.log("Google login successful!");
      navigate("/login-page");
    } catch (error) {
      setError("Error during Google login verification");
      console.error("Error during Google login verification:", error);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    document.body.classList.toggle("register-page");
    document.documentElement.addEventListener("mousemove", followCursor);

    return function cleanup() {
      document.body.classList.toggle("register-page");
      document.documentElement.removeEventListener("mousemove", followCursor);
    };
  }, []);

  const followCursor = (event) => {
    let posX = event.clientX - window.innerWidth / 2;
    let posY = event.clientY - window.innerWidth / 6;
    setSquares1to6(
      "perspective(500px) rotateY(" +
        posX * 0.05 +
        "deg) rotateX(" +
        posY * -0.05 +
        "deg)"
    );
    setSquares7and8(
      "perspective(500px) rotateY(" +
        posX * 0.02 +
        "deg) rotateX(" +
        posY * -0.02 +
        "deg)"
    );
  };

  return (
    <>
      <ExamplesNavbar />
      <div className="wrapper">
        <div className="page-header">
          <div className="page-header-image" />
          <div className="content">
            <Container>
              <Row>
                <Col className="offset-lg-0 offset-md-3" lg="5" md="6">
                  <div
                    className="square square-7"
                    id="square7"
                    style={{ transform: squares7and8 }}
                  />
                  <div
                    className="square square-8"
                    id="square8"
                    style={{ transform: squares7and8 }}
                  />
                  <Card className="card-register">
                    <CardHeader>
                      <CardImg
                        alt="..."
                        src={require("assets/img/square-purple-1.png")}
                      />
                      <CardTitle tag="h4">Login</CardTitle>
                    </CardHeader>
                    <CardBody>
                      <Form className="form">
                        <InputGroup
                          className={classnames({
                            "input-group-focus": emailFocus,
                          })}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="tim-icons icon-email-85" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Email"
                            type="text"
                            onChange={(e) => setEmail(e.target.value)}
                            onFocus={(e) => setEmailFocus(true)}
                            onBlur={(e) => setEmailFocus(false)}
                          />
                        </InputGroup>
                        <InputGroup
                          className={classnames({
                            "input-group-focus": passwordFocus,
                          })}
                        >
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="tim-icons icon-lock-circle" />
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            placeholder="Password"
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            onFocus={(e) => setPasswordFocus(true)}
                            onBlur={(e) => setPasswordFocus(false)}
                          />
                        </InputGroup>

                        <FormGroup check className="text-left">
                          <Label check>
                            <Input type="checkbox" />
                            <span className="form-check-sign" />I agree to the{" "}
                            <a
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              terms and conditions
                            </a>
                            .
                          </Label>
                        </FormGroup>
                      </Form>
                    </CardBody>
                    <CardFooter className="text-center">
                      <Button
                        className="btn-round"
                        color="primary"
                        size="lg"
                        onClick={handleLogin}
                        disabled={loading}
                      >
                        {loading ? "Logging in..." : "Login"}
                      </Button>

                      <div className="text-center mt-3">
                        <Button
                          className="btn-round"
                          color="danger"
                          onClick={handleGmailLogin}
                          disabled={loading}
                        >
                          {loading ? (
                            <i className="fas fa-spinner fa-spin" />
                          ) : (
                            <span>
                              <i className="fab fa-google" /> Login with Gmail
                            </span>
                          )}
                        </Button>
                      </div>

                      {error && (
                        <div className="text-center mt-3 text-danger">
                          {error}
                        </div>
                      )}

                      <div className="text-center mt-3">
                        <p>
                          Don't have an account?{" "}
                          <Link to="/register-page"> Register here</Link>.
                        </p>
                      </div>
                    </CardFooter>
                  </Card>
                </Col>
              </Row>
              <div className="register-bg" />
              <div
                className="square square-1"
                id="square1"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-2"
                id="square2"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-3"
                id="square3"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-4"
                id="square4"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-5"
                id="square5"
                style={{ transform: squares1to6 }}
              />
              <div
                className="square square-6"
                id="square6"
                style={{ transform: squares1to6 }}
              />
            </Container>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
