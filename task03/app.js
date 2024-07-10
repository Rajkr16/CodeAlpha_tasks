document.addEventListener('DOMContentLoaded', function () {
    const books = [
        { title: 'Eloquent JavaScript', author: 'Marijn Haverbeke', category: 'Web Development', status: 'Available', history: [] },
        { title: 'JavaScript: The Good Parts', author: 'Douglas Crockford', category: 'Web Development', status: 'Available', history: [] },
        { title: 'Clean Code', author: 'Robert C. Martin', category: 'Web Development', status: 'Available', history: [] },
        { title: 'The Kite Runner', author: 'Khaled Hosseini', category: 'Fiction', status: 'Available', history: [] },
        { title: 'The White Tiger', author: 'Aravind Adiga', category: 'Fiction', status: 'Borrowed', history: [] },
        { title: 'Wings of Fire', author: 'A.P.J. Abdul Kalam', category: 'Autobiography', status: 'Available', history: [] },
        { title: 'The Autobiography of Benjamin Franklin', author: 'Benjamin Franklin', category: 'Autobiography', status: 'Available', history: [] },
        { title: 'Think and Grow Rich', author: 'Napoleon Hill', category: 'Motivation', status: 'Available', history: [] },
        { title: 'The Power of Habit', author: 'Charles Duhigg', category: 'Motivation', status: 'Available', history: [] },
        { title: 'You Can Win', author: 'Shiv Khera', category: 'Motivation', status: 'Available', history: [] },
        { title: 'The Guide', author: 'R.K. Narayan', category: 'Fiction', status: 'Available', history: [] },
        { title: 'My Experiments with Truth', author: 'Mahatma Gandhi', category: 'Autobiography', status: 'Available', history: [] },
        { title: 'Rich Dad Poor Dad', author: 'Robert T. Kiyosaki', category: 'Motivation', status: 'Available', history: [] },
        { title: 'Steve Jobs', author: 'Walter Isaacson', category: 'Biography', status: 'Available', history: [] },
        { title: 'Becoming', author: 'Michelle Obama', category: 'Autobiography', status: 'Available', history: [] }
    ];
    

    const bookList = document.getElementById('bookList');
    const bookDetails = document.getElementById('bookDetails');
    const bookTitle = document.getElementById('bookTitle');
    const bookAuthor = document.getElementById('bookAuthor');
    const bookCategory = document.getElementById('bookCategory');
    const bookStatus = document.getElementById('bookStatus');
    const borrowButton = document.getElementById('borrowButton');
    const returnButton = document.getElementById('returnButton');
    const removeButton = document.getElementById('removeButton');
    const borrowerName = document.getElementById('borrowerName');
    const viewHistoryButton = document.getElementById('viewHistoryButton');
    const borrowingHistory = document.getElementById('borrowingHistory');
    const historyList = document.getElementById('historyList');
    const newBookTitle = document.getElementById('newBookTitle');
    const newBookAuthor = document.getElementById('newBookAuthor');
    const newBookCategory = document.getElementById('newBookCategory');
    const addBookButton = document.getElementById('addBookButton');

    function displayBooks(booksToDisplay = books) {
        bookList.innerHTML = '';
        booksToDisplay.forEach((book, index) => {
            const bookElement = document.createElement('div');
            bookElement.className = 'book';
            bookElement.innerHTML = `<p>${book.title}</p><p>${book.author}</p>`;
            bookElement.addEventListener('click', () => showDetails(index));
            bookList.appendChild(bookElement);
        });
    }

    function showDetails(index) {
        const book = books[index];
        bookTitle.textContent = `Title: ${book.title}`;
        bookAuthor.textContent = `Author: ${book.author}`;
        bookCategory.textContent = `Category: ${book.category}`;
        bookStatus.textContent = `Status: ${book.status}`;
        borrowButton.classList.toggle('hidden', book.status === 'Borrowed');
        returnButton.classList.toggle('hidden', book.status === 'Available');
        bookDetails.classList.remove('hidden');
        borrowingHistory.classList.add('hidden');

        borrowButton.onclick = () => {
            const name = borrowerName.value.trim();
            if (name) {
                books[index].status = 'Borrowed';
                const date = new Date().toLocaleDateString();
                books[index].history.push({ name, date, action: 'Borrowed' });
                displayBooks();
                showDetails(index);
            } else {
                alert('Please enter your name.');
            }
        };

        returnButton.onclick = () => {
            books[index].status = 'Available';
            const date = new Date().toLocaleDateString();
            books[index].history.push({ name: 'Returned by Library', date, action: 'Returned' });
            displayBooks();
            showDetails(index);
        };

        removeButton.onclick = () => {
            books.splice(index, 1);
            displayBooks();
            bookDetails.classList.add('hidden');
        };

        viewHistoryButton.onclick = () => {
            historyList.innerHTML = '';
            book.history.forEach(record => {
                const listItem = document.createElement('li');
                listItem.textContent = `${record.date}: ${record.action} by ${record.name}`;
                historyList.appendChild(listItem);
            });
            borrowingHistory.classList.remove('hidden');
        };
    }

    document.getElementById('searchBar').addEventListener('input', function () {
        const searchText = this.value.toLowerCase();
        const filteredBooks = books.filter(book => book.title.toLowerCase().includes(searchText) || book.author.toLowerCase().includes(searchText));
        displayBooks(filteredBooks);
    });

    addBookButton.addEventListener('click', function () {
        const newBook = {
            title: newBookTitle.value,
            author: newBookAuthor.value,
            category: newBookCategory.value,
            status: 'Available',
            history: []
        };
        books.push(newBook);
        displayBooks();
        newBookTitle.value = '';
        newBookAuthor.value = '';
        newBookCategory.value = '';
    });

    displayBooks();
});
