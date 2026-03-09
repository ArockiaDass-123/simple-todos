import { Component } from 'react'
import TodoItem from '../TodoItem'
import './index.css'

class SimpleTodos extends Component {
  state = {
    todosList: [
      { id: 1, title: 'Book the ticket for today evening', completed: false },
      {
        id: 2,
        title: 'Rent the movie for tomorrow movie night',
        completed: false,
      },
      {
        id: 3,
        title: 'Confirm the slot for the yoga session tomorrow morning',
        completed: false,
      },
      { id: 4, title: 'Drop the parcel at Bloomingdale', completed: false },
      { id: 5, title: 'Order fruits on Big Basket', completed: false },
      { id: 6, title: 'Fix the production issue', completed: false },
      { id: 7, title: 'Confirm my slot for Saturday Night', completed: false },
      { id: 8, title: 'Get essentials for Sunday car wash', completed: false },
    ],
    newTodoTitle: '',
  }

  handleAddTodo = () => {
    const { newTodoTitle } = this.state
    if (newTodoTitle.trim() === '') return

    const parts = newTodoTitle.trim().split(' ')
    const lastPart = parts[parts.length - 1]
    const count = parseInt(lastPart)

    let titleToAdd = newTodoTitle
    let repeatCount = 1

    if (!isNaN(count) && parts.length > 1) {
      repeatCount = count
      titleToAdd = parts.slice(0, -1).join(' ')
    }

    this.setState(prevState => {
      const lastId =
        prevState.todosList.length > 0
          ? Math.max(...prevState.todosList.map(t => t.id))
          : 0

      const newTodos = []
      for (let i = 1; i <= repeatCount; i += 1) {
        newTodos.push({
          id: lastId + i,
          title: titleToAdd,
          completed: false,
        })
      }

      return {
        todosList: [...prevState.todosList, ...newTodos],
        newTodoTitle: '',
      }
    })
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  deleteTodo = id => {
    this.setState(prevState => ({
      todosList: prevState.todosList.filter(todo => todo.id !== id),
    }))
  }

  toggleComplete = id => {
    this.setState(prevState => ({
      todosList: prevState.todosList.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    }))
  }

  editTodo = (id, updatedTitle) => {
    this.setState(prevState => ({
      todosList: prevState.todosList.map(todo =>
        todo.id === id ? { ...todo, title: updatedTitle } : todo,
      ),
    }))
  }

  render() {
    const { todosList, newTodoTitle } = this.state
    return (
      <div className="container">
        <div className="inner-container">
          <h1 className="heading">Simple Todos</h1>
          <div className="add-todo">
            <input
              type="text"
              name="newTodoTitle"
              value={newTodoTitle}
              onChange={this.handleChange}
              placeholder="Enter todo title"
            />
            <button onClick={this.handleAddTodo} type="button">
              Add
            </button>
          </div>
          <ul className="todos-list">
            {todosList.map(todo => (
              <TodoItem
                key={todo.id}
                todoDetails={todo}
                deleteTodo={this.deleteTodo}
                toggleComplete={this.toggleComplete}
                editTodo={this.editTodo}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default SimpleTodos