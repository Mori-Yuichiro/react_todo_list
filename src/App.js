import { useState } from 'react';

import { InputTodoArea } from './components/InputTodoArea';
import './App.css';

function App() {
  const [todoItems, setTodoItems] = useState([]);
  const [incompleteCount, setIncompleteCount] = useState(0);
  const [completeCount, setCompleteCount] = useState(0);
  const [text, setText] = useState('');
  const [editTodoText, setEditTodoText] = useState('');

  const onChangeText = (event) => setText(event.target.value);

  const onChangeTodoText = (event) => setEditTodoText(event.target.value);

  const onClickAdd = () => {
    const newTodoItems = [...todoItems];
    const addTodoItem = {
      text,
      edited: false,
      checked: false
    };
    setTodoItems([...newTodoItems, addTodoItem]);
    setText('');
    setIncompleteCount(incompleteCount + 1);
  };

  const onClickEditForm = (index) => {
    const todoTemp = [...todoItems];
    const editTodoItem = todoItems[index];
    editTodoItem.edited = true;
    todoTemp[index] = editTodoItem;
    setEditTodoText(editTodoItem.text);
    setTodoItems(todoTemp);
  };

  const editTodo = (index) => {
    const todoTemp = [...todoItems];
    todoTemp[index].text = editTodoText;
    todoTemp[index].edited = false;

    setEditTodoText('');
    setTodoItems(todoTemp);
  }

  const onClickDelete = index => {
    if (window.confirm('本当に削除してもよろしいでしょうか?')) {
      const todoTemp = [...todoItems];
      const deleteTodo = todoItems[index];
      if (deleteTodo.checked) {
        setCompleteCount(completeCount - 1);
      } else {
        setIncompleteCount(incompleteCount - 1);
      }
      todoTemp.splice(index, 1);
      setTodoItems(todoTemp);
    }
  }

  const onChangeCheck = (index) => {
    const todoTemp = [...todoItems];
    const checkedTodoItem = todoItems[index];
    checkedTodoItem.checked = !checkedTodoItem.checked;
    todoTemp[index] = checkedTodoItem;
    setTodoItems(todoTemp);

    // 表示するタスクの数を変更
    if (checkedTodoItem.checked) {
      setIncompleteCount(incompleteCount - 1);
      setCompleteCount(completeCount + 1);
    } else {
      setIncompleteCount(incompleteCount + 1);
      setCompleteCount(completeCount - 1);
    }
  }

  return (
    <>
      <InputTodoArea
        text={text}
        onChangeText={onChangeText}
        onClickAdd={onClickAdd}
      />
      <div className="todo-area">
        <ul>
          {todoItems.map((todo, index) => {
            if (todo.edited) {
              return (
                <div key={index}>
                  <li className={index}>
                    <input type='text' defaultValue={editTodoText} onChange={onChangeTodoText} />
                    <button onClick={() => editTodo(index)}>保存</button>
                  </li>
                </div>
              )
            } else {
              return (
                <div key={index}>
                  <li className={index}>
                    <input type='checkbox' checked={todo.checked} onChange={() => onChangeCheck(index)} />
                    {todo.text}
                    <button onClick={() => onClickEditForm(index)}>編集</button>
                    <button onClick={() => onClickDelete(index)}>削除</button>
                  </li>
                </div>
              )
            }
          })}
        </ul>
      </div>
      <p>全てのタスク: {todoItems.length} 完了済み: {completeCount} 未完了: {incompleteCount}</p>
    </>
  );
}

export default App;
