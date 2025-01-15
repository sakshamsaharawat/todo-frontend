import React from 'react';
import './StickyWall.css';
import AddIcon from '@mui/icons-material/Add';
import { StickyWallData } from "../../data/stickyWallData"
import { useNavigate } from 'react-router-dom';

const StickyWall: React.FC = () => {
    const navigate = useNavigate()
    return (
        <div>
            <h1 className="sticky-wall-heading">Sticky Wall</h1>
            <section className="sticky-wall-main">
                {StickyWallData.map((item) => (
                    
                        <div
                            className="sticky-wall-content-text"
                            style={{ backgroundColor: item.color_code }}
                            // key={item.id} 
                        >
                            <h1 className="sticky-wall-heading">{item.title}</h1>
                            <div
                                dangerouslySetInnerHTML={{ __html: item.content }}
                            />
                        </div>
                ))}
                <div
                    className="sticky-wall-content-text"
                    style={{
                        backgroundColor: '#ebebeb',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    onClick={()=>navigate("/home")}
                >
                    <AddIcon style={{ fontSize: '70px' }} />
                </div>
            </section>
        </div>

    )
}

export default StickyWall
