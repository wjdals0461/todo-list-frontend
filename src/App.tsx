import React, { FC, ChangeEvent, useState } from "react";
import "./App.css";
import TodoTask from "./Components/TodoTask";
import { ITask } from "./Interfaces";

const App: FC = () => {
  const [task, setTask] = useState<string>("");
  const [deadline, setDeadline] = useState<number>(0);
  const [todoList, setTodoList] = useState<ITask[]>([]);

  const taskChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setTask(event.target.value);
  };

  const deadlineChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setDeadline(Number(event.target.value));
  };

  const addTask = (): void => {
    const newTask = { taskName: task, deadline: deadline } as ITask;
    const tasks = [...todoList, newTask];
    setTodoList(tasks);
    setTask("");
    setDeadline(0);
  };

  const completeTask = (taskNameToDelete: string): void => {
    setTodoList(
        todoList.filter((task) => {
          return task.taskName != taskNameToDelete;
        })
    );
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