/* ==========================
   THEME TOGGLE (Both Pages)
========================== */

const themeBtn = document.getElementById("themeBtn");

if (themeBtn) {

    themeBtn.addEventListener("click", () => {

        const currentTheme =
            document.body.getAttribute("data-theme");

        if (currentTheme === "light") {

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
    });
}

/* ==========================
   TASK MANAGER PAGE
========================== */

const createBtn =
    document.getElementById("createBtn");

const formContainer =
    document.getElementById("formContainer");

const closeBtn =
    document.getElementById("closeBtn");

const taskForm =
    document.getElementById("taskForm");

if (
    createBtn &&
    formContainer &&
    taskForm
) {

    const taskTitle =
        document.getElementById("taskTitle");

    const taskCategory =
        document.getElementById("taskCategory");

    const taskStatus =
        document.getElementById("taskStatus");

    const taskContainer =
        document.getElementById("taskContainer");

    const totalTasks =
        document.getElementById("totalTasks");

    const completedTasks =
        document.getElementById("completedTasks");

    const pendingTasks =
        document.getElementById("pendingTasks");

    let taskId = 1;
    let editingCard = null;

    /* before() */

    const message =
        document.createElement("p");

    message.textContent =
        "Create and manage your tasks below.";

    taskContainer.before(message);

    /* after() */

    const footerNote =
        document.createElement("p");

    footerNote.textContent =
        "End of Task List";

    taskContainer.after(footerNote);

    /* Open Form */

    createBtn.addEventListener(
        "click",
        () => {

            formContainer.style.display =
                "flex";
        }
    );

    /* Close Form */

    closeBtn.addEventListener(
        "click",
        () => {

            formContainer.style.display =
                "none";

            taskForm.reset();

            editingCard = null;
        }
    );

    /* Update Stats */

    function updateStats() {

        const cards =
            document.querySelectorAll(
                ".task-card"
            );

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

    /* Create Task */

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

                const statusEl =
                    editingCard.querySelector(
                        ".status"
                    );

                statusEl.textContent =
                    status;

                statusEl.className =
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

                const text =
                    document.createTextNode(
                        title
                    );

                titleEl.appendChild(
                    text
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

                console.log(
                    card.getAttribute(
                        "data-created"
                    )
                );

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

    /* Event Delegation */

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

    updateStats();
}

/* ==========================
   ATTRIBUTES VS PROPERTIES
========================== */

const checkAttribute =
    document.getElementById(
        "checkAttribute"
    );

if (checkAttribute) {

    checkAttribute.addEventListener(
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
}

/* ==========================
   EVENT BUBBLING
========================== */

const childBtn =
    document.getElementById(
        "childBtn"
    );

const parent =
    document.getElementById(
        "parent"
    );

const grandparent =
    document.getElementById(
        "grandparent"
    );

if (
    childBtn &&
    parent &&
    grandparent
) {

    /* Bubbling */

    childBtn.addEventListener(
        "click",
        () =>
            console.log(
                "Child Bubble"
            )
    );

    parent.addEventListener(
        "click",
        () =>
            console.log(
                "Parent Bubble"
            )
    );

    grandparent.addEventListener(
        "click",
        () =>
            console.log(
                "Grandparent Bubble"
            )
    );

    /* Capturing */

    grandparent.addEventListener(
        "click",
        () =>
            console.log(
                "Grandparent Capture"
            ),
        true
    );

    parent.addEventListener(
        "click",
        () =>
            console.log(
                "Parent Capture"
            ),
        true
    );

    childBtn.addEventListener(
        "click",
        () =>
            console.log(
                "Child Capture"
            ),
        true
    );
}