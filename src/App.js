import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./logo.svg";
import "./App.css";
import NavBar from "./components/NavBar";
import { Octokit } from "@octokit/rest";
import { useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

function App() {
  const [users, setUsers] = useState([]);
  const [userSelected, setUserSelected] = useState(null);
  const octokit = new Octokit({
    auth: "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",
  });
  const getUsers = async () => {
    // run asynchronous tasks her
    const { data } = await octokit.request("GET /users", {});
    setUsers(data?.slice(0, 5));
  };
  const getUser = async (user) => {
    // run asynchronous tasks her
    const { data } = await octokit.request("GET /users/{username}", {
      username: user.login,
    });
    setUserSelected(data);
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="App">
      <NavBar userSelected={userSelected} setUserSelected={setUserSelected} />
      <Container
        style={{
          marginTop: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        {!userSelected && (
          <>
            <h1>Top 5 GitHub Users</h1>
            <label>Tap the username to see more information</label>
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                columnGap: "10px",
              }}
            >
              {users?.map((user, i) => (
                <Button key={i} onClick={() => getUser(user)}>
                  {user.login}
                </Button>
              ))}
            </div>
          </>
        )}
        {userSelected && (
          <Container
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderBottom: "1px solid #E5E5E5",
            }}
          >
            <img
              src={userSelected.avatar_url}
              alt="..."
              style={{ height: "75px", margin: "75px" }}
              class="rounded-circle"
            />
            <div>
              <h3>{userSelected.name}</h3>
              <label>{userSelected.location}</label>
            </div>
          </Container>
        )}
      </Container>
    </div>
  );
}

export default App;
