let users = JSON.parse(localStorage.getItem("users")) || [];
let currentUser = null;

let cart = [];
let orders = [];

// 🔐 LOGIN
function login() {
  let user = document.getElementById("loginUser").value;
  let pass = document.getElementById("loginPass").value;

  let found = users.find(u => u.username === user && u.password === pass);

  if (found) {
    currentUser = found;
    document.getElementById("authContainer").classList.add("hidden");
    document.getElementById("mainApp").classList.remove("hidden");
    document.getElementById("profileName").innerText = user;
  } else {
    alert("Invalid Credentials!");
  }
}

// 🆕 SIGNUP
function signup() {
  let user = document.getElementById("signupUser").value;
  let pass = document.getElementById("signupPass").value;

  if (!user || !pass) {
    alert("Fill all fields!");
    return;
  }

  users.push({ username: user, password: pass });
  localStorage.setItem("users", JSON.stringify(users));

  alert("Account Created!");
  showLogin();
}

// 🔄 SWITCH AUTH
function showSignup() {
  document.querySelector(".auth-box").classList.add("hidden");
  document.getElementById("signupBox").classList.remove("hidden");
}

function showLogin() {
  document.querySelector(".auth-box").classList.remove("hidden");
  document.getElementById("signupBox").classList.add("hidden");
}

// 🚪 LOGOUT
function logout() {
  location.reload();
}

// 📂 SECTION SWITCH
function showSection(section) {
  document.querySelectorAll(".section").forEach(sec => sec.classList.add("hidden"));
  document.getElementById(section).classList.remove("hidden");
}

// 🛍 ADD TO CART
function addToCart(name, price) {
  cart.push({ name, price });
  updateCart();
}

// 🛒 UPDATE CART
function updateCart() {
  let list = document.getElementById("cartItems");
  list.innerHTML = "";

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;

    let li = document.createElement("li");
    li.innerHTML = `${item.name} - ₹${item.price} 
      <button onclick="removeItem(${index})">❌</button>`;
    list.appendChild(li);
  });

  document.getElementById("total").innerText = total;
}

// ❌ REMOVE ITEM
function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}

// 💳 CHECKOUT
function checkout() {
  if (cart.length === 0) {
    alert("Cart is empty!");
    return;
  }

  orders.push([...cart]);
  updateOrders();

  alert("🎉 Order Placed Successfully!");

  cart = [];
  updateCart();
}

// 📦 UPDATE ORDERS
function updateOrders() {
  let list = document.getElementById("orderList");
  list.innerHTML = "";

  orders.forEach((order, i) => {
    let li = document.createElement("li");
    li.innerText = `Order ${i + 1} - ${order.length} items`;
    list.appendChild(li);
  });
}