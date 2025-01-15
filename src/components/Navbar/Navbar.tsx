import React from 'react';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import PeopleIcon from '@mui/icons-material/People';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AddIcon from '@mui/icons-material/Add';
import { Box, CssBaseline, IconButton, InputBase, List } from '@mui/material';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Calendar, StickyWall, TaskDrawer, Today, Upcoming } from '../../pages/index';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import './Navbar.css'
import LogoutIcon from '@mui/icons-material/Logout';
import TuneIcon from '@mui/icons-material/Tune';
import { Task } from '@mui/icons-material';

const menu: { name: string, path: string, icon: any }[] = [
    { name: "Upcoming", path: "/upcoming", icon: <KeyboardDoubleArrowRightIcon style={{ fontSize: "15px" }} /> },
    { name: "Today", path: "/today", icon: <Inventory2Icon style={{ fontSize: "15px" }} /> },
    { name: "Calendar", path: "/calendar", icon: <PeopleIcon style={{ fontSize: "15px" }} /> },
    { name: "Sticky Wall", path: "/sticky-wall", icon: <MenuBookIcon style={{ fontSize: "15px" }} /> },
    // { name: "List", path: "/list", icon: <AddIcon style={{ fontSize: "15px" }} /> }
]

const Navbar: React.FC = () => {
    const navigate = useNavigate();

    const drawer = (
        <Box
            sx={{
                overflow: "auto",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100vh",
                backgroundColor: '#f4f4f4',
                borderRadius: "15px",
                padding: "20px"
            }}
        >
            <div>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <h3 className='heading-color'>
                            Menu
                        </h3>
                        <MenuIcon />
                    </div>
                    <div className='menu-search'>
                        <IconButton type="button" sx={{ p: '5px' }} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Search "
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                </div>
                <div className='menu-todo-task'>
                    <List>
                        <h6 style={{ color: "#525252" }}>TASKS</h6>
                        {menu.map((item) => (
                            <div
                                key={item.name}
                                onClick={() => navigate(item.path)}
                                style={{ padding: "3px 0px", marginBottom: "2px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between" }}
                            >
                                <div style={{ display: "flex", fontSize: "13px", marginLeft: '5px' }}>
                                    <p style={{ padding: "0px" }}>{item.icon}</p>
                                    <p style={{ paddingLeft: "8px" }}>{item.name}</p>
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
                            <div style={{ backgroundColor: '#ff6b6b', height: "12px", width: "12px", borderRadius: '3px' }}></div>
                            <p>Personal</p>
                        </div>
                        <div className='menu-notification'>12</div>
                    </div>
                    <div className='menu-list'>
                        <div className='menu-list-option'>
                            <div style={{ backgroundColor: '#66dcec', height: "12px", width: "12px", borderRadius: '3px' }}></div>
                            <p>Work</p>
                        </div>
                        <div className='menu-notification'>12</div>
                    </div>
                    <div className='menu-list'>
                        <div className='menu-list-option'>
                            <div style={{ backgroundColor: '#ffd43b', height: "12px", width: "12px", borderRadius: '3px' }}></div>
                            <p>List 1</p>
                        </div>
                        <div className='menu-notification'>12</div>
                    </div>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ fontSize: '13px', padding: '0px' }}>
                                <AddIcon />
                            </div>
                            <p style={{ marginLeft: '2px', fontSize: '13px' }}>Add New list</p>
                        </div>
                    </div>
                </div> 
                <div style={{ marginTop: '20px' }}>
                    <h6 className='heading-color'>TAGS</h6>
                    <div className='todo-menu-tag'>
                        <p style={{ backgroundColor: "#d1eaed" }}>Tag 1</p>
                        <p style={{ backgroundColor: "#ffdada" }}>Tag 2</p>
                        <p style={{ backgroundColor: "#ebebeb" }}> + Add Tag</p>
                    </div>
                </div>
            </div>
            <List>
                <div className="menu-footer">
                    <div style={{ display: 'flex' }}>
                        <div className='menu-footer-option'>
                            <TuneIcon style={{ fontSize: '15px' }} />
                        </div>
                        <p>Settings</p>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <div className='menu-footer-option'>
                            <LogoutIcon style={{ fontSize: '15px' }} />
                        </div>
                        <p>Sign out</p>
                    </div>
                </div>
            </List>
        </Box>
    )

    return (
        <>
            <div className="flex h-screen"
                style={{ display: "flex" }}
            >
                <CssBaseline />
                <div
                    style={{
                        width: '15%',
                        borderWidth: '2px',
                        borderRadius: '15px',
                        height: '100vh',
                        position: 'fixed',
                    }}
                >
                    {drawer}
                </div>
                <div
                    style={{
                        marginLeft: '15.50%',
                        width: '100%',
                        height: '100%',
                    }}
                >
                    <Routes>
                        <Route path="/upcoming" element={<Upcoming />} />
                        <Route path="/today" element={<Today />} />
                        <Route path="/calendar" element={<TaskDrawer />} />
                        <Route path="/sticky-wall" element={<StickyWall />} />
                    </Routes>
                </div>
            </div>

        </>
    )
}
export default Navbar