
# pop-up window for first time users to select their favorite genres

## description

- to prevent cold start problem in recommendation system, which can be accessed later in settings to update the preferences. The selected genres will be used to provide personalized book recommendations based on the user's reading history and preferences.


## check box for preventing cold start

- ธุรกิจ การเงิน และการลงทุน (Business, Finance & Investment) - ครอบคลุมกลยุทธ์ธุรกิจและเทคนิคการลงทุน
- จิตวิทยาและการพัฒนาตนเอง (Psychology & Self-Development) - หมวดหมู่ยอดฮิตสำหรับการเพิ่มศักยภาพให้ตัวเอง
- นิยายโรแมนซ์ (Romance) - เรื่องราวความรักที่ได้รับความนิยมสูงในทุกแพลตฟอร์ม
- สืบสวนสอบสวนและระทึกขวัญ (Mystery & Thriller) - ปริศนาและการลุ้นระทึกที่น่าติดตาม
- แฟนตาซี (Fantasy) - การผจญภัยในโลกแห่งจินตนาการและเวทมนตร์
- วิทยาศาสตร์ (Science Fiction) - เรื่องราวอนาคต เทคโนโลยี และอวกาศ
- ประวัติศาสตร์ (History) - เจาะลึกเหตุการณ์สำคัญและการเมืองในอดีต
- ชีวประวัติและบันทึกความทรงจำ (Biography & Memoir) - เรียนรู้จากชีวิตจริงของบุคคลสำคัญ
- คอมพิวเตอร์และเทคโนโลยี (Computer & Technology) - อัปเดตเทรนด์ AI, Coding และนวัตกรรม
- การ์ตูนและมังงะ (Comics & Manga) - ทั้งมังงะญี่ปุ่นและการ์ตูนไทยยอดนิยม
- วรรณกรรมเยาวชน (Young Adult) - เรื่องราวการเติบโตและผจญภัยที่อ่านได้ทุกวัย
- อาหารและเครื่องดื่ม (Cookbooks & Food) - สูตรอาหารและศิลปะการทำอาหาร
- ท่องเที่ยว (Travel) - แรงบันดาลใจในการเดินทางและคู่มือท่องเที่ยว
- ศาสนาและความเชื่อ (Religion & Beliefs) - ปรัชญาการใช้ชีวิตและจิตวิญญาณ
- สุขภาพและความงาม (Health & Wellness) - การดูแลร่างกายและสุขภาพจิต
- ศิลปะและการออกแบบ (Art & Design) - ความคิดสร้างสรรค์และสถาปัตยกรรม
- ความรู้ทั่วไป (General Knowledge) - สารคดีและเรื่องน่ารู้อื่นๆ
- ภาษาและการศึกษา (Language & Education) - การฝึกทักษะภาษาและตำราเรียน
- ครอบครัวและเด็ก (Family & Parenting) - คู่มือการเลี้ยงลูกและความสัมพันธ์ในครอบครัว
- วรรณกรรมคลาสสิก (Classics) - หนังสือทรงคุณค่าที่ผ่านกาลเวลา


## sources
- https://buffet.ookbee.com/catalog/book
- https://www.se-ed.com/book-cat.book?filter.productTypes=PRODUCT_TYPE_BOOK_PHYSICAL&sorter=PRODUCT_SORTER_POPULAR
- https://www.naiin.com/

## missing data

- in case of missing required data, scraping or using LLM to generate sample data save in separate file for future edit. coding html file to refer to sample data
  - create python code to scrape by beautiful soup or selenium or
  - create python code to use LLM to generate sample data
  - output path for code: `C:\Users\khala\MyDocuments\00_DS\03_CourseWork\2603522_RecSys\100_FinalProject_RecSys\notebook`
  - output path for created sample data: `C:\Users\khala\MyDocuments\00_DS\03_CourseWork\2603522_RecSys\100_FinalProject_RecSys\data\`
- example python code to scrape data from the sources:
  `C:\Users\khala\MyDocuments\00_DS\03_CourseWork\2603522_RecSys\100_FinalProject_RecSys\notebook\webscrape_WsCube19_SE-ED.ipynb`
  `C:\Users\khala\MyDocuments\00_DS\03_CourseWork\2603522_RecSys\100_FinalProject_RecSys\notebook\webscrape_WsCube26_loop over loop.ipynb`