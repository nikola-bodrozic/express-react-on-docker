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

  const [loading, setLoading] = useState(true);
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

  const handleClick = (id: string | number) => {
    // console.log(id);
    const userId: any = { id };
    axiosClient.post("/users", userId).then((response) => {
      setRows(response.data);
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
                  status
                </TableCell>
                <TableCell align="left" sx={headerStyle}>
                  creation timestamp
                </TableCell>
                <TableCell align="left" sx={headerStyle}>
                  link
                </TableCell>
                <TableCell align="left" sx={headerStyle}>
                  Change status
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
                  <TableCell component="th" scope="row">
                    <Button
                      variant="contained"
                      onClick={() => handleClick(row.id)}
                    >
                      change status
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    );
  }
}

export default App;
