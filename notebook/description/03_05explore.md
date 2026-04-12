# `explore` page of the website

## design guideline

- guideline: do not need to strictly duplicate, but redesign to more modern and user-friendly style, e.g. use a more visually appealing layout, add icons for different features, use a consistent color scheme, etc. to enhance the user experience and make it easier for users to navigate and manage their book collection on the My Books page of the website.
- other style: follow master style in
  `C:\Users\khala\MyDocuments\00_DS\03_CourseWork\2603522_RecSys\100_FinalProject_RecSys\notebook\description\00b_page_desc.md`

## description

- The Explore page of the website serves as a platform for users to discover and explore new books, authors, genres, and other content are outside of their usual reading preferences, but still align with their interests and reading history. It typically includes a header with navigation links to key sections of the site, a main content area that showcases new and popular books, and sidebars that offer additional options and features. The Explore page is designed to keep users informed about the latest books in the market, allowing them to easily find and explore new titles that align with their interests. It provides a space for users to stay updated on the latest book releases and discover new books that they may be interested in reading. Additionally, the Explore page can surprise users with unexpected book recommendations that are outside of their usual reading preferences, but still align with their interests and reading history. This can help users discover new books and authors that they may not have found otherwise, and can enhance the user experience by providing a sense of discovery and excitement when exploring new content on the site.

## details

- **left sidebar**: none
- **body**:
  - show featured lists, which are curated by the Goodreads team and highlighted on the Listopia page, with display options e.g. grid view, list view, etc. Elements i.e. cover, title, creator, rating, etc. selected to shown depending on view to be displayed.
  - *style*: start carousel view, which can be switched to list view with a button. In carousel view, cover, title, author, and rating are shown, while in list view, more details such as creator, rating, etc. are shown.
    - example: `https://ebay.gitbook.io/mindpatterns/disclosure/carousel`
- **right sidebar**: shortcuts link to different sections of the Listopia page, e.g. create new list, lists I created, lists I've voted on, lists I've liked, etc. with hyperlinks to the respective sections of the Listopia page
  - Create new list: pop-up window to create new list with input for list name, description, tags, etc. and options to customize the list (e.g. public/private, collaborative, etc.)
  - Lists I created: new page to show the book lists created by the user, with options to edit, delete, and share the lists with others on the site
  - Lists I've voted on: new page to show the book lists that the user has voted on, with options to view the lists and see the books included in each list
  - Lists I've liked: new page to show the book lists that the user has liked, with options to view the lists and see the books included in each list

- example:
  `C:\Users\khala\MyDocuments\00_DS\03_CourseWork\2603522_RecSys\100_FinalProject_RecSys\doc\web_goodreads\3_05_Explore _ Goodreads.html`

## missing data
  - in case of missing required data, scraping or using LLM to generate sample data save in separate file for future edit. coding html file to refer to sample data
    - create python code to scrape by beautiful soup or selenium or
    - create python code to use LLM to generate sample data
    - output path for code: `C:\Users\khala\MyDocuments\00_DS\03_CourseWork\2603522_RecSys\100_FinalProject_RecSys\notebook`
    - output path for created sample data: `C:\Users\khala\MyDocuments\00_DS\03_CourseWork\2603522_RecSys\100_FinalProject_RecSys\data\`

## output path for created html file
  `C:\Users\khala\MyDocuments\00_DS\03_CourseWork\2603522_RecSys\100_FinalProject_RecSys\html\`
