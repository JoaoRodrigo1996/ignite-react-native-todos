import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

interface TaskData {
  id: number;
  title: string;
  done: boolean;
}

export function Home() {
  const [tasks, setTasks] = useState<TaskData[]>([]);
  const [newTask, setNewTark] = useState("");

  function handleAddTask(newTaskTitle: string) {
    const task = tasks.find((item) => item.title === newTaskTitle);

    if (task) {
      return Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome"
      );
    }

    const data = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    };

    setTasks((state) => [...state, data]);
  }

  function handleToggleTaskDone(id: number) {
    //TODO - toggle task done if exists
    const updatedTask = tasks.map((task) => ({ ...task }));

    const findTask = updatedTask.find((item) => item.id === id);

    if (!findTask) {
      return;
    }

    findTask.done = !findTask.done;
    setTasks(updatedTask);
  }

  function handleRemoveTask(id: number) {
    //TODO - remove task from state
    return Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Não",
        },
        {
          text: "Sim",
          onPress: () =>
            setTasks((state) => state.filter((task) => task.id !== id)),
        },
      ]
    );
  }

  function handleEditTask(id: number, title: string) {
    const editedTask = tasks.map((task) => ({ ...task }));

    const findTask = editedTask.find((item) => item.id === id);

    if (!findTask) {
      return;
    }

    findTask.title = title;

    setTasks(editedTask);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
