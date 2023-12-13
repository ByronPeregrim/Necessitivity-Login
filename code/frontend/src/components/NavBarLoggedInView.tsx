import { Button, Navbar } from "react-bootstrap";
import { User } from "../models/users";
import * as UsersApi from "../network/users_api";

interface NavBarLoggedInViewProps {
    user: User,
    onLogoutSuccessful: () => void,
}

const NavBarLoggedInView = ({ user, onLogoutSuccessful }: NavBarLoggedInViewProps) => {

    async function logout() {
        try {
            await UsersApi.logout();
            onLogoutSuccessful();
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    return (
        <>
            <Navbar.Text className="me-2">
                Hello, {user.first}!
            </Navbar.Text>
            <Button className=".log_out_button" onClick={logout}>Log out</Button>
        </>
    );
}

export default NavBarLoggedInView;