import React, { useEffect, useState } from 'react';
import PeopleIcon from '@mui/icons-material/People';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AddIcon from '@mui/icons-material/Add';
import { CssBaseline, IconButton, InputBase, List } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import './Navbar.css';
import LogoutIcon from '@mui/icons-material/Logout';
import TuneIcon from '@mui/icons-material/Tune';
import ListIcon from '@mui/icons-material/List';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../../store';
import { AnyAction } from 'redux';
import { getList } from '../../State/List/Action';
import { useSelector } from 'react-redux';

const menu: { name: string, path: string, icon: any }[] = [
    { name: "Upcoming", path: "/todo/upcoming", icon: <KeyboardDoubleArrowRightIcon className='todo-icon' /> },
    { name: "Today", path: "/todo/today", icon: <ListIcon className='todo-icon' /> },
    { name: "Calendar", path: "/todo/calendar", icon: <PeopleIcon className='todo-icon' /> },
    { name: "Sticky Wall", path: "/todo/sticky-wall", icon: <MenuBookIcon className='todo-icon' /> },
]

const Navbar: React.FC = () => {
    const dispatch: ThunkDispatch<RootState, undefined, AnyAction> = useDispatch();
    const { user, jwt } = useSelector((store: any) => store.auth);
    const { list } = useSelector((store: RootState) => store);
    console.log("list----", list)
    const navigate = useNavigate();
    const [isDrawerOpen, setIsDrawerOpen] = useState(true);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen)
    }
    useEffect(() => {
        if (jwt && user?._id) {
            console.log("user._id----", user._id)
            dispatch(getList());
        }
    }, [dispatch, user, jwt, navigate]);


    const drawer = (
        <div className='navbar-drawer d-flex f-dC justify-content-space-between navbar-background-color'>
            <div>
                <div>
                    <div className='d-flex justify-content-center justify-content-space-between'>
                        <h3 className='sub-heading-color'>
                            Menu
                        </h3>
                        <MenuIcon onClick={toggleDrawer} className='cursor-pointer' />
                    </div>
                    <div className='menu-search d-flex justify-content-center mt-2 b b-ws border-radius-5'>
                        <IconButton type="button" aria-label="search">
                            <SearchIcon />
                        </IconButton>
                        <InputBase
                            placeholder="Search"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                </div>
                <div className='b-bottom-ws mt-3'>
                    <List>
                        <h6 className='sub-heading-color'>TASKS</h6>
                        {menu.map((item) => (
                            <div className='d-flex just justify-content-space-between mt-1 cursor-pointer
                               justify-content-center'
                                key={item.name}
                                onClick={() => navigate(item.path)}
                            >
                                <div className='d-flex ml-1 font-size'>
                                    <p>{item.icon}</p>
                                    <p className='ml-2'>{item.name}</p>
                                </div>
                                <div className='menu-notification d-flex justify-content-center align-item-center font-size'>12</div>
                            </div>
                        ))}
                    </List>
                </div>
                <div className='b-bottom-ws'>
                    <h6 className='sub-heading-color mt-2'>LISTS</h6>
                    <div className='list-content'>
                    {Array.isArray(list?.list?.data) && list.list?.data?.map((item: any) => (
                        <div className='d-flex justify-content-space-between align-item-center mt-1 font-size'>
                            <div className='d-flex align-item-center mt-1 ml-1'>
                                <div className='menu-list-option-content' style={{ backgroundColor: item.color_code }}></div>
                                <p className='ml-2'>{item?.title}</p>
                            </div>
                            <div className='menu-notification d-flex justify-content-center align-item-center font-size'>12</div>
                        </div>
                    ))}
                    </div>
                    <div>
                        <div className='d-flex font-size align-item-center mt-1 mb-2'>
                            <div className='align-item-center'>
                                <AddIcon className='todo-icon' />
                            </div>
                            <p>Add New list</p>
                        </div>
                    </div>
                </div>
                <div className="mt-2">
                    <h6 className='sub-heading-color'>TAGS</h6>
                    <div className='menu-tags-options d-flex align-item-center f-wrap font-size mt-1'>
                        <p className='ml-1 border-radius-5' style={{ backgroundColor: "#d1eaed" }}>Tag 1</p>
                        <p className='ml-1 border-radius-5' style={{ backgroundColor: "#ffdada" }}>Tag 2</p>
                        <p className='ml-1 border-radius-5' style={{ backgroundColor: "#ebebeb" }}> + Add Tag</p>
                    </div>
                </div>
            </div>
            <div className="font-size">
                <div className='d-flex'>
                    <div >
                        <TuneIcon className='todo-icon mr-1' />
                    </div>
                    <p>Settings</p>
                </div>
                <div className='d-flex'>
                    <div>
                        <LogoutIcon className='todo-icon mr-1' />
                    </div>
                    <p>Sign out</p>
                </div>
            </div>
        </div>
    )

    return (
        <>
            <div>
                <CssBaseline />
                {isDrawerOpen ? (
                    <div>{drawer}</div>
                ) : (
                    <div><MenuIcon onClick={toggleDrawer} className='menu-icon-toggle cursor-pointer' /></div>
                )}
            </div>
        </>
    )
}
export default Navbar;