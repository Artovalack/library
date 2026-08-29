const newBtn = document.querySelector("[data-open-modal]");
const tableBody = document.querySelector("[data-table-body]");
const modal = document.querySelector("[data-modal]");
const addBtn = document.querySelector("[data-add-book]");
const editBtn = document.querySelector("[data-edit-btn]");
let mode = "add";
let item;
let myLibrary = [];

function Book(title, author, pages, isRead) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

function addBookToLibrary(title, author, pages, isRead) {
    const book = new Book(title, author, pages, isRead);
    myLibrary.push(book);
}

function render() {
    tableBody.innerHTML = "";

    for (let i = 0; i < myLibrary.length; i++) {
        const book = myLibrary[i];
        
        tableBody.innerHTML += `
            <tr>
                <td>${book.id}</td>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.pages}</td>
                <td>${book.isRead}</td>
                <td class="update-item-btns">
                    <button class="edit-btn" onclick="edit('${book.id}')">Edit</button>
                    <button class="delete-btn" onclick="deleteItem('${book.id}')">Delete</button>
                </td>
            </tr>
        `;
    }
}

function edit(i) {
    mode = "edit";
    item = myLibrary.find(b => b.id === i);

    title.value = item.title;
    author.value = item.author;
    pages.value = item.pages;
    read.value = item.isRead;

    modal.showModal();
}

function update() {
    item.title = title.value;
    item.author = author.value;
    item.pages = pages.value;
    item.isRead = read.value;
}

function deleteItem(i) {
    myLibrary = myLibrary.filter(b => b.id !== i);
    render();
}

newBtn.addEventListener("click", () => {
    mode = "add";
    modal.showModal();
});

addBtn.addEventListener("click", () => {
    if (mode === "add") {
        addBookToLibrary(title.value, author.value, pages.value, read.value);
        render();
    } else {
        update();
        render();
    }
});