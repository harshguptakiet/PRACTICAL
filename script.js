let books = [
    {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        coverImage: "https://via.placeholder.com/150",
        description: "A novel about the American dream in the 1920s.",
        availability: "Available",
        isbn: "9780743273565",
        publisher: "Scribner",
        year: 1925
    },
    {
        title: "1984",
        author: "George Orwell",
        coverImage: "https://via.placeholder.com/150",
        description: "A dystopian novel about totalitarian regime.",
        availability: "Issued",
        isbn: "9780451524935",
        publisher: "Secker & Warburg",
        year: 1949
    }
    // Add more books as needed
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function displayBooks() {
    const catalog = document.querySelector('.book-catalog');
    catalog.innerHTML = '';
    
    books.forEach(book => {
        const bookItem = document.createElement('div');
        bookItem.classList.add('book-item');
        bookItem.innerHTML = `
            <img src="${book.coverImage}" alt="${book.title}">
            <h3>${book.title}</h3>
            <p><strong>Author:</strong> ${book.author}</p>
            <p>Status: <span style="color: ${book.availability === 'Available' ? 'green' : 'red'}">${book.availability}</span></p>
            <button onclick="addToCart('${book.title}')">Add to Cart</button>
        `;
        catalog.appendChild(bookItem);
    });
}

function addToCart(title) {
    const book = books.find(book => book.title === title);
    if (book && book.availability === "Available") {
        cart.push(book);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCart();
    } else {
        alert("This book is not available for issue.");
    }
}

function updateCart() {
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = '';
    cart.forEach((book, index) => {
        const li = document.createElement('li');
        li.textContent = `${book.title} by ${book.author}`;
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.onclick = () => removeFromCart(index);
        li.appendChild(removeBtn);
        cartItems.appendChild(li);
    });

    const buyButton = document.getElementById("buy-button");
    if (cart.length > 0) {
        buyButton.disabled = false;
    } else {
        buyButton.disabled = true;
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
}

function buyItems() {
    if (cart.length > 0) {
        alert("Purchase/Issue Successful!");
        cart = [];
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCart();
    }
}

function showBookDetails(title) {
    const book = books.find(book => book.title === title);
    if (book) {
        document.getElementById("modal-title").textContent = book.title;
        document.getElementById("modal-author").textContent = book.author;
        document.getElementById("modal-isbn").textContent = book.isbn;
        document.getElementById("modal-publisher").textContent = book.publisher;
        document.getElementById("modal-year").textContent = book.year;
        document.getElementById("modal-description").textContent = book.description;

        const modal = document.getElementById("book-modal");
        modal.style.display = "flex";
    }
}

function closeModal() {
    const modal = document.getElementById("book-modal");
    modal.style.display = "none";
}

document.getElementById("search").addEventListener("input", function() {
    const searchText = this.value.toLowerCase();
    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchText) || 
        book.author.toLowerCase().includes(searchText)
    );
    books = filteredBooks;
    displayBooks();
});

displayBooks();
updateCart();
