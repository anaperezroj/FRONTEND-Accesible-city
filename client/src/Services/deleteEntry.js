// En algún archivo de utilidades o en un servicio para realizar solicitudes HTTP
export const deleteEntry = async (entryId, token) => {
  try {
    console.log("Token:", token);
    const response = await fetch(`http://localhost:8080/entries/${entryId}`, {
      method: "DELETE",
      headers: {
        Authorization: token,
      },
    });

    const body = await response.json();

    if (!response.ok) {
      throw new Error(body.message);
    }

    return body;
  } catch (error) {
    console.error("Error deleting entry:", error); // Agrega esta línea para imprimir el error específico
    throw new Error("An error occurred while deleting the entry");
  }
};
