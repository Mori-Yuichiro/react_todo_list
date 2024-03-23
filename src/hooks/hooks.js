import { useState } from 'react';

export const useHooks = () => {
    const [todoItems, setTodoItems] = useState([]);
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
    }

    return {
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
    };
}