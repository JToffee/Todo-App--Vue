
import todos from "../data/todos.js"

class Todo{
constructor(todoValue, checked = null){
    this.id = (Math.trunc(Math.random() + new Date(Date.now()).getTime())).toString()
    this.todoValue = todoValue
    this.checked = checked
}

 static statisave(){
    todos.push(this)

}

static delete(id){
    const index = todos.findIndex(todo => todo.id === id)

    todos.slice(index, 1);

    console.log(todos)
}
}

export default Todo