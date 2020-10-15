import React from 'react';
import classes from './trelloTask.css';
import Button from '../UI/Button/Button';
import { AiFillEdit, AiOutlineCheck } from 'react-icons/ai';
import { FaRedo, FaRegTrashAlt } from 'react-icons/fa';

const trelloTask = ({ trelloItem, switchTodo, removeTodo, editTodo }) => {
    return (
        <li className={[classes.TrelloTask, 'd-block d-md-flex justify-content-between align-items-center mt-2 p-2'].join(" ")}>
            <span><p className="mb-0">{trelloItem.todo}</p><p className={[classes.TrelloDateAndTime, "text-muted mb-0"].join(" ")}>Added: {trelloItem.date} - {trelloItem.time}</p></span>
            <span className="d-flex justify-content-md-end">
                {trelloItem.completed ? 
                    <Button clicked={() => switchTodo(trelloItem.id, trelloItem.completed)}>
                        <abbr title="Redo (This will add item back to the to do items)"><FaRedo className={classes.RedoIcon}/></abbr>
                    </Button> : 
                    <Button clicked={() => editTodo(trelloItem.id, trelloItem.todo)}>
                        <abbr title="Edit Todo"><AiFillEdit className={classes.EditIcon}/></abbr>
                    </Button>
                }
                {!trelloItem.completed && 
                <Button clicked={() => switchTodo(trelloItem.id, trelloItem.completed)}>
                    <abbr title="Completed Todo (This is will be added to the done list)"><AiOutlineCheck className={classes.CompletedIcon}/></abbr>
                </Button>}
                <Button clicked={() => removeTodo(trelloItem.id)}>
                    <abbr title="Delete Todo"><FaRegTrashAlt className={classes.RemoveIcon}/></abbr>
                </Button>
            </span>
        </li>
    );
}

export default trelloTask;