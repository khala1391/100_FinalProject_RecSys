# `home` page of the website

## design guideline

- guideline: do not need to strictly duplicate, but redesign to more modern and user-friendly style, e.g. use a more visually appealing layout, add icons for different features, use a consistent color scheme, etc. to enhance the user experience and make it easier for users to navigate and manage their book collection on the My Books page of the website.
- other style: follow master style in
  `C:\Users\khala\MyDocuments\00_DS\03_CourseWork\2603522_RecSys\100_FinalProject_RecSys\notebook\description\00b_page_desc.md`

- The home page of the website serves as the main entry point for users, providing an overview of the website's features and content. It typically includes a header with navigation links to key sections of the site, a main content area that highlights featured books, recommendations, and updates, and sidebars that offer additional options and features. The home page is designed to engage users and encourage them to explore the various sections of the website, such as My Books, Browse, and Community. It also provides access to personalized book recommendations based on user preferences and behavior on the site.

## description

- The home page of the website is designed to provide users with a personalized and engaging experience, showcasing featured books, recommendations, and updates based on their reading history and preferences. It serves as a central hub for users to access key features and sections of the website, such as My Books, Browse, and Community, while also offering additional options and features through sidebars. The home page is structured to encourage users to explore the various sections of the website and discover new books and authors that align with their interests. It also provides a platform for users to stay updated on the latest book releases, reviews, and activities from their connections on the site.
- content are consolidated from another pages, e.g. 00b_page_desc.md, 02_mybook.md, 03_browse.md, 04_community.md, etc. to provide a comprehensive description of the home page of the website, including its features, content, and user experience. This consolidation helps to create a cohesive and detailed overview of the home page, which can be used as a reference for the design and development of the book recommendation system.
- start with pop-up window for first time users to select their favorite genres to prevent cold start problem in recommendation system, which can be accessed later in settings to update the preferences. The selected genres will be used to provide personalized book recommendations based on the user's reading history and preferences.
  - example:
  `C:\Users\khala\MyDocuments\00_DS\03_CourseWork\2603522_RecSys\100_FinalProject_RecSys\notebook\description\01b_home_firstCheckbox.md`

## details

- news feed: show updates from friends, groups, and authors that the user follows, including new book releases, reviews, ratings, and other activities
- updates: show recent activities of the user and their connections, such as new reviews, ratings, and book additions to shelves
- recommendations: show personalized book recommendations based on the user's reading history and preferences
- explore: show trending books, popular lists, and other curated content to help users discover new books and authors
- style: tab layout with a main content area and sidebars for additional features and options, with a visually appealing design that encourages user engagement and exploration of the website's content. The home page should be designed to provide a seamless and enjoyable user experience, with easy navigation and access to key features and sections of the website.
  - example: `https://playbook.ebay.com/design-system/components/tab` in `Medium and large` section

- example:
  `C:\Users\khala\MyDocuments\00_DS\03_CourseWork\2603522_RecSys\100_FinalProject_RecSys\doc\web_goodreads\1_01_Recent updates _ Goodreads.html`

## missing data
  - in case of missing required data, scraping or using LLM to generate sample data save in separate file for future edit. coding html file to refer to sample data
    - create python code to scrape by beautiful soup or selenium or
    - create python code to use LLM to generate sample data
    - output path for code: `C:\Users\khala\MyDocuments\00_DS\03_CourseWork\2603522_RecSys\100_FinalProject_RecSys\notebook`
    - output path for created sample data: `C:\Users\khala\MyDocuments\00_DS\03_CourseWork\2603522_RecSys\100_FinalProject_RecSys\data\`

## output path for created html file
  `C:\Users\khala\MyDocuments\00_DS\03_CourseWork\2603522_RecSys\100_FinalProject_RecSys\html\`