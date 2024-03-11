

import React, { Component } from 'react'
import './App.css'
import {v4 as uuidv4} from 'uuid'

 class App extends Component {

  state = {todoList:[],text:''}

  onChangeInput = (event)=>{
    this.setState({
      text: event.target.value
    })
  }

  onClickAddButton =()=>{

    const {text,todoList} = this.state
    const endsWithNumber = /\d$/.test(text);
    console.log("ends with number",endsWithNumber)
    const numberOfTimes = endsWithNumber ? parseInt(text.match(/\d+$/)[0]) : 1;
    console.log('number of times',numberOfTimes)
    const extractedString = text.replace(/\d+$/, '');
    console.log("string=",extractedString)
    const newTodoList = []
    if (extractedString !== ''){
    for (let i=0;i<numberOfTimes;i++){
      console.log('i=',i)
      const newTodo = {
        id:uuidv4(),
        title:extractedString,
        updateCount:0,
        edit:false
      }
      newTodoList.push(newTodo)
      console.log('new todo',newTodo)
      
    }

    this.setState({
      todoList: [...todoList,...newTodoList],
      text:''
    })
     
  }
  }

  onClickDelete =(event)=>{
    
    const {target} = event
    const targetId = target.id
    const {todoList} = this.state
    const filteredList = todoList.filter(each=>{
      const {id} = each
      if (id !== targetId){
        return true
      }
      return false
    })
    this.setState({
      todoList: filteredList
    })
  }

  onClickEdit =(event)=>{
    const {target} =event
    const targetId = target.id
    const {todoList} = this.state
    console.log('target id from eidt',targetId)
    const updatedTodoList = todoList.map(each=>{
      const {id,edit} = each
      if (targetId===id){
        return {...each,edit:!edit}
      }
      return each
    })
    console.log("update todolist",updatedTodoList)
    this.setState({
      todoList: updatedTodoList
    })
  }


  onChangeTodoTitle =(event)=>{
    const {todoList} = this.state
    const {target} = event
    const targetId = target.id
    let item = todoList.filter(each=>each.id === targetId)
    console.log('item =',item)
     const eventValue = event.target.value
     this.setState({
      todoList: todoList.map(each=>{
        const UpdateCout = each.updateCount+1
        if (each.id === targetId){
          return {...each,title:eventValue,updateCount:UpdateCout}
        }
        return each



      })
     })

  }

  render() {
    const {text,todoList} = this.state
    
    return (
      <>
      <div className='bg-container'>
          <div className='main-container'>
              <h1 className='heading'>Day Goals!</h1>
              <input type='text' placeholder='Add a Todo' className='input-element' onChange={this.onChangeInput} value={text}/>
              <br/>
              <div>
                <button type='button' className='add-todo-button' onClick={this.onClickAddButton} >Add Todo</button>
              </div>
              <ul>
                {todoList.map(each=>{
                  const {title,edit} = each
                  return <li key={each.id} className='list-item'>
                    
                   {edit ? <input className='input-element' type='text' value={title} id={each.id} onChange={this.onChangeTodoTitle}/> :<p> {title} {`(Updated ${each.updateCount} Times)`}</p>}
                   <div className='delete-edit-container'>
                    <p className='edit' onClick={this.onClickEdit} id={each.id}>!</p>
                   <img src='https://res.cloudinary.com/dvvhafkyv/image/upload/v1706322185/Solidcroos-symbol_sfl0wy.png'
                    alt='delete'
                    className='delete-img'
                    onClick={this.onClickDelete}
                    id={each.id}
                    />
                    </div>
                    
                    </li>
                })}
              </ul>
          </div>
      </div>
      
      
      </>
    )
  }
}

export default App