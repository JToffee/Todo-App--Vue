import { createStore } from "vuex";
// import todos from "@/data/todos";
import Todo from "@/models/Todo";

export default createStore ({
    state: {
        todos:JSON.parse(localStorage.getItem('Todos')),
        filter: 'all',
        activeTodos: [],
        viewMode: 'dark',
    },
    getters: {
         getAllTodos: (state) => {
            state.todos =JSON.parse(localStorage.getItem('Todos'))
          if(!state.todos) state.todos = []

            return state.todos
         },
         getCompletedTodos: (state) => {
            state.todos =JSON.parse(localStorage.getItem('Todos'))
            state.todos = state.todos.filter(todo => todo.checked !== null);
            return state.todos
         },
         getActiveTodos: (state) => {
            state.todos =JSON.parse(localStorage.getItem('Todos'))
            state.todos =  [...state.todos.filter(todo => todo.checked === null)];
            state.activeTodos = state.todos
            return state.todos

         },

        getCount(state){

            if (state.activeTodos.length === 0) state.activeTodos = state.todos?.filter(todo => todo.checked === null);

            return state.activeTodos.length
            
        },
        getViewMode (state){
            return state.viewMode
        }
    },
    mutations: {
        saveTodo(state,todo){

            state.todos =JSON.parse(localStorage.getItem('Todos'))

            if(!state.todos) state.todos = [];


            const newTodo = new Todo(todo);
            
            
            state.todos.push(newTodo);

            state.activeTodos.push(newTodo);

            localStorage.setItem('Todos', JSON.stringify(state.todos));
        
          
        },

        deleteTodo(state,id){

            state.todos =JSON.parse(localStorage.getItem('Todos'))
            

             const index = state.todos.findIndex( todo=>todo.id === id)
             state.todos.splice(index, 1)

             const activeIndex = state.activeTodos.findIndex( todo=>todo.id === id)
             if(activeIndex >= 0)state.activeTodos.splice(activeIndex, 1)

           
            localStorage.setItem('Todos', JSON.stringify(state.todos));

            
        },
        toggleComplete(state, id){

            //find todo
            const index = state.todos.findIndex( todo=>todo.id === id)

            //update todo            
            const checked = state.todos[index].checked === null ? 'checked' : null;
            const updatedTodo = {...state.todos[index]}
            updatedTodo.checked  = checked;
            state.todos[index] = updatedTodo;

            //update active
            const active = state.activeTodos.findIndex(todo => todo.id === id)
            
            if(active < 0 && !updatedTodo.checked){ 
                state.activeTodos.push(updatedTodo)
            } 
            if(active >= 0 && updatedTodo.checked)
            {
                state.activeTodos.splice(active,1)
            }

             



            //update local storage
            localStorage.setItem('Todos', JSON.stringify(state.todos));


        },
        clearCompleted(state){
            state.todos =JSON.parse(localStorage.getItem('Todos'))
            //filter out complete task
            state.todos = state.todos.filter(todo => !todo.checked)

        //update local storage
            localStorage.setItem('Todos', JSON.stringify(state.todos));
        },
        initViewMode (){
            const mode = JSON.parse(localStorage.getItem('Mode'))

            if(!mode)localStorage.setItem('Mode',JSON.stringify('dark'))
        
        },
        setViewMode(state){

            console.log(state.viewMode)
        if(state.viewMode === 'light') {
            localStorage.setItem('Mode',JSON.stringify('dark'))
            state.viewMode = 'dark'
        } else if(state.viewMode === 'dark') 
        {
            localStorage.setItem('Mode',JSON.stringify('light'))
            state.viewMode = 'light'
        }
        }
    },
    actions: {
        saveTodo({commit}, todo){
            commit('saveTodo', todo)
        },
        deleteTodo({commit},id){
            commit('deleteTodo', id)
        },
        toggleComplete({commit}, id){
            commit('toggleComplete', id)
        },
         clearCompleted({commit}){
            commit('clearCompleted')
        },
         setViewMode({commit}){
                commit('setViewMode')
        },
         initViewMode({commit}){
                commit('initViewMode')
        },
    }
})