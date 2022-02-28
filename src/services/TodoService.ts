import { ITask } from "../Interfaces";

export function getTodos() {
    return fetch("http://localhost:8080/api/todos").then((data) => data.json());
}

export function addTodo(todo: ITask) {
    return fetch("http://localhost:8080/api/todos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
    }).then((data) => data.json());
}

export function deleteTodo(id: string) {
    return fetch(`http://localhost:8080/api/todos/${id}`, {
        method: "DELETE",
    });
}