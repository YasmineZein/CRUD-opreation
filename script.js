// Array to store users
let users = JSON.parse(localStorage.getItem('users')) || [];

// Form and table elements
const userForm = document.getElementById('userForm');
const userTable = document.getElementById('userTable');

// Add or Update User
function addUser() {
  const name = document.getElementById('name').value.trim();
  const balance = parseFloat(document.getElementById('balance').value.trim());
  const userId = document.getElementById('userId').value;

  if (name === '' || isNaN(balance)) {
    alert('Please fill out all fields correctly.');
    return;
  }

  if (userId) {
    // Update existing user
    const userIndex = users.findIndex(user => user.id === parseInt(userId));
    if (userIndex !== -1) {
      users[userIndex].name = name;
      users[userIndex].balance = balance;
      alert('User updated successfully!');
    }
  } else {
    // Add new user
    const newUser = {
      id: users.length ? users[users.length - 1].id + 1 : 1,
      name,
      balance,
    };
    users.push(newUser);
    alert('User added successfully!');
  }

  // Save to localStorage and refresh table
  saveUsers();
  renderUsers();
  userForm.reset();
}

// Edit User by ID
function editUserByBalanceId(id) {
  const user = users.find(user => user.id === id);
  if (user) {
    document.getElementById('name').value = user.name;
    document.getElementById('balance').value = user.balance;
    document.getElementById('userId').value = user.id;
  }
}

// Delete User by ID
function deleteUserById(id) {
  users = users.filter(user => user.id !== id);
  alert('User deleted successfully!');

  // Save to localStorage and refresh table
  saveUsers();
  renderUsers();
}

// Save users to localStorage
function saveUsers() {
  localStorage.setItem('users', JSON.stringify(users));
}

// Render users in table
function renderUsers() {
  userTable.innerHTML = '';
  users.forEach((user, index) => {
    userTable.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${user.name}</td>
        <td>${user.id}</td>
        <td>${user.balance.toFixed(2)}</td>
        <td>
          <button class="btn btn-sm btn-success" onclick="editUserByBalanceId(${user.id})">Edit</button>
          <button class="btn btn-sm btn-danger" onclick="deleteUserById(${user.id})">Delete</button>
        </td>
      </tr>
    `;
  });
}

// Form submission handler
userForm.addEventListener('submit', function (e) {
  e.preventDefault();
  addUser();
});

// Render users on page load
renderUsers();
