# `discussion` page of the website

## design guideline

- guideline: do not need to strictly duplicate, but redesign to more modern and user-friendly style, e.g. use a more visually appealing layout, add icons for different features, use a consistent color scheme, etc. to enhance the user experience and make it easier for users to navigate and manage their book collection on the My Books page of the website.
- other style: follow master style in
  `C:\Users\khala\MyDocuments\00_DS\03_CourseWork\2603522_RecSys\100_FinalProject_RecSys\notebook\description\00b_page_desc.md`

## description

- The Discussions page of the website serves as a platform for users to engage in conversations and share their thoughts about books, authors, and related topics. It typically includes a header with navigation links to key sections of the site, a main content area that showcases featured and popular discussions, and sidebars that offer additional options and features. The Discussions page is designed to allow users to easily find and participate in discussions that align with their interests, providing a space for users to connect with like-minded readers, share their opinions, and discover new perspectives on books and authors in the Goodreads community. It encourages user engagement by fostering a sense of community and providing opportunities for users to interact with others who share their passion for books and reading.

## details

- **left sidebar**:none

- **body**:
  - display option include group, book to allow users to easily find discussions that align with their interests and preferences
    - show top 3 recent discussion or popular discussion for each group or book, with options to view more discussions related to the group or book
  - *style*: start with stacked layout, which can be switched to grid view with a button. In stacked layout, each news article or interview is displayed in a vertical stack, while in grid view, the articles and interviews are displayed in a grid format with cover images, headlines, and brief summaries.
  - end with pagination or infinite scroll to allow users to easily navigate through to discover more discussions that align with their interests.
    - example: `https://baseweb.design/components/pagination/`

- **right sidebar**:
  - show cover of book being discussed in the discussion, with hyperlink to the book page of the website, to allow users to easily access more information about the book and join the discussion if they are interested in the book being discussed.
  - show top genre of the book being discussed in the discussion, with hyperlink to the genre page of the website, to allow users to easily access more information about the genre and discover more books in the same genre if they are interested in the book being discussed.

- example:
  `C:\Users\khala\MyDocuments\00_DS\03_CourseWork\2603522_RecSys\100_FinalProject_RecSys\doc\web_goodreads\4_02_Discussions _ Goodreads.html`

## missing data
  - in case of missing required data, scraping or using LLM to generate sample data save in separate file for future edit. coding html file to refer to sample data
    - create python code to scrape by beautiful soup or selenium or
    - create python code to use LLM to generate sample data
    - output path for code: `C:\Users\khala\MyDocuments\00_DS\03_CourseWork\2603522_RecSys\100_FinalProject_RecSys\notebook`
    - output path for created sample data: `C:\Users\khala\MyDocuments\00_DS\03_CourseWork\2603522_RecSys\100_FinalProject_RecSys\data\`

## output path for created html file
  `C:\Users\khala\MyDocuments\00_DS\03_CourseWork\2603522_RecSys\100_FinalProject_RecSys\html\`