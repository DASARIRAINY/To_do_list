window.addEventListener('load',()=>{

    const task_form= document.getElementById("new-task-form");
    const input_task = document.getElementById("new-task-input");
    const add_task= document.getElementById("new-task-submit");
    const tasks= document.getElementById("tasks");
    const completed_tasks= document.getElementById("completed-tasks")
    let completedTodos=[];
    //document.addEventListener('DOMContentLoaded', getTodos);

    // to render the local storage data
    getTodos();
    function getTodos(){

        let todos;
    //for completed Todos
    let completedTodos;
    //check if we already have todos
    if (localStorage.getItem('todos') === null) {
        //if no create one
        todos = [];
    } else {
        //if yes get them
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    //check if we already have completed todos
    if (localStorage.getItem('completedTodos') === null) {
        //if no create one
        completedTodos = [];
    } else {
        //if yes get them
        completedTodos = JSON.parse(localStorage.getItem('completedTodos'));
    }

    todos.forEach((todo,index)=>{
        const new_task = document.createElement("div");
        new_task.classList.add("task");

        const new_content= document.createElement("div");
        new_content.classList.add("content");

        const new_input= document.createElement("input");
        new_input.classList.add("text");
        new_input.type="text";
        new_input.value=todo;
        new_input.setAttribute('readonly','readonly');

        const new_actions= document.createElement("div");
        new_actions.classList.add("actions");

        const edit_btn= document.createElement("button");
        edit_btn.classList.add("edit");
        edit_btn.innerText="Edit";

        const delete_btn= document.createElement("button");
        delete_btn.classList.add("delete");
        delete_btn.innerText="Delete";

        new_actions.appendChild(edit_btn);
        new_actions.appendChild(delete_btn);

        new_content.appendChild(new_input);
        new_task.appendChild(new_content);
        new_task.appendChild(new_actions);
        tasks.appendChild(new_task);

        input_task.value="";

        edit_btn.addEventListener('click',()=>{
            if(edit_btn.innerText.toLowerCase()=="edit")
            {
                edit_btn.innerText="Save";
                new_input.removeAttribute("readonly");
                new_input.focus();
            }
            else{
                todos.splice(todos.indexOf(todo), 1,new_input.value);
                localStorage.setItem('todos', JSON.stringify(todos));
                edit_btn.innerText="Edit";
                new_input.setAttribute('readonly','readonly');
            }
        })

        delete_btn.addEventListener('click',()=>{

            const new_task1 = document.createElement("div");
            new_task1.classList.add("task");
           // displaying completed todo
            const new_content1= document.createElement("div");
            new_content1.classList.add("content");
    
            const new_input1= document.createElement("input");
            new_input1.classList.add("text");
            new_input1.type="text";
            new_input1.value=todo;
            new_input1.setAttribute('readonly','readonly');
    
            const new_actions1= document.createElement("div");
            new_actions1.classList.add("actions");
    
            
    
            const delete_btn1= document.createElement("button");
            delete_btn1.classList.add("delete");
            delete_btn1.innerText="Delete";
    
            new_actions1.appendChild(delete_btn1);
    
            new_content1.appendChild(new_input1);
            new_task1.appendChild(new_content1);
            new_task1.appendChild(new_actions1);
            const completedTasks1= document.querySelector("#completed-tasks");
            completedTasks1.appendChild(new_task1);
    

            completedTodos = JSON.parse(localStorage.getItem('completedTodos'));
            completedTodos.push(todo);
            localStorage.setItem('completedTodos', JSON.stringify(completedTodos));
            
            todos.splice(todos.indexOf(todo), 1);
            localStorage.setItem('todos', JSON.stringify(todos));

            tasks.removeChild(new_task);
        })
      
        
    })
    completedTodos.forEach((todo,index)=>{
        const new_task = document.createElement("div");
        new_task.classList.add("task");

        const new_content= document.createElement("div");
        new_content.classList.add("content");

        const new_input= document.createElement("input");
        new_input.classList.add("text");
        new_input.type="text";
        new_input.value=todo;
        new_input.setAttribute('readonly','readonly');

        const new_actions= document.createElement("div");
        new_actions.classList.add("actions");


        const delete_btn= document.createElement("button");
        delete_btn.classList.add("delete");
        delete_btn.innerText="Delete";

       
        new_actions.appendChild(delete_btn);

        new_content.appendChild(new_input);
        new_task.appendChild(new_content);
        new_task.appendChild(new_actions);
        const completedTasks= document.querySelector("#completed-tasks");
        completedTasks.appendChild(new_task);

        input_task.value="";
      
       
        delete_btn.addEventListener('click',()=>{
            
            completedTodos.splice(completedTodos.indexOf(todo), 1);
            localStorage.setItem('completedTodos', JSON.stringify(completedTodos));

            completedTasks.removeChild(new_task);
        })
      
        
    })
    }

 


    task_form.addEventListener('submit',(e)=>{
        e.preventDefault();

        if(!input_task.value)
        {
            alert("please enter the task");
            return;
        }
        // adding new task
        saveLocalTodos(input_task.value);
        const new_task = document.createElement("div");
        new_task.classList.add("task");
    
        const new_content= document.createElement("div");
        new_content.classList.add("content");

        const new_input= document.createElement("input");
        new_input.classList.add("text");
        new_input.type="text";
        new_input.value=input_task.value;
        new_input.setAttribute('readonly','readonly');

        const new_actions= document.createElement("div");
        new_actions.classList.add("actions");

        const edit_btn= document.createElement("button");
        edit_btn.classList.add("edit");
        edit_btn.innerText="Edit";

        const delete_btn= document.createElement("button");
        delete_btn.classList.add("delete");
        delete_btn.innerText="Delete";

        new_actions.appendChild(edit_btn);
        new_actions.appendChild(delete_btn);

        new_content.appendChild(new_input);
        new_task.appendChild(new_content);
        new_task.appendChild(new_actions);
        tasks.appendChild(new_task);

        input_task.value="";
        // edit and save functionality for new task
        edit_btn.addEventListener('click',()=>{
            if(edit_btn.innerText.toLowerCase()=="edit")
            {
                edit_btn.innerText="Save";
                new_input.removeAttribute("readonly");
                new_input.focus();
            }
            else{
                edit_btn.innerText="Edit";
                new_input.setAttribute('readonly','readonly');
            }
        })
       // delete the newly created task(not rendered from local storage) and add the deleted task to completed tasks
        delete_btn.addEventListener('click',()=>{
            removeLocalTodos(new_input.value);
            SaveCompleteTodo(new_input.value);
            // displaying deleted tasks
            const new_task1 = document.createElement("div");
            new_task1.classList.add("task");
    
            const new_content1= document.createElement("div");
            new_content1.classList.add("content");
    
            const new_input1= document.createElement("input");
            new_input1.classList.add("text");
            new_input1.type="text";
            new_input1.value=new_input.value;
            new_input1.setAttribute('readonly','readonly');
    
            const new_actions1= document.createElement("div");
            new_actions1.classList.add("actions");
    
           
    
            const delete_btn1= document.createElement("button");
            delete_btn1.classList.add("delete");
            delete_btn1.classList.add("deleted");
            delete_btn1.innerText="Delete";
    
            
            new_actions1.appendChild(delete_btn1);
    
            new_content1.appendChild(new_input1);
            new_task1.appendChild(new_content1);
            new_task1.appendChild(new_actions1);
            const completedTasks1= document.querySelector("#completed-tasks");
            completedTasks1.appendChild(new_task1);
    
            input_task.value="";

            const deleted= document.querySelector(".deleted");
            if(deleted)
            {
               deleted.addEventListener("click",()=>{
                let completedTodos;

                if (localStorage.getItem('completedTodos') === null) {
                    //if no create one
                    completedTodos = [];
                } else {
                    //if yes get them
                    completedTodos = JSON.parse(localStorage.getItem('completedTodos'));
                }

                completedTodos.splice(completedTodos.indexOf(new_input1.value), 1);
                localStorage.setItem('completedTodos', JSON.stringify(completedTodos));
                completedTasks1.removeChild(new_task1);
               })
            }
            
           
            
            
            tasks.removeChild(new_task);
        })

        

     //To store in local storage
      function saveLocalTodos(todo) {

             let todos;
    //check if we already have todos
     if (localStorage.getItem('todos') === null) {
        //if no create one
        todos = [];
      } else {
        //if yes get them
        todos = JSON.parse(localStorage.getItem('todos'));
     }
     todos.push(todo);
      localStorage.setItem('todos', JSON.stringify(todos));
      }
   // save completed data to local storage
      function SaveCompleteTodo(todo)
      {
        

        if (localStorage.getItem('completedTodos') === null) {    
            completedTodos = [];
          } else {
            completedTodos = JSON.parse(localStorage.getItem('completedTodos'));
         }
         completedTodos.push(todo);
        localStorage.setItem('completedTodos', JSON.stringify(completedTodos));
     
    }
    // Remove from local storage
      function removeLocalTodos(todo) {
        let todos;
        
       
        //check if we already have todos
        if (localStorage.getItem('todos') === null) {
            //if no create one
            todos = [];
        } else {
            //if yes get them
            todos = JSON.parse(localStorage.getItem('todos'));
        }
      
        const todoElement = todo;
       
            todos.splice(todos.indexOf(todoElement), 1);
            localStorage.setItem('todos', JSON.stringify(todos));
    
    }


    })
// Delete all 
const delete_all= document.querySelector(".delete-all");

delete_all.addEventListener("click",()=>{

    let completedTodos;

    if (localStorage.getItem('completedTodos') === null) {
        //if no create one
        completedTodos = [];
    } else {
        //if yes get them
        completedTodos = JSON.parse(localStorage.getItem('completedTodos'));
    }

    completedTodos.splice(0,completedTodos.length);
    localStorage.setItem('completedTodos', JSON.stringify(completedTodos));
    
    while(completed_tasks.firstChild)
    {
        completed_tasks.removeChild(completed_tasks.firstChild);
    }
})
  
})