$(document).ready(function() {
  loadItems();

  $('#addItemBtn').click(function() {
    $('#itemFormContainer').toggle();
  });

  $('#addItemForm').submit(function(e) {
    e.preventDefault();
    let formData = $(this).serializeArray();
    
    $.ajax({
      url: '/items',
      method: 'POST',
      data: $.param(formData),
      success: function(response) {
        $('#itemFormContainer').hide();
        $('#addItemForm')[0].reset();
        loadItems();
      },
      error: function (error) {
        console.error('Error creating item:', error);
        alert('Error creating item. Please try again.');
      }
    });
  });

  function createItem(formData) {
    $.ajax({
      url: '/items',
      method: 'POST',
      data: $.param(formData),
      success: function(response) {
        $('#itemFormContainer').hide();
        $('#addItemForm')[0].reset();
        $('#newCategoryInput').hide();
        loadItems();
        updateCategorySelect();
      },
      error: function (error) {
        console.error('Error creating item:', error);
      }
    });
  }

  function loadItems() {
    $.ajax({
      url: '/api/items',
      method: 'GET',
      success: function(items) {
        let itemsHtml = '';
        items.forEach(item => {
          itemsHtml += `
            <div>
              <h3>${item.name}</h3>
              <p>${item.description}</p>
              <p>Price: $${item.price}</p>
              <p>Category: ${item.category.name}</p>
            </div>
          `;
        });
        $('#itemList').html(itemsHtml);
      },
      error: function(error) {
        console.error('Error loading items:', error);
      }
    });
  }

  function updateCategorySelect() {
    $.ajax({
      url: '/api/categories',
      method: 'GET',
      success: function(categories) {
        let categoryOptions = '';
        categories.forEach(category => {
          categoryOptions += `<option value="${category.id}">${category.name}</option>`;
        });
        $('#categorySelect').html(categoryOptions);
      },
      error: function(error) {
        console.error('Error loading categories:', error);
      }
    });
  }

  $('#showNewCategoryInput').click(function() {
    $('#newCategoryInput').toggle();
  });

  $('#addNewCategoryBtn').click(function() {
    let newCategoryName = $('#newCategoryName').val().trim();
    if (!newCategoryName) {
      alert("Please enter a name for the new category");
      return;
    }
    
    $.ajax({
      url: '/api/categories',  // Esta URL debe coincidir con la definida en tus rutas
      method: 'POST',
      data: JSON.stringify({ name: newCategoryName }),
      contentType: 'application/json',
      dataType: 'json',
      success: function(newCategory) {
        console.log('New category created:', newCategory);
        $('#categorySelect').append(`<option value="${newCategory.id}">${newCategory.name}</option>`);
        $('#categorySelect').val(newCategory.id);
        $('#newCategoryName').val('');
      },
      error: function(jqXHR, textStatus, errorThrown) {
        console.error('Error creating category:', jqXHR.responseText);
        alert('Error creating category: ' + (jqXHR.responseJSON?.error || 'Please try again.'));
      }
    });
  });
});
