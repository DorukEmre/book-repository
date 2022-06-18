Books (title, summary, author, genre, ISBN)
Multiple copies available (with globally unique ids, availability statuses, etc.)

Book instance (status of specific physical copies of the book available in the system)

More information about the author than just their name

Multiple authors with the same or similar names

Be able to sort information based on the book title, author, genre, and category

You might also want to use models to represent selection-list options (e.g. like a drop-down list of choices), rather than hard-coding the choices into the website itself — this is recommended when all the options aren't known up front or may change. A good example is a genre (e.g. fantasy, science fiction, etc.).

Book
    title: string
    author: Author[1]
    summary: string
    ISBN: string
    genre: Genre[0..*]

    url: string

BookInstance
    book: Book
    imprint: string
    status: enum
    due_back: date

    url: string

Author
    first_name: string
    last_name: string
    date_of_birth: date
    date_of_death: date

    name: string
    lifespan: string
    url: string

Genre
    name: string

    url: string