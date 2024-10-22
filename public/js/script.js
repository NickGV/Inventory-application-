document.getElementById("addItemBtn").addEventListener("click", toggleItemForm);

function toggleItemForm() {
  const itemFormContainer = document.getElementById("itemFormContainer");
  const addItemForm = document.getElementById("addItemForm");
  const submitButton = addItemForm.querySelector('button[type="submit"]');

  if (itemFormContainer.style.display === "none") {
    itemFormContainer.style.display = "block";
  } else {
    itemFormContainer.style.display = "none";
    addItemForm.reset();
    addItemForm.action = "/items";
    addItemForm.method = "POST";
    submitButton.textContent = "Add Item";
    const methodInput = addItemForm.querySelector('input[name="_method"]');
    if (methodInput) {
      methodInput.remove();
    }
  }
}

document
  .getElementById("categorySelect")
  .addEventListener("change", handleCategoryChange);

function handleCategoryChange() {
  const newCategoryForm = document.getElementById("newCategoryForm");
  newCategoryForm.style.display = this.value === "" ? "flex" : "none";
}

document
  .getElementById("addNewCategoryBtn")
  .addEventListener("click", addNewCategory);

function addNewCategory() {
  const newCategoryName = document
    .getElementById("newCategoryName")
    .value.trim();

  if (newCategoryName === "") {
    alert("Please enter a name for the new category");
    return;
  }

  fetch("/categories", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: newCategoryName }),
  })
    .then((response) => response.json())
    .then((newCategory) => {
      updateCategorySelect(newCategory);
    })
    .catch((error) => {
      console.error("Error creating new category:", error);
      alert("Error creating new category. Please try again.");
    });
}

function updateCategorySelect(newCategory) {
  const categorySelect = document.getElementById("categorySelect");
  const option = document.createElement("option");
  option.value = newCategory.id;
  option.textContent = newCategory.name;
  categorySelect.insertBefore(option, categorySelect.lastElementChild);
  categorySelect.value = newCategory.id;

  document.getElementById("newCategoryForm").style.display = "none";
  document.getElementById("newCategoryName").value = "";
  addCategoryButtons(newCategory);
}

function addCategoryButtons(category) {
  const categoryList = document.getElementById("categoryList");
  const li = document.createElement("li");
  li.dataset.id = category.id;
  li.innerHTML = `
    ${category.name}
    <div class="categoryButtons">
    <button class="editCategory" data-id="${category.id}">Edit</button>
    <button class="deleteCategory" data-id="${category.id}">Delete</button>
    </div>
  `;
  categoryList.appendChild(li);
}

document.getElementById("categoryList").addEventListener("click", function (e) {
  if (e.target.classList.contains("editCategory")) {
    editCategory(e.target.dataset.id);
  } else if (e.target.classList.contains("deleteCategory")) {
    deleteCategory(e.target.dataset.id);
  }
});

function editCategory(categoryId) {
  const newName = prompt("Enter new category name:");
  if (newName) {
    fetch(`/categories/${categoryId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newName }),
    })
      .then((response) => response.json())
      .then((updatedCategory) => {
        // Update the category name in the select and list
        const option = document.querySelector(
          `#categorySelect option[value="${categoryId}"]`
        );
        option.textContent = updatedCategory.name;
        const listItem = document.querySelector(
          `#categoryList li[data-id="${categoryId}"]`
        );
        listItem.firstChild.textContent = updatedCategory.name;
      })
      .catch((error) => {
        console.error("Error updating category:", error);
        alert("Error updating category. Please try again.");
      });
  }
}

function deleteCategory(categoryId) {
  if (confirm("Are you sure you want to delete this category?")) {
    fetch(`/categories/${categoryId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        // Remove the category from the select and list
        const option = document.querySelector(
          `#categorySelect option[value="${categoryId}"]`
        );
        option.remove();
        const listItem = document.querySelector(
          `#categoryList li[data-id="${categoryId}"]`
        );
        listItem.remove();
      })
      .catch((error) => {
        console.error("Error deleting category:", error);
        alert("Error deleting category. Please try again.");
      });
  }
}

// Add this new function
function toggleCategoryList() {
  const categoryList = document.getElementById("categoryList");
  const toggleButton = document.getElementById("toggleCategoriesBtn");

  if (categoryList.style.display === "none") {
    categoryList.style.display = "block";
    toggleButton.textContent = "Hide Categories";
  } else {
    categoryList.style.display = "none";
    toggleButton.textContent = "Show Categories";
  }
}

// Add this event listener
document
  .getElementById("toggleCategoriesBtn")
  .addEventListener("click", toggleCategoryList);

// Modify the DOMContentLoaded event listener
document.addEventListener("DOMContentLoaded", function () {
  fetch("/categories")
    .then((response) => response.json())
    .then((categories) => {
      const categoryList = document.getElementById("categoryList");
      categories.forEach((category) => {
        addCategoryButtons(category);
      });
    })
    .catch((error) => {
      console.error("Error loading categories:", error);
    });
});

document.querySelectorAll("#deleteItemBtn").forEach((deleteItemBtn) => {
  deleteItemBtn.addEventListener("click", () =>
    deleteItem(deleteItemBtn.dataset.id)
  );
});

function deleteItem(itemId) {
  console.log(itemId);
  fetch(`/items/${itemId}`, {
    method: "DELETE",
  }).then((response) => {
    console.alert("Item deleted");
    window.location.href = "";
  });
}

// Add this event listener for edit buttons
document.querySelectorAll("#editItemBtn").forEach((editItemBtn) => {
  editItemBtn.addEventListener("click", () => editItem(editItemBtn.dataset.id));
});

function editItem(itemId) {
  fetch(`/items/${itemId}`)
    .then((response) => response.json())
    .then((item) => {
      const form = document.getElementById("addItemForm");
      form.action = `/items/${itemId}`;
      form.method = "POST";

      document.querySelector('input[name="name"]').value = item.name;
      document.querySelector('textarea[name="description"]').value = item.description;
      document.querySelector('input[name="price"]').value = item.price;
      document.querySelector('select[name="categoryId"]').value = item.Category ? item.Category.id : '';

      const submitButton = form.querySelector('button[type="submit"]');
      submitButton.textContent = "Update Item";

      // Add a hidden input for the PUT method
      const methodInput = document.createElement('input');
      methodInput.type = 'hidden';
      methodInput.name = '_method';
      methodInput.value = 'PUT';
      form.appendChild(methodInput);

      document.getElementById("itemFormContainer").style.display = "block";
    })
    .catch((error) => {
      console.error("Error fetching item details:", error);
      alert("Error fetching item details. Please try again.");
    });
}
