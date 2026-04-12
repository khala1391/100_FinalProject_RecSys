# `new release` page of the website

## design guideline

- guideline: do not need to strictly duplicate, but redesign to more modern and user-friendly style, e.g. use a more visually appealing layout, add icons for different features, use a consistent color scheme, etc. to enhance the user experience and make it easier for users to navigate and manage their book collection on the My Books page of the website.
- other style: follow master style in
  `C:\Users\khala\MyDocuments\00_DS\03_CourseWork\2603522_RecSys\100_FinalProject_RecSys\notebook\description\00b_page_desc.md`

## description

- The New Releases page of the website serves as a platform for users to discover and explore the latest book releases across various genres and categories. It typically includes a header with navigation links to key sections of the site, a main content area that showcases new book releases, and sidebars that offer additional options and features. The New Releases page is designed to keep users informed about the latest books in the market, allowing them to easily find and explore new titles that align with their interests. It provides a space for users to stay updated on the latest book releases and discover new books that they may be interested in reading.


## details

- **left sidebar**: none
- **body**:
  - show new book releases by each genres, with display options e.g. grid view, list view, etc. Elements i.e. cover, title. Cover is linked to the book detail page, which provides more information about the book, e.g. author, avg rating, description, etc.
  - *style*: start with grid view, which can be switched to list view with a button. In grid view, only cover and title are shown, while in list view, more details such as author, avg rating, etc. are shown.
  - display as grid view with cover and title, max at 5 books per genre.
  - action button labeled as `want to read` to add book to the collection, which opens a search box to find the book and add it to the collection 
  - action star rating to rate the book, which can be used to provide feedback for the recommendation algorithm and improve future recommendations for the user and their connections on the site
- **right sidebar**: shortcuts to customize preferences for new release, e.g. by genre, by author, etc. with hyperlinks to the respective sections of the New Releases page
  - new release options arrange in sidebar as hyperlinks to different categories, e.g.
    - by genre
    - by author
    - by publication date
    - by rating score
    - by review
  - popular new releases: show popular new releases based on other users' ratings and reviews, which can help users discover new books that are highly recommended by the community.
    - display as grid view with cover and title, max at 3 books per row

- example:
  `C:\Users\khala\MyDocuments\00_DS\03_CourseWork\2603522_RecSys\100_FinalProject_RecSys\doc\web_goodreads\3_03_New Releases.html`

## missing data
  - in case of missing required data, scraping or using LLM to generate sample data save in separate file for future edit. coding html file to refer to sample data
    - create python code to scrape by beautiful soup or selenium or
    - create python code to use LLM to generate sample data
    - output path for code: `C:\Users\khala\MyDocuments\00_DS\03_CourseWork\2603522_RecSys\100_FinalProject_RecSys\notebook`
    - output path for created sample data: `C:\Users\khala\MyDocuments\00_DS\03_CourseWork\2603522_RecSys\100_FinalProject_RecSys\data\`


## output path for created html file
  `C:\Users\khala\MyDocuments\00_DS\03_CourseWork\2603522_RecSys\100_FinalProject_RecSys\html\`