//add checkbox to the list items so you can delete all selected
const nameInput = document.getElementById("name")
const addSection = document.getElementById("add-item-section")
const categoryInput = addSection.querySelector("#category-dropdown")
const amountInput = document.getElementById("amount")
const addBtn = document.getElementById("add-item-button")
const listTracker = document.getElementById("item-count-and-duplicate-display")
const displaySection = document.getElementById("shopping-list-display-section")
const displayCategoryInput = displaySection.querySelector("#category-dropdown")
const shoppingListContainer = document.getElementById("shopping-list")
const deleteSelectedBtn = document.getElementById("delete-selected-list")
const clearListBtn = document.getElementById("clear-shopping-list")

function getShoppingList(){
  try{
    let ShoppingListArr = JSON.parse(localStorage.getItem("ShoppingList")) || [];
    let validArr = false;
    ShoppingListArr.forEach((item)=>{
    if (item.name && item.category && item.amount){
      validArr = true;
    }
  });
  return validArr ? ShoppingListArr : []
  }catch(error){return []}
}

  function addShoppingListItem(e){
    e.preventDefault();
   const shoppingList = getShoppingList();
    const selectedCategory = categoryInput.options[categoryInput.selectedIndex].textContent;
    const listItem = {
    name:nameInput.value,
    category:selectedCategory,
    amount:amountInput.value
  }

  shoppingList.push(listItem)
  localStorage.setItem('ShoppingList',JSON.stringify(shoppingList))
  document.getElementById("duplicate-dialog-box")?.close()
  displayShoppingList()
  }

  let editIndex = null;
