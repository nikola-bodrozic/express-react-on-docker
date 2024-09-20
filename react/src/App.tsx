import { useState, useEffect } from "react";
import "./App.css";
import { SpinnerCircular } from "spinners-react";
import { axiosClient } from "./axiosClient";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function App() {
  interface IUser {
    id: string;
    description: string;
    parentId: string;
    status: string;
    creationTimestamp: string;
    link: string;
  }

  function createData(
    id: string,
    description: string,
    parentId: string,
    status: string,
    creationTimestamp: string,
    link: string
  ) {
    return { id, description, parentId, status, creationTimestamp, link };
  }

  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    let mounted = true;
    const getData = async () => {
      try {
        let res = await axiosClient.get("/users");
        let users = res.data;
        setUsers(users);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getData();
    return () => {
      mounted = false;
    };
  }, []);

  const rows = [
    createData("i1", "desc parent", "","Open", "2024-05-01T11:02", "yahoo.com"),
    createData("i2", "desc child 1", "i1","Open", "2024-05-01T11:02", "yahoo.com"),
    createData("i3", "desc child 2", "i1","Open", "2024-05-01T11:02", "yahoo.com"),
  ];

  return (
    <div className="App">
      <div className="App-border">
        {loading ? <SpinnerCircular thickness={300} /> : renderTable()}
      </div>
    </div>
  );

  function renderTable() {
    const headerStyle = {
      bgcolor: "lightgray",
      boxShadow: 1,
      minWidth: 30,
    }
    return (
      <TableContainer component={Paper}>
        <Table sx={{ maxWidth: 700 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                align="left"
                sx={headerStyle}
              >
                id
              </TableCell>
              <TableCell
              width={250}
                align="left"
                sx={headerStyle}
              >
                description
              </TableCell>
              <TableCell
                align="left"
                sx={headerStyle}
              >
                Parent id
              </TableCell>
              <TableCell
                align="left"
                sx={headerStyle}
              >
               time stamp
              </TableCell>
              <TableCell
                align="left"
                sx={headerStyle}
              >
               creation timestamp
              </TableCell>
              <TableCell
                align="left"
                sx={headerStyle}
              >
                link
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.description}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.parentId}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.status}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.creationTimestamp}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.link}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

export default App;
