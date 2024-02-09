// Importa el módulo getDB para obtener la conexión a la base de datos
const getDB = require("../../db/getDB");

// Define la función deleteEntryQuery que toma el ID de la entrada a eliminar como parámetro
const deleteEntryQuery = async (entryId) => {
  let connection;

  try {
    connection = await getDB();

    // Eliminar los registros de entryPhotos asociados a la entrada
    await connection.query("DELETE FROM entryPhotos WHERE entryId = ?", [
      entryId,
      console.log("entryId:", entryId),
    ]);

    // Luego, eliminar la entrada de la tabla entries
    await connection.query("DELETE FROM entries WHERE id = ?", [entryId]);

    console.log("Entry deleted successfully");
  } catch (error) {
    console.error("Error deleting entry:", error);
    throw new Error("An error occurred while deleting the entry");
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
module.exports = deleteEntryQuery;
