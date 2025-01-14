import React from 'react';
import './StickyWall.css';

const StickyWall: React.FC = () => {
    return (
        <div>
            <h1 className='sticky-wall-heading'>Sticky Wall</h1>
            <section className='sticky-wall-main'>
                <div className='sticky-wall-content'>
                    <div className='sticky-wall-content-text' style={{backgroundColor: '#fdf2b3'}} >
                        <h3 className='sticky-wall-heading'> Social Media</h3>
                        <p>gggggggggggggggggggggggggggggggggggggggggggggggg</p>
                    </div>
                    <div className='sticky-wall-content-text' style={{backgroundColor: '#d1eaed'}} >
                        <h3 className='sticky-wall-heading'></h3>
                        <p>ggggggggggggggggggg</p>
                    </div>
                    <div className='sticky-wall-content-text' style={{backgroundColor: '#ffdada'}} >
                        <h3 className='sticky-wall-heading'></h3>
                        <p>ggggggggggggggggggg</p>
                    </div>
                </div>
                <div style={{ border: "2px solid red", display: 'flex', padding: "10px" }}>
                    <div className='sticky-wall-content-text' style={{backgroundColor: '#ffd4a9'}} >
                    <h3 className='sticky-wall-heading'></h3>
                        <p>ggggggggggggggggggg</p>
                    </div>
                    <div className='sticky-wall-content-text' style={{backgroundColor: '#ebebeb'}} >
                        <p>ggggggggggggggggggg</p>
                    </div>

                </div>
            </section>
        </div>
    )
}

export default StickyWall
