// dom selectors
const $ = (selector) => document.querySelector(selector);

const loginCard = $(".login-card");
const registerCard = $(".register-card");
const gotToLogin = $("#gotoLogin");
const gotToRegister = $("#gotoRegister");
const registerBtn = $("#register-btn");
const loginBtn = $("#login-btn");
const registerForm = $("#register-form");
const loginForm = $("#login-form");
const main = $(".main");

const sideBtns = document.querySelectorAll(".side-btn");
const dashboardBtn = $("#dashboard-btn");
const settingBtn = $("#setting-btn");

const mode = $(".toggle");
const toggleKey = mode.querySelector(".round");
const dashboardPage = $(".dashboard-page");
const settingPage = $(".setting-page");
const mainColumn = $(".main-columns");

const transactionBtn = $("#transaction-btn");
const transactionModal = $(".transaction-modal");
const closeBtn = $("#close-btn");

// navbar
const navbar = $(".nav");
const tbody = $("#transaction-body");

const search = $(".options");
const searchInput = $(".search-input");
// transaction form and btn
const transactionForm = $("#add-transaction");
const saveTransactionBtn = $("#save-transaction");
// stat card budget allocate karne keliye
const statCard = document.querySelectorAll(".card");
// setting form
const settingForm = $(".profile-form");
const editProfileBtn = $("#save");

let theme = localStorage.getItem("theme") || "light";
let registeredUsers = getStorage("registeredUsers") || [];
let user = getStorage("user");
let transaction_name = "";
let transactionArr = [];
let cashFlow = null;
let updateIndex = null;
// localstorage functions
function getStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
function setToLocalStorage(key, value) {
  value = JSON.stringify(value);
  localStorage.setItem(key, value);
}
function removeFromLocaleStorage(key) {
  localStorage.removeItem(key);
}

// authentication
function register(username, password) {
  if (username.trim() === "" || password.trim() === "") return;
  const exists = registeredUsers.find(
    (user) => user.username.toLowerCase() === username.toLowerCase(),
  );
  if (exists) {
    alert("Username already exists");
    return;
  }
  let currency = "₹";
  let obj = { username, password, currency };
  registeredUsers.push(obj);
  setToLocalStorage("registeredUsers", registeredUsers);
  registerCard.style.display = "none";
  loginCard.style.display = "flex";
  alert("Registration Successful ");
}

function login(username, password) {
  if (username.trim() === "" || password.trim() === "") return;

  const currentUser = registeredUsers.find(
    (user) => user.username.toLowerCase() === username.toLowerCase(),
  );
  if (!currentUser) {
    alert(`Username ${username}  is not found`);
    return;
  }
  if (currentUser.password !== password) {
    alert("Incorrect Password");
    return;
  }

  user = currentUser;
  transaction_name = `Transaction_${user.username}`;
  transactionArr = getStorage(transaction_name) || [];
  setToLocalStorage("user", user);

  displayUI();
  alert("Login successful");
  return;
}
function logout() {
  if (!user) return;

  const isConfirmed = confirm(
    `${user.username}, are you sure you want to logout?`,
  );

  if (!isConfirmed) return;

  removeFromLocaleStorage("user");
  user = null;
  transaction_name = "";
  transactionArr = [];
  displayUI();
}

function displayUI() {
  if (user) {
    transaction_name = `Transaction_${user.username}`;
    transactionArr = getStorage(transaction_name) || [];

    loginCard.style.display = "none";
    registerCard.style.display = "none";
    $("#dashboard-view").style.display = "flex";
    showUserName();
    showTransactionCalculation();
    cashFlowAnalysis();
    showTransactionDetails();
  } else {
    loginCard.style.display = "flex";
    $("#dashboard-view").style.display = "none";
  }
}

// transactions

// add transaction
function addTransaction(obj) {
  if (
    obj.type.trim() === "" ||
    obj.description.trim() === "" ||
    !obj.amount ||
    obj.category.trim() === ""
  ) {
    alert("Enter all the values ");
    return;
  }
  if (updateIndex != null) {
    transactionArr.splice(updateIndex, 1, obj);
  } else {
    transactionArr.push(obj);
  }

  setToLocalStorage(transaction_name, transactionArr);
}

