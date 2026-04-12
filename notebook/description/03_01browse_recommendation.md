# `Browse` page of the website

## design guideline

- guideline: do not need to strictly duplicate, but redesign to more modern and user-friendly style, e.g. use a more visually appealing layout, add icons for different features, use a consistent color scheme, etc. to enhance the user experience and make it easier for users to navigate and manage their book collection on the My Books page of the website.
- other style: follow master style in
  `C:\Users\khala\MyDocuments\00_DS\03_CourseWork\2603522_RecSys\100_FinalProject_RecSys\notebook\description\00b_page_desc.md`

## description

- The Browse page of the website serves as a personalized space for users to discover new books and authors based on their reading history and preferences. It typically includes a header with navigation links to key sections of the site, a main content area that displays personalized book recommendations, and sidebars that offer additional options and features. The Browse page is designed to allow users to easily explore new books and authors, including personalized recommendations based on their reading history and preferences, as well as curated lists and categories to help users discover new books that align with their interests.

## details

- **left sidebar**: none
- **right sidebar**: shortcuts to different recommendation categories, e.g. by shelf, by genre, etc. with hyperlinks to the respective sections of the Browse page
  - recommendation options arrange in sidebar as hyperlinks to different recommendation categories, e.g.
    - by shelf
    - by genre (selected at first, landing page of the Browse section, which can customized in settings)
    - more action (header)
      - recommendations for you: suggest personalized book recommendations based on the user's reading history and preferences
      - give recommendations: allow users to provide recommendations to their friends based on their reading history and preferences, which can be shared through the news feed or other social features on the site
      - ask for recommendations
- **body**:
  - remark: need to rate at least 20 books to get Recommendations
  - Recommendations: show personalized book recommendations based on the user's reading history and preferences with display options e.g. grid view, list view, etc. Elements i.e. cover, title, rating, author, genre, etc. selected to shown depending on view to be displayed.
  - action button labeled as `want to read` to add book to the collection, which opens a search box to find the book and add it to the collection 
  - action star rating to rate the book, which can be used to provide feedback for the recommendation algorithm and improve future recommendations for the user and their connections on the site
  - action button labeled as `not interested` to remove the book from the recommendation list, which can be used to provide feedback for the recommendation algorithm and improve future recommendations for the user and their connections on the site

- example:
  `C:\Users\khala\MyDocuments\00_DS\03_CourseWork\2603522_RecSys\100_FinalProject_RecSys\doc\web_goodreads\3_01_Recommended for You _ Goodreads.html`

## missing data
  - in case of missing required data, scraping or using LLM to generate sample data save in separate file for future edit. coding html file to refer to sample data
    - create python code to scrape by beautiful soup or selenium or
    - create python code to use LLM to generate sample data
    - output path for code: `C:\Users\khala\MyDocuments\00_DS\03_CourseWork\2603522_RecSys\100_FinalProject_RecSys\notebook`
    - output path for created sample data: `C:\Users\khala\MyDocuments\00_DS\03_CourseWork\2603522_RecSys\100_FinalProject_RecSys\data\`

## output path for created html file
  `C:\Users\khala\MyDocuments\00_DS\03_CourseWork\2603522_RecSys\100_FinalProject_RecSys\html\`