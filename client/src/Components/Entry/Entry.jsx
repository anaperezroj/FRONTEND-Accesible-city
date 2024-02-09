import PropTypes from "prop-types";
import EntryBody from "./EntryBody/EntryBody";
import EntryHeader from "./EntryHeader/EntryHeader";
import EntryFooter from "./EntryFooter/EntryFooter";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete"; // Importa el ícono de eliminación
import { deleteEntry } from "../../Services/deleteEntry";

const Entry = ({ entry, deleteEntry }) => {
  return (
    <Link
      className="link"
      to={`/entries/${entry.id}`}
      style={{
        textDecoration: "none",
      }}
    >
      <Card>
        <CardMedia
          component="img"
          height="140"
          image={`http://localhost:8080/${entry.photos[0]?.name}`}
          alt="Entry photo"
        />
        <CardContent>
          <EntryHeader
            username={entry.username}
            createdAt={entry.createdAt}
            onDelete={deleteEntry}
          />
          <EntryBody description={entry.description} />
          <EntryFooter
            entryId={entry.id}
            owner={entry.owner}
            likes={entry.likes}
            likedByMe={entry.likedByMe}
          />
        </CardContent>
      </Card>
    </Link>
  );
};

export default Entry;
