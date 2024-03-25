// import { useState } from 'react';

import { InputTodoArea } from './components/InputTodoArea';
import { useHooks } from './hooks/hooks'
import './App.css';

function App() {
  const {
    todoItems,
    text,
    editTodoText,
    onChangeText,
    onChangeTodoText,
    onClickAdd,
    onClickEditForm,
    editTodo,
    onClickDelete,
    onChangeCheck
  } = useHooks();
  const allCount = todoItems.length;
  const completeCount = todoItems.filter(item => item.checked).length
  const incompleteCount = allCount - completeCount;

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
