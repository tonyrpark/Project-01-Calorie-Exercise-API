//This code was taken from Bootstrap and modified to fit our project

//Storage controller
const StorageCtrl = (function () {
  storeItem: function storeItem(item) {
    let items;
    //Check if any items in localStorage
    if (localStorage.getItem("items") === null) {
      items = [];
      items.push(item);
      localStorage.setItem("items", JSON.stringify(items));
    } else {
      items = JSON.parse(localStorage.getItem("items"));
      items.push(item);
      localStorage.setItem("items", JSON.stringify(items));
    }
  }
  getItemsFromStorage: function getItemsFromStorage() {
    let items;
    if (localStorage.getItem("items") === null) {
      items = [];
    } else {
      items = JSON.parse(localStorage.getItem("items"));
    }
    return items;
  }
  deleteItemFromStorage: function deleteItemFromStorage() {
    let item = ItemCtrl.findToDelete();
    console.log(item);
    let items = getItemsFromStorage();
    items.forEach((x) => {
      if (x.id == item.id) {
        items.splice(x.id, 1);
      }
    });
    localStorage.setItem("items", JSON.stringify(items));
  }

  updateItemFromStorage: function updateItemFromStorage() {
    let items = ItemCtrl.data.items;
    localStorage.setItem("items", JSON.stringify(items));
  }

  deleteAllFromStorage: function deleteAllFromStorage() {
    localStorage.removeItem("items");
    ItemCtrl.nullifyTotalCallories();
  }

  return {
    storeItem,
    getItemsFromStorage,
    deleteItemFromStorage,
    updateItemFromStorage,
    deleteAllFromStorage,
  };
})();

//Item controller
const ItemCtrl = (function () {
  class Item {
    constructor(id, name, calories) {
      this.id = id;
      this.name = name;
      this.calories = calories;
    }
  }

  const data = {
    items: StorageCtrl.getItemsFromStorage(),
    currentItem: null,
    totalCalories: 0,
  };

  getItems: function getItems() {
    return data.items;
  }

  addItem: function addItem(name, calories) {
    //Creating IDs
    let ID;
    if (data.items.length > 0) {
      ID = data.items[data.items.length - 1].id + 1;
    } else {
      ID = 0;
    }

    calories = parseInt(calories);

    const newItem = new Item(ID, name, calories);
    data.items.push(newItem);
    return newItem;
  }

  sumCalories: function sumCalories() {
    let totalCalories = 0;
    data.items.forEach((x) => (totalCalories += x.calories));
    data.totalCalories = totalCalories;
    return totalCalories;
  }

  getItemById: function getItemById(id) {
    let found = null;
    data.items.forEach((x) => {
      if (x.id === id) {
        found = x;
      }
    });
    return found;
  }

  setCurrentItem: function setCurrentItem(item) {
    data.currentItem = item;
  }

  getCurrentItem: function getCurrentItem() {
    return data.currentItem;
  }

  updateItem: function updateItem(name, calories) {
    calories = parseInt(calories);

    let found = null;
    data.items.forEach((item) => {
      if (item.id === data.currentItem.id) {
        item.name = name;
        item.calories = calories;
        found = item;
      }
    });

    return found;
  }

  findToDelete: function findToDelete() {
    UI.clearFields();
    let item = getCurrentItem();
    return item;
  }

  deleteItemData: function deleteItemData(item) {
    data.items.forEach((x) => {
      if (x.id === item.id) {
        data.items.splice(x.id, 1);
      }
    });
  }

  logData: function logData() {
    return data;
  }

  nullifyTotalCallories: function nullifyTotalCallories() {
    data.totalCalories = 0;
  }

  return {
    data,
    getItems,
    logData,
    addItem,
    sumCalories,
    getItemById,
    setCurrentItem,
    getCurrentItem,
    updateItem,
    findToDelete,
    deleteItemData,
    nullifyTotalCallories,
  };
})();

