import Layout from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { withSessionSsr } from "../lib/session";

export const getServerSideProps = withSessionSsr(
    async function getServerSideProps({ req }) {
        const user = req.session.user;
        let todos = [];
        let error = "";

        // Not a good practice to send auth tokens without https, but this is only meant as a local project 
        const res = await fetch("http://0.0.0.0:8000/api/todos/",
            {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + user.token.access
                }
            })

        if (res.ok) {
            todos = await res.json();
        } else {
            error = res.status + " " + res.statusText;
        }

        return {
            props: {
                user: req.session.user,
                todos: todos,
                errorMessage: error
            },
        };
    }
)

export default function Todos({ user, todos, errorMessage }) {

    return (
        <Layout>

            <section><p>Welcome {user.name}! <a href="/api/logout">Logout</a></p></section>

            <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
                <h2 className={utilStyles.headingLg}>Todos</h2>

                <span>{errorMessage}</span>

                <ul>{todos.map((todo) =>
                    <Todo item={todo} />
                )}</ul>


            </section>

        </Layout>
    );
}

export function Todo({ item }) {

    function toggleTodo() {
        console.log(item.id);
    };

    function editTodo() {
        console.log(item.id);
    };

    function deleteTodo() {
        console.log(item.id);
    };

    return (
        <li key={item.id}>
            <input type="checkbox" value={item.is_done} onClick={toggleTodo}></input>
            {item.text} {' '}
            <a onClick={editTodo}>Edit</a> {' '}
            <a onClick={deleteTodo}>Delete</a>
        </li>
    );

}
