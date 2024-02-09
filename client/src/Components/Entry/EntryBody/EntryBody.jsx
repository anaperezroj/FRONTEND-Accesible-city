import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import "./entrybody.css";
// Definimos un componente estilizado para el párrafo de la descripción
const DescriptionParagraph = styled(Typography)(({ theme }) => ({
  fontSize: "14px", // Establecemos el tamaño de fuente para la descripción
  marginBottom: "10px", // Añadimos un margen inferior para separar la descripción de la imagen
}));

const EntryBody = ({ description, photos, onDelete }) => {
  return (
    <>
      <div className="desc">
        <DescriptionParagraph>{description}</DescriptionParagraph>
        <div className="phot">
          {photos && photos.length > 0 && (
            <img
              className="phot"
              src={`http://localhost:8080/${photos[0]?.name}`}
              alt="Imagen"
            />
          )}
        </div>
      </div>
      <div style={{ textAlign: "right", marginTop: "10px" }}>
        <IconButton onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      </div>
    </>
  );
};

EntryBody.propTypes = {
  description: PropTypes.string,
  photos: PropTypes.array, // Cambio el tipo de datos a array
};

export default EntryBody;
