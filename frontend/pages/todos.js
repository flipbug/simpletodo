import Layout from "../components/layout";
import LogoutButton from "../components/logoutButton";
import { useState } from 'react';
import utilStyles from "../styles/utils.module.css";
import callUrl from "../lib/callUrl";
import useSWR, { SWRConfig } from 'swr'


export default function Todos() {

    const { data: user, userError } = useSWR('/api/user');
    const { data: todos, todoError  } = useSWR('/api/todos');

    if (userError) return `Error UserApi: ${userError}`;
    if (todoError) return `Error TodoApi: ${todoError}`;
    if (!user || !todos) return <Layout>"Loading..."</Layout>;
  
    return (
        <Layout>

            <section><p>Welcome {user.name}! <LogoutButton /></p></section>

            <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
                <h2 className={utilStyles.headingLg}>Todos</h2>

                <ul>{todos.map((todo) =>
                    <li key={todo.id}>
                        <Todo item={todo} user={user} />
                    </li>
                )}</ul>


            </section>

        </Layout>
    );
}

export function Todo({ item, user }) {
    const [todoText, setTodoText] = useState(item.text);
    const [editMode, setEditMode] = useState(false);

    async function toggleTodo(event) {
        console.log(event);

        // Work in progress
        const { result, error } = await callUrl(
            `http://backend:8000/api/todos/${item.id}`,
            "PUT",
            user.token.access,
            {
                id: item.id,
                text: item.text,
                is_done: event.target.value
            });
    };

    function editTodo() {
        setEditMode(true);
    };

    function deleteTodo() {
        console.log(item.id);
    };

    if (editMode) {
        return (
            <>
                <TodoForm item={item} user={user} />{' '}
                <a onClick={deleteTodo}>Delete</a>
            </>
        );

    }

    return (
        <>
            <input type="checkbox" value={item.is_done} onClick={toggleTodo}></input>
            {todoText} {' '}
            <a onClick={editTodo}>Edit</a> {' '}
            <a onClick={deleteTodo}>Delete</a>
        </>
    );
}

export function TodoForm({ item, user }) {
    const [todoText, setTodoText] = useState(item.text);
    const [editMode, setEditMode] = useState(false);

    function toggleTodo() {
        console.log(item.id);
    };


    function handleSubmit(event) {
        setEditMode(false);
        console.log(event.target.is_done.value);
        console.log(item.text);
    };

    function handleChange(event) {
        setTodoText(event.target.value);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="checkbox" name="is_done" value={item.is_done} onClick={toggleTodo}></input>
            <input type="text" name="text" value={todoText} onChange={handleChange} ></input>
            <input type="submit" value="Save" ></input> {' '}
        </form>
    );

}
