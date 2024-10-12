import { Component, TemplateRef } from '@angular/core';
import { Todo } from '../class/todo';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})
export class TodoComponent {
  todoValue: String = ''
  index: number = 0
  type: String = ''
  modal:boolean = false
  todoList:Todo[]=[
    {
      content: "Todo 1",
      value: false
    },
    {
      content: "Todo 2",
      value: false
    },
    {
      content: "Todo 3",
      value: false
    },
    {
      content: "Todo 4",
      value: false
    },
  ]
  finishedList:Todo[]=[]
  constructor(private dialog: MatDialog){}
  changeTodo(i:number){
    const todoItem = this.todoList.splice(i,1);
    console.log(todoItem);

    this.finishedList.push(todoItem[0])
  }
  addTodo=()=>{
    this.todoList.push(
      {
        content:this.todoValue,
        value: false
      }
    )
    this.todoValue = ''
  }
  changeFinished = (i:number) =>{
    const finished = this.finishedList.splice(i,1);
    this.todoList.push(finished[0])
  }
  openModal(templateRef: TemplateRef<Element>, i:number, type:String) {
    this.dialog.open(templateRef);
    this.index = i
    this.type = type
  }

  onConfirm() {
    console.log('Confirmed => ' + this.index + this.type);
    if(this.type === 'todoList') this.todoList.splice(this.index,1);
    else this.finishedList.splice(this.index,1)
    this.dialog.closeAll();
  }

  onCancel() {
    console.log('Canceled');
    this.dialog.closeAll();
  }
}
