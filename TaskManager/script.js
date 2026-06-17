const createBtn = document.getElementById("createBtn");
const formContainer = document.getElementById("formContainer");
const closeBtn = document.getElementById("closeBtn");
const taskForm = document.getElementById("taskForm");

const taskTitle = document.getElementById("taskTitle");
const taskCategory = document.getElementById("taskCategory");
const taskStatus = document.getElementById("taskStatus");

const taskContainer = document.getElementById("taskContainer");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");

const themeBtn = document.getElementById("themeBtn");

let taskId = 1;
let editingCard = null;

/* --------------------
   Popup Open / Close
-------------------- */

createBtn.addEventListener("click", () => {
    formContainer.style.display = "flex";
});

closeBtn.addEventListener("click", () => {
    formContainer.style.display = "none";
    taskForm.reset();
    editingCard = null;
});

/* --------------------
   Task Counter
-------------------- */

function updateStats() {

    const cards =
        document.querySelectorAll(".task-card");

    totalTasks.textContent =
        cards.length;

    let completed = 0;
    let pending = 0;

    cards.forEach(card => {

        if (
            card.dataset.status ===
            "Completed"
        ) {
            completed++;
        } else {
            pending++;
        }

    });

    completedTasks.textContent =
        completed;

    pendingTasks.textContent =
        pending;
}

/* --------------------
   Create Task
-------------------- */

taskForm.addEventListener(
    "submit",
    function (e) {

        e.preventDefault();

        const title =
            taskTitle.value.trim();

        const category =
            taskCategory.value;

        const status =
            taskStatus.value;

        if (
            title === "" ||
            category === ""
        ) {
            alert(
                "Please fill all fields"
            );
            return;
        }

        if (editingCard) {

            editingCard.querySelector(
                "h3"
            ).textContent = title;

            editingCard.querySelector(
                ".task-category"
            ).textContent =
                "Category: " + category;

            const statusSpan =
                editingCard.querySelector(
                    ".status"
                );

            statusSpan.textContent =
                status;

            statusSpan.className =
                "status " +
                status.toLowerCase();

            editingCard.dataset.category =
                category;

            editingCard.dataset.status =
                status;

            editingCard = null;

        } else {

            /* createElement() */

            const card =
                document.createElement(
                    "div"
                );

            card.classList.add(
                "task-card"
            );

            /* dataset */

            card.dataset.id =
                taskId++;

            card.dataset.category =
                category;

            card.dataset.status =
                status;

            /* setAttribute() */

            card.setAttribute(
                "data-created",
                "true"
            );

            /* createElement() */

            const header =
                document.createElement(
                    "div"
                );

            header.classList.add(
                "task-header"
            );

            const titleEl =
                document.createElement(
                    "h3"
                );

            /* createTextNode() */

            const titleText =
                document.createTextNode(
                    title
                );

            titleEl.appendChild(
                titleText
            );

            const statusEl =
                document.createElement(
                    "span"
                );

            statusEl.classList.add(
                "status"
            );

            statusEl.classList.add(
                status.toLowerCase()
            );

            statusEl.textContent =
                status;

            /* append() */

            header.append(
                titleEl,
                statusEl
            );

            const categoryEl =
                document.createElement(
                    "p"
                );

            categoryEl.classList.add(
                "task-category"
            );

            categoryEl.textContent =
                "Category: " +
                category;

            const actions =
                document.createElement(
                    "div"
                );

            actions.classList.add(
                "task-actions"
            );

            const editBtn =
                document.createElement(
                    "button"
                );

            editBtn.textContent =
                "Edit";

            editBtn.classList.add(
                "btn",
                "edit-btn"
            );

            const deleteBtn =
                document.createElement(
                    "button"
                );

            deleteBtn.textContent =
                "Delete";

            deleteBtn.classList.add(
                "btn",
                "delete-btn"
            );

            actions.append(
                editBtn,
                deleteBtn
            );

            /* appendChild() */

            card.appendChild(
                header
            );

            card.appendChild(
                categoryEl
            );

            card.appendChild(
                actions
            );

            /* prepend() */

            taskContainer.prepend(
                card
            );

            /* getAttribute() */

            console.log(
                card.getAttribute(
                    "data-created"
                )
            );

            /* hasAttribute() */

            console.log(
                card.hasAttribute(
                    "data-created"
                )
            );
        }

        taskForm.reset();
        formContainer.style.display =
            "none";

        updateStats();
    }
);

