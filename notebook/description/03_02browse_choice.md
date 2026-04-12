# `Choice Awards` page of the website

## design guideline

- guideline: do not need to strictly duplicate, but redesign to more modern and user-friendly style, e.g. use a more visually appealing layout, add icons for different features, use a consistent color scheme, etc. to enhance the user experience and make it easier for users to navigate and manage their book collection on the My Books page of the website.
- other style: follow master style in
  `C:\Users\khala\MyDocuments\00_DS\03_CourseWork\2603522_RecSys\100_FinalProject_RecSys\notebook\description\00b_page_desc.md`

## description

- The Choice Awards page of the website serves as a platform for users to discover and celebrate the winners and nominees of the Goodreads Choice Awards, which are annual awards voted on by users in various categories such as Fiction, Mystery & Thriller, Science Fiction, Fantasy, etc. The page typically includes a header with navigation links to key sections of the site, a main content area that showcases the winners and nominees for each category, and sidebars that offer additional options and features. The Choice Awards page is designed to engage users in the voting process and encourage them to explore the winning books and authors in each category, providing a space for users to celebrate their favorite books and discover new ones based on the collective preferences of the Goodreads community.


## details

- **banner**: graphical banner with record about number of votes, categories, etc. to encourage user engagement in the voting process and create a visually appealing introduction to the Choice Awards page.
  - example:
  `C:\Users\khala\MyDocuments\00_DS\03_CourseWork\2603522_RecSys\100_FinalProject_RecSys\image\decorate\03_02_banner_example.png`

- **left sidebar**:
  - text box show voting schedule to encourage user engagement in the voting process
  - hyperlink list: to different year's awards, e.g. 2023, 2022, etc.
- **body**:
  - show the winners and nominees for each category as `card` , with options to view more details about each book, e.g. cover, title, author, avg rating, etc. 
  - action button labeled as `want to read` to add book to the collection, which opens a search box to find the book and add it to the collection 
  - action star rating to rate the book, which can be used to provide feedback for the recommendation algorithm and improve future recommendations for the user.
  - list of category can be seen in the following link: `C:\Users\khala\MyDocuments\00_DS\03_CourseWork\2603522_RecSys\100_FinalProject_RecSys\notebook\description\01b_home_firstCheckbox.md`
- **right sidebar**: none


- example:
  `C:\Users\khala\MyDocuments\00_DS\03_CourseWork\2603522_RecSys\100_FinalProject_RecSys\doc\web_goodreads\3_02_Goodreads Choice Awards.html`

## missing data
  - in case of missing required data, scraping or using LLM to generate sample data save in separate file for future edit. coding html file to refer to sample data
    - create python code to scrape by beautiful soup or selenium or
    - create python code to use LLM to generate sample data
    - output path for code: `C:\Users\khala\MyDocuments\00_DS\03_CourseWork\2603522_RecSys\100_FinalProject_RecSys\notebook`
    - output path for created sample data: `C:\Users\khala\MyDocuments\00_DS\03_CourseWork\2603522_RecSys\100_FinalProject_RecSys\data\`

## output path for created html file
  `C:\Users\khala\MyDocuments\00_DS\03_CourseWork\2603522_RecSys\100_FinalProject_RecSys\html\`