import './App.css';
import Todos from "./components/todos/Todos";
import CreateTodoForm from "./components/createTodoForm/CreateTodoForm";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {
  setLoadingFalse,
  setLoadingTrue,
  addTodos,
  pushTodo,
} from "./redux/actionCreators";

function App() {
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

  const onTodoCreate = async (title, description) => {
    if(!title || !description) return;

    console.log(JSON.stringify({title, description}))

    const resp = await fetch('http://localhost:8888/create-todo', {
      method: 'POST',
      body: JSON.stringify({title, description}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await resp.json();

    dispatch(pushTodo(data))
  }

  const onTodoDelete = async(id) => {
    console.log(id);
    const resp = await fetch(`http://localhost:8888/delete-todo/${id}`, {
      method: 'DELETE'
    })
    const data = await resp.json();

    dispatch({type: 'DELETE_TODO', payload: data})
  }

  return (
      <div className="App">
        <CreateTodoForm onSubmit={onTodoCreate} />
        <Todos todos={todos} isLoading={todosLoading} onTodoDelete={onTodoDelete} />
      </div>
  );
}

export default App;