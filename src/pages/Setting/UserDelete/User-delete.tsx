import { ConfirmDeleteModalProps } from "./interface/delete-user.interface";
import "./User-delete.css";
import CloseIcon from '@mui/icons-material/Close';

export const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({ onConfirm, onCancel }) => {
    return (
        <div className="main-delete-content p-5">
            <div className="d-flex flex-direction-column align-item-center mt-4 justify-content-center">
                <CloseIcon sx={{
                    border: "6px solid red",
                    borderRadius: "50%",
                    fontSize: "650%",
                    fill: "red"
                }} />
                <h3 className="mt-2">Are you sure?</h3>
                <p className="mt-2 font-size">Do you really want to delete your account? This action cannot be undone.</p>
            </div>
            <div className="d-flex justify-content-center mt-5">
                <button className="delete-user-btn submit-btn border-radius-5" onClick={onCancel}>Cancel</button>
                <button className="delete-user-btn cancel-btn border-radius-5 ml-2" onClick={onConfirm}>Delete</button>
            </div>
        </div>
    );
};
