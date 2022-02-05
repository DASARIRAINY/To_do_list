# To_do_list

Local Storage: localStorage is similar to sessionStorage, except that while localStorage data has no expiration time, sessionStorage data gets cleared when the page session ends — that is, when the page is closed. (localStorage data for a document loaded in a "private browsing" or "incognito" session is cleared when the last "private" tab is closed.)

Two main methods:

set the item : values are stored in key value pairs. the value must always be the string 
localStorage.setItem('myCat', 'Tom');

If we want to store the array of strings in local storage:

localStorage.setItem('completedTodos', JSON.stringify(completedTodos));  // completedTodos is array of strings

if we want to get the items;

completedTodos = JSON.parse(localStorage.getItem('completedTodos'));



