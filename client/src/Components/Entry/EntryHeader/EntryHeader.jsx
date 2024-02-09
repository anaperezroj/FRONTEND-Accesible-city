import PropTypes from "prop-types";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import logi from "../../../Assets/logi.png";

const EntryHeader = ({ username, createdAt }) => {
  return (
    <header
      sx={{
        width: "100%",
        height: "100px",
        backgroundColor: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        textDecoration: "none",
      }}
    >
      <div
        sx={{
          float: "right",
          marginRight: "2px",
          marginLeft: "10px",
        }}
      >
        <Avatar alt="Imagen de perfil" src={logi} />
      </div>
      <Typography
        variant="body1"
        sx={{
          fontSize: "12px",
          marginRight: "4px",
          textDecoration: "none",
          color: "black",
          fontWeight: "bold",
        }}
      >
        Autor: @{username}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: "black",
          fontSize: "10px",
          marginRight: "1px",
          textDecoration: "none",
        }}
      >
        Creado el día:
        {new Date(createdAt).toLocaleDateString("es-ES", {
          hour: "2-digit",
          minute: "2-digit",
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        })}
      </Typography>
    </header>
  );
};

EntryHeader.propTypes = {
  username: PropTypes.string,
  createdAt: PropTypes.string,
};

export default EntryHeader;
