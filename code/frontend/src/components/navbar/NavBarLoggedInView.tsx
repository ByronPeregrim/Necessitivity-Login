import { useState } from "react";
import { Button } from "react-bootstrap";
import { User } from "../../models/users";
import * as UsersApi from "../../network/users_api";
import styles from "../../styles/Navbar.module.css";
import UserEditInfoFormModal from "../modals/UserEditInfoForm";

interface NavBarLoggedInViewProps {
  user: User;
  onLogoutSuccessful: () => void;
}

const NavBarLoggedInView = ({
  user,
  onLogoutSuccessful,
}: NavBarLoggedInViewProps) => {
  const [showEditAccountForm, setShowEditAccountForm] = useState(false);

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
      <Button
        className={styles.edit_info_button}
        onClick={() => setShowEditAccountForm(true)}
      >
        Edit Account
      </Button>
      <Button
        className={styles.logout_button}
        style={{ border: "solid 2px steelblue" }}
        onClick={logout}
      >
        Log out
      </Button>
      <div className={styles.user_info_box}>
        {showEditAccountForm ? (
          <>
            <UserEditInfoFormModal
              currentUser={user}
              onEditInfoSuccessful={() => [
                window.location.reload(),
                setShowEditAccountForm(false),
              ]}
              onBackButtonClicked={() => [setShowEditAccountForm(false)]}
            />
          </>
        ) : null}
      </div>
    </>
  );
};

export default NavBarLoggedInView;
