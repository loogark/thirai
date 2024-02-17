import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { FaUserSecret } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserProvider";

export const AccountMenu = () => {
  const navigate = useNavigate();
  const { removeUser } = useUser();
  const handleLogout = () => {
    removeUser();
    navigate("/home");
  };
  return (
    <Menu isLazy>
      <MenuButton>
        <FaUserSecret color='white' size={24} />
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => navigate("/account")}>Account</MenuItem>
        <MenuDivider />
        <MenuItem
          color='red.500'
          _hover={{ bgColor: "red.50" }}
          onClick={handleLogout}
        >
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
