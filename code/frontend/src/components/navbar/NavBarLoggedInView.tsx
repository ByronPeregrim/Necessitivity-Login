import { Button, Navbar } from "react-bootstrap";
import { User } from "../../models/users";
import * as UsersApi from "../../network/users_api";
import styles from "../../styles/Navbar.module.css"

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
                Edit Account
            </Navbar.Text>
            <Button className={styles.logout_button} style={{border:"solid 2px steelblue"}} onClick={logout}>Log out</Button>
        </>
    );
}

export default NavBarLoggedInView;