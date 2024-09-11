import "./App.css";
import Content from "./components/Content";
import Footer from "./components/Footer";
import Header from "./components/Header";
import AddList from "./components/AddList";
import { useState, useEffect } from "react";

function App() {
    const API_url = "https://localhost:7257/api/shoppinglistitems";
    const [list, setList] = useState([]);
    const [newItem, setNewItem] = useState("");
    const [error, setError] = useState(null);
    
    useEffect(() => {
        populateShoppingListData();
    }, []);

    //useEffect(() => {
    //    const fetchData = async () => {
    //        try {
    //            const response = await fetch(API_url);

    //            if (!response.ok) throw Error("Error Message");

    //            const listItem = await response.json();

    //            setList(listItem);

    //            setError(null);
    //        } catch (error) { }
    //    };

    //    fetchData();
    //}, []);

    // Add new Item to the list

    const addItems = async (item) => {
        
        const createRequest = {
            name: item,
        };
        
        const options = {
            method: "POST",
            headers: {
                "content-Type": "application/json",
            },
            body: JSON.stringify(createRequest),
        };

        await fetch(API_url, options)
            .then(response => response.json())
            .then(data => {
                const items = [...list, data];
                setList(items);
            })
            .catch(error => console.error(error));
            
        //console.log(result)
        //if (result) {
        //    setError(result);
        //} else {
        //    const listItem = [...list, theNewItem];
        //    setList(listItem);
        //}
    };

    //  Create a function to update the checked property

    const handleCheck = async (id) => {
        const listItem = list.map((item) =>
            item.id === id
                ? {
                    ...item,
                    isPickedUp: !item.isPickedUp,
                }
                : item
        );

        setList(listItem);

        const item = listItem.filter((list) => list.id === id);

        const options = {
            method: "PUT",
            headers: {
                "content-Type": "application/json",
            },
            body: JSON.stringify({
                name: item[0].name,
                isPickedUp: item[0].isPickedUp,
            }),
        };

        const reqUrl = `${API_url}/${id}`;
        
        await fetch(reqUrl, options)
            .catch(error => console.error(error));

        //const result = await request(reqUrl, updateOptions);
        //if (result) setError(result);
    };

    //  create a function to delete an item

    const handleDelete = async (id) => {
        const items = list.filter((item) => item.id !== id);
        setList(items);

        const options = {
            method: "DELETE",
        };

        const reqUrl = `${API_url}/${id}`;

        await fetch(reqUrl, options)
            .catch(error => consol.error(error));

        //if (result) setError(result);
    };

    //  create a function to prevent default submit action

    const handleSubmit = (e) => {
        e.preventDefault();

        addItems(newItem);

        setNewItem("");
    };

    return (
        <div className="App">
            <Header />

            <AddList
                newItem={newItem}
                setNewItem={setNewItem}
                handleSubmit={handleSubmit}
            />

            <Content
                list={list}
                handleCheck={handleCheck}
                handleDelete={handleDelete}
            />

            <Footer list={list} />
        </div>
    );

    async function populateShoppingListData() {
        const response = await fetch(API_url);
        const data = await response.json();
        setList(data);
    }
}

export default App;
