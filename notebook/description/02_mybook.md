# `My Books` page of the website

## design guideline
- guideline: do not need to strictly duplicate, but redesign to more modern and user-friendly style, e.g. use a more visually appealing layout, add icons for different features, use a consistent color scheme, etc. to enhance the user experience and make it easier for users to navigate and manage their book collection on the My Books page of the website.
- other style: follow master style in
  `C:\Users\khala\MyDocuments\00_DS\03_CourseWork\2603522_RecSys\100_FinalProject_RecSys\notebook\description\00b_page_desc.md`

## overview

- The My Books page of the website serves as a personalized space for users to manage and organize their book collection. It typically includes a header with navigation links to key sections of the site, a main content area that displays the user's book collection, and sidebars that offer additional options and features. The My Books page is designed to allow users to easily view and manage their books, including adding new books, updating reading status, writing reviews, and organizing books into shelves based on their reading preferences. It also provides access to personalized book recommendations based on the user's reading history and preferences.

## description

- The My Books page of the website is designed to provide users with a personalized and organized space to manage their book collection. It includes features such as a search box to search for books in the collection, display options for the book list (e.g. grid view, list view), filter options for the book list (e.g. by shelf, genre, author), and a table of the book list consisting of cover, title, author, avg rating, my rating, shelf (aka reading status includes `to-read`, `currently-reading`, `read`, `did-not-finish`), write review, date added, date read, etc. The page also includes a menu to manage the display of the book list (e.g. sort by title, author, avg rating, my rating, date added, date read) and a button to populate a window for adding/editing details for each record in the book collection. This design allows users to easily view and manage their books while also providing access to personalized recommendations based on their reading history and preferences.


## details
- **left sidebar**: 
  - Bookshelves
    - All
    - Want to Read
    - Currently Reading
    - Read
    - Did Not Finish 
    - action button: `Add shelf`
  - Your reading activity
    - Review Drafts
    - Kindle Notes & Highlights
    - Reading Challenge
    - Year in Books
    - Reading stats
  - Add books
    - Recommendations
    - Explore
- **body**
  - subheader: similar to header but specific to the My Books page, i.e. search box to search for books in the collection, display options for the book list (e.g. grid view, list view), filter options for the book list (e.g. by shelf, genre, author), etc.
  - search box to search for books in the collection
  - display options for the book list (e.g. grid view, list view)
  - filter options for the book list (e.g. by shelf, genre, author)
  - setting options for the book list (e.g. sort by title, author, avg rating, my rating, date added, date read)
  - table of book list consisting of cover, title, author, avg rating, my rating, shelf (aka reading status includes `to-read`, `currently-reading`, `read`, `did-not-finish`) , write review, date added, date read, etc.
  - button to populate window for add/edit detail for each record in the book collection
  - menu to manage display of the book list, e.g. sort by title, author, avg rating, my rating, date added, date read, etc. at the top of the book list, which allows users to easily view and manage their books while also providing access to personalized recommendations based on their reading history and preferences.

- example:
  `C:\Users\khala\MyDocuments\00_DS\03_CourseWork\2603522_RecSys\100_FinalProject_RecSys\doc\web_goodreads\2_01_nav_bar_Mybook.html`

## missing data
  - in case of missing required data, scraping or using LLM to generate sample data save in separate file for future edit. coding html file to refer to sample data
    - create python code to scrape by beautiful soup or selenium or
    - create python code to use LLM to generate sample data
    - output path for code: `C:\Users\khala\MyDocuments\00_DS\03_CourseWork\2603522_RecSys\100_FinalProject_RecSys\notebook`
    - output path for created sample data: `C:\Users\khala\MyDocuments\00_DS\03_CourseWork\2603522_RecSys\100_FinalProject_RecSys\data\`

## output path for created html file
  `C:\Users\khala\MyDocuments\00_DS\03_CourseWork\2603522_RecSys\100_FinalProject_RecSys\html\`