function getEditIndex(e){
    const shoppingList = getShoppingList();
    editIndex = e.target.getAttribute("data-index");
    console.log("Edit index:", editIndex);
    
    document.getElementById("update-name").value = shoppingList[editIndex].name;
    document.getElementById("update-category").selectedIndex = Array.from(document.getElementById("update-category").options).findIndex(option => option.textContent === shoppingList[editIndex].category);
    document.getElementById("update-amount").value = shoppingList[editIndex].amount;
}
  function updateListItem(e){
    e.preventDefault();
    const shoppingList = getShoppingList();
    const itemNameUpdate = document.getElementById("update-name").value.trim();
    const itemCategoryUpdate = document.getElementById("update-category").options[document.getElementById("update-category").selectedIndex].textContent;
    const itemAmountUpdate = document.getElementById("update-amount").value;
    const updateInfo = {
    name: itemNameUpdate,
    category:itemCategoryUpdate,
    amount:itemAmountUpdate
  }
  const shoppingListForCheck = shoppingList.slice(0, editIndex).concat(shoppingList.slice(editIndex + 1));
  console.log("Shopping list for check:", shoppingListForCheck);
  const isDuplicate = shoppingListForCheck.some(item => item.name.toLowerCase() === itemNameUpdate.toLowerCase() && item.category.toLowerCase() === itemCategoryUpdate.toLowerCase());
  if (isDuplicate) {
    alert("Item already exists in the list. Please choose a different name or category.");
    return;
  }
  shoppingList[editIndex] = updateInfo;
  console.log(shoppingList)
    localStorage.setItem("ShoppingList", JSON.stringify(shoppingList));
    document.getElementById("update-name").value = ""
    document.getElementById("update-amount").value = ""
    document.getElementById("update-item-dialog")?.close()
    displayShoppingList();
  }

  function captureDuplicateItem(e){
    e.preventDefault();
    const shoppingList = getShoppingList();
    const itemName = nameInput.value.trim();
    const itemCategory = categoryInput.options[categoryInput.selectedIndex].textContent;
    const isDuplicate = shoppingList.some(item => item.name.toLowerCase() === itemName.toLowerCase() && item.category.toLowerCase() === itemCategory.toLowerCase());
    if (isDuplicate) {
      const dialog = document.createElement("div")
      dialog.setAttribute("id", "duplicate-dialog")
      const dialogHTML = `<dialog id="duplicate-dialog-box">
        <p>Item already exists in the list.</p>
        <div class="duplicate-item-dialog-btns">
        <button onclick="addShoppingListItem(event)" id="add-duplicate-button">Add</button>
        <button onclick="this.closest('dialog').close(); nameInput.value = '' ;amountInput.value = ''" id="cancel-duplicate-button">Cancel</button>
        </div>
        </dialog>`
      dialog.innerHTML = dialogHTML
      addSection.appendChild(dialog);
      document.getElementById("duplicate-dialog-box").showModal();
      return;
    }
    addShoppingListItem(e);
  }

  function updateListTracker(){
let totalItemCount = 0
let foodItemCount = 0
let electronicItemCount = 0
let clothingItemCount = 0

    const shoppingList = getShoppingList();
    shoppingList.forEach((item)=>{
      totalItemCount++
  if (item.category === "Food") foodItemCount++
  else if (item.category === "Electronics") electronicItemCount++
  else if (item.category === "Clothes") clothingItemCount++  
})
    const listTrackerHTML = `<h2>List Tracker</h2>
            <h4>Total Item Count: ${totalItemCount} ${totalItemCount === 1 ? 'item' : 'items'}</h4>
            <h4>Food: ${foodItemCount} ${foodItemCount === 1 ? 'item' : 'items'}</h4>
            <h4>Electronic: ${electronicItemCount} ${electronicItemCount === 1 ? 'item' : 'items'}</h4>
            <h4>Clothes: ${clothingItemCount} ${clothingItemCount === 1 ? 'item' : 'items'}</h4>`
    listTracker.innerHTML = listTrackerHTML
}

  function removeShoppingListItem(){
    const shoppingList = getShoppingList();
    const itemsToDelete = [];
    const checkedCheckboxes = document.querySelectorAll("#shopping-list input[type='checkbox']:checked");
    checkedCheckboxes.forEach(checkbox => {
      const index = checkbox.getAttribute("data-index");
      itemsToDelete.push(index);
    });
    itemsToDelete.sort((a, b) => b - a);
    itemsToDelete.forEach(item => {      
      const deleteIndex = parseInt(item);
      shoppingList.splice(deleteIndex, 1);
    });
    localStorage.setItem('ShoppingList', JSON.stringify(shoppingList));
    displayShoppingList();
  }

  function displayShoppingList(){
const selectedCategory = displayCategoryInput.options[displayCategoryInput.selectedIndex].textContent;
    const shoppingList = getShoppingList();
    shoppingListContainer.innerHTML = "";
    shoppingList.forEach((item,index)=> {
     
    const row = document.createElement("div");
          // LINK 1: Apply the grid row structure class
    row.className = "shopping-list-item";
    row.classList.add("hidden");
    row.classList.add(`${item.category.toLowerCase()}-item`); // Add category-specific class for styling
    row.setAttribute("data-index", index); // Store the index for later reference
    // Inject the inner elements with their linked classes
    row.innerHTML = `
        <input type="checkbox" id="item-chk-${index}" Class = "update-${index}" data-index="${index}">

        <!-- The label automatically styled by: .shopping-list-item label -->
        <label for="item-chk-${index}" class="item-name">${item.name}</label>
        
        <!-- LINK 2: Styled by .item-category -->
        <span class="item-category" class="item-category-${index}">${item.category}</span>
        
        <!-- LINK 3: Styled by .item-amount -->
        <span class="item-amount" class="item-amount-${index}">${item.amount}</span>

        <button type="button" onclick="document.getElementById('update-item-dialog').showModal(); getEditIndex(event)" class="edit-item-button" data-index="${index}">Edit</button>
    `; 
    // 3. Append the perfectly structured row to your list
    shoppingListContainer.appendChild(row);
    })
    if (selectedCategory === "All"){
      document.querySelectorAll(".shopping-list-item").forEach(item => item.classList.remove("hidden"))
    }else if (selectedCategory === "Food"){
      document.querySelectorAll(".food-item").forEach(item => {
        if (item.classList.contains("food-item")){
          item.classList.remove("hidden")
        }else{
          item.classList.add("hidden")
        }
      })
    }else if (selectedCategory === "Electronics"){
      document.querySelectorAll(".electronics-item").forEach(item => {
        if (item.classList.contains("electronics-item")){
          item.classList.remove("hidden")
        }else{
          item.classList.add("hidden")
        }
      })
    }else if (selectedCategory === "Clothes"){
      document.querySelectorAll(".clothes-item").forEach(item => {
        if (item.classList.contains("clothes-item")){
          item.classList.remove("hidden")
        }else{         
          item.classList.add("hidden")
        }
      })
    }
    updateListTracker()
    nameInput.value = ""
    amountInput.value = ""
  }


  function clearShoppingList(){
    localStorage.removeItem("ShoppingList");
    displayShoppingList();
  }

  document.addEventListener("DOMContentLoaded", updateListTracker)
  clearListBtn.addEventListener("click",clearShoppingList)
  displayCategoryInput.addEventListener("change",displayShoppingList)
  document.addEventListener("DOMContentLoaded", displayShoppingList)
  deleteSelectedBtn.addEventListener("click",removeShoppingListItem)