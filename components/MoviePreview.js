import React, { useState } from "react";
import EditMovie from "./EditMovie";
import {
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import toast, { Toaster } from "react-hot-toast";
import InfoIcon from "@mui/icons-material/Info";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

const MoviePreview = ({
  id,
  splot,
  title,
  updateMovieList,
  deleteMovieFromList,
}) => {
  const [showEditForm, setShowEditForm] = useState(false);
  const [showOptions, setShowOptions] = useState(true);

  const handleShowEditForm = () => {
    setShowEditForm(!showEditForm);
  };

  const handleShowOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/movie/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Successfully eliminated!");
        deleteMovieFromList(id);
      }
    } catch (error) {
      toast.error("error eliminated!", error);
    }
  };

  if (showEditForm) {
    return (
      <EditMovie
        {...{
          updateMovieList,
          handleClick: handleShowEditForm,
          splot,
          title,
          id,
        }}
      />
    );
  }

  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5">
          {title}
        </Typography>
        {!showOptions ? (
          <>
            <Typography variant="h6" color="text.secondary">
              {showOptions ? "Add" : `${splot}`}
            </Typography>
            <CardActions
              sx={{
                display: "flex",
                gap: 1,
              }}
            >
              <Button
                variant="contained"
                color="success"
                onClick={handleShowOptions}
              >
                <KeyboardBackspaceIcon />
              </Button>
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                color="error"
                onClick={handleShowEditForm}
                sx={{
                  ml: 1,
                }}
              >
                Edit
              </Button>

              <Button
                onClick={handleDelete}
                variant="contained"
                startIcon={<DeleteIcon />}
                color="warning"
                sx={{
                  ml: 1,
                }}
              >
                Delete
              </Button>
            </CardActions>
          </>
        ) : (
          <>
            <Typography variant="h5" color="text.secondary">
              {showOptions ? "..." : `${splot}`}
            </Typography>
            <Button
              variant="contained"
              color="info"
              startIcon={<InfoIcon />}
              onClick={handleShowOptions}
            >
              More info...
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default MoviePreview;
