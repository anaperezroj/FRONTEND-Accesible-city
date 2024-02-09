import { useState } from "react";
import PropTypes from "prop-types";
import {
  Typography,
  Grid,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom"; // Importa el componente Link para el enlace
import loginService from "../../Services/loginService";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import log from "../../Assets/log.png";
import "./loginform.css";

function LoginForm({ login }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMess, setErrMess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = await loginService(email, password);
      login(token);
    } catch (error) {
      setErrMess(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = () => {
    // Aquí puedes manejar la lógica para el inicio de sesión de invitado
  };

  return (
    <div className="form-container">
      <div className="form-content">
        <Link to="/" className="home-link">
          <img src={log} alt="Background" className="logoLogin" />
        </Link>
        <form onSubmit={handleSubmit} className="form">
          <Typography
            variant="h4"
            gutterBottom
            style={{
              fontFamily: "Roboto, sans-serif",
              fontWeight: "bold",
              marginTop: "2%",
              textAlign: "center",
            }}
          >
            LOGIN
          </Typography>
          <Typography
            paragraph
            style={{
              textAlign: "center",
              fontFamily: "Roboto, sans-serif",
            }}
          >
            Welcome to our accessible city app
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Email"
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
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
                    "login"
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
                    no login
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

LoginForm.propTypes = {
  login: PropTypes.func,
};

export default LoginForm;
