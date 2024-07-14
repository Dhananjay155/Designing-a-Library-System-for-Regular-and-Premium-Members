// Step 1: Create the Book constructor function
function Book(title, author, isAvailable = true) {
    this.title = title;
    this.author = author;
    this.isAvailable = isAvailable;
  }
  
  // Step 2: Create the Member constructor function
  function Member(name) {
    this.name = name;
    this.borrowedBooks = [];
  }
  
  // Step 3: Add a method to the Member prototype to borrow a book
  Member.prototype.borrowBook = function(book) {
    if (book.isAvailable) {
      if (this.borrowedBooks.length < 3) {
        book.isAvailable = false;
        this.borrowedBooks.push(book.title);
        console.log(`${this.name} has borrowed "${book.title}".`);
      } else {
        console.log(`${this.name} cannot borrow more than 3 books.`);
      }
    } else {
      console.log(`Sorry, "${book.title}" is already borrowed.`);
    }
  };
  
  // Step 4: Create the PremiumMember constructor function
  function PremiumMember(name) {
    Member.call(this, name);
    this.specialCollectionAccess = true;
  }
  
  // Ensure PremiumMember inherits from Member
  PremiumMember.prototype = Object.create(Member.prototype);
  PremiumMember.prototype.constructor = PremiumMember;
  
  // Step 5: Override the borrowBook method in PremiumMember
  PremiumMember.prototype.borrowBook = function(book) {
    if (book.isAvailable) {
      if (this.borrowedBooks.length < 5) {
        book.isAvailable = false;
        this.borrowedBooks.push(book.title);
        console.log(`${this.name} has borrowed "${book.title}".`);
      } else {
        console.log(`${this.name} cannot borrow more than 5 books.`);
      }
    } else {
      console.log(`Sorry, "${book.title}" is already borrowed.`);
    }
  };
  
  // Step 6: Demonstrate the functionality
  
  // Create several book objects
  const book1 = new Book("1984", "George Orwell");
  const book2 = new Book("To Kill a Mockingbird", "Harper Lee");
  const book3 = new Book("The Great Gatsby", "F. Scott Fitzgerald");
  const book4 = new Book("Moby Dick", "Herman Melville");
  const book5 = new Book("War and Peace", "Leo Tolstoy");
  const book6 = new Book("Ulysses", "James Joyce");
  
  // Create a regular member and a premium member
  const regularMember = new Member("Alice");
  const premiumMember = new PremiumMember("Bob");
  
  // Show borrowing books
  regularMember.borrowBook(book1); // Alice borrows 1984
  regularMember.borrowBook(book2); // Alice borrows To Kill a Mockingbird
  regularMember.borrowBook(book3); // Alice borrows The Great Gatsby
  regularMember.borrowBook(book4); // Alice cannot borrow more than 3 books
  
  premiumMember.borrowBook(book4); // Bob borrows Moby Dick
  premiumMember.borrowBook(book5); // Bob borrows War and Peace
  premiumMember.borrowBook(book6); // Bob borrows Ulysses
  premiumMember.borrowBook(book1); // Bob cannot borrow more than 5 books since 1984 is already borrowed
  
  // Use bind to create a bound function for borrowing books for a member
  const borrowBookForAlice = regularMember.borrowBook.bind(regularMember);
  borrowBookForAlice(book1); // Bound function borrowBookForAlice is used
  