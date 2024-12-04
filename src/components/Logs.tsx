import React, { useState, useEffect, useCallback } from "react";
import {
  Container,
  Box,
  List,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import { useHistory } from "react-router";
import { makeStyles } from "tss-react/mui";
import DeleteIcon from "@mui/icons-material/Delete";

type LogItem = {
  timestamp: number;
  id: number;
};

export function Logs() {
  const { classes } = useStyles();
  const history = useHistory();
  const [logs, setLogs] = useState<LogItem[]>([]);

  const fetchLogs = useCallback(() => {
    fetch("http://localhost:8080/logs", {
      headers: {
        Authorization: localStorage.getItem("token")!,
      },
    })
      .then((res) => {
        if (res.status === 403) throw Error("Unauthorized");
        return res.json();
      })
      .then((response: LogItem[]) => {
        setLogs(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (
      localStorage.getItem("token") === null &&
      history.location.pathname === "/"
    ) {
      history.push("/login");
    } else {
      fetchLogs();
    }
  }, [history]);

  const deleteLog = useCallback((logId: number) => {
    fetch(`http://localhost:8080/logs/${logId}`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        Authorization: localStorage.getItem("token")!,
      },
    })
      .then((_res) => {
        fetchLogs();
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Container>
      <Box className={classes.listContainer}>
        <List className={classes.list}>
          <Typography>Authentication Log</Typography>
          {logs.map((item) => {
            return (
              <li key={item.id} className={classes.listItem}>
                {new Date(item.timestamp).toString()}

                <IconButton onClick={() => deleteLog(item.id)} color="error">
                  <DeleteIcon />
                </IconButton>
              </li>
            );
          })}
        </List>
      </Box>
      <Box className={classes.info}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => {
            localStorage.clear();
            history.push("/login");
          }}
        >
          Log Out
        </Button>
      </Box>
    </Container>
  );
}

const useStyles = makeStyles()((_) => ({
  listContainer: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
  },
  list: {
    padding: 16,
    margin: 16,
    background: "aliceblue",
    maxWidth: 640,
  },
  listItem: {
    borderRadius: 4,
    boxShadow: "4px 4px 2px solid rgba(0,0,0,0.8)",
    margin: 16,
    padding: 16,
    background: "lightblue",
  },
  info: {
    display: "flex",
    justifyContent: "center",
    margin: 8,
    padding: 8,
  },
}));
