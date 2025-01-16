import React from 'react';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import PeopleIcon from '@mui/icons-material/People';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AddIcon from '@mui/icons-material/Add';
import { CssBaseline, IconButton, InputBase, List } from '@mui/material';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Calendar, StickyWall, Today, Upcoming } from '../../pages/index';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import './Navbar.css';
import LogoutIcon from '@mui/icons-material/Logout';
import TuneIcon from '@mui/icons-material/Tune';

const menu: { name: string, path: string, icon: any }[] = [
    { name: "Upcoming", path: "/", icon: <KeyboardDoubleArrowRightIcon style={{ fontSize: "15px" }} /> },
    { name: "Today", path: "/today", icon: <Inventory2Icon style={{ fontSize: "15px" }} /> },
    { name: "Calendar", path: "/calendar", icon: <PeopleIcon style={{ fontSize: "15px" }} /> },
    { name: "Sticky Wall", path: "/sticky-wall", icon: <MenuBookIcon style={{ fontSize: "15px" }} /> },
]

const Navbar: React.FC = () => {
    const navigate = useNavigate();

    const drawer = (
        <div className='navbar-drawer'>
            <div>
                <div>
                    <div className='navbar-main-heading'>
                        <h3 className='heading-color'>
                            Menu
                        </h3>
                        <MenuIcon />
                    </div>
                    <div className='menu-search'>
                        <IconButton type="button" aria-label="search">
                            <SearchIcon />
                        </IconButton>
                        <InputBase
                            placeholder="Search"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                </div>
                <div className='menu-todo-task'>
                    <List>
                        <h6>TASKS</h6>
                        {menu.map((item) => (
                            <div className='navbar-task-content'
                                key={item.name}
                                onClick={() => navigate(item.path)}
                            >
                                <div className='navbar-task-sub-content'>
                                    <p>{item.icon}</p>
                                    <p className='navbar-task-sub-content-name'>{item.name}</p>
                                </div>
                                <div className='menu-notification'>12</div>
                            </div>
                        ))}
                    </List>
                </div>
                <div className='menu-todo-section'>
                    <h6 className='heading-color'>LISTS</h6>
                    <div className='menu-list'>
                        <div className='menu-list-option'>
                            <div className='menu-list-option-content'></div>
                            <p>Personal</p>
                        </div>
                        <div className='menu-notification'>12</div>
                    </div>
                    <div className='menu-list'>
                        <div className='menu-list-option'>
                            <div className='menu-list-option-content' style={{ backgroundColor: '#66dcec' }}></div>
                            <p>Work</p>
                        </div>
                        <div className='menu-notification'>12</div>
                    </div>
                    <div className='menu-list'>
                        <div className='menu-list-option'>
                            <div className='menu-list-option-content' style={{ backgroundColor: '#ffd43b' }}></div>
                            <p>List 1</p>
                        </div>
                        <div className='menu-notification'>12</div>
                    </div>
                    <div>
                        <div className='menu-list-addicon'>
                            <div>
                                <AddIcon />
                            </div>
                            <p >Add New list</p>
                        </div>
                    </div>
                </div>
                <div className="menu-tags">
                    <h6 className='heading-color'>TAGS</h6>
                    <div className='menu-tags-options'>
                        <p style={{ backgroundColor: "#d1eaed" }}>Tag 1</p>
                        <p style={{ backgroundColor: "#ffdada" }}>Tag 2</p>
                        <p style={{ backgroundColor: "#ebebeb" }}> + Add Tag</p>
                    </div>
                </div>
            </div>
            <div>
                <div className="menu-footer">
                    <div className='menu-footer-option'>
                        <div className='menu-footer-icon'>
                            <TuneIcon />
                        </div>
                        <p>Settings</p>
                    </div>
                    <div className='menu-footer-option'>
                        <div className='menu-footer-icon'>
                            <LogoutIcon />
                        </div>
                        <p>Sign out</p>
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <>
            <div className="main-component-navbar-content-area">
                <CssBaseline />
                <div>{drawer}</div>
                <div className="main-content-area">
                    <Routes>
                        <Route path="/" element={<Upcoming />} />
                        <Route path="/today" element={<Today />} />
                        <Route path="/calendar" element={<Calendar />} />
                        <Route path="/sticky-wall" element={<StickyWall />} />
                    </Routes>
                </div>
            </div>

        </>
    )
}
export default Navbar