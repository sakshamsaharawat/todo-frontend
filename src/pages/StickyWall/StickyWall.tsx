import React, { useEffect } from 'react';
import './StickyWall.css';
import { useNavigate } from 'react-router-dom';
import { getStickyWall } from '../../State/stickyWall/Action';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../../store';
import { useDispatch } from 'react-redux';
import { AnyAction } from 'redux';
import { useSelector } from 'react-redux';

const StickyWall: React.FC = () => {
    const dispatch: ThunkDispatch<RootState, undefined, AnyAction> = useDispatch();
    const { stickywallReducer } = useSelector((store: RootState) => store)
    const navigate = useNavigate()
    const handleOnClick = () => (
        navigate("/todo/add-stickywall")
    )
    useEffect(() => {
        dispatch(getStickyWall());
    }, [dispatch, navigate]);

    return (
        <div className='mt-2 sticky-main'>
            <div className="sticky-title-btn d-flex justify-content-space-between">
                <h1 className="main-heading-color ml-4">Sticky Wall</h1>
                <button className='sticky-btn submit-btn cursor-pointer border-radius-5'
                    onClick={() => handleOnClick()}
                >+ &nbsp; Add Sticky Wall</button>
            </div>
            <section className="sticky-wall-main d-flex f-wrap ml-3">
                {Array.isArray(stickywallReducer?.stickyWalls) && stickywallReducer?.stickyWalls?.map((item) => (
                    <div
                        className="sticky-wall-content-text font-size"
                        style={{ backgroundColor: item.color_code }}
                    >
                        <h1 className="sticky-wall-heading">{item?.title}</h1>
                        <div
                            dangerouslySetInnerHTML={{ __html: item?.description }}
                        />
                    </div>
                ))}
            </section>
        </div>
    )
}
export default StickyWall;