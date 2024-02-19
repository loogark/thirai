import {
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  MenuOptionGroup,
} from "@chakra-ui/react";
import { CiMenuBurger } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { useAuthModal } from "../context/AuthModalProvider";
import { useUser } from "../context/UserProvider";

export const MobileMenu = () => {
  const { setAuthModalOpen } = useAuthModal();
  const { getUser, removeUser } = useUser();
  const user = getUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    removeUser();
    navigate("/home");
  };
  return (
    <Menu isLazy>
      <MenuButton
        as={IconButton}
        variant='ghost'
        aria-label='menu-button'
        size='sm'
        icon={<CiMenuBurger color='white' size={20} />}
        _hover={{ bg: "#535bf2" }}
      ></MenuButton>
      <MenuList>
        <MenuOptionGroup
          textAlign='start'
          defaultValue='asc'
          title='Thirai'
          type='radio'
        >
          <MenuItem fontSize='16px' as={Link} to='/movies'>
            Movies
          </MenuItem>
          <MenuItem fontSize='16px' as={Link} to={"/series"}>
            Series
          </MenuItem>
          <MenuItem fontSize='16px' as={Link} to='/search'>
            Search
          </MenuItem>
        </MenuOptionGroup>
        <MenuDivider />
        <MenuOptionGroup textAlign='start' title='User' type='checkbox'>
          {!user ? (
            <MenuItem fontSize='16px' onClick={() => setAuthModalOpen(true)}>
              Sign In
            </MenuItem>
          ) : (
            <>
              <MenuItem fontSize='16px' as={Link} to={"/account"}>
                Account
              </MenuItem>
              <MenuItem
                fontSize='16px'
                color='red.500'
                _hover={{ bgColor: "red.50" }}
                onClick={handleLogout}
              >
                Logout
              </MenuItem>
            </>
          )}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};