function calculateTransactionDetails(data = transactionArr) {
  let currentBalance = data.reduce((acc, curr) => {
    return curr.type === "Income" ? acc + curr.amount : acc - curr.amount;
  }, 0);
  let totalIncome = data
    .filter((e) => e.type === "Income")
    .reduce((acc, curr) => acc + curr.amount, 0);
  let totalExpense = data
    .filter((e) => e.type === "Expense")
    .reduce((acc, curr) => acc + curr.amount, 0);
  let totalTransaction = data.length;
  return [currentBalance, totalIncome, totalExpense, totalTransaction];
}
function showTransactionDetails(data = transactionArr) {
  tbody.innerHTML = "";

  data.forEach((transactions) => {
    tbody.innerHTML += `
                    <tr>
                    <td>${transactions.date}</td>
                    <td>${transactions.description}</td>
                    <td>${transactions.category}</td>
                    <td class="${transactions.type === "Income" ? "income" : "expense"}">${transactions.type == "Income" ? "+" : "-"}${user.currency}${transactions.amount}</td>
                    <td>
                      <i class="fa-solid fa-pencil" data-id="${transactions.id}"></i>
                      <i class="fa-solid fa-trash" data-id="${transactions.id}"></i>
                    </td>
                  </tr>`;
  });
}

function editTransaction(id) {
  let transaction = transactionArr.find((t) => t.id == id);
  updateIndex = transactionArr.findIndex((t) => t.id == id);
  transactionForm.type.value = transaction.type;
  transactionForm.description.value = transaction.description;
  transactionForm.date.value = transaction.date;
  transactionForm.amount.value = transaction.amount;
  transactionForm.category.value = transaction.category;

  displayTransactionModal();
}

function deleteTransaction(id) {
  const deleteIndex = transactionArr.findIndex((t) => t.id == id);

  const isConfirmed = confirm(
    `${user.username}, are you sure you want to delete this transaction?`,
  );
  if (isConfirmed) {
    transactionArr.splice(deleteIndex, 1);
    setToLocalStorage(transaction_name, transactionArr);
    displayUI();
  }
}

function resetTransaction() {
  let isConfirmed = confirm(
    "WARNING: This will delete all your transaction data permanently!",
  );
  if (isConfirmed) {
    transactionArr = [];
    removeFromLocaleStorage(transaction_name);
  }
  displayUI();
}
function applyFilters() {
  let type = search.value;
  let filteredTransaction = [...transactionArr];
  if (type === "income") {
    filteredTransaction = transactionArr.filter((t) => t.type === "Income");
  }
  if (type === "expense") {
    filteredTransaction = transactionArr.filter((t) => t.type === "Expense");
  }

  let keyword = searchInput.value.toLowerCase().trim();
  filteredTransaction = filteredTransaction.filter((t) => {
    return (
      t.description.toLowerCase().includes(keyword) ||
      t.category.toLowerCase().includes(keyword)
    );
  });
  showTransactionDetails(filteredTransaction);
  cashFlowAnalysis(filteredTransaction);
  showTransactionCalculation(filteredTransaction);
}
// dashboard
function showTransactionCalculation(data = transactionArr) {
  if (!user) return;
  const result = calculateTransactionDetails(data);
  statCard.forEach((card, index) => {
    let h1 = card.querySelector("h1");
    h1.innerHTML =
      index == statCard.length - 1
        ? result[index]
        : `${user.currency}${result[index].toFixed(2)}`;
  });
}
function showUserName() {
  let p = navbar.querySelector("p");
  p.textContent = user.username;
}