// UI controller
const UI = (function () {
  populateItems: function populateItems(items) {
    let listItems = "";
    items.forEach((item) => {
      listItems += `<li class="list-group-item" id="item-${item.id}">
      <strong>${item.name}: </strong>
      <em>${item.calories} Calories</em>
      <small>
        <a href="#">
          <i class="edit-item fa fa-pencil mt-1 float-right"></i>
        </a>
      </small>
    </li>`;
    });
    //Inserting the list items
    document.querySelector("#item-list").innerHTML = listItems;
  }

  getItemInput: function getItemInput() {
    return {
      name: document.querySelector(".item-name").value,
      calories: document.querySelector(".item-calories").value,
    };
  }

  addListItem: function addListItem(item) {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.id = `item-${item.id}`;
    li.innerHTML = `<strong>${item.name}: </strong>
      <em>${item.calories} Calories</em>
      <small>
        <a href="#">
          <i class="edit-item fa fa-pencil mt-1 float-right"></i>
        </a>
      </small>`;
    document.querySelector("#item-list").insertAdjacentElement("beforeend", li);
  }

  clearFields: function clearFields() {
    document.querySelector(".item-name").value = "";
    document.querySelector(".item-calories").value = "";
  }

  clearEditState: function clearEditState() {
    UI.clearFields();
    document.querySelector(".update-btn").style.display = "none";
    document.querySelector(".delete-btn").style.display = "none";
    document.querySelector(".delete-all-btn").style.display = "none";
    document.querySelector(".back-btn").style.display = "none";
    document.querySelector(".add-btn").style.display = "inline";
  }

  showEditState: function showEditState() {
    document.querySelector(".update-btn").style.display = "inline";
    document.querySelector(".delete-btn").style.display = "inline";
    document.querySelector(".delete-all-btn").style.display = "inline";
    document.querySelector(".back-btn").style.display = "inline";
    document.querySelector(".add-btn").style.display = "none";
  }

  showTotalCalories = function showTotalCalories(sumCalories) {
    document.querySelector(".total-calories").textContent = sumCalories;
  };

  addItemToForm: function addItemToForm() {
    document.querySelector(".item-name").value = ItemCtrl.getCurrentItem().name;
    document.querySelector(
      ".item-calories"
    ).value = ItemCtrl.getCurrentItem().calories;
    UI.showEditState();
  }

  //Click edit item
  const itemEditClick = function (e) {
    e.preventDefault();

    if (e.target.classList.contains("edit-item")) {
      //Get list item ID
      const listId = e.target.parentNode.parentNode.parentNode.id;

      const listIdArr = listId.split("-");
      const id = parseInt(listIdArr[1]);
      const itemToEdit = ItemCtrl.getItemById(id);
      ItemCtrl.setCurrentItem(itemToEdit);

      //Adding item to the form
      UI.addItemToForm();
    }
  };

  //Update item
  const itemUpdateSubmit = function itemUpdateSubmit(e) {
    e.preventDefault();
    const input = UI.getItemInput();
    const updatedItem = ItemCtrl.updateItem(input.name, input.calories);

    //Update the UI
    UI.updateListItem(updatedItem);

    //Get total calories
    const sumCalories = ItemCtrl.sumCalories();
    //Updating total calories in the UI
    UI.showTotalCalories(sumCalories);
    UI.clearEditState();
  };

  updateListItem: function updateListItem(item) {
    let listItems = document.querySelectorAll("#item-list li");
    //converting the listItems nodelist to array
    listItems = Array.from(listItems);

    listItems.forEach((x) => {
      const itemID = x.getAttribute("id");

      if (itemID === `item-${item.id}`) {
        document.querySelector(
          `#${itemID}`
        ).innerHTML = `<strong>${item.name}: </strong>
          <em>${item.calories} Calories</em>
          <small>
            <a href="#">
              <i class="edit-item fa fa-pencil mt-1 float-right"></i>
            </a>
          </small>`;
      }
    });
  }

  deleteItem: function deleteItem() {
    let item = ItemCtrl.findToDelete();

    let listItems = document.querySelectorAll("#item-list li");

    //converting the listItems nodelist to array
    listItems = Array.from(listItems);

    listItems.forEach((x) => {
      const itemID = x.getAttribute("id");

      //deleting the item
      ItemCtrl.deleteItemData(item);

      //deleting the item from the UI
      if (itemID === `item-${item.id}`) {
        document.getElementById(`item-${item.id}`).remove();
      }

      //Get totoal calories
      const sumCalories = ItemCtrl.sumCalories();
      //Updating total calories in the UI
      UI.showTotalCalories(sumCalories);
    });
  }

  deleteAllFromUI: function deleteAllFromUI() {
    document.querySelector("#item-list").innerHTML = "";
    document.querySelector(".total-calories").textContent = 0;
  }

  return {
    populateItems,
    getItemInput,
    addListItem,
    clearFields,
    showTotalCalories,
    clearEditState,
    itemEditClick,
    addItemToForm,
    showEditState,
    itemUpdateSubmit,
    updateListItem,
    clearFields,
    deleteItem,
    deleteAllFromUI,
  };
})();

