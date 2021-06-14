# Getting Started with Create React App

This is my first application using React. 
After a couple of lectures from the React course, I decided to build something from scratch in order to put my knowledge into practice.
One of the main ideas of this project is to get to know ‘Class Components’ because they are a part of React. 
I am aware that React provides Hooks and I am going to use them in my next project. 

## What is Task management ?

It is a simple application where you can add your daily tasks, and set your own time for how long you are going to do it. 
On desktop, you will get notification and bell sound when the task is finish. 🔥😊

## Status

Project is: _in progress_,


## The goal of this project is to practice:

- Project setup to understanding the fundamentals of JavaScript for React (Requirements)
- Nested JSX, the basic syntax of React.js
- React Component syntax ( first to get to know better a Class Component later a Function Component)
- Components interacting
- Handler Function in JSX
- React Props
- React State
- Lifecycle Methods 
- ...

### Preview the App live on : [DEMO](https://react-task-mgm.netlify.app/)



## Some basic issues of learning by building Task-management :

### 1. Deleting tasks on both lists 

In component Task I added  a button with a handler function, which deals with a click event for each item on both lists. Since I am on a mapped list I passed the index and task. I used them as parameters in function.
 
`this.props.deleteTask(this.props.task, this.props.index);`

To remove a specific task from both lists whenever I click on the delete button :
- First, I used the array method indexOf to find the index of the deleting task.
- Next, I checked If we found a clicking task `(indexTask > -1)`
- Then, I modified the current stateful list with a splice array method, but before I used the spread operator to copy an (tasks) array. 



 [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) The splice() method changes the contents of an array by removing or replacing existing elements and/or adding new elements in place.

### 2. Adding a task to Task List 

I added input fields (text and time) and a button to add each task to the list. Before we are able to add something , we need to track the input field state, because without the value from the input field, we don't have any text for the item which we want to add to our list . To address this issue I used a controlled component to control the value by giving the input field the value from React's state.
In the main component App, in the function ‘Add Task’ I am building the structure of one single task. Each task will have text from the input field, time from the input field, and an ID thanks to counter and elapsedTime starting from 0.
I tried to keep an immutable data structure and therefore create a new list based on the old list and add new tasks.


## Available Scripts

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3003](http://localhost:3003) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
