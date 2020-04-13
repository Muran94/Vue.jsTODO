(function() {
  'use strict';

  const vm = new Vue({
    el: '#app',
    data: {
      thisYear: new Date().getFullYear(),
      todos: [],
      todoForm: { title: '' },
    },
    watch: {
      todos: {
        handler: function() {
          localStorage.setItem('todos', JSON.stringify(this.todos));
        },
        deep: true
      }
    },
    mounted: function() {
      this.todos = JSON.parse(localStorage.getItem('todos')) || [];
    },
    methods: {
      addTodo: function() {
        const todo = { title: this.todoForm.title, isDone: false };
        this.todos.push(todo);
        this.todoForm.title = '';
      },
      clearCompletedTodos: function() {
        if (confirm("本当に削除しますか？")) {
          this.todos = this.remaining;
        }
      },
      deleteTodo: function(index) {
        if (confirm("本当に削除しますか？")) {
          this.todos.splice(index, 1);
        }
      }
    },
    computed: {
      remaining: function() {
        return this.todos.filter(todo => {
          return !todo.isDone;
        });
      }
    }
  })
})();