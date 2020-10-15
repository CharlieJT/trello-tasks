import React, { Component } from 'react';
import TrelloTask from '../../components/trelloTask/trelloTask';
import { Container, Row, Col } from 'react-bootstrap';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './TrelloTasks.css';
import TrelloBoard from '../../hoc/TrelloBoard/TrelloBoard';
import Modal from '../../components/UI/Modal/Modal';
import { FaTimesCircle } from 'react-icons/fa';
import { timeConverter, dateShortHandConverter } from '../../Helpers/Converters';

class TrelloTasks extends Component {

    constructor() {
        super();
        this.state = {
            trelloItems: [],
            inputTodoValue: '',
            modalState: false,
            editStateValue: '',
            editStateItem: {}
        }
        this.inputRef = React.createRef();
        this.editInputRef = React.createRef();
    }

    componentDidMount = () => {
        this.inputRef.current.focus();
        if (localStorage.getItem("todoList")) {
            let storedTodos = JSON.parse(localStorage.getItem("todoList"));
            this.setState({ trelloItems: storedTodos });
        }
    }

    inputChangedHandler = (event) => {
        const inputText = event.target.value;
        this.setState({ inputTodoValue: inputText });
    }

    editInputChangedHandler = (event) => {
        const inputText = event.target.value;
        this.setState({ editStateValue: inputText });
    }

    editTodoHandler = e => {
        e.preventDefault();
        const trelloItemsState = [...this.state.trelloItems];
        const trelloEditItem = trelloItemsState.find(trelloItem => trelloItem.id === this.state.editStateItem.id);
        trelloEditItem.todo = this.state.editStateValue;
        localStorage.setItem("todoList", JSON.stringify(this.state.trelloItems));
        this.modalClosedHandler();
    }

    addTrelloItemHandler = e => {
        e.preventDefault();
        const inputValueState = this.state.inputTodoValue;
        const trelloItemsState = [...this.state.trelloItems];
        const d = new Date();
        trelloItemsState.push({
            id: Math.random() * 10000,
            todo: inputValueState,
            completed: false,
            date: dateShortHandConverter(d),
            time: timeConverter(d)
        });
        localStorage.setItem("todoList", JSON.stringify(trelloItemsState));
        this.setState({ trelloItems: trelloItemsState, inputTodoValue: '' });
    }

    removeTrelloItemHandler = id => {
        const trelloState = [...this.state.trelloItems];
        const updatedTrelloList = trelloState.filter(trelloItem => trelloItem.id !== id);
        this.setState({ trelloItems: updatedTrelloList });
        localStorage.setItem("todoList", JSON.stringify(updatedTrelloList));
    }

    editTrelloItemHandler = (id, todoText) => {
        const trelloState = [...this.state.trelloItems];
        const trelloItem = trelloState.filter(trelloItem => trelloItem.id === id);
        this.setState({ modalState: true, editStateValue: todoText, editStateItem: trelloItem[0] });
        this.editInputRef.current.focus();
    }

    switchCompleteStateHandler = (id, switchState) => {
        const trelloState = [...this.state.trelloItems];
        const trelloItem = trelloState.filter(trelloItem => trelloItem.id === id);
        const updatedTrelloItem = trelloState.filter(trelloItem => trelloItem.id !== id);
        trelloItem[0].completed = !switchState;
        const newTrelloList = updatedTrelloItem.concat(trelloItem[0]);
        this.setState({ trelloItems: newTrelloList });
        localStorage.setItem("todoList", JSON.stringify(newTrelloList));
    } 

    modalClosedHandler = () => this.setState({ modalState: false });

    render() {

        const TrelloItems = ({trelloCompletedState, heading, trelloItems}) => {
            return (
                <Col xs={12} md={6}>
                    {trelloItems.filter(trelloItem => trelloItem.completed === trelloCompletedState).length ?
                    <TrelloBoard heading={heading}>
                        <ul className="p-3">
                            {trelloItems.map(trelloItem => {
                                return (
                                    trelloItem.completed === trelloCompletedState ?
                                    <TrelloTask 
                                        key={trelloItem.id}
                                        trelloItem={trelloItem}
                                        switchTodo={this.switchCompleteStateHandler}
                                        removeTodo={this.removeTrelloItemHandler}
                                        editTodo={this.editTrelloItemHandler}/> : null
                                );
                            })}
                        </ul>
                    </TrelloBoard> : null}
                </Col>
            );
        }

        return (
            <Container fluid={true}>
                <Modal show={this.state.modalState} modalClose={this.modalClosedHandler}>
                    <form onSubmit={this.editTodoHandler} className={[classes.EditInputForm, "position-relative"].join(" ")}>
                        <Input 
                            elementType='input' 
                            changed={this.editInputChangedHandler} 
                            value={this.state.editStateValue}
                            elementConfig={{placeholder: "Edit Todo"}}
                            inputRef={this.editInputRef}
                        />
                        <Button btnType="Edit" disabled={!this.state.editStateValue || /^\s*$/.test(this.state.editStateValue)} clicked={this.editTodoHandler}>Edit Todo</Button>
                        <FaTimesCircle className={[classes.CloseModalIcon, "position-absolute"].join(" ")} onClick={this.modalClosedHandler}/>
                    </form>
                </Modal>
                <Row>
                    <Col>
                        <h2 className={[classes.OpeningStatement, "my-3"].join(" ")}>What are your plans for today?</h2>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <form onSubmit={this.addTrelloItemHandler} className={classes.InputForm}>
                            <Input 
                                elementType='input' 
                                changed={this.inputChangedHandler} 
                                value={this.state.inputTodoValue}
                                elementConfig={{placeholder: "Add a Todo"}}
                                inputRef={this.inputRef}
                            />
                            <Button btnType="Add" disabled={!this.state.inputTodoValue || /^\s*$/.test(this.state.inputTodoValue)} clicked={this.addTrelloItemHandler}>Add Todo</Button>
                        </form>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <TrelloItems
                        heading="To Do Items"
                        trelloItems={this.state.trelloItems}
                        trelloCompletedState={false}/>
                    <TrelloItems
                        heading="Done"
                        trelloItems={this.state.trelloItems}
                        trelloCompletedState={true}/>
                </Row>
            </Container>
        );
    };
}

export default TrelloTasks;