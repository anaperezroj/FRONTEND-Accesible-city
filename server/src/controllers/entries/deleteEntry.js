const deleteEntryQuery = require("../../models/entries/deleteEntryQuery");
const { generateError } = require("../../../helpers");

const deleteEntry = async (req, res, next) => {
  try {
    // Convertir el entryId a un número entero
    const entryId = parseInt(req.params.entryId, 10);

    // Lógica para eliminar la entrada con el ID especificado
    await deleteEntryQuery(entryId);

    // Si la entrada se elimina correctamente, enviar una respuesta con código de estado 200
    res.status(200).send({
      status: "ok",
      message: "Entrada eliminada correctamente",
    });
  } catch (err) {
    next(err); // Pasar el error al siguiente middleware para manejarlo
  }
};

module.exports = deleteEntry;
