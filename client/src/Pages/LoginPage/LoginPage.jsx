import LoginForm from "../../Components/LoginForm/LoginForm";
import useAuth from "../../Hooks/useAuth";
import { Navigate } from "react-router-dom";
import { Container } from "@mui/material";
import "./loginPage.css";

const LoginPage = () => {
  const { token, login } = useAuth();

  // Si la persona está logeada la redirigimos a la página principal.
  if (token) return <Navigate to="/" />;

  return (
    <Container maxWidth="lg" className="login-container">
      <LoginForm login={login} />
    </Container>
  );
};

export default LoginPage;
