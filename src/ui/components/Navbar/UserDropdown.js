import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Menu, User, Power } from "react-feather";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { useCookies } from "react-cookie";
import { useAddUser } from "../../../redux/reducer";
import { toast } from "react-toastify";

const UserDropdown = (props) => {
  const navigate = useNavigate();
  const [, removeCookie] = useCookies();
  const { dispatch } = useAddUser();
  const { activeUser } = useSelector((state) => state?.user);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const signOut = () => {
    navigate("/");
    const activeUser = JSON.parse(localStorage.getItem("active_user"));
    const newUser = { ...activeUser, isVerified: false };
    dispatch({ type: "EDIT_USER", payload: { data: newUser } });
    localStorage.removeItem("active_user");
    removeCookie("Remember");
    toast.success("Logout Successfully", { autoClose: 1000 });
  };

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <div>
      <Dropdown isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle
          className="flex items-center space-x-2 px-4 py-2 text-white bg-gray-700 rounded-lg hover:bg-gray-600 transition-all"
          caret
        >
          <span>{activeUser.role}</span>
          <Menu />
        </DropdownToggle>
        {dropdownOpen && (
          <DropdownMenu className=" text-white bg-slate-600 rounded-lg shadow-lg mt-2 ">
            <DropdownItem
              header
              className="text-center my-3 text-lg font-semibold"
            >
              <span>
                <User className="inline-block mr-2" />
                {activeUser
                  ? `${activeUser.fname} ${activeUser.lname}`
                  : "Guest"}
              </span>
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem
              onClick={() => navigate("/profile")}
              className="text-center my-2"
            >
              <span className="flex items-center">
                <User size={14} className="mr-2" />
                Profile
              </span>
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem onClick={signOut} className="text-center my-2">
              <span className="flex items-center">
                <Power size={14} className="mr-2" />
                Logout
              </span>
            </DropdownItem>
          </DropdownMenu>
        )}
      </Dropdown>
    </div>
  );
};

export default UserDropdown;