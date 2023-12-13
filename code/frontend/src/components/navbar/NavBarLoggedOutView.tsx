import { Button, Nav } from "react-bootstrap";

interface NavBarLoggedOutViewProps {
    onSignUpClicked: () => void,
    onLoginClicked: () => void,
}

const NavBarLoggedOutView = ({ onSignUpClicked, onLoginClicked }: NavBarLoggedOutViewProps) => {
    return (
        <>
            <Nav.Link onClick={onSignUpClicked}>Sign Up</Nav.Link>
            <Nav.Link onClick={onLoginClicked}>Log In</Nav.Link>
        </>
    );
}

export default NavBarLoggedOutView;