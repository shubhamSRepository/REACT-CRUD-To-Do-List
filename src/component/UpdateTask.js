import { useState } from "react";
import styles from './ToDoList.module.css';

function Update({ data, sendDataToParent }) {

    const [taskUpdated, setTaskUpdated] = useState({ "userId": data.userId, "id": data.id, "title": data.title, "completed": data.completed });


    function handleUpdateBtn(e) {
        e.preventDefault();

        sendDataToParent(taskUpdated);
    }


    function handleCancelBtn(e) {
        e.preventDefault();

        sendDataToParent();
    }


    
    return (
        <form className={styles.formUpdateTask}>

            <input
                placeholder="user Id"
                defaultValue={data.userId}
                onChange={(event) =>
                    setTaskUpdated({
                        ...taskUpdated,
                        userId: event.target.value
                    })
                }
            />
            <input
                placeholder="id"
                defaultValue={data.id}
                onChange={(event) =>
                    setTaskUpdated({
                        ...taskUpdated,
                        id: event.target.value
                    })
                }
            />
            <input
                placeholder="title"
                defaultValue={data.title}
                onChange={(event) =>
                    setTaskUpdated({
                        ...taskUpdated,
                        title: event.target.value
                    })
                }
            />
            <input
                placeholder="completed"
                defaultValue={data.completed}
                onChange={(event) =>
                    setTaskUpdated({
                        ...taskUpdated,
                        completed: event.target.value
                    })
                }
            />



            <button className={styles.updateBtn2} onClick={handleUpdateBtn}>Update</button>
            <button className={styles.cancelBtn} onClick={handleCancelBtn}> Cancel</button>

        </form>


    )
}

export default Update;