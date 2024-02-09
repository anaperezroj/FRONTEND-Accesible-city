const express = require("express");
const router = express.Router();

/**
 * ##############################
 * ##    Endpoints entradas   ##
 * ############################
 */

const {
  deleteEntry,
  getEntry,
  newLike,
  deleteLike,
  addEntryPhoto,
  deleteEntryPhoto,
  markResolved,
  newEntry,
  listEntries,
} = require("../controllers/entries");

// Importamos los middlewares personalizados.
const authUser = require("../middlewares/authUser");
const userExists = require("../middlewares/userExists");
const authUserOptional = require("../middlewares/authUserOptional");
const isAdmin = require("../middlewares/isAdmin");

//Nueva entrada
router.post("/entries", authUser, userExists, isAdmin, newEntry);

//Obtenemos entrada por ID
router.get("/entries/:entryId", authUserOptional, getEntry);

//Listar entradas
router.get("/entries", authUserOptional, listEntries);

//Dar like a una entrada
router.post("/entries/:entryId/likes", authUser, userExists, newLike);

//Deslikear una entrada
router.delete("/entries/:entryId/likes", authUser, userExists, deleteLike);

//Agregar una foto a una entrada
router.post("/entries/:entryIds", authUser, userExists, isAdmin, addEntryPhoto);

//Borrar una foto a una entrada

router.delete(
  "/entries/:entryId/photos/:photoId",
  authUser,
  userExists,
  isAdmin,
  deleteEntryPhoto
);

//Marcar problema de accesibilidad como resuelto

router.put(
  "/entries/:entryId/resolved",
  authUser,
  userExists,
  isAdmin,
  markResolved
);

// Endpoint para eliminar una entrada específica por su ID
router.delete("/entries/:entryId", authUser, userExists, isAdmin, deleteEntry);

module.exports = router;
