document.getElementById("addItemBtn").addEventListener("click", function () {
  const itemFormContainer = document.getElementById("itemFormContainer");
  itemFormContainer.style.display =
    itemFormContainer.style.display === "none" ? "block" : "none";
});

document
  .getElementById("categorySelect")
  .addEventListener("change", function () {
    const newCategoryForm = document.getElementById("newCategoryForm");
    if (this.value === "") {
      newCategoryForm.style.display = "flex";
    } else {
      newCategoryForm.style.display = "none";
    }
  });

document
  .getElementById("addNewCategoryBtn")
  .addEventListener("click", function () {
    const newCategoryName = document
      .getElementById("newCategoryName")
      .value.trim();

    if (newCategoryName === "") {
      alert("Please enter a name for the new category");
      return;
    }

    fetch("/api/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newCategoryName }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((newCategory) => {
        const categorySelect = document.getElementById("categorySelect");
        const option = document.createElement("option");
        option.value = newCategory.id;
        option.textContent = newCategory.name;
        categorySelect.appendChild(option);

        categorySelect.value = newCategory.id;

        document.getElementById("newCategoryForm").style.display = "none";
        document.getElementById("newCategoryName").value = "";
      })
      .catch((error) => {
        console.error("Error creating category:", error);
        alert("Error creating category. Please try again.");
      });
  });
