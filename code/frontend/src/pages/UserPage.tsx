import { Container } from "react-bootstrap";
import UserPageLoggedInView from "../components/UserPageLoggedInView";
import HomeView from "../components/HomeView";
import { User } from "../models/users";

interface UserPageProps {
    loggedInUser: User | null,
    onSignUpClicked: () => void,
    onLoginClicked: () => void,
}

const UserPage = ({ loggedInUser, onSignUpClicked, onLoginClicked }: UserPageProps) => {
    return (
        <Container>
            <>
                {loggedInUser
                    ? <UserPageLoggedInView />
                    : <HomeView
                        onLoginClicked={() => {onLoginClicked()}}
                        onSignUpClicked={() => {onSignUpClicked()}} />
                }
            </>
        </Container>
    );
}

export default UserPage;