// charts
function cashFlowAnalysis(data = transactionArr) {
  let chart = $("#cashflow");

  if (cashFlow) cashFlow.destroy();

  let result = calculateTransactionDetails(data);
  cashFlow = new Chart(chart, {
    type: "bar",
    data: {
      labels: ["Income vs Expense"],
      datasets: [
        {
          label: "income ",
          data: [result[1]],
          backgroundColor: "#277243",
        },
        {
          label: "expense",
          data: [result[2]],
          backgroundColor: "#9d2323",
        },
      ],
    },
  });
}
// profile setting
function profileSetting(username, currency) {
  const exists = registeredUsers.find((u) => e.username === username);
  if (exists) {
    alert("Username already exists");
    return;
  }
  if (!username.trim()) {
    alert("Username cannot be empty");
  }
  const index = registeredUsers.findIndex((u) => u.username === user.username);
  user.username = username;
  user.currency = currency;
  registeredUsers[index] = user;
  setToLocalStorage("user", user);
  setToLocalStorage("registeredUsers", registeredUsers);
  let oldKey = transaction_name;
  transaction_name = `Transaction_${user.username}`;
  setToLocalStorage(transaction_name, transactionArr);
  removeFromLocaleStorage(oldKey);

  showUserName();

  alert("Setting saved successfully!");
}

// settings
function applyTheme(theme) {
  if (theme === "dark") {
    mode.classList.add("active");
    toggleKey.classList.add("active");
    document.body.classList.add("dark");
  } else {
    mode.classList.remove("active");
    toggleKey.classList.remove("active");
    document.body.classList.remove("dark");
  }
}

// utilities
function clearForm(form) {
  form.reset();
}

function getFormValues(form) {
  return {
    username: form.username.value.trim(),
    password: form.password.value.trim(),
  };
}

function displayTransactionModal() {
  transactionModal.style.display = "flex";
}
function closeTransactionModal() {
  transactionModal.style.display = "none";
}

// event listener functions
gotToRegister.addEventListener("click", () => {
  registerCard.style.display = "flex";
  loginCard.style.display = "none";
});
gotToLogin.addEventListener("click", () => {
  loginCard.style.display = "flex";
  registerCard.style.display = "none";
});

registerBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const { username, password } = getFormValues(registerForm);
  register(username, password);
  clearForm(registerForm);
});
loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const { username, password } = getFormValues(loginForm);
  login(username, password);
  clearForm(loginForm);
});

// sideButton active functions
sideBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    sideBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
  });
});

settingBtn.addEventListener("click", () => {
  dashboardPage.style.display = "none";
  mainColumn.style.display = "none";
  settingPage.style.display = "block";
  settingForm.username.value = user.username;
  settingForm.currency.value = user.currency;
});
dashboardBtn.addEventListener("click", () => {
  dashboardPage.style.display = "block";
  mainColumn.style.display = "grid";
  settingPage.style.display = "none";
});

mode.addEventListener("click", () => {
  theme = theme === "dark" ? "light" : "dark";
  localStorage.setItem("theme", theme);
  applyTheme(theme);
});

transactionBtn.addEventListener("click", () => {
  displayTransactionModal();
});
closeBtn.addEventListener("click", () => {
  closeTransactionModal();
});

saveTransactionBtn.addEventListener("click", (e) => {
  e.preventDefault();

  let dateString = new Date().toISOString().split("T")[0];
  let type = transactionForm.type.value;
  let description = transactionForm.description.value;
  let amount = parseFloat(transactionForm.amount.value);
  let date = transactionForm.date.value || dateString;
  let category = transactionForm.category.value;
  let id = Date.now();
  if (updateIndex != null) {
    id = transactionArr[updateIndex].id;
  }
  let obj = { id, type, description, amount, date, category };
  addTransaction(obj);
  updateIndex = null;
  displayUI();
  transactionForm.reset();
  closeTransactionModal();
});

tbody.addEventListener("click", (e) => {
  if (e.target.classList.contains("fa-pencil")) {
    editTransaction(e.target.dataset.id);
  }
  if (e.target.classList.contains("fa-trash")) {
    deleteTransaction(e.target.dataset.id);
  }
});

editProfileBtn.addEventListener("click", () => {
  let username = settingForm.username.value;
  let currency = settingForm.currency.value;
  profileSetting(username, currency);
});

search.addEventListener("change", () => {
  applyFilters();
});

searchInput.addEventListener("input", () => {
  applyFilters();
});
applyTheme(theme);
displayUI();