// App controller
const App = (function (ItemCtrl, UI, StorageCtrl) {
  //Event listeners
  const loadEventListeners = function () {
    //Add item
    document.querySelector(".add-btn").addEventListener("click", itemAddSubmit);
    //Edit click event
    document
      .querySelector("#item-list")
      .addEventListener("click", UI.itemEditClick);
    //Update item event
    document
      .querySelector(".update-btn")
      .addEventListener("click", UI.itemUpdateSubmit);
    //Persisting the update to storage
    document
      .querySelector(".update-btn")
      .addEventListener("click", StorageCtrl.updateItemFromStorage);
    //Back button event
    document
      .querySelector(".back-btn")
      .addEventListener("click", UI.clearEditState);
    //Delete item event
    document.querySelector(".delete-btn").addEventListener("click", () => {
      UI.deleteItem();
      StorageCtrl.deleteItemFromStorage();
    });
    //Delete all
    document.querySelector(".delete-all-btn").addEventListener("click", () => {
      StorageCtrl.deleteAllFromStorage();
      ItemCtrl.getItems();
      UI.showTotalCalories();
      UI.deleteAllFromUI();
      UI.clearFields();
      UI.clearEditState();
    });
  };

  //Add item submit
  const itemAddSubmit = function (e) {
    e.preventDefault();
    const input = UI.getItemInput();
    if (input.name !== "" && input.calories !== "") {
      const newItem = ItemCtrl.addItem(input.name, input.calories);
      UI.addListItem(newItem);

      //Get totoal calories
      const sumCalories = ItemCtrl.sumCalories();
      //Updating total calories in the UI
      UI.showTotalCalories(sumCalories);

      //Store the item in localStorage
      StorageCtrl.storeItem(newItem);

      //Clearing the input fields
      UI.clearFields();
    }
  };

  return {
    init: function () {
      //Clear edit state
      UI.clearEditState();
      console.log("Starting the app...");
      //Fetching the items
      const items = ItemCtrl.getItems();
      //Populating the list with items
      UI.populateItems(items);
      //Calculating the callories
      const sumCalories = ItemCtrl.sumCalories();
      UI.showTotalCalories(sumCalories);
      //Load event listeners
      loadEventListeners();
    },
  };
})(ItemCtrl, UI, StorageCtrl);

App.init();

// TONY'S CODE TO ADD FOR EX INPUT
const AppEx = (function (ItemCtrl, UI, StorageCtrl) {
  //Event listeners
  const loadEventListenersEx = function () {
    //Add item
    document.querySelector(".addEx").addEventListener("click", itemAddSubmit);
    //Edit click event
    document
      .querySelector("#item-list")
      .addEventListener("click", UI.itemEditClick);
    //Update item event
    document
      .querySelector(".update-btn")
      .addEventListener("click", UI.itemUpdateSubmit);
    //Persisting the update to storage
    document
      .querySelector(".update-btn")
      .addEventListener("click", StorageCtrl.updateItemFromStorage);
    //Back button event
    document
      .querySelector(".back-btn")
      .addEventListener("click", UI.clearEditState);
    //Delete item event
    document.querySelector(".delete-btn").addEventListener("click", () => {
      UI.deleteItem();
      StorageCtrl.deleteItemFromStorage();
    });
    //Delete all
    document.querySelector(".delete-all-btn").addEventListener("click", () => {
      StorageCtrl.deleteAllFromStorage();
      ItemCtrl.getItems();
      UI.showTotalCalories();
      UI.deleteAllFromUI();
      UI.clearFields();
      UI.clearEditState();
    });
  };

  //Add item submit
  const itemAddSubmitEx = function (t) {
    t.preventDefault();
    const inputEx = UI.getItemInput();
    if (input.name !== "" && input.calories !== "") {
      const newItemEx = ItemCtrl.addItem(input.name, input.calories);
      UI.addListItem(newItem);

      //Get totoal calories
      const sumCaloriesEx = ItemCtrl.sumCalories();
      //Updating total calories in the UI
      UI.showTotalCalories(sumCalories);

      //Store the item in localStorage
      StorageCtrl.storeItem(newItem);

      //Clearing the input fields
      UI.clearFields();
    }
  };

  return {
    init: function () {
      //Clear edit state
      UI.clearEditState();
      console.log("Starting the app...");
      //Fetching the items
      const items = ItemCtrl.getItems();
      //Populating the list with items
      UI.populateItems(items);
      //Calculating the callories
      const sumCalories = ItemCtrl.sumCalories();
      UI.showTotalCalories(sumCalories);
      //Load event listeners
      // loadEventListeners();
    },
  };
})(ItemCtrl, UI, StorageCtrl);

AppEx.init();

//END OF TONY'S CODE
