# Recommendation web apps - definition

- description of the sitemap and webtree of the website, e.g. what is a sitemap, what is a webtree, how to construct a sitemap and webtree, etc.

## description of the webtree

- clarify the definition of the webtree, e.g. what is a webtree, how to construct a webtree, what are the components of a webtree, etc.
- the webtree is a hierarchical representation of the structure of a website, with the main sections and features organized in a way that reflects how users might navigate through the site. The navigation bar at the top provides access to key sections such as Home, My Books, Browse, and Community, while the footer at the bottom includes links to company information, social media, mobile apps, and UI versions. This structure helps users easily find the content they are looking for and encourages engagement with the various features of the website.


## details of each component applied to each page of the website

- **header**: freezes at the top of the page and remains visible as users scroll down, providing easy access to key features and navigation options
  - includes navigation links to key sections of the website, such as Home, My Books, Browse, and Community, which are organized in a way that reflects how users might navigate through the site. This structure helps users easily find the content they are looking for and encourages engagement with the various features of the website.
  - consistently displayed across all pages of the website, providing a familiar and intuitive navigation experience for users
  - components: logo, **navigation bar**, search box, icons for notifications, messages, and user profile access
    - logo: Greedroutes logo, which serves as a link to the homepage
      - logo name: `C:\Users\khala\MyDocuments\00_DS\03_CourseWork\2603522_RecSys\100_FinalProject_RecSys\image\logo\logo_name.png`
      - logo icon: `C:\Users\khala\MyDocuments\00_DS\03_CourseWork\2603522_RecSys\100_FinalProject_RecSys\image\logo\logo_icon.png`
    - search box: allows users to search for books, authors, genres, etc. on the site
    - icons: for notifications, group discussion, messages, friends, groups, and user profile access

- **navigation bar**
  - components: Home, My Books, Browse, Community
    - Home: show news feed, updates, recommendations, explore, etc.
    - My Books: show the user's book collection
    - Browse: show personalized book recommendations
    - Community: show groups, discussions, quotes, etc.

- **body**
  - show content based on the section selected in the navigation bar, e.g. news feed, updates, recommendations, explore, etc. for Home section; book collection for My Books section; personalized book recommendations for Browse section; groups, discussions, quotes, etc. for Community section.
  - **style**: stacked layout with a main content area and sidebars for additional features and options

- **left side bar**
  - show additional options and features based on the section selected in the navigation bar
  - *style*: stacked layout with corresponding content and options for the section selected in the navigation bar, e.g. news feed, updates, recommendations, explore, etc. for Home section; book collection for My Books section; personalized book recommendations for Browse section; groups, discussions, quotes, etc. for Community section.

- **right side bar**
  - show additional options and features based on the section selected in the navigation bar
  - *style*: stacked layout with corresponding content and options for the section selected in the navigation bar, e.g. news feed, updates, recommendations, explore, etc. for Home section; book collection for My Books section; personalized book recommendations for Browse section; groups, discussions, quotes, etc. for Community section.

- **footer**
  - company information annotated as `company`: about us, contact us, careers, etc.
    - About us
    - Careers
    - Terms
    - Privacy
    - Interest Based Ads
    - Ad Preferences
    - Your Ads Privacy Choices
    - Help
  - social media links annotated as `connect`: Facebook, Twitter, Instagram, etc. show circel icons for each social media platform with hyperlinks to the respective pages
    - Facebook
    - Twitter
    - Instagram
    - linkedIn
    - YouTube
  - mobile apps annotated as `applications`: links to download the Greedroutes app for iOS and Android
    - iOS
    - Android
  - UI versions toggled annotated as `mobile version` or `desktop version`: links to switch between different versions of the website, e.g. desktop version, mobile version, etc.
    - Desktop
    - Mobile
  - annotation text
    - © 2026 Greed Route. All rights reserved.
    - an platform company

- color scheme: consistent color scheme across the website, to create a cohesive and visually appealing design that reflects the brand identity of the website.
  - color pallette: a set of colors that are used consistently across the website, including primary colors, secondary colors, and accent colors. The color palette should be chosen to reflect the brand identity of the website and create a visually appealing design.
    - primary colors: used for key elements such as the header, navigation bar, and buttons
    - secondary colors: used for background elements, sidebars, and other less prominent features
    - accent colors: used for highlights, links, and other interactive elements to draw attention and create visual interest
  - color scheme for the website:
    - primary colors: #7B4019, #FF7D29, #FFBF78, #FFEEA9
    - secondary colors: #F2EAE0, #B4D3D9, #BDA6CE, #9B8EC7
    - accent colors: #a57c00, #ffcf3f
    - more colors excluding these lists can be used as long as they are consistent with the overall color scheme and design of the website. 

- display mode: allow users to switch between different display modes, e.g. light mode, dark mode, etc. to enhance the user experience and provide options for different preferences and environments.
  - light mode: a display mode with a light color scheme, typically with a white or light background and dark text, which is suitable for well-lit environments and can reduce eye strain for some users.
  - dark mode: a display mode with a dark color scheme, typically with a black or dark background and light text, which is suitable for low-light environments and can reduce eye strain for some users.

- toggle button for select display language: default language is `Thai`, with an option to switch to English, which can be accessed in the header or footer of the website for easy access and visibility. The toggle button should be designed to be visually appealing and intuitive, allowing users to easily switch between languages based on their preferences and needs.
  - icon for language selection: a globe icon or a language icon can be used to represent the language selection feature, which can be placed in the header or footer of the website for easy access and visibility. The icon should be designed to be visually appealing and intuitive, allowing users to easily identify and access the language selection feature.

## missing data

- in case of missing required data, scraping or using LLM to generate sample data save in separate file for future edit. coding html file to refer to sample data
  - create python code to scrape by beautiful soup or selenium or
  - create python code to use LLM to generate sample data
  - output path for code: `C:\Users\khala\MyDocuments\00_DS\03_CourseWork\2603522_RecSys\100_FinalProject_RecSys\notebook`
  - output path for created sample data: `C:\Users\khala\MyDocuments\00_DS\03_CourseWork\2603522_RecSys\100_FinalProject_RecSys\data\`

## output path for created html file
  `C:\Users\khala\MyDocuments\00_DS\03_CourseWork\2603522_RecSys\100_FinalProject_RecSys\html\`

## note
- log step to create file if needd in markdown format, e.g. `## step 1: create html file`, `## step 2: create css file`, etc. to keep track of the progress and ensure that all necessary files are created and organized properly.
  - output path: `C:\Users\khala\MyDocuments\00_DS\03_CourseWork\2603522_RecSys\100_FinalProject_RecSys\cli`