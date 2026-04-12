# DB

## book
- book_id (primary key)
- title
- author
- genre_id
- publisher_id
- publication_date
- price
- number_of_pages

## genre
- genre_id (primary key)
- genre_name

## publisher
- publisher_id (primary key)
- publisher_name

## user
- user_id (primary key)
- name
- email
- favorite_category

## language
- language_id (primary key)
- language_name

## user_system_event
- system_event_id (primary key)
- registration_date
- timestamp
- last_login_date

## user_book_event
- book_event_id (primary key)
- timestamp
- user_id (foreign key to user)
- book_id (foreign key to book)
- event_type (e.g., 'view', 'like', 'add_to_reading_list')
- rating: optional, user can provide a rating (e.g., 1-5 stars)
- review message: optional, text
- url: referred url leading to the book detail page, to track user navigation path i.e. from facebook, twitter, email, etc.
