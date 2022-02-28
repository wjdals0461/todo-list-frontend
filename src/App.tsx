import React, { FC, ChangeEvent, useState, useEffect } from "react";
import "./App.css";
import TodoTask from "./Components/TodoTask";
import { ITask } from "./Interfaces";
import { addTodo, deleteTodo, getTodos } from "./services/TodoService";

const App: FC = () => {
  const [task, setTask] = useState<string>("");
  const [deadline, setDeadline] = useState<number>(0);
  const [todoList, setTodoList] = useState<ITask[]>([]);

  useEffect(() => {
    getTodos().then((items) => {
      setTodoList(items);
    });
  }, []);
  const taskChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setTask(event.target.value);
  };

  const deadlineChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setDeadline(Number(event.target.value));
  };

  const addTask = (): void => {
    const newTask = { taskName: task, deadline: deadline } as ITask;
    addTodo(newTask).then(() => {
      getTodos().then((todos) => {
        setTodoList(todos);
        setTask("");
        setDeadline(0);
      });
    });
  };

  const completeTask = (id?: string): void => {
    if (id == null) {
      return;
    }
    deleteTodo(id).then(() => {
      getTodos().then((todos) => setTodoList(todos));
    });
  };
  return (
      <div className="App">
        <div className="header">
          <div className="inputContainer">
            <input
                type="text"
                placeholder="Task..."
                name="task"
                value={task}
                onChange={taskChange}
            />
            <input
                type="number"
                placeholder="Deadline (in Days)..."
                name="deadline"
                value={deadline}
                onChange={deadlineChange}
            />
          </div>
          <button onClick={addTask}>Add Task</button>
        </div>
        <div className="todoList">
          {todoList.map((task: ITask, key: number) => {
            return <TodoTask key={key} task={task} completeTask={completeTask} />;
          })}
        </div>
      </div>
  );
};

export default App;