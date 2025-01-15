import React, { useState } from 'react'
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import './Task.css'


type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function TaskDrawer() {
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [state, setState] = React.useState({
    right: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
  };

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return;
        }

        setState({ ...state, [anchor]: open });
      };

  const list = (anchor: Anchor) => (
    <div className='main-task'
      style={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 350 }}
      role="presentation"
    // onClick={toggleDrawer(anchor, false)}
    // onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className='task-header'>
        <h3 className='task-heading'>Task :</h3>
        <div>
          <CloseIcon
            style={{ cursor: 'pointer' }}
            onClick={toggleDrawer(anchor, false)} />
        </div>
      </div>
      <input className="task-input" type='text' placeholder='Renew driver licence' />
      <textarea className='task-description' placeholder='Description' />
      <div className='task-content'>
        <label style={{ marginRight: "80px" }}>List</label>
        <select
          name="list"
          id="list"
          value={selectedValue}
          onChange={handleChange}
        >
          <option value="personal">Personal</option>
          <option value="work">Work</option>
          <option value="list">List</option>
        </select>
        <div className='task-content'>
          <label style={{ marginRight: "47px", }}>Due date</label>
          <select
            name="duedate"
            id="date"
            value={selectedValue}
            onChange={handleChange}
          >
            <option value="01-01-25">01-01-25</option>
            <option value="16-01-25">16-01-25</option>
            <option value="26-01-25">26-01-25</option>
          </select>
        </div>
      </div>
      <div className='task-tags'>
        <p>Tags</p>
        <div className='sub-task-tags'>
          <span className='tag'>Tag 1</span>
          <span className='add-task-tags'> + Add Tag </span>
        </div>
      </div>
      <div className='main-subtask'>
        <h3 className='task-heading'>Subtasks:</h3>
        <div>
          <input className="subtask-input" type='text' placeholder='+ Add New Subtask' />
        </div>
        <div className='subtask-content'>
          <div style={{ display: 'flex' }}>
            <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
          </div>
          <div style={{ marginLeft: '20px' }}>
            <p> Substask</p>
          </div>
        </div>
      </div>
      <div className='task-footer'>
        <div className='delete-task-btn'>
          Delete Task
        </div>
        <div className='change-task-btn'>
          Save changes
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ border: "2px solid red" }}>
      {(['right'] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            style={{ border: "2px solid red" }}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

