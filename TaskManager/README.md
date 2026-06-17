# DOM Explorer Task Manager

## Project Overview

DOM Explorer Task Manager is a web-based task management application built using HTML, CSS, and JavaScript. The project demonstrates various DOM manipulation techniques, event handling concepts, browser rendering concepts, and attribute/property management.

The application allows users to create, edit, update, complete, and delete tasks through an interactive user interface.

---

## Features

### Task Management

* Create new tasks
* Edit existing tasks
* Delete tasks
* Update task status
* View task category
* Task statistics (Total, Completed, Pending)

### Theme Toggle

* Light Mode
* Dark Mode
* Implemented using `data-theme` attribute and `setAttribute()`

### Event Handling

* Event Delegation
* Event Bubbling
* Event Capturing

### DOM Manipulation

* createElement()
* createTextNode()
* append()
* appendChild()
* prepend()
* before()
* after()
* replaceWith()
* remove()

### Attribute Manipulation

* setAttribute()
* getAttribute()
* hasAttribute()
* removeAttribute()
* dataset

### Browser Concepts

* Parsing
* Tokenization
* DOM Tree
* CSSOM Tree
* Render Tree

---

## Technologies Used

* HTML5
* CSS3
* JavaScript (Vanilla JS)

---

## Folder Structure

```text
TaskManager/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

---

# Browser Rendering Pipeline

When a webpage loads, the browser follows several steps:

### 1. Parsing

The browser reads HTML and CSS code and converts them into structures that it can understand.

### 2. Tokenization

The HTML source code is broken into small tokens such as tags, attributes, and text content.

Example:

```html
<h1>Hello</h1>
```

Tokens:

```text
<h1>
Hello
</h1>
```

### 3. DOM Tree

The browser converts HTML into a Document Object Model (DOM).

Example:

```html
<body>
    <h1>Task Manager</h1>
</body>
```

DOM Tree:

```text
Document
└── body
    └── h1
        └── Task Manager
```

### 4. CSSOM Tree

The browser converts CSS into a CSS Object Model (CSSOM).

Example:

```css
h1 {
    color: teal;
}
```

### 5. Render Tree

The DOM Tree and CSSOM Tree are combined to create the Render Tree, which is used to display content on the screen.

---

# Attributes vs Properties

Attributes are defined in HTML.

Example:

```html
<input value="Original Value">
```

Accessing attribute:

```javascript
input.getAttribute("value");
```

Output:

```text
Original Value
```

Properties represent the current value stored in memory.

```javascript
input.value;
```

If the user changes the input value, the property changes but the attribute remains unchanged.

---

# DOM Methods Used

## createElement()

Creates a new HTML element.

```javascript
const card = document.createElement("div");
```

---

## createTextNode()

Creates a text node.

```javascript
const text = document.createTextNode("Task");
```

---

## append()

Adds elements to the end of a parent element.

```javascript
parent.append(child);
```

---

## appendChild()

Adds a child element to a parent.

```javascript
parent.appendChild(child);
```

---

## prepend()

Adds an element at the beginning.

```javascript
container.prepend(card);
```

---

## before()

Inserts content before an element.

```javascript
element.before(message);
```

---

## after()

Inserts content after an element.

```javascript
element.after(message);
```

---

## replaceWith()

Replaces an existing element.

```javascript
oldElement.replaceWith(newElement);
```

---

## remove()

Removes an element from the DOM.

```javascript
element.remove();
```

---

# Data Attributes

Custom data attributes are used to store task information.

Example:

```html
<div
data-id="1"
data-status="Pending"
data-category="Study">
</div>
```

Accessing data attributes:

```javascript
card.dataset.id;
card.dataset.status;
card.dataset.category;
```

---

# Attribute Methods

## setAttribute()

```javascript
card.setAttribute("data-status","Pending");
```

## getAttribute()

```javascript
card.getAttribute("data-status");
```

## hasAttribute()

```javascript
card.hasAttribute("data-status");
```

## removeAttribute()

```javascript
card.removeAttribute("data-status");
```

---

# Event Delegation

Event Delegation allows a parent element to handle events for its child elements.

Example:

```javascript
taskContainer.addEventListener("click", function(event) {
    if(event.target.classList.contains("delete-btn")) {
        // delete task
    }
});
```

Advantages:

* Better performance
* Less memory usage
* Easier management of dynamic elements

---

# Event Bubbling

Event Bubbling occurs when an event starts from the target element and moves upward through its parent elements.

Example:

```text
Child
Parent
Grandparent
```

Output:

```text
Child Bubble
Parent Bubble
Grandparent Bubble
```

---

# Event Capturing

Event Capturing occurs when an event travels from the outermost ancestor to the target element.

Example:

```javascript
addEventListener("click", handler, true);
```

Output:

```text
Grandparent Capture
Parent Capture
Child Capture
```

---

# How to Run the Project

1. Download or clone the repository.
2. Open the project folder.
3. Open `index.html` in a browser.
4. Click **Create Task** to add tasks.
5. Use **Edit** and **Delete** options to manage tasks.
6. Use **Dark Mode** button to switch themes.
7. Open Developer Tools (F12) to observe:

   * Event Bubbling
   * Event Capturing
   * Attributes vs Properties output

---

# Learning Outcomes

Through this project, the following concepts were implemented and demonstrated:

* Browser Rendering Pipeline
* DOM Manipulation
* Event Handling
* Event Delegation
* Event Bubbling
* Event Capturing
* Theme Toggle
* Data Attributes
* Attribute vs Property
* Dynamic Content Creation
* JavaScript DOM APIs

---

## Author

Pallavi Bhat

BCA, MCA

DOM Explorer Task Manager Project