/* --------------------
   Event Delegation
-------------------- */

taskContainer.addEventListener(
    "click",
    function (e) {

        const card =
            e.target.closest(
                ".task-card"
            );

        if (!card) return;

        /* Delete */

        if (
            e.target.classList.contains(
                "delete-btn"
            )
        ) {

            /* removeAttribute() */

            card.removeAttribute(
                "data-created"
            );

            /* remove() */

            card.remove();

            updateStats();
        }

        /* Edit */

        if (
            e.target.classList.contains(
                "edit-btn"
            )
        ) {

            editingCard = card;

            taskTitle.value =
                card.querySelector(
                    "h3"
                ).textContent;

            taskCategory.value =
                card.dataset.category;

            taskStatus.value =
                card.dataset.status;

            formContainer.style.display =
                "flex";
        }

    }
);

/* --------------------
   before()
-------------------- */

const message =
    document.createElement("p");

message.textContent =
    "Click Create Task to add a new task.";

taskContainer.before(message);

/* --------------------
   after()
-------------------- */

const note =
    document.createElement("p");

note.textContent =
    "End of Task Section";

taskContainer.after(note);

/* --------------------
   replaceWith()
-------------------- */

const oldText =
    document.createElement("p");

oldText.textContent =
    "Old Message";

const newText =
    document.createElement("p");

newText.textContent =
    "New Message";

oldText.replaceWith?.(newText);

/* --------------------
   Theme Toggle
-------------------- */

themeBtn.addEventListener(
    "click",
    () => {

        const theme =
            document.body.getAttribute(
                "data-theme"
            );

        if (
            theme === "light"
        ) {

            document.body.setAttribute(
                "data-theme",
                "dark"
            );

            themeBtn.textContent =
                "☀ Light Mode";

        } else {

            document.body.setAttribute(
                "data-theme",
                "light"
            );

            themeBtn.textContent =
                "🌙 Dark Mode";

        }
    }
);

/* --------------------
   Attributes vs Properties
-------------------- */

document
.getElementById(
    "checkAttribute"
)
.addEventListener(
    "click",
    () => {

        const input =
            document.getElementById(
                "demoInput"
            );

        console.log(
            "Property:",
            input.value
        );

        console.log(
            "Attribute:",
            input.getAttribute(
                "value"
            )
        );
    }
);

/* --------------------
   Event Bubbling
-------------------- */

document
.getElementById(
    "childBtn"
)
.addEventListener(
    "click",
    () =>
        console.log(
            "Child Bubble"
        )
);

document
.getElementById(
    "parent"
)
.addEventListener(
    "click",
    () =>
        console.log(
            "Parent Bubble"
        )
);

document
.getElementById(
    "grandparent"
)
.addEventListener(
    "click",
    () =>
        console.log(
            "Grandparent Bubble"
        )
);

/* --------------------
   Event Capturing
-------------------- */

document
.getElementById(
    "grandparent"
)
.addEventListener(
    "click",
    () =>
        console.log(
            "Grandparent Capture"
        ),
    true
);

document
.getElementById(
    "parent"
)
.addEventListener(
    "click",
    () =>
        console.log(
            "Parent Capture"
        ),
    true
);

document
.getElementById(
    "childBtn"
)
.addEventListener(
    "click",
    () =>
        console.log(
            "Child Capture"
        ),
    true
);

/* Initial Counter */

updateStats();