// const AppEx = (function (ItemCtrl, UI, StorageCtrl) {
//   //Event listeners
//   const loadEventListenersEx = function () {
//     //Add item
//     document.querySelector(".addEx").addEventListener("click", itemAddSubmit);
//     //Edit click event
//     document
//       .querySelector("#item-list")
//       .addEventListener("click", UI.itemEditClick);
//     //Update item event
//     document
//       .querySelector(".update-btn")
//       .addEventListener("click", UI.itemUpdateSubmit);
//     //Persisting the update to storage
//     document
//       .querySelector(".update-btn")
//       .addEventListener("click", StorageCtrl.updateItemFromStorage);
//     //Back button event
//     document
//       .querySelector(".back-btn")
//       .addEventListener("click", UI.clearEditState);
//     //Delete item event
//     document.querySelector(".delete-btn").addEventListener("click", () => {
//       UI.deleteItem();
//       StorageCtrl.deleteItemFromStorage();
//     });
//     //Delete all
//     document.querySelector(".delete-all-btn").addEventListener("click", () => {
//       StorageCtrl.deleteAllFromStorage();
//       ItemCtrl.getItems();
//       UI.showTotalCalories();
//       UI.deleteAllFromUI();
//       UI.clearFields();
//       UI.clearEditState();
//     });
//   };

//   //Add item submit
//   const itemAddSubmitEx = function (t) {
//     t.preventDefault();
//     const inputEx = UI.getItemInput();
//     if (input.name !== "" && input.calories !== "") {
//       const newItemEx = ItemCtrl.addItem(input.name, input.calories);
//       UI.addListItem(newItem);

//       //Get totoal calories
//       const sumCaloriesEx = ItemCtrl.sumCalories();
//       //Updating total calories in the UI
//       UI.showTotalCalories(sumCalories);

//       //Store the item in localStorage
//       StorageCtrl.storeItem(newItem);

//       //Clearing the input fields
//       UI.clearFields();
//     }
//   };

//   return {
//     init: function () {
//       //Clear edit state
//       UI.clearEditState();
//       console.log("Starting the app...");
//       //Fetching the items
//       const items = ItemCtrl.getItems();
//       //Populating the list with items
//       UI.populateItems(items);
//       //Calculating the callories
//       const sumCalories = ItemCtrl.sumCalories();
//       UI.showTotalCalories(sumCalories);
//       //Load event listeners
//       loadEventListeners();
//     },
//   };
// })(ItemCtrl, UI, StorageCtrl);

// AppEx.init();

// //Item controller
// const ItemCtrl = (function () {
//   class Item {
//     constructor(id, name, calories) {
//       this.id = id;
//       this.name = name;
//       this.calories = calories;
//     }
//   }

//   const data = {
//     items: StorageCtrl.getItemsFromStorage(),
//     currentItem: null,
//     totalCalories: 0,
//   };

//   getItems: function getItems() {
//     return data.items;
//   }

//   addItem: function addItem(name, calories) {
//     //Createing IDs
//     let ID;
//     if (data.items.length > 0) {
//       ID = data.items[data.items.length - 1].id + 1;
//     } else {
//       ID = 0;
//     }

//     calories = parseInt(calories);

//     const newItem = new Item(ID, name, calories);
//     data.items.push(newItem);
//     return newItem;
//   }

//   sumCalories: function sumCalories() {
//     let totalCalories = 0;
//     data.items.forEach((x) => (totalCalories += x.calories));
//     data.totalCalories = totalCalories;
//     return totalCalories;
//   }

//   getItemById: function getItemById(id) {
//     let found = null;
//     data.items.forEach((x) => {
//       if (x.id === id) {
//         found = x;
//       }
//     });
//     return found;
//   }

//   setCurrentItem: function setCurrentItem(item) {
//     data.currentItem = item;
//   }

//   getCurrentItem: function getCurrentItem() {
//     return data.currentItem;
//   }

//   updateItem: function updateItem(name, calories) {
//     calories = parseInt(calories);

//     let found = null;
//     data.items.forEach((item) => {
//       if (item.id === data.currentItem.id) {
//         item.name = name;
//         item.calories = calories;
//         found = item;
//       }
//     });

//     return found;
//   }

//   findToDelete: function findToDelete() {
//     UI.clearFields();
//     let item = getCurrentItem();
//     return item;
//   }

//   deleteItemData: function deleteItemData(item) {
//     data.items.forEach((x) => {
//       if (x.id === item.id) {
//         data.items.splice(x.id, 1);
//       }
//     });
//   }

//   logData: function logData() {
//     return data;
//   }

//   nullifyTotalCallories: function nullifyTotalCallories() {
//     data.totalCalories = 0;
//   }

//   return {
//     data,
//     getItems,
//     logData,
//     addItem,
//     sumCalories,
//     getItemById,
//     setCurrentItem,
//     getCurrentItem,
//     updateItem,
//     findToDelete,
//     deleteItemData,
//     nullifyTotalCallories,
//   };
// })();
