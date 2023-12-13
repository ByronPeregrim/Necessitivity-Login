import { Container } from "react-bootstrap";
import UserPageLoggedInView from "../components/UserPageLoggedInView";
import HomeView from "../components/HomeView";
import { User } from "../models/users";

interface UserPageProps {
    loggedInUser: User | null,
    onSignUpClicked: () => void,
    onLoginClicked: () => void,
    onAccountRecoveryClicked: () => void,
}

const UserPage = ({ loggedInUser, onSignUpClicked, onLoginClicked, onAccountRecoveryClicked }: UserPageProps) => {
    return (
        <Container>
            <>
                {loggedInUser
                    ? <UserPageLoggedInView />
                    : <HomeView
                        onLoginClicked={() => {onLoginClicked()}}
                        onSignUpClicked={() => {onSignUpClicked()}} 
                        onAccountRecoveryClicked={() => {onAccountRecoveryClicked()}}
                        />
                }
            </>
        </Container>
    );
}

export default UserPage;