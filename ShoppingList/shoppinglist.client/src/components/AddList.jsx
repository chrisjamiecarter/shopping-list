import { useRef } from "react";

const AddList = ({ newItem, setNewItem, handleSubmit }) => {
    const inputRef = useRef();

    return (
        <form className="addForm" onSubmit={handleSubmit}>
            <label className="me-3" htmlFor="addItem">Add Item</label>

            <input
                className="me-3"
                type="text"
                id="addItem"
                autoFocus
                ref={inputRef}
                placeholder="Add Item"
                required
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
            />

            <button
                className="me-3"
                type="submit"
                aria-label="Add Item"
                onClick={() => inputRef.current.focus()}
            >
                <h3>+</h3>
            </button>
        </form>
    );
};

export default AddList;
