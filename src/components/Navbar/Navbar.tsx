import React, { useEffect, useState } from 'react';
import PeopleIcon from '@mui/icons-material/People';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AddIcon from '@mui/icons-material/Add';
import { CssBaseline, IconButton, InputBase, List, Modal } from '@mui/material';
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
import { AddList } from '../../pages';
import { logout } from '../../State/Auth/Action';
import { getTag } from '../../State/Tag/Action';
import AddTag from '../../pages/Tag/Add-Tag';

const menu: { name: string, path: string, icon: any }[] = [
    { name: "Upcoming", path: "/todo/upcoming", icon: <KeyboardDoubleArrowRightIcon className='todo-icon' /> },
    { name: "Today", path: "/todo/today", icon: <ListIcon className='todo-icon' /> },
    { name: "Calendar", path: "/todo/calendar", icon: <PeopleIcon className='todo-icon' /> },
    { name: "Sticky Wall", path: "/todo/sticky-wall", icon: <MenuBookIcon className='todo-icon' /> },
]

const Navbar: React.FC = ({ }) => {
    const dispatch: ThunkDispatch<RootState, undefined, AnyAction> = useDispatch();
    const { user, jwt } = useSelector((store: any) => store.authReducer);
    const { listReducer } = useSelector((store: RootState) => store);
    const { tagReducer } = useSelector((store: RootState) => store)
    const navigate = useNavigate();
    const [isDrawerOpen, setIsDrawerOpen] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const [openTagModal, setOpenTagModal] = useState(false);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen)
    }
    useEffect(() => {
        dispatch(getList());
        dispatch(getTag())
    }, [dispatch, user, jwt, navigate]);

    useEffect(() => {
        if (listReducer?.error || tagReducer?.error) {
            navigate("/login")
        }
    }, [listReducer, tagReducer]);

    const handleLogout = async () => {
        try {
            await dispatch(logout())
            navigate("/login")
        } catch (error) {
            console.error("logout error:", error)
        }
    }
    const handleSetting = () => {
        navigate("/todo/setting")
    }

    return (
        <>
            <div>
                <CssBaseline />
                {isDrawerOpen ? (
                    <div className='navbar-drawer d-flex f-dC justify-content-space-between navbar-background-color'>
                        <div>
                            <div>
                                <div className='d-flex justify-content-center justify-content-space-between'>
                                    <h3 className='primary-color'>
                                        Menu
                                    </h3>
                                    <MenuIcon onClick={toggleDrawer} className='cursor-pointer primary-color' />
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
                                    <h6 className='primary-color'>TASKS</h6>
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
                                <h6 className='primary-color mt-2'>LISTS</h6>
                                <div className='list-content'>
                                    {Array.isArray(listReducer?.lists) && listReducer?.lists?.map((item: any) => (
                                        <div className='d-flex justify-content-space-between align-item-center mt-1 font-size'>
                                            <div className='d-flex align-item-center mt-1 ml-1'>
                                                <div className='menu-list-option-content' style={{ backgroundColor: item?.color_code }}></div>
                                                <p className='ml-2 cursor-pointer'>{item?.title}</p>
                                            </div>
                                            <div className='menu-notification d-flex justify-content-center align-item-center font-size cursor-pointer'>12</div>
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    <div className='add-list-btn d-flex font-size align-item-center mt-1 mb-2 border-radius-5 cursor-pointer'
                                        onClick={() => setOpenModal(true)}
                                    >
                                        <div className='align-item-center'>
                                            <AddIcon className='todo-icon' />
                                        </div>
                                        <p>Add New list</p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-2">
                                <h6 className='primary-color'>TAGS</h6>
                                <div className='tags-content d-flex mt-1 font-size'>
                                    {Array.isArray(tagReducer?.tags) && tagReducer?.tags?.map((item: any) => (
                                        <div className='menu-tags-options d-flex align-item-center f-wrap font-size mt-1 cursor-pointer'>
                                            <p className='ml-1 border-radius-5' style={{ backgroundColor: item?.color_code }}>{item?.title}</p>
                                        </div>
                                    ))}
                                </div>
                                <div onClick={() => setOpenTagModal(true)}>
                                    <p className='menu-tags-options mt-1 ml-1 border-radius-5 cursor-pointer hover font-size'> + Add New Tag</p>
                                </div>
                            </div>
                        </div>
                        <div className="font-size">
                            <div className='d-flex cursor-pointer hover'>
                                <div >
                                    <TuneIcon className='todo-icon mr-1' />
                                </div>
                                <p className="cursor-pointer hover" onClick={()=> handleSetting()}>Settings</p>
                            </div>
                            <div className='d-flex cursor-pointer hover' onClick={() => handleLogout()}>
                                <div>
                                    <LogoutIcon className='todo-icon mr-1 cursor-pointer' />
                                </div>
                                <p className='cursor-pointer'>Sign out</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div><MenuIcon onClick={toggleDrawer} className='menu-icon-toggle cursor-pointer' /></div>
                )}
            </div>
            <Modal open={openModal} onClose={() => setOpenModal(false)}>
                <div className="modal-content">
                    <AddList closeModal={() => setOpenModal(false)} />
                </div>
            </Modal>
            <Modal open={openTagModal} onClose={() => setOpenTagModal(false)}>
                <div className="modal-content">
                    <AddTag closeModal={() => setOpenTagModal(false)} />
                </div>
            </Modal>

        </>
    )
}
export default Navbar;