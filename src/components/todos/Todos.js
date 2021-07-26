import React, {Fragment, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addTodos, setLoadingFalse, setLoadingTrue, deleteTodo} from "../../redux/actionCreators";

export default function Todos(){

    const { todos, todosLoading } = useSelector(store => store.todosReducer);
    const dispatch = useDispatch();

    const fetchTodos = async () => {
        try {
            dispatch(setLoadingTrue())
            const resp = await fetch('http://localhost:8888/get-todos');
            const data = await resp.json();

            dispatch(addTodos(data))
        } catch(e) {
            console.log(e)
        } finally {
            dispatch(setLoadingFalse())
        }
    }

    useEffect(() => {
        fetchTodos();
    }, [])

    const onTodoDelete = async(id) => {
        console.log(id);
        const resp = await fetch(`http://localhost:8888/delete-todo/${id}`, {
            method: 'DELETE'
        })
        const data = await resp.json();

        dispatch(deleteTodo(data))
    }

    if(todosLoading) return <h1>LOADING...</h1>

    return (
        <div>
            {todos.map(todo => (
                <Fragment key={todo.id}>
                    <div>{todo.title}</div>
                    <div>{todo.description}</div>
                    <div>Created At: {new Date(todo.createdAt).toDateString()}</div>
                    <div>Status {todo.completed.toString()}</div>
                    <button onClick={() => {onTodoDelete(todo.id)}}>DELETE</button>
                    <hr/>
                </Fragment>
            ))}
        </div>
    )
}
