import { useState } from "react";
import Update from "./UpdateTask";
import styles from './ToDoList.module.css';

function ToDoList() {

    const [toDoItems, setToDoItems] = useState([]);
    const [inputTaskId, setInputTaskId] = useState("");
    const [addTask, setAddTask] = useState({ "userId": "", "id": "", "title": "", "completed": "" });
    const [updateTask, setUpdateTask] = useState({ "update": false, "i": "" });



    function handleFetchTask() {

        if (inputTaskId) {
            fetch('https://jsonplaceholder.typicode.com/todos/' + inputTaskId)
                .then((response) => response.json())
                .then((task) => {
                    setToDoItems([task, ...toDoItems]);
                });
        }

        setInputTaskId("");
        setUpdateTask({ "update": false, "i": "" });
    }





    function handleAddTask(e) {
        e.preventDefault();

        const obj = JSON.stringify({
            userId: addTask.userId,
            id: addTask.id,
            title: addTask.title,
            completed: addTask.completed

        })

        fetch('https://jsonplaceholder.typicode.com/todos', {

            method: 'POST',
            body: obj,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((task) => {
                setToDoItems([task, ...toDoItems]);
            });

        setAddTask({ "userId": "", "id": "", "title": "", "completed": "" })
    }



    function handleUpdateBtn(id, index) {

        setUpdateTask({ update: true, i: index });


        const obj = JSON.stringify({
            userId: toDoItems[index].userId,
            id: toDoItems[index].id,
            title: toDoItems[index].title,
            completed: toDoItems[index].completed

        })

        fetch('https://jsonplaceholder.typicode.com/todos/' + id, {

            method: 'PUT',
            body: obj,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((response) => response.json())
            .then((task) => {
                console.log("updated=" + task);
            });

    }





    function handleDeleteBtn(id, index) {

        fetch('https://jsonplaceholder.typicode.com/posts/' + id, {
            method: 'DELETE',
        })

        setToDoItems(toDoItems.filter((item, i) => i != index))
        alert("Task Deleted");
    }



    /*This function is receiving data  back from 'Update.js' which is children of 'ToDo_List.js'  */
    function handleDataFromChild(data) {

        if (data) {

            const updatedItems = toDoItems.map((item, index) => {
                if (index === updateTask.i) {
                    return {
                        userId: data.userId,
                        id: data.id,
                        title: data.title,
                        completed: data.completed
                    };
                }
                return item;
            })
            setToDoItems(updatedItems);
        }
        setUpdateTask({ update: false, i: "" });

    }




    return (

        <>
            <div className={styles.container}>

                <div className={styles.heading}>
                    <h2>REACT TO-DO LIST</h2>
                </div>

                <div className={styles.fetchTask}>

                    <input
                        placeholder="task Id (1-200)"
                        value={inputTaskId}
                        onChange={(event) => setInputTaskId(event.target.value)}
                    />

                    <button onClick={handleFetchTask}>fetch Task</button>

                </div>

                <div className={styles.addTask}>

                    <div className={styles.divAddTaskInputs}>

                        <form onSubmit={handleAddTask}>

                            <input
                                placeholder="user Id"
                                value={addTask.userId}
                                required
                                onChange={(event) =>
                                    setAddTask({
                                        ...addTask,
                                        userId: event.target.value
                                    })
                                }
                            />
                            <input
                                placeholder="id"
                                value={addTask.id}
                                required
                                onChange={(event) =>
                                    setAddTask({
                                        ...addTask,
                                        id: event.target.value
                                    })
                                }
                            />

                            <input
                                placeholder="title"
                                value={addTask.title}
                                required
                                onChange={(event) =>
                                    setAddTask({
                                        ...addTask,
                                        title: event.target.value
                                    })
                                }
                            />

                            <input
                                placeholder="completed"
                                value={addTask.completed}
                                required
                                onChange={(event) =>
                                    setAddTask({
                                        ...addTask,
                                        completed: event.target.value
                                    })
                                }
                            />

                            <button>Add Task</button>

                        </form>

                    </div>

                    <div className={styles.divAddTaskBtn}>



                    </div>

                </div>


                <div className={styles.items}>
                            
                    {toDoItems.map((task, index) => (

                        <div className={styles.taskDiv} key={index}>

                        {/* rendering 'Update' which is imported from 'Update Task' and sending props */}
                            {updateTask.i === index && updateTask.update ?
                                <Update data={
                                    {
                                        userId: task.userId,
                                        id: task.id,
                                        title: task.title,
                                        completed: task.completed
                                    }
                                }
                                    sendDataToParent={handleDataFromChild}
                                /> : null}

                            <div className={styles.taskInfo} >
                                <p>{"UserId = " + task.userId}</p>
                                <p>{"TaskId = " + task.id}</p>
                                <p>{"Task = " + task.title}</p>
                                <p>{"Completed = " + task.completed}</p>
                            </div>

                            <div className={styles.updationDeletion}>
                                <button onClick={() => handleUpdateBtn(task.id, index)} className={styles.updateTaskBtn}>Update Task</button>
                                <button onClick={() => handleDeleteBtn(task.id, index)} className={styles.deleteTaskBtn}>Delete Task</button>
                            </div>

                        </div>

                    ))}

                </div>

            </div>
        </>

    )

}

export default ToDoList;