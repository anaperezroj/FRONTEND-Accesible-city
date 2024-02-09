import { useContext } from "react";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import Entry from "../Entry/Entry";
import useEntries from "../Hooks/useEntries";
import HomeSearch from "../Home-search/HomeSearch";
import { deleteEntry } from "../../Services/deleteEntry";
import { AuthContext } from "../../Contexts/AuthContext";
import "./entriesSearch.css";

const EntriesSearch = () => {
  const { entries, searchParams, setSearchParams } = useEntries();
  const [filteredEntries, setFilteredEntries] = useState([]);
  const { token } = useContext(AuthContext);
  const handleDeleteEntry = async (entryId) => {
    try {
      console.log("EntryId:", entryId);
      console.log("Token:", token);
      await deleteEntry(entryId, token);
      setFilteredEntries(
        filteredEntries.filter((entry) => entry.id !== entryId)
      );
    } catch (err) {
      console.error("Error al eliminar la entrada:", err);
    }
  };

  useEffect(() => {
    const filtered = entries.filter((entry) => {
      const keyword = searchParams.get("keyword") || "";
      return (
        entry.title.toLowerCase().includes(keyword.toLowerCase()) ||
        entry.description.toLowerCase().includes(keyword.toLowerCase())
      );
    });
    setFilteredEntries(filtered);
  }, [entries, searchParams]);

  return (
    <main className="entriesSearch">
      <HomeSearch
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />

      <div className="block-container">
        {filteredEntries.length > 0 ? (
          <Grid container spacing={2}>
            {filteredEntries.map((entry) => (
              <Grid item key={entry.id} xs={12} sm={6} md={4} lg={3}>
                <Entry
                  entry={entry}
                  deleteEntry={() => handleDeleteEntry(entry.id)}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="body1">
            ¡No se ha encontrado ninguna entrada!
          </Typography>
        )}
      </div>
    </main>
  );
};

export default EntriesSearch;
