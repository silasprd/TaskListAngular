import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from 'src/models/todo.model';

@Component({
  selector: 'app-root', //<app-root> seletor tag html (presente no index.html)
  templateUrl: './app.component.html', // template para chamar o arquivo html do componente
  styleUrls: ['./app.component.css'] // css de estilização do componente
})
export class AppComponent {
  public mode = 'list';
  public todos: Todo[] = []; // variável publica do tipo Todo(criada em todo.model) 
  public title: String = 'Minhas Tarefas';
  public form: FormGroup;

  //ctor = criar um método construtor, chamado sempre que iniciar a classe.
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.compose([
        Validators.minLength(3),
        Validators.maxLength(60),
        Validators.required,
      ])]
    });

    this.load();
    
  } 

  add () {
    const title = this.form.controls['title'].value;
    const id = this.todos.length + 1;
    this.todos.push(new Todo(id, title, false));
    this.save();
    this.clear();
  }

  clear() {
    this.form.reset();
  }

  remove(todo: Todo) {
    const index = this.todos.indexOf(todo);
    if (index !== -1){
      this.todos.splice(index, 1);
    }
    this.save();
  }

  markAsDone(todo: Todo) {
    todo.done = true;
    this.save();
  }

  markAsUndone(todo: Todo) {
    todo.done = false;
    this.save();
  }

  save() {
    const data = JSON.stringify(this.todos); //JSON.stringify transforma JSON em string
    localStorage.setItem('todos', data);
    this.mode = 'list';
  }

  load() {
    const data = localStorage.getItem('todos');
    if(data){
      this.todos = JSON.parse(data); //JSON.parse transforma string em JSON 
    } else {
      this.todos = [];
    }
  }

  changeMode(mode: string) {
    this.mode = mode;
  }

}

