import { User } from "../models/users";

interface UserPageLoggedInViewProps {
    user: User | null,
}

const UserPageLoggedInView = ({user} : UserPageLoggedInViewProps) => {
    return (
        <p>Hello, User!</p>
    );
}

export default UserPageLoggedInView;