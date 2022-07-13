import "./sideNav.css";
import React, { useState } from "react";

//import react pro sidebar components
import {
    ProSidebar,
    Menu,
    MenuItem,
    SidebarHeader,
    SidebarFooter,
    SidebarContent
} from "react-pro-sidebar";

import { FaList, FaRegHeart, FaWallet } from "react-icons/fa";
import { BsNewspaper, BsWallet2 } from "react-icons/bs";
import {
    FiHome,
    FiLogOut,
    FiArrowLeftCircle,
    FiArrowRightCircle,
    
} from "react-icons/fi";
import { RiPencilLine } from "react-icons/ri";
import { BiCog } from "react-icons/bi";

//import sidebar css from react-pro-sidebar module and our custom css
import "react-pro-sidebar/dist/css/styles.css";

export default function SideNav() {
    const [menuCollapse, setMenuCollapse] = useState(true);

    //create a custom function that will change menucollapse state from false to true and true to false
    const menuIconClick = () => {
        //condition checking to change state from true to false and vice versa
        menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
    };
    return (
        <>
            <div id="header" style={{overflowY:"hidden"}}>
                {/* collapsed props to change menu size using menucollapse state */}
                <ProSidebar collapsed={menuCollapse}>
                    <SidebarHeader>
                        <div className="logotext">
                        {/* small and big change using menucollapse state */}
                        {/* <p>{menuCollapse ? "Logo" : "Big Logo"}</p> */}
            </div>
                        {/* <div className="closemenu" onClick={menuIconClick}> */}
                            {/* changing menu collapse icon on click */}
                            {/* {menuCollapse ? <FiArrowRightCircle /> : <FiArrowLeftCircle />}
                        </div> */}
                    </SidebarHeader>
                    <SidebarContent style={{overflowY:"hidden"}}>
                        <Menu iconShape="square">
                            <MenuItem active={true} icon={<FiHome />}>
                                {/* Home */}
                            </MenuItem>
                            <MenuItem icon={<BsWallet2 />}></MenuItem>
                            <MenuItem icon={<BsNewspaper />}></MenuItem>
                            {/* <MenuItem icon={<RiPencilLine />}>Author</MenuItem> */}
                            {/* <MenuItem icon={<BiCog />}>Settings</MenuItem> */}
                        </Menu>
                    </SidebarContent>
                    {/* <SidebarFooter>
                        <Menu iconShape="square">
                            <MenuItem icon={<FiLogOut />}>Logout</MenuItem>
                        </Menu>
                    </SidebarFooter> */}
                </ProSidebar>
            </div>
            <div style={{ color: "black", fontSize: "40px", marginLeft: "100px" }}>

            </div>

        </>
    );
}
