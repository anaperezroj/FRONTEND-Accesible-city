import Header from "../Header/Header";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Footer from "../Footer/Footer";
import entryCreateService from "../../Services/createEntryService";
import Spinner from "../Spinner/Spinner";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import {
  Grid,
  TextField,
  Button,
  Typography,
  Hidden,
  IconButton,
} from "@mui/material";
import Lottie from "react-lottie";
import contact1 from "../../Assets/contact1.json";
import loti from "../../Assets/loti.json";
import lol from "../../Assets/lol.png";

import { FaRegFileImage } from "react-icons/fa6";
import logi from "../../Assets/logi.png";
import "./admin.css";

const defaultOptions = {
  loop: false,
  autoplay: true,
  animationData: loti,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
const Admin = ({ token }) => {
  console.log(token);

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const [neightborhood, setNeightborhood] = useState("");
  const [district, setDistrict] = useState("");
  const [description, setDescription] = useState("");
  const [photoA, setPhotoA] = useState();
  const [photoB, setPhotoB] = useState();
  const [photoC, setPhotoC] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // Función que maneja el envío del formulario.
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      setLoading(true);

      await entryCreateService(
        title,
        city,
        neightborhood,
        district,
        description,
        photoA,
        photoB,
        photoC,
        token
      );

      // Redireccionamos a la página principal.
      navigate("/");
    } catch (err) {
      setErrMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString();
  const formattedTime = currentDate.toLocaleTimeString();
  return (
    <>
      <Header className="headerNewEntry" />
      <div
        style={{
          overflow: "hidden",
          width: "100vw",
          height: "100%",
          backgroundColor: "white",
        }}
      >
        <Grid
          container
          spacing={1}
          justifyContent="center"
          alignItems="stretch"
          style={{ width: "100%", height: "100%" }}
        >
          {/* Para pantallas medianas y grandes */}
          <Hidden smDown>
            <Grid
              item
              xs={12}
              md={6}
              style={{
                height: "80%",
                overflow: "hidden",
                backgroundColor: "white",
              }}
            >
              <div
                style={{
                  textAlign: "center",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src="https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  style={{ maxWidth: "100%", height: "86vh" }}
                  alt="Image"
                />
              </div>
            </Grid>
          </Hidden>
          {/* Para pantallas pequeñas */}
          <Grid
            item
            xs={12}
            md={6}
            style={{ backgroundColor: "white", overflow: "hidden" }}
          >
            <div style={{ textAlign: "center" }}>
              {/* Imagen del logo con ajuste de tamaño en pantallas pequeñas */}
              <Hidden mdUp>
                <img
                  style={{
                    marginTop: "8%",
                    borderRadius: "50%",
                    width: "100px",
                    marginBottom: "20px",
                  }}
                  src={logi}
                  alt="Profile"
                />
              </Hidden>
              {/* Imagen del logo sin ajuste de tamaño en pantallas grandes */}
              <Hidden smDown>
                <img
                  style={{
                    marginTop: "8%",
                    borderRadius: "50%",
                    width: "150px",
                    marginBottom: "20px",
                  }}
                  src={logi}
                  alt="Profile"
                />
              </Hidden>
              <Typography variant="h6">Administrator</Typography>
              <Typography variant="body1">San Diego, Ca</Typography>
              <Typography style={{ marginBottom: "-30px", fontSize: "17px" }}>
                Make your city more accessible today!
              </Typography>
              <form
                onSubmit={handleSubmit}
                style={{
                  padding: "8%",
                  maxWidth: "500px",
                  margin: "0 auto",
                  marginTop: "2%",
                }}
              >
                {/* Agregar los campos de entrada con ancho limitado */}
                <TextField
                  style={{ marginBottom: "8px" }}
                  type="text"
                  label="Write your title here"
                  onChange={(e) => setTitle(e.target.value)}
                  minLength="5"
                  autoFocus
                  required
                  fullWidth
                />
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      style={{ marginBottom: "8px" }}
                      label="City"
                      onChange={(e) => setCity(e.target.value)}
                      minLength="5"
                      required
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <TextField
                      style={{ marginBottom: "8px" }}
                      label="Neighborhood"
                      onChange={(e) => setNeightborhood(e.target.value)}
                      minLength="5"
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      style={{ marginBottom: "8px" }}
                      label="District"
                      onChange={(e) => setDistrict(e.target.value)}
                      minLength="5"
                      required
                      fullWidth
                    />
                  </Grid>
                </Grid>
                <TextField
                  style={{ marginBottom: "8px" }}
                  label="Describe your incident here..."
                  onChange={(e) => setDescription(e.target.value)}
                  minLength="10"
                  required
                  multiline
                  fullWidth
                />
                <div style={{ marginBottom: "10px" }}>
                  <div style={{ marginBottom: "10px" }}>
                    <label htmlFor="fileA">
                      <IconButton
                        aria-label="upload picture"
                        color="primary"
                        component="span"
                      >
                        <FaRegFileImage />
                      </IconButton>
                    </label>
                    <input
                      type="file"
                      id="fileA"
                      className="subida-img"
                      onChange={(e) => setPhotoA(e.target.files[0])}
                      style={{ display: "none" }}
                    />
                    <label htmlFor="fileB">
                      <IconButton
                        aria-label="upload picture"
                        color="primary"
                        component="span"
                      >
                        <FaRegFileImage />
                      </IconButton>
                    </label>
                    <input
                      type="file"
                      id="fileB"
                      className="subida-img"
                      onChange={(e) => setPhotoA(e.target.files[0])}
                      style={{ display: "none" }}
                    />
                    <input
                      type="file"
                      id="fileC"
                      className="subida-img"
                      onChange={(e) => setPhotoA(e.target.files[0])}
                      style={{ display: "none" }}
                    />
                    <label htmlFor="fileC">
                      <IconButton
                        aria-label="upload picture"
                        color="primary"
                        component="span"
                      >
                        <FaRegFileImage />
                      </IconButton>
                    </label>
                  </div>
                </div>
                <Button
                  disabled={loading}
                  type="submit"
                  variant="contained"
                  fullWidth
                  style={{
                    backgroundColor: "#0d7575",
                    color: "#fff",
                    marginBottom: "20px", // Ajustar el margen inferior
                    padding: "12px 24px", // Ajustar el tamaño del botón
                  }}
                >
                  Publish entry ↩
                </Button>
                {loading && <Spinner />}
                {errMsg && <ErrorMessage msg={errMsg} />}
              </form>
            </div>
          </Grid>
        </Grid>
      </div>
      <Footer />
    </>
  );
};

Admin.propTypes = {
  token: PropTypes.string,
};

export default Admin;
