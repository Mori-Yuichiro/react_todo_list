export const InputTodoArea = ({ text, onChangeText, onClickAdd }) => {
    return (
        <div>
            <input type="text" placeholder='TODOを入力してください' value={text} onChange={onChangeText} />
            <button onClick={onClickAdd}>送信</button>
        </div>
    );
}