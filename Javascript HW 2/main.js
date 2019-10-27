let inputCreate = document.getElementById("input-create");
let buttonCreate = document.getElementById("btn-create");
let list = document.getElementById("todo-list");
let doneList = document.getElementById("done-list");
let inputFilterDone = document.getElementById("input-filter-done");

buttonCreate.addEventListener("click", function() {
  let value = inputCreate.value;
  if (!isStringEmptyOrWhiteSpace(value)) {
    addItemToDom(value);
    inputCreate.value = "";
  }
});

inputFilterDone.addEventListener("input", event => {
  let value = inputFilterDone.value;
  if (!isStringEmptyOrWhiteSpace(value)) {
    doneList.childNodes.forEach(element => filterListItem(element, value))
  } else
    doneList.childNodes.forEach(element => (element.style.display = "block"));
});

function addItemToDom(value) {
  let itemView = `
      <div class="item">
        <span class="item-text">${value}</span>
        <span class="secondary-content">
          <div class="item-btn item-btn-del btn-floating btn-small waves-effect waves-light red">x</div>
        </span>
      </div>`;

  let item = document.createElement("li");
  item.classList = "collection-item";
  item.innerHTML = itemView;

  let buttonDelete = item.getElementsByClassName("item-btn-del")[0];
  buttonDelete.addEventListener("click", event => {
    let listItem = event.target.parentNode.parentNode.parentNode;
    doneList.appendChild(listItem);
    event.target.parentNode.removeChild(event.target);
    filterListItem(listItem, inputFilterDone.value);
  });

  list.appendChild(item);
}

function isStringEmptyOrWhiteSpace(str) {
  return str.length === 0 || /^\s*$/.test(str);
}

function filterListItem(item,filter) {
  let text = item.childNodes[1].childNodes[1].innerHTML;
  if (text.search(filter) == -1) item.style.display = "none";
  else item.style.display = "block";
};