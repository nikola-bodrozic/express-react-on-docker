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
import Button from "@mui/material/Button";

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
  const [rows, setRows] = useState<any>([]);

  useEffect(() => {
    let mounted = true;
    const getData = async () => {
      try {
        let res = await axiosClient.get("/users");
        let users = res.data;
        setRows(users);
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

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const userData: IUser = {
      id: "i5",
      description: "new desc",
      parentId: "i1",
      status: "open",
      creationTimestamp: "new stamp",
      link: "google.com",
    };
    
    axiosClient.post("/users", userData).then((response) => {
      console.log(response.data);
      setRows(response.data)
      
    });
  };

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
    };
    return (
      <>
        <TableContainer component={Paper}>
          <Table sx={{ maxWidth: 700 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left" sx={headerStyle}>
                  id
                </TableCell>
                <TableCell width={250} align="left" sx={headerStyle}>
                  description
                </TableCell>
                <TableCell align="left" sx={headerStyle}>
                  Parent id
                </TableCell>
                <TableCell align="left" sx={headerStyle}>
                  time stamp
                </TableCell>
                <TableCell align="left" sx={headerStyle}>
                  creation timestamp
                </TableCell>
                <TableCell align="left" sx={headerStyle}>
                  link
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row: any) => (
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
        <Button variant="contained" onClick={handleSubmit}>
          Contained
        </Button>
        <>{JSON.stringify(users)}</>
      </>
    );
  }
}

export default App;
