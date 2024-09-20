import { useState, useEffect } from "react";
import "./App.css";
import { SpinnerCircular } from "spinners-react";
import { axiosClient } from "./axiosClient";

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
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="App">
      <div className="App-border">
        {loading ? (
          <SpinnerCircular thickness={300}/>
        ) : (
          users.map((user) => <div key={user.id}>{user.name}</div>)
        )}
      </div>
    </div>
  );
}

export default App;
