import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import registerService from "../../Services/registerService";
import {
  Typography,
  Grid,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import log from "../../Assets/log.png";

import "../LoginForm/loginform.css";

function RegisterForm() {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMess, setErrMess] = useState("");
  const [loading, setLoading] = useState(false);

  // Función que maneja el envío del formulario de registro
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      setLoading(true);

      await registerService(username, email, password);

      // Si el registro es exitoso, redirigimos al usuario a la página de inicio de sesión
      navigate("/login");
    } catch (error) {
      setErrMess(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <div className="form-content">
        <Link to="/" className="home-link">
          <img
            style={{ width: "50%" }}
            className="logoLogin"
            src={log}
            alt="Ciudad Accesible"
          />
          <Typography
            variant="h6"
            style={{
              textAlign: "center",
              fontFamily: "Roboto, sans-serif",
              fontWeight: "lighter",
              color: "black",
            }}
          >
            <span style={{ fontFamily: "Roboto, sans-serif" }}>ACCESIBLE </span>
            CITY
          </Typography>
        </Link>

        <form className="form" onSubmit={handleSubmit}>
          <Typography
            variant="h6"
            gutterBottom
            style={{
              fontFamily: "Roboto, sans-serif",
              fontWeight: "bold",
              marginTop: "6%",
              textAlign: "center",
            }}
          >
            SIGN UP
          </Typography>
          <Typography
            paragraph
            style={{ textAlign: "center", fontFamily: "Roboto, sans-serif" }}
          >
            Welcome to our accessible city app
          </Typography>
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextField
                style={{
                  textAlign: "center",
                  width: "80%",
                }}
                label="User"
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                variant="outlined"
                required
              />
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextField
                label="Email"
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: "80%" }}
                variant="outlined"
                required
              />
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextField
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: "80%" }}
                variant="outlined"
                required
              />
            </Grid>
            <Grid
              container
              direction="column"
              alignItems="center"
              justifyContent="center"
              style={{ height: "200px" }} // Establece una altura fija para alinear verticalmente los botones
            >
              <Grid
                item
                xs={12}
                style={{
                  marginTop: "8%",
                }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  className="buttonLogin"
                  disabled={loading}
                  style={{
                    color: "white",
                    backgroundColor: "rgb(18, 122, 105)",
                    marginLeft: "6px",
                    marginRight: "20px", // Añade margen derecho para separar los botones
                  }}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Sign up"
                  )}
                </Button>
                <Link to="/" style={{ textDecoration: "none" }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    style={{
                      fontWeight: "bold",
                      color: "white",
                      backgroundColor: "rgb(18, 122, 105)",
                    }}
                  >
                    NO SIGN UP
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;
