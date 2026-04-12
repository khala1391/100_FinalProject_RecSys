# revise web app and mobile app prompt
- continue from previous prompt: `C:\Users\khala\MyDocuments\00_DS\03_CourseWork\2603522_RecSys\100_FinalProject_RecSys\prompt\prompt_apps_rev01.md`


## revision list
- revisit current html `C:\Users\khala\MyDocuments\00_DS\03_CourseWork\2603522_RecSys\100_FinalProject_RecSys\index.html`
- create ipynb to scrape website to get sample as described in last prompt (see detail in consecutive referred files)
  - category name may not exactly match the one in the source, so you may need to adjust the category names based on the actual data you scrape from the sources. For example, if the source uses slightly different names for the genres, you can modify the category names in your code to match those used in the source. The key is to ensure that the categories you use in your code align with the data you have available from your sources, so that you can effectively utilize that data for your book recommendation system.
  - source in `C:\Users\khala\MyDocuments\00_DS\03_CourseWork\2603522_RecSys\100_FinalProject_RecSys\notebook\description\01b_home_firstCheckbox.md`
  - prefer to scrape offline (scrape and keep file in local folder) to ensure no issues to display in future.

- revise previous output
  - use scraped data as input for html files
- split html to several files for each page, e.g. home.html, mybooks.html, browse.html, community.html, etc. instead of one single html file for all pages
  - new html files should be create in root folder `C:\Users\khala\MyDocuments\00_DS\03_CourseWork\2603522_RecSys\100_FinalProject_RecSys\`
- revise incorrect output
  - web apps
    - by changing UI for navigation bar as drop down menu with hyperlinks corresponding to their names
    - in other words, it should show 4 button: home, my book, browse, community
  - mobile apps
   - MUST SHOW navigation bar as well as web apps