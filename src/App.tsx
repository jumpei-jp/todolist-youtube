import React, { useState } from 'react';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState("");
  //空の配列に対してTodoしか入力できないようにする
  const [todos, setTodos] = useState<Todo[]>([]);

  type Todo = {
    inputValue: string;
    id: number;
    checked: boolean;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //inputの情報を取得
    setInputValue(e.target.value); //inputValueに格納
  }

  //作成ボタンを押した時
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); //リロードの回避

    //新しいTODOを作成
    const newTodo: Todo = {
      inputValue: inputValue, //useStateで保持している変数
      id: todos.length,
      checked: false, //新規作成時は完了されていないから
    };

    //既存のtodosに対して新しく追加されていく
    setTodos([newTodo, ...todos]);
    setInputValue("");
  };

  //追加されたTODOの編集
  const handleEdit = (id: number, inputValue: string) => {
    const newTodos = todos.map((todo) => {
      if(todo.id === id) {
        todo.inputValue = inputValue;
      }
      return todo;
    });

    setTodos(newTodos);
  };

  const handleChecked = (id: number, checked: boolean) => {
    const newTodos = todos.map((todo) => {
      if(todo.id === id) {
        todo.checked = !checked; //今のチェックの状態を反転させる
      }
      return todo;
    });

    setTodos(newTodos);
  }

  //削除ボタン
  const handleDelete = (id: number) => {
    //filterを使ってidと合致していないものだけ残す
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  }

  return (
    <div className="App">
      <div>
        <h2>TODOリスト with TypeScript</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input type="text" onChange={(e) => handleChange(e)} className="inputText"/>
          <input type="submit" value="作成" className='submitButton' />
        </form>
          <ul className="todoList">
            {todos.map((todo) => (
              <li key={todo.id}>
                <input
                  type="text"
                  onChange={(e) => handleEdit(todo.id, e.target.value)}
                  className="inputText"
                  value={todo.inputValue}
                  disabled={todo.checked}
                />
                <input
                  type="checkbox"
                  onChange={(e) => handleChecked(todo.id, todo.checked)}
                />
                <button onClick={() => handleDelete(todo.id)}>削除</button>
              </li>
            ))}
          </ul>
      </div>
    </div>
  );
}

export default App;
