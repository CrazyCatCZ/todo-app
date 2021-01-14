import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { UpdateModeContext } from "../Contexts/UpdateModeContext";
import { TODO_UPDATE_MUTATION } from "../Api/todo/todo";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  updateForm: {
    marginTop: 25,
  },
  gridContainer: {
    display: "flex",
    justifyContent: "center",
  },
  buttonsContainer: {
    marginTop: 25,
    spacing: theme.spacing(2),
  },
  formButton: {
    background: "#1976D2",
    "&:hover": {
      background: "#1976D2",
    },
  },
  cancelButton: {
    marginLeft: 20,
  },
}));

const UpdateForm = ({ todo }) => {
  const classes = useStyles();
  const history = useHistory();
  const {
    todo: { id, content },
  } = todo;

  const [newContent, setNewContent] = useState("");
  const { toggleUpdateMode } = useContext(UpdateModeContext);
  const [updateTodo] = useMutation(TODO_UPDATE_MUTATION);

  useEffect(() => {
    setNewContent(content);
  }, [content]);

  const handleOnUpdate = async () => {
    await updateTodo({ variables: { id, newContent } });
    await toggleUpdateMode();
    history.push("/");
  };

  return (
    <div className={classes.updateForm}>
      <Grid className={classes.gridContainer} container>
        <Grid item xs={11} sm={8} md={6} lg={4}>
          <form onSubmit={handleOnUpdate}>
            <TextField
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              id="update-form"
              variant="outlined"
              fullWidth
              inputProps={{
                maxLength: 68,
              }}
            />
            <div className={classes.buttonsContainer}>
              <Button
                type="submit"
                className={classes.formButton}
                variant="contained"
                color="primary"
              >
                Update
              </Button>
              <Button
                onClick={() => toggleUpdateMode(id)}
                className={`${classes.formButton} ${classes.cancelButton}`}
                variant="contained"
                color="primary"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};

export default UpdateForm;
