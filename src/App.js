import './App.css';
import Todos from "./components/todos/Todos";
import CreateTodoForm from "./components/createTodoForm/CreateTodoForm";

function App() {

  return (
      <div className="App">
        <CreateTodoForm />
        <Todos />
      </div>
  );
}

export default App;