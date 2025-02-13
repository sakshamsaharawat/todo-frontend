import React from 'react';
import './StickyWall.css';
import AddIcon from '@mui/icons-material/Add';
import { StickyWallData } from "../../data/stickyWallData";
import { useNavigate } from 'react-router-dom';

const StickyWall: React.FC = () => {
    const navigate = useNavigate()
    const handleOnClick = () => (
        navigate("/todo/add-stickywall")
    )
    return (
        <div className='mt-2 sticky-main'>
            <div className="sticky-title-btn d-flex justify-content-space-between">
                <h1 className="main-heading-color ml-4">Sticky Wall</h1>
                <button className='sticky-btn submit-btn cursor-pointer border-radius-5'
                onClick={()=> handleOnClick()}
                >Add StickyWall</button>
            </div>
            <section className="sticky-wall-main d-flex f-wrap ml-3">
                {StickyWallData.map((item) => (
                    <div
                        className="sticky-wall-content-text font-size"
                        style={{ backgroundColor: item.color_code }}
                    // key={item.id} 
                    >
                        <h1 className="sticky-wall-heading">{item.title}</h1>
                        <div
                            dangerouslySetInnerHTML={{ __html: item.content }}
                        />
                    </div>
                ))}
            </section>
        </div>
    )
}

export default StickyWall;
