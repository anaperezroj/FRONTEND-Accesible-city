import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import getEntryService from "../../Services/getEntryService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
import flecha from "../../Assets/flecha.png";
import flechaIzquierda from "../../Assets/flechaIzquierda.png";
import likeEntryService from "../../Services/likeEntryService";
import CheckCircle from "@mui/icons-material/CheckCircle";
import Cancel from "@mui/icons-material/Cancel";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import {
  FormControlLabel,
  Checkbox,
  Stack,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import "./singleentrypage.css";
const SingleEntryPage = () => {
  const { entryId } = useParams();
  const { token, user } = useAuth();

  const [entry, setEntry] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showHearts, setShowHearts] = useState(false);

  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const response = await getEntryService(entryId, token);
        setEntry(response.data.entry);
      } catch (error) {
        console.error("Error al obtener la entrada:", error);
      }
    };

    fetchEntry();
  }, [entryId, token]);

  const handleLike = async () => {
    const method = entry?.likedByMe ? "delete" : "post";

    await likeEntryService(entry.id, method, token);

    const likes = method === "post" ? entry.likes + 1 : entry.likes - 1;

    const updatedEntry = {
      ...entry,
      likedByMe: !entry?.likedByMe,
      likes,
    };

    setEntry(updatedEntry);
    setShowHearts(true);
  };

  useEffect(() => {
    if (showHearts) {
      const timer = setTimeout(() => {
        setShowHearts(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showHearts]);

  const nextSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + 1) % (entry?.photos?.length || 1)
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? (entry?.photos?.length || 1) - 1 : prevIndex - 1
    );
  };

  const markResolved = async () => {
    if (user && user.role === "admin") {
      if (window.confirm("¿Deseas marcar el servicio como resuelto?")) {
        try {
          const response = await fetch(
            `http://localhost:8080/entries/${entryId}/resolved`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: token,
              },
            }
          );
          const responseData = await response.json();
          if (!response.ok) {
            throw new Error("Error al marcar como resuelto");
          }
          if (responseData.data.resolved) {
            setEntry((prevEntry) => ({
              ...prevEntry,
              resolved: true,
            }));
          }
        } catch (error) {
          console.error("Error al marcar como resuelto:", error);
        }
      }
    } else {
      alert(
        "Solo los administradores pueden marcar un servicio como resuelto."
      );
    }
  };

  return (
    <>
      <Header />

      <Container
        maxWidth="md"
        style={{
          backgroundColor: "#f5f5f5",
          padding: "20px",
          borderRadius: "10px",
          marginTop: "10px",
          marginBottom: "30px",
        }}
      >
        <div className="cai">
          <Typography
            style={{ fontFamily: "Roboto, sans-serif" }}
            variant="h6"
            align="left"
          >
            {entry && entry.title}
          </Typography>
        </div>
        <Grid container justifyContent="center" alignItems="center" spacing={2}>
          <Grid item xs={12}>
            {entry?.photos.length > 0 ? (
              <div style={{ position: "relative" }}>
                <Button
                  onClick={prevSlide}
                  variant="text"
                  sx={{
                    position: "absolute",
                    top: "40%",
                    left: "5%",
                    zIndex: 1,
                  }}
                >
                  <img
                    src={flechaIzquierda}
                    alt="flecha icono"
                    style={{ width: "30px", height: "30px" }}
                  />
                </Button>
                <Card>
                  <CardMedia
                    component="img"
                    image={`http://localhost:8080/${entry?.photos[currentIndex]?.name}`}
                    alt={`Imagen ${entry?.photos[currentIndex]?.id}`}
                    style={{ height: "280px", objectFit: "cover" }} // Ajustar el tamaño y el ajuste de la imagen
                  />
                  <CardContent style={{ backgroundColor: "#fafafa" }}>
                    <Typography
                      variant="body2"
                      color="text.primary"
                      style={{
                        fontFamily: "Arial, sans-serif",
                        fontSize: "16px",
                        lineHeight: "1.6",
                      }}
                    >
                      {entry?.description}
                    </Typography>
                  </CardContent>
                </Card>

                <Button
                  onClick={nextSlide}
                  variant="text"
                  sx={{
                    position: "absolute",
                    top: "40%",
                    right: "5%",
                    zIndex: 1,
                  }}
                >
                  <img
                    src={flecha}
                    alt="flecha icono"
                    style={{ width: "30px", height: "30px" }}
                  />
                </Button>
              </div>
            ) : (
              <Card>
                <CardMedia
                  component="img"
                  image="https://images.pexels.com/photos/380283/pexels-photo-380283.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Imagen por defecto"
                />
              </Card>
            )}

            <div style={{ marginTop: "20px" }}>
              <TableContainer component={Card}>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell
                        colSpan={2}
                        style={{
                          backgroundColor: "rgb(18, 122, 105)",
                          color: "white",
                        }}
                      >
                        <strong>City Information</strong>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <strong>Descripción:</strong>
                      </TableCell>
                      <TableCell>{entry && entry.description}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <strong>Ciudad:</strong>
                      </TableCell>
                      <TableCell>{entry?.city}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <strong>Barrio:</strong>
                      </TableCell>
                      <TableCell>{entry?.neighborhood}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <strong>Distrito:</strong>
                      </TableCell>
                      <TableCell>{entry?.district}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <strong>Autor:</strong>
                      </TableCell>
                      <TableCell>{entry && entry.username}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

              <Stack direction="row" spacing={2} alignItems="center">
                <Button
                  className={`like-button ${entry?.likedByMe ? "liked" : ""}`}
                  onClick={handleLike}
                  variant="outlined"
                >
                  {showHearts ? (
                    <Favorite
                      style={{ color: entry?.likedByMe ? "red" : "white" }}
                    />
                  ) : (
                    <FavoriteBorder
                      style={{ color: entry?.likedByMe ? "red" : "black" }}
                    />
                  )}
                </Button>
                <Typography variant="body2" gutterBottom>
                  {entry?.likes}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Estado:
                </Typography>
                <div
                  className={`resolved-status ${
                    entry?.resolved ? "resolved" : "unresolved"
                  }`}
                >
                  {entry?.resolved ? (
                    <CheckCircle style={{ color: "green" }} />
                  ) : (
                    <Cancel style={{ color: "red" }} />
                  )}
                </div>
                {user && user.role === "admin" && !entry?.resolved && (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={entry?.resolved}
                        onChange={markResolved}
                      />
                    }
                    label="¿Resolver?"
                  />
                )}
              </Stack>
            </div>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default SingleEntryPage;
