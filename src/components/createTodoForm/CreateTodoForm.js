import {useState} from "react";
import {pushTodo} from "../../redux/actionCreators";
import {useDispatch} from "react-redux";


export default function CreateTodoForm(){
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();
    
    const handleSubmit = async (e) => {
        // e.preventDefault();

        if(!title || !description || isLoading) return;

        try {
            setIsLoading(true)
            await onTodoCreate(title, description);
            setTitle('')
            setDescription('')
        } catch (e) {
            console.log(e)
        } finally {
            setIsLoading(false)
        }
    }

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

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={title} onChange={({target: {value}}) => setTitle(value)} placeholder="todo title" />
            <br/>
            <br/>
            <input type="text" value={description} onChange={({target: {value}}) => setDescription(value)} placeholder="todo description" />
            <br/>
            <br/>
            <button type="submit" disabled={!title || !description || isLoading}>create todo</button>
        </form>
    )
}