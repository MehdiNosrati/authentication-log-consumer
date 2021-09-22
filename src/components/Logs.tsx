import React, { useState, useEffect } from "react"
import { Container, Box, List, makeStyles, Button, Typography } from "@material-ui/core"
import { useHistory } from "react-router"

type LogItem = {
    timestamp: number,
    id: number
}

export function Logs() {
    const classes = useStyles()
    const history = useHistory()
    const [logs, setLogs] = useState<LogItem[]>([])


    useEffect(() => {
        if (localStorage.getItem("token") === null && history.location.pathname === "/") {
            history.push("/login")
        } else {
            fetch("https://sep-auth.herokuapp.com/logs", {
                headers: {
                    "Authorization": localStorage.getItem("token")!
                }
            }).then(res => {
                if (res.status === 403) throw Error("Unauthorized")
                return res.json()
            }).then((response: LogItem[]) => {
                setLogs(response)
            }).catch(err => {
                console.log(err);
            })
        }
    }, [history])

    return <Container>
        <Box className={classes.listContainer}>
            <List className={classes.list}>
                <Typography>
                    Authentication Log
        </Typography>
                {logs.map((item) => {
                    return <li key={item.id} className={classes.listItem}>
                        {new Date(item.timestamp).toString()}
                    </li>
                })}
            </List>
        </Box>
        <Box className={classes.info}>
            <Button variant="outlined" color="secondary" onClick={() => {
                localStorage.clear()
                history.push("/login")
            }}>
                Log Out
            </Button>
        </Box>
    </Container>
}

const useStyles = makeStyles({
    listContainer: {
        display: "flex",
        flex: 1,
        justifyContent: "center",
    },
    list: {
        padding: 16,
        margin: 16,
        background: "aliceblue",
        maxWidth: 640
    },
    listItem: {
        borderRadius: 4,
        boxShadow: "4px 4px 2px solid rgba(0,0,0,0.8)",
        margin: 16,
        padding: 16,
        background: "lightblue"

    },
    info: {
        display: "flex",
        justifyContent: "center",
        margin: 8,
        padding: 8,
    },
})
