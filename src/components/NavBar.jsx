import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

function NavBar({ userSelected, setUserSelected }) {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        {!userSelected ? (
          <Navbar.Brand>Home</Navbar.Brand>
        ) : (
          <Navbar.Brand
            style={{ cursor: "pointer" }}
            onClick={() => setUserSelected(null)}
          >
           ← Back
          </Navbar.Brand>
        )}
      </Container>
    </Navbar>
  );
}

export default NavBar;
