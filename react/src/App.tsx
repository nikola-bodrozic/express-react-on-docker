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
    id: number;
    name: string;
  }

  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<IUser[]>([]);

  const validateName = (users: IUser[]) => {
    const filtered: IUser[] = users.filter(
      (user: IUser) => user.name.length > 1
    );
    return filtered;
  };

  useEffect(() => {
    let mounted = true;
    const getData = async () => {
      try {
        let res = await axiosClient.get("/users");
        let users = res.data;
        users = validateName(users);
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
  function createData(
    name: string,
    id: number,
  ) {
    return { name, id };
  }

  const rows = [
    createData("Frozen yoghurt", 159),
    createData("Ice cream sandwich", 237),
  ];

  return (
    <div className="App">
      <div className="App-border">
        {loading ? (
          <SpinnerCircular thickness={300} />
        ) : (
          // users.map((user) => <div key={user.id}>{user.name}</div>)
          renderTable()
        )}
      </div>
    </div>
  );

  function renderTable() {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ maxWidth:300 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">name</TableCell>
              <TableCell align="left">id</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.id}
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
