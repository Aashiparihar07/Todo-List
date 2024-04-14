import React,{useEffect, useState} from 'react';
import './App.css';
import {AiOutlineDelete} from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";

function App() {
  const [isCompleteScreen,setIsCompleteScreen]=useState(false);
  const [allTodos,setTodos]=useState([]);
  const[newTitle,setNewTitle]=useState("");
  const[newDescription,setNewDescription]=useState("");
  const[completedTodos,setCompletedTodos]=useState([]);

  const handleAddTodos=()=>
  {
    let newTodoItem={
      title:newTitle,
      description:newDescription
    }

    let updateTodoArr=[...allTodos];
    updateTodoArr.push(newTodoItem);
    setTodos(updateTodoArr);
    localStorage.setItem('todolist',JSON.stringify(updateTodoArr))
    
  };

  const handleDeleteTodo=(index)=>
  {
    let reducedTodo=[...allTodos];
    reducedTodo.splice(index);

    localStorage.setItem('todolist',JSON.stringify(reducedTodo));
    setTodos(reducedTodo);
  }

  const handleComplete=(index)=>
  {
    let now=new Date();
    let dd=now.getDate();
    let mm=now.getMonth();
    let yyyy=now.getFullYear();
    let h=now.getHours();
    let m=now.getMinutes();
    let s=now.getSeconds();

    let completedOn=dd+'-' +mm+'-'+yyyy+ ' at '+h +':'+m+':'+ s;

    let filteredItem=
    {
      ...allTodos[index],
      completedOn:completedOn
    }

    let updateCompletedArr=[...completedTodos];
    updateCompletedArr.push(filteredItem);
    setCompletedTodos(updateCompletedArr);
    handleDeleteTodo(index);
    localStorage.setItem('completedtodos',JSON.stringify(updateCompletedArr));
  }
  useEffect(()=>{
  let savedTodo=JSON.parse(localStorage.getItem('todolist'));
  let savedCompleted=JSON.parse(localStorage.getItem('completedtodos'))
  if(savedTodo)
    {
      setTodos(savedTodo);
    }

  if(savedCompleted)
  {
    setCompletedTodos(savedCompleted);
  }
},[])

  return (
    <div className="App">
      <h1 >DoDoodler</h1>
      <div className='todo-wrapper'>
        <div className='todo-input'>
          <div className='todo-input-item'>
          <label>Title</label>
          <input type='text' value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} placeholder="What's the task Title?"></input>
          </div>
          <div className='todo-input-item'>
            <label>Description</label>
            <input type='text' value={newDescription} onChange={(e)=>setNewDescription(e.target.value)} placeholder="What's the task Description?"></input>
            </div>
            <div className='todo-input-item'>
          <button type='button' onClick={handleAddTodos} className='primaryButton'>Add</button>
          </div>
        </div>
        
        <div className='buttonArea'>

        <button className={`secondaryButton ${isCompleteScreen===false && 'active'}`} onClick={()=>setIsCompleteScreen(false)}>Todo</button>
        <button className={`secondaryButton ${isCompleteScreen===true && 'active'}`}  onClick={()=>setIsCompleteScreen(true)}>Completed</button>
        </div>

      <div className='todo-List'>
      {isCompleteScreen===false && allTodos.map((item,index)=>{
        return(
          <div className='todo-list-item' key={index}>
          <div>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        
        </div>
        <div>
          <AiOutlineDelete className='icon' onClick={()=>handleDeleteTodo(index)}/>
          <BsCheckLg className='check-icon' onClick={()=> handleComplete(index)} title="Complete"/>
        </div>
      </div>
        )
      })}

{isCompleteScreen===true && completedTodos.map((item,index)=>{
        return(
          <div className='todo-list-item' key={index}>
          <div>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <p><small>Completed On:{item.completedOn}</small></p>
        
        </div>
        <div>
          <AiOutlineDelete className='icon' onClick={()=>handleDeleteTodo(index)}/>
        </div>
      </div>
        )
      })}

      </div>
        </div>
        </div>
  );
}

export default App;
