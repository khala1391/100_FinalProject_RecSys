# Greed Route — ระบบแนะนำหนังสือออนไลน์
#### Book Recommendation System for Greed Route Platform

รายวิชา: 		2603522 Recommender Systems
ภาคการศึกษา: 	2/2568
ผู้สอน: 			รองศาสตราจารย์ ดร.วรสิทธิ์ ชูชัยวัฒนะ

จัดทำโดย:
6780061626
Jitpanu Wutikornwipak
6780051326
Kanisorn Unjittikul
6780191526
Nonthapong Kuansawadi
6780258026
Pornpen Ahcheewakesa
6780124526
Namonpas Viriyaroj
6780330426
Yuttapong Mahasittiwat
6780203426
Nariporn Klangpremchitt
6780206326
Navaphorn Wiriyapreeda


วันที่ส่ง: 		8 พฤษภาคม 2569

---

## บทที่ 1 บทนำ

### 1.1 ที่มาและความสำคัญ
ในยุคที่ข้อมูลหนังสือมีมากมายบนแพลตฟอร์มออนไลน์ ผู้อ่านมักประสบปัญหาในการเลือกหนังสือที่ตรงกับสิ่งที่สนใจ (Information Overload) อีกทั้งการเข้าถึงเพียงคำโปรยหรือเนื้อหาบางส่วนของหนังสือยังทำให้การตัดสินใจไม่แน่นอน และอาจทำให้ต้องใช้เวลาไปกับหนังสือที่ไม่ตรงกับความชื่นชอบ ซึ่งนำไปสู่ความไม่พึงพอใจหลังการซื้อ
ปัญหานี้ไม่ได้เกิดกับผู้อ่านเพียงฝ่ายเดียว แต่ยังส่งผลต่อผู้มีส่วนได้ส่วนเสียอื่น ๆ ในระบบนิเวศของหนังสือ เช่น สำนักพิมพ์ที่ขาดข้อมูลในการวางแผนและคาดการณ์ความต้องการ และร้านหนังสือที่ประสบปัญหาในการบริหารสต็อก รวมถึงความท้าทายในการเข้าถึงกลุ่มลูกค้าเป้าหมาย
โครงงานนี้นำเสนอการออกแบบระบบแนะนำหนังสือสำหรับแพลตฟอร์ม “Greed Route” ซึ่งเชื่อมต่อผู้อ่าน สำนักพิมพ์ และร้านหนังสือ (Multi-sided Platform) โดยมีเป้าหมายเพื่อมอบประสบการณ์การแนะนำแบบเฉพาะบุคคล (Personalized Recommendation) และเปิดโอกาสให้ผู้ใช้ค้นพบสิ่งใหม่ผ่านระบบ Surprise Recommendation โดยประกอบด้วยฟีเจอร์หลัก ได้แก่
ระบบแนะนำส่วนบุคคล (Recommended for You) สำหรับแนะนำหนังสือตามพฤติกรรมและความชื่นชอบของผู้ใช้
ระบบสำรวจ (Explore, New Releases, Trending) ช่วยให้ผู้ใช้ค้นพบหนังสือใหม่
ชุมชน (Groups, Discussions, Quotes) สำหรับส่งเสริมปฏิสัมพันธ์ระหว่างผู้อ่าน
ชั้นหนังสือส่วนตัว (My Books) สำหรับใช้ติดตามและจัดการรายการหนังสือของผู้ใช้
Choice Awards ระบบโหวตหนังสือยอดเยี่ยมประจำปี 
ระบบแนะนำถูกออกแบบ (Recommender System) โดยใช้ข้อมูลพฤติกรรมผู้ใช้ (User Interaction Events) ร่วมกับข้อมูลหนังสือ (Metadata) และข้อมูลรีวิว (Review Messages) เพื่อพัฒนาระบบที่สามารถแนะนำหนังสือได้อย่างมีประสิทธิภาพและสอดคล้องกับความต้องการของผู้ใช้ โดยใช้แนวทางแบบผสม (Hybrid Approach) ซึ่งผสานหลายเทคนิคเข้าด้วยกัน ได้แก่ Content-Based Filtering, Collaborative Filtering, Commercial Strategies และ Surprise Recommendation นอกจากนี้ โครงงานนี้ยังมีการจำลองข้อมูล (Simulated Data) เพื่อสะท้อนภาพรวมและสถานการณ์การใช้งานจริงของระบบ
### 1.2 วัตถุประสงค์ของโครงงาน
เพื่อออกแบบระบบแนะนำหนังสือเพื่อช่วยให้ผู้ใช้งานสามารถค้นหาหนังสือที่สอดคล้องกับความสนใจและพฤติกรรมการอ่านของตนเองได้ง่ายขึ้น ลดปัญหาในการตัดสินใจเลือกหนังสือ และเพิ่มความพึงพอใจในการใช้งาน
เพื่อศึกษาและเปรียบเทียบโมเดลการแนะนำหนังสือ ได้แก่ Content-based, Collaborative Filtering และ Hybrid Model รวมถึงพิจารณาการประยุกต์ใช้กลยุทธ์เชิงพาณิชย์ (Commercial Strategies) ในกระบวนการแนะนำ เช่น การจัดลำดับความสำคัญของรายการ (Ranking), การส่งเสริมรายการที่มีความสำคัญทางธุรกิจ และการปรับผลลัพธ์ให้สอดคล้องกับเป้าหมายทางธุรกิจ
ออกแบบและประเมินผลระบบทั้งแบบ Offline และ Online เพื่อประเมินคุณภาพของระบบแนะนำและเปรียบเทียบผลลัพธ์เพื่อเลือกโมเดลที่เหมาะสมที่สุด โดยใช้ตัวชี้วัด เช่น
Hit Rate@K
NDCG@K
Click-through Rate (CTR)
Conversion
พัฒนาแพลตฟอร์มต้นแบบ (Prototype Platform) ในรูปแบบเว็บไซต์ สำหรับให้บริการระบบแนะนำหนังสือแก่ผู้ใช้งาน 
### 1.3 ขอบเขตของโครงงาน
โครงงานนี้มุ่งเน้นการออกแบบและพัฒนาระบบแนะนำหนังสือในระดับต้นแบบ โดยเน้นการกำหนดโครงสร้างระบบ (Blueprint) และแนวทางการประยุกต์ใช้โมเดลที่มีอยู่ ทั้งนี้ มีการพัฒนาเว็บไซต์ต้นแบบเพื่อสาธิตการทำงานของระบบ และรองรับการแสดงผลรายการแนะนำในลักษณะการใช้งานจริง
ในด้านข้อมูล โครงงานใช้ข้อมูลจำลองที่อ้างอิงจากพฤติกรรมผู้ใช้งาน เพื่อใช้ในการทดสอบและประเมินผลระบบ แทนการใช้ข้อมูลจริงในระดับ production นอกจากนี้ การประเมินแบบออนไลน์ได้มีการใช้งานกับผู้ใช้จริงในสภาพแวดล้อมจริง

ข้อมูลที่ใช้ในโครงงานนี้ถูกจำลองขึ้นเพื่อสะท้อนพฤติกรรมการใช้งานจริงของผู้ใช้ โดยมีการสร้างข้อมูลในรูปแบบเหตุการณ์ (Event Transaction) ที่ครอบคลุมพฤติกรรมต่าง ๆ เช่น การคลิกดูรายละเอียด การเริ่มอ่าน การให้คะแนน และการซื้อหนังสือ เพื่อให้สามารถนำไปใช้ในการพัฒนาและประเมินระบบแนะนำได้อย่างมีประสิทธิภาพ


---

## บทที่ 2 ลักษณะข้อมูล

บทนี้นำเสนอภาพรวมสถาปัตยกรรมระบบแนะนำ และอธิบายโครงสร้างและความสัมพันธ์ของข้อมูล กระบวนการจัดการและเตรียมข้อมูล เพื่อใช้ในการพัฒนาโมเดล
### 2.1 ภาพรวมสถาปัตยกรรมระบบ
ภาพรวมของระบบ Greed Route รองรับการใช้งานหลัก ได้แก่ การค้นหา การสำรวจ การแนะนำหนังสือ ชุมชน และชั้นหนังสือส่วนตัว โดยข้อมูลพฤติกรรมของผู้ใช้จะถูกบันทึกในรูปแบบเหตุการณ์ (Event Transaction) เพื่อนำไปใช้ในระบบแนะนำหนังสือ และมีการจัดเก็บผลลัพธ์เพื่อใช้ในการประเมินและพัฒนา ปรับปรุงระบบต่อไป


### 2.2 Database Schema Design

ฐานข้อมูลออกแบบตาม Star Schema เพื่อให้รองรับระบบแนะนำ โดยมีตาราง user_book_event เป็นจุดศูนย์กลาง ล้อมรอบด้วย 17 ตาราง แบ่งเป็น 4 กลุ่มตามหน้าที่ในระบบ
Fact / Event Tables: ประกอบด้วยตารางที่ใช้เก็บพฤติกรรมของผู้ใช้และผลลัพธ์จากระบบแนะนำ ได้แก่
user_book_event: ข้อมูลการใช้งานของผู้ใช้กับหนังสือ
recommendation_log: ข้อมูลการแนะนำ เช่น รายการที่แสดง ลำดับ และการคลิก
Core Entity Tables: ประกอบไปด้วยตารางที่ใช้เก็บข้อมูลซึ่งถูกอ้างอิงจากตาราง fact ได้แก่
user: ข้อมูลผู้ใช้
book: ข้อมูล metadata ของหนังสือ
genre: ข้อมูลประเภทและหมวดหมู่ของหนังสือ
publisher: ข้อมูลสำนักพิมพ์
Dimension Tables: ประกอบไปด้วยตารางอ้างอิงความหมายจาก fact table เช่น language, device, level_of_intent, discovery_channel
Bridge / Junction Tables
 ใช้จัดการความสัมพันธ์แบบ many-to-many ระหว่าง entity ต่าง ๆ เช่น
user_genre_preference: ความชอบ genre ของผู้ใช้จาก onboarding
book_tag: tag เนื้อหาของหนังสือ
publisher_promotion: ข้อมูลโปรโมชันของสำนักพิมพ์
ตาราง user_book_event ใช้บันทึกพฤติกรรมของผู้ใช้ที่เกิดขึ้นกับหนังสือ เช่น การคลิกดูรายละเอียด การเริ่มอ่าน การให้คะแนน และการซื้อหนังสือ เพื่อสะท้อนระดับความต้องการของผู้ใช้จากพฤติกรรมการใช้งาน (Level of Intent)  ซึ่งฟีเจอร์นี้ช่วยให้ Greed Route เข้าใจความสนใจของผู้ใช้ได้ละเอียดกว่าการใช้เพียง rating เนื่องจากครอบคลุมพฤติกรรมที่หลากหลาย รวมถึงกรณีที่ผู้ใช้ไม่ได้ให้คะแนนโดยตรง โดยระบบแบ่ง Level of Intent ออกเป็น 9 ระดับ เรียงจากความต้องการสูงไปต่ำ และสามารถนำไปใช้เป็น implicit feedback สำหรับพัฒนาระบบแนะนำได้
ระดับความต้องการของผู้ใช้จากพฤติกรรมการใช้งาน (Level of Intent) 
Intent Level
Event Type
ตัวอย่างบน Greed Route
0
genre_view
ผู้ใช้เลื่อนดูหมวด “แฟนตาซี”
1
preview
hover เห็นปกหนังสือ
2
view_details
คลิกดูรายละเอียดหนังสือ
3
add_to_wishlist
กดบันทึกเข้า “อยากอ่าน”
4
purchase
ซื้อหนังสือผ่านร้านค้าที่ลิงก์
5
read_start
เริ่มอ่านหนังสือ
6
read_complete
อ่านจบ
7
rate_review
ให้คะแนน + เขียนรีวิว
8
share
แชร์หนังสือให้เพื่อน


(ควรเพิ่มมั้ย ????) รายละเอียดของแต่ละตาราง ได้แก่ columns, data type และตัวอย่างข้อมูล อ้างอิงใน Appendix A 
### 2.3 Data Preparation and Feature Engineering
ก่อนนำข้อมูลเข้าสู่แต่ละโมเดล ต้องแปลง raw data ให้เป็น feature vectors ที่เหมาะสมกับการคำนวณ similarity ระบบ Greed Route ออกแบบ pipeline ที่รองรับข้อมูล 3 ประเภทหลัก ได้แก่ Nominal, Ordinal และ Text แต่ละประเภทมีวิธีการแทนค่าที่แตกต่างกันก่อนนำไปใช้คำนวณ similarity
#### 2.3.1 Nominal Feature Preparation
ในการเตรียม nominal features ซึ่งเป็น feature เชิงหมวดหมู่ที่ไม่มีลำดับ ก่อนนำไปเป็น input คำนวณหา similarity ในโมเดล ระบบใช้วิธี encoding หลัก 2 รูปแบบ ได้แก่ one-hot encoding และ multi-hot encoding โดยเลือกใช้ตามลักษณะย่อยของ feature:
One-hot encoding: ใช้กับ feature ที่มีค่าเดียวต่อหนึ่งรายการ (single-valued feature) จะใช้ เช่น user.marital_status, user.occupation, user.religion, user.sex, user.education_level, user.salary_range และ 
Multi-hot encoding: ใช้กับ feature ที่สามารถมีได้หลายค่าต่อหนึ่งรายการ (multi-valued feature) จะใช้ เพื่อให้สามารถแทนหลายหมวดหมู่ได้พร้อมกัน ได้แก่ user.hobbies, book.author, book.genre และ book.subgenre สำหรับฟีเจอร์ที่เก็บในรูปแบบ list จำเป็นต้องแยกค่าออกจากกัน (list explosion) ก่อนทำ multi-hot encoding เพื่อให้แต่ละหมวดหมู่ถูกแทนเป็นคอลัมน์แยกกัน
#### 2.3.2 Ordinal Feature Preparation
ในการเตรียม ordinal features ซึ่งเป็น feature ที่มีลำดับหรือมีค่าเชิงตัวเลข ระบบใช้วิธี normalization แบบต่าง ๆ ตามลักษณะของ feature:
Min-Max Normalization [0,1]: ใช้กับ promotion_budget เพื่อปรับค่าให้อยู่ในช่วง 0–1 หลังจากคัดเลือกหนังสือ Top 100 จากโมเดล Content-based และ Collaborative Filtering แล้ว เพื่อทำให้สามารถใช้เป็น commercial score และคำนวณร่วมกับคะแนนจากโมเดลอื่นได้ โดยคำนวณจาก (x − min) / (max − min)
User-Mean Normalization: ใช้กับ user_book_event.rating และ intent_level เพื่อลดอคติรายบุคคลของผู้ใช้ โดยเฉพาะผู้ใช้ที่มีแนวโน้มให้คะแนนสูงหรือต่ำกว่าปกติ ก่อนคำนวณ similarity ค่า rating จะถูกปรับจาก r_{u,i} เป็น r_{u,i} − r̃_u เพื่อให้ similarity สะท้อนความแตกต่างเชิงสัมพันธ์มากกว่าค่า rating แบบ raw
Mean Normalization: ใช้กับ user.birth_year เพื่อแปลงค่าให้อยู่ในรูปแบบเชิงสัมพันธ์ และช่วยให้สามารถเปรียบเทียบความแตกต่างระหว่างผู้ใช้ได้ง่ายขึ้น โดยคำนวณจาก x − mean(x)
#### 2.3.3 Text Features — TF-IDF Weighted Keyword Embedding
ข้อมูลข้อความจาก Review Messages และ metadata ของหนังสือ เป็นแหล่งข้อมูลสำคัญที่สะท้อนทั้งความหมายเชิงเนื้อหา (semantic) และความรู้สึกของผู้ใช้ ระบบจึงแปลงข้อความเหล่านี้ให้อยู่ในรูป semantic vector ขนาด 768 มิติ โดยใช้ TF-IDF Weighted Keyword Embedding
##### 2.3.3.1 Review Messages Preparation
สำหรับรีวิวของแต่ละหนังสือ ระบบจะรวมข้อความรีวิวทั้งหมดของหนังสือแต่ละเล่มเป็นเวกเตอร์เดียว vector (768 มิติ) ผ่านขั้นตอน ดังนี้

Translation: แปลรีวิวจากภาษาไทยเป็นภาษาอังกฤษ เพื่อให้สามารถใช้ pretrained English embedding ได้อย่างมีประสิทธิภาพ
Tokenization & Stopword Removal: ตัดคำและลบ stopwords เพื่อลดสัญญาณรบกวน
Review Aggregation: รวมรีวิวทั้งหมดของหนังสือโดยการ concatenation เดียวกันเป็น document เดียว
Keyword Embedding: แปลงคำแต่ละคำเป็น embedding vector และสร้าง embedding matrix ขนาด 768 × N (N คือจำนวนคำ)
TF-IDF Weighting: คำนวณ TF-IDF โดยใช้หนังสือทุกเล่มเป็น corpus เพื่อสร้าง importance score vector ขนาด N × 1
Weighted Sum: คำนวณ weighted sum ระหว่าง embedding matrix และ TF-IDF vector เพื่อได้ vector ขนาด 768 × 1 เพื่อเป็นตัวแทนเชิงความหมายของหนังสือ
vector  ขนาด 768 × 1 ที่ได้เป็นตัวแทนเชิงความหมายของหนังสือ โดยรวมทั้งความหมายเชิง semantic และความสำคัญเชิงสถิติของคำ 

(@ploy ฝากใส่รูปชัดให้หน่ยยย)
Review Messages Preparation

##### 2.3.3.2 Book Metadata (Title & Description) Preparation
สำหรับข้อมูล metadata ของหนังสือ ได้แก่ title และ description ระบบใช้กระบวนการเดียวกัน โดยนำข้อความทั้งสองส่วนมารวมกันก่อนผ่านขั้นตอน tokenization และ embedding pipeline
ผลลัพธ์คือเวกเตอร์ขนาด 768 มิติต่อหนังสือ ซึ่งสามารถนำไปใช้คำนวณ similarity เช่น cosine similarity ได้โดยตรงในโมเดล

Book Metadata (Title & Description) Preparation

### 2.4 Data Splitting
เนื่องจากข้อมูล rating ของผู้ใช้มีลักษณะเป็นลำดับตามเวลา ระบบจึงใช้การแบ่งข้อมูลแบบ temporal split แทนการสุ่มแบ่งข้อมูล เพื่อจำลองสถานการณ์จริงที่ระบบต้องใช้พฤติกรรมในอดีตในการทำนายพฤติกรรมถัดไปของผู้ใช้ โดยแบ่งผู้ใช้ตามจำนวน rating ดังนี้

Existing users (3+ ratings): ใช้ rating ที่เก่ากว่าเป็น train, รายการรองล่าสุด ๖(latest-1) เป็น validation set และใช้รายการล่าสุด (latest) เป็น test set
New users (2 ratings): ใช้ rating แรกเป็น train set และใช้ rating ล่าสุดเป็น test set โดยไม่ถูกนำเข้า validation  set
New users (1 rating): ใช้เป็น test เท่านั้น เนื่องจากข้อมูลไม่พอสำหรับการ train หรือ weight tuning

การแบ่งข้อมูลลักษณะนี้ช่วยให้การประเมินสะท้อนการของระบบในสถานการณ์จริงมากขึ้น และลดปัญหา data leakage จากการนำข้อมูลในอนาคตไปใช้ในการฝึกโมเดล
Temporal Data Splitting



---

## บทที่ 3 Model

บทนี้นำเสนอภาพรวมของโมเดล รายละเอียดของโมเดลย่อยทั้ง 8 โมเดล และกระบวนการรวมโมเดลทั้งหมดเพื่อสร้าง Hybrid Recommender System
### 3.1 ภาพรวมของโมเดล
ระบบแนะนำของ Greed Route แบ่งเป็น Personalized และ Non-Personalized Recommendation โดยในส่วน Personalized ใช้ Hybrid Recommender ที่ผสม 4 แนวทางหลักเพื่อรองรับทั้งผู้ใช้ใหม่และผู้ใช้เดิม พร้อมทั้งสนับสนุนทั้ง commercial recommendation และ serendipity ภายในระบบนี้มีโมเดลทั้งหมด 8 โมเดลที่ทำงานคู่ขนานกัน และถูกรวมคะแนนผ่านวิธี Hybrid Ensemble โดยแบ่งเป็นโมเดลที่คิดคะแนน 7 โมเดล และอีก 1 โมเดล สำหรับ surprsie recommendation ซึ่งใช้การสุ่มแบบมีหลักการ เพื่อเพิ่มความหลากหลายของคำแนะนำ ส่วน Non-Personalized Recommendation ใช้โมเดล Trending สำหรับแนะนำหนังสือยอดนิยมโดยไม่อิงข้อมูล  user profile

ระบบแนะนำโดยทั่วไป สามารถแบ่งได้เป็น 4 รูปแบบหลักๆ แต่ละรูปแบบ มีจุดแข็งและจุดอ่อนที่ต่างกัน และไม่มีรูปแบบใดครอบคลุมได้ครบทุกสถานการณ์ด้วยตัวเอง

ระบบแนะนำ 4 รูปแบบหลัก 

แนวทาง
วิธีการ
จุดแข็ง
จุดอ่อน
Content-Based Filtering
ใช้ features ของ item (genre, tags, description) เปรียบเทียบกับสิ่งที่ผู้ใช้ชอบ
ทำงานได้กับ user ใหม่ และหนังสือใหม่ที่ไม่มี rating
จำกัดอยู่ใน content ที่คล้ายของเดิม ขาดการค้นพบสิ่งใหม่
Collaborative Filtering
ใช้ rating/behavior patterns ของผู้ใช้ หรือ item ที่คล้ายกัน
ค้นพบ item ใหม่ที่ไม่เคยเห็น
Cold-start problem สำหรับผู้ใช้ใหม่/หนังสือใหม่
Hybrid
รวม Collaborative + Content-Based + Commercial ผ่าน weighted ensemble หรือ switching strategy
ลดจุดอ่อนของแต่ละแนวทาง ครอบคลุมหลายสถานการณ์
ซับซ้อนกว่า ต้องปรับน้ำหนักและคำนึงถึงพารามิเตอร์หลายค่า
Non-Personalized / Popularity
แนะนำรายการยอดนิยมหรือรายการใหม่ โดยไม่อิงกับ user profile
ทำงานได้ทันทีแม้ไม่มีประวัติผู้ใช้
ไม่ได้แนะนำรายการเฉพาะสำหรับ user


หัวข้อต่อไปนี้อธิบายแนวคิดของ Content-based และ Collaborative Filtering ตามลำดับ ก่อนสรุปเป็นภาพรวม 8 โมเดลที่ได้ออกแบบไว้
### 3.2 Content-Based Filtering
Content-Based Filtering จะคำนวณหา similarity ระหว่าง item หรือ user จาก feature vectors แล้วทำการแนะนำ item ที่มี features profile คล้ายกับที่ user เคยแสดงความสนใจ ในระบบ Greed Route วิธีนี้ถูกนำไปใช้ใน 2 มุมมอง ได้แก่
Content-Based by Demographic (Model 1) — ใช้ feature ของผู้ใช้ เช่น birth_year, education_level, hobbies, marital_status, occupation, religion, salary_range, sex คำนวณ similarity ระหว่างผู้ใช้เพื่อแนะนำหนังสือที่ผู้ใช้คล้ายกับที่ผู้ใช้ชอบ
Content-Based by Metadata (Model 2) — ใช้ feature ของหนังสือ เช่น genre, subgenre, title, author, description คำนวณ similarity ระหว่างหนังสือ เพื่อแนะนำเล่มที่คล้ายกับเล่มที่ผู้ใช้ชอบ
#### 3.2.1 Similarity Measure: Cosine Similarity
ใช้ Cosine Similarity เป็นตัววัดความคล้ายระหว่างเวกเตอร์  โดยจะไม่ขึ้นกับขนาดของเวกเตอร์ โดยผลลัพทธ์ออกมา จะอยู่ในช่วง [−1, 1]  เมื่อเวกเตอร์ชี้ไปในทิศทางเดียวกันค่า similarity จะเข้าใกล้ 1 และเมื่อชี้ตรงข้ามจะเข้าใกล้ -1 ซึ่งเหมาะกับ feature vectors ที่ผสมกันทั้ง one-hot, ordinal และ embedding ซึ่งมี scale ต่างกันมาก
 sim(A, B) =(A· B)(‖A‖ · ‖B‖) 
โดย 	sim(A, B)  คือ ค่า Cosine Similarity ระหว่างหนังสือ A และหนังสือ B
#### 3.2.2 Prediction Formula
Predicted Score ของหนังสือ i สำหรับแต่ละผู้ใช้ u สามารถคำนวณเป็น weighted average ของ similarity กับหนังสือที่ผู้ใช้เคยให้ rating ไว้ ได้เป็นสูตรดังนี้
score(u, i) =Σ sim(i, j) × r(u, j) Σ sim(i, j) 
โดย 	score(u, i) คือ Predicted Score ของหนังสือ i สำหรับแต่ละผู้ใช้ u
	sim(i, j) คือ ค่า similarity ระหว่างหนังสือ i และหนังสือ j
	r(u, j) คือ rating ของหนังสือ j ที่ผู้ใช้ u เคยให้คะแนนไว้
จากสูตรนี้ จะทำให้หนังสือที่ผู้ใช้ชื่นชอบมากกว่า มีน้ำหนักในการดึง item ใกล้เคียงมากกว่า
### 3.3 Collaborative Filtering
Collaborative Filtering (CF) ใช้ข้อมูลของผู้ใช้หลายคนร่วมกัน ในการทำนายความชอบของผู้ใช้เป้าหมาย โดยไม่จำเป็นต้องรู้ content ของ item โดยตรง โดยทั่วไปแบ่งเป็น 2 รูปแบบตาม dimension ของ similarity matrix ที่ใช้
#### 3.3.1 รูปแบบที่ 1: Item-Based Collaborative Filtering
คำนวณความคล้ายระหว่าง items จาก  rating vectors  (จากข้อมูล rating, event และข้อมูลอื่นๆที่  embedding เรียบร้อยแล้ว) แล้วแนะนำ items ที่คล้ายกับสิ่งที่ผู้ใช้เคย Interact โดยสูตรการคำนวณ prediction score เป็นดังนี้
Pred(u, i) =r̃ᵤΣⱼ∈Sᵢ sim(i, j) × ru, j Σⱼ∈Sᵢ sim(i, j) 
โดย r̃ᵤ คือค่า rating เฉลี่ยของผู้ใช้ u โดยผ่านการ normalization เพื่อลด bias รายบุคคล
และ Sᵢ คือเซ็ตของหนังสือใน neighborhood ที่ผู้ใช้เคยให้ rating
ในระบบ Greed Route นี้ Collaborative Filtering จะถูกใช้ใน 3 โมเดล ได้แก่ Model 3, 4 และ 5 โดยแตกต่างกันที่ feature vector ที่ใช้คำนวณ similarity:
Model 3 — keyword embedding จากรีวิวของผู้ใช้งานระบบ โดยใช้ TF-IDF และทำการ weighted average ซึ่งจะมีขนาด 768 dimensions
Model 4 — คะแนนความสนใจ (IE) ที่ได้จาก intent level และการถ่วงน้ำหนักตามเวลา (time decay) 
Model 5 — user-mean normalized rating vector
#### 3.3.2 รูปแบบที่ 2: User-Based Collaborative Filtering
ในรูปแบบนีั ระบบจะคำนวณและหาผู้ใช้ที่มี rating pattern คล้ายกับผู้ใช้เป้าหมาย โดยคำนวณค่า similarity ระหว่างผู้ใช้จาก rating vectors  แล้วแนะนำหนังสือที่ผู้ใช้ที่มีลักษณะคล้ายกันชอบ แต่ผู้ใช้เป้าหมายยังไม่เคยอ่าน โดยรูปแบบนี้จะถูกใช้ใน Model 6
Similarity measure: Cosine Similarity
 sim(u, v) =Σi∈ Iuv rui· rviΣi∈ Iuv rui2· Σi∈ Iuv rvi2 
โดย  Iuv คือ set ของ items ที่ทั้ง user u และ v เคย rate, rui คือ rating ที่ user u  ให้กับ item i 
#### 3.3.3 Cold-Start Problem และแนวทางแก้ไขใน Greed Route
ข้อจำกัดสำคัญของ Collaborative Filtering คือ cold start problem ซึ่งหมายถึงปัญหาที่ระบบไม่สามารถแนะนำได้อย่างแม่นยำเมื่อผู้ใช้ใหม่ หรือหนังสือใหม่ยังไม่มี interaction history เพียงพอ การใช้วิธี Content-Based เข้ามาร่วมกัน ก็จะสามารถแก้ไขปัญหานี้ได้

ประเภท
สาเหตุ
แนวทางแก้ไขใน Greed Route
New User
ไม่มี rating history
ใช้ genre preferences จาก onboarding (user_genre_preference) + Content-Based by Metadata (M2)
New Item
ไม่มี ratings จากผู้ใช้
ใช้ Content-Based โดยคำนวณ similarity จาก genre, tags, description embedding + Popularity boost

### 3.4 โมเดลของระบบ Greed Route
Greed Route ถูกออกแบบเป็น Hybrid Recommender ที่ใช้ 8 โมเดลทำงานร่วมกัน โดยอาศัยข้อมูลหลายประเภท เช่น demographic, content, behavior, rating และ commercial signal ซึ่งถูกแปลงเป็น feature representation ที่เหมาะสมกับแต่ละโมเดล เพื่อให้คะแนนหนังสือจากหลายมุมมอง ก่อนรวมคะแนนผ่านวิธี Hybrid Ensemble เป็น Final Score เดียว 

ในโครงสร้างนี้ Model 1 – Model 6 เป็น scoring models ที่ทำงานขนานกันและให้คะแนนอย่างอิสระ ส่วน Model 7 จะทำหน้าที่คำนวณคะแนนกับ commercial score เพื่อให้ได้อันดับในการแนะนำหนังสือในอันดับ 1-4 และ 5-8 นอกจากนี้ Model 8 จะแนะนำหนังสือในอันดับ 5 และ 10 สำหรับ serendipity เพื่อเพิ่มความหลากหลายโดยไม่ต้องแข่งขันกับโมเดลให้คะแนนหลัก ในขณะที่ Trending ทำงานแยกเป็น non-personalized feed นอก Hybrid pipeline ส่งผลให้ระบบสามารถสร้าง recommendation ที่ครอบคลุม signal หลายมิติและมีความสมดุลทั้งด้านความแม่นยำและความหลากหลาย

#
โมเดล
ประเภท
Output
M1
CB Demographic
Content-Based (User features)
Predicted score [−1, 1] ต่อผู้ใช้-หนังสือ
M2
CB Metadata
Content-Based (Book Metadata features)
Predicted score [−1, 1] ต่อผู้ใช้-หนังสือ
M3
CF Item × Item with Keyword Embedding
Collaborative (Item-Item) 
Embedded Review text
Predicted score [1, 5]
M4
CF Item × Item with Behaviour Data
Collaborative (Item-Item)
Predicted score จาก intent level
[0, ∞) 
M5
CF Item × Item with Rating
Collaborative (Item-Item)
Predicted score [1, 5]
M6
CF User × User with Rating
Collaborative (User-User)
Predicted score [1, 5]
M7
Non-Personalized Commercial
Commercial Blend
(promotion_budget)
Min-Max Normalised score  [0,1]
M8
Surprise Recommendation
Serendipity
สุ่มหนังสือ 2  เล่มจาก percentile 40-60
Trending
Weighted Popularity
Non-Personalized
(Rating aggregates (v, m, R, C) )
Ranking สำหรับ Trending feed


#### 3.4.1 Model 1: Content-Based by Demographic

ในส่วนของ Model 1 จะใช้ feature ของผู้ใช้ที่ผ่านการ encoding (nominal one/multi-hot และ ordinal normalization) เพื่อคำนวณค่า similarity ระหว่างผู้ใช้ หลังจากนั้นจึงรวมผลจากทุก feature เป็น Average Similarity Matrix แล้วใช้สูตรทำนายคะแนน
Feature: One/Multi-hot + User-mean + Min-max normalize
Similarity / Method: Average cosine similarity across features (user × user)

#### 3.4.2 Model 2: Content-Based by Metadata

ในส่วนของ Model 2 จะใช้ feature ของหนังสือ ได้แก่ genre, subgenre, title embedding, author และ description ที่ผ่านการ embedding โดยคำนวณค่า similarity ระหว่างหนังสือ โดยใช้แนวทางเดียวกับ Model 1 แต่ข้อมูลจะเป็นหนังสือ ไม่ใช่ข้อมูลผู้ใช้ โดย Model 2 จะเป็นกรณีพิเศษกว่าโมเดลอื่นด้วย เพราะถูกใช้เป็น cold-start เพียง model เดียวใน Model 1-6  (มี weight 50% สำหรับ cold-start สำหรับผู้ใช้ใหม่ที่มี rating 0-2 ครั้ง)
Feature:  Multi-hot (genre, subgenre) + TF-IDF Keyword Embedding 768-dim (title + description)
Similarity / Method:  Cosine similarity (book × book)
#### 3.4.3 Model 3: CF Item × Item with Keyword Embedding from review text

ในส่วนของ Model 3 จะใช้ weighted average vector ที่มี 768 dimensions ของแต่ละหนังสือ (ซึ่งสร้างจาก TF-IDF weighted keyword embedding ของรีวิวในหัวข้อ 3.4.2) มาคำนวณสร้างเป็น cosine similarity matrix ระหว่างหนังสือทุกคู่ จากนั้นจึงทำนาย predicted score ของผู้ใช้
Feature:  TF-IDF-weighted Keyword Embedding 768-dim ต่อหนังสือ
Similarity / Method: Cosine similarity (book × book) + CF prediction formula
#### 3.4.4 Model 4: CF Item × Item with Behaviour Data

ใน Model 4 นี้ ใช้โครงสร้างเดียวกับ Model 3 แต่เปลี่ยนจาก predicted score เป็น interaction-based score (IE)  ซึ่งสะท้อนระดับความสนใจของผู้ใช้ต่อหนังสือแต่ละเล่ม โดยคำนวณจาก intent level ของพฤติกรรมผู้ใช้ร่วมกับ time decay
ค่า IE จะถูกนำไปถ่วงน้ำหนักร่วมกับ content-based similarity matrix เพื่อคำนวณเป็น predicted preference score ของผู้ใช้ต่อหนังสือแต่ละเล่ม
Feature: Interaction score (IE) จาก intent level และ time decay
Method: ใช้ similarity matrix ของหนังสือร่วมกับการถ่วงน้ำหนักด้วย IE (similarity-weighted aggregation)
#### 3.4.5 Model 5: CF Item × Item with Rating

ในส่วนของ Model 5 จะใช้ normalized rating matrix (ผ่าน user-mean normalization ในช่วง [-1, 1]) คำนวณหาค่า similarity ระหว่างแต่ละหนังสือ จากเวกเตอร์ rating แล้วทำนาย Predicted Score
Feature:   User-mean normalized rating matrix
Similarity / Method: Item-based KNN with means
#### 3.4.6 Model 6: CF User × User with Rating

Model 6 จะมีโครงสร้างเดียวกับ Model 5 แต่ในการคำนวณ similarity จะใช้การคำนวณระหว่างผู้ใช้แทนระหว่างหนังสือ ใช้ normalized rating matrix ในช่วง [-1, 1] คำนวณหาค่า similarity ระหว่างแต่ละผู้ใช้ แล้วทำนาย Predicted Score
Feature:   User-mean normalized rating matrix
Similarity / Method:  User-based KNN with means

#### 3.4.7 Model 7: Non-Personalized for Commercial

เพื่อสร้างโมเดลธุรกิจให้กับแพลตฟอร์ม ระบบต้องเปิดพื้นที่สำหรับสำนักพิมพ์และร้านหนังสือสามารถโปรโมทหนังสือของตนได้ โดยตั้งใจให้การแนะนำ ไม่เสียประสบการณ์ผู้ใช้ ดังนั้น Model 7 จึงถูกออกแบบให้ผสมคะแนน Personal Score จาก Model 1-6 กับ Promotion Score ในสัดส่วน 70:30 สำหรับผู้ใช้เดิม และ 50:50 สำหรับผู้ใช้ใหม่ (โดย Predicted Score ของ new user มีสัดส่วน 50% จาก M2 เท่านั้น) โดยทำการคำนวณ Ranking ใหม่จาก 100 อันดับแรกที่เป็น output จาก Model 1 - Model 6 โดยตั้งใจออกแบบให้คำนวณหลังจากได้ 100 อันดับจากการทำงานของ 6 โมเดลแรกเรียบร้อยแล้วเท่านั้น เพื่อให้มั่นใจว่า หนังสือที่ทำการแนะนำ ผ่าน algorithm มาแล้วว่าผู้ใช้น่าจะชอบทุกเล่ม
โดย Score คำนวณจาก promotion_budget ของแต่ละหนังสือ หลังผ่าน min-max normalization ให้อยู่ในช่วง [0, 1] การแยกคะแนนนี้ออกจากคะแนนหลัก ทำให้สามารถควบคุมได้ว่า promotion_budget ส่งผลต่ออันดับในการแนะนำหนังสืออย่างไรบ้าง
ในการทำงานของระบบ Model 7 ไม่ใช่โมเดล stand-alone แต่เป็นกลไกผสมคะแนนส่วนบุคคลกับโปรโมชันเชิงพาณิชย์ เพื่อสร้าง revenue stream ให้แพลตฟอร์ม โดยแยกเป็น 2 scenario ตามประเภทผู้ใช้
ประเภทผู้ใช้
Top 100 Score จาก
Personal %
Promotion %
ผลลัพธ์
Existing User
Model 1-6 (รวมกัน)
70%
30%
Rank 1-4 & 6-9
New User
Model 2 เท่านั้น (CB Metadata)
50%
50%
Rank 1-4 & 6-9

สัดส่วน promotion ที่สูงขึ้นสำหรับ new user (50% vs 30%) สะท้อนแนวคิดว่าเมื่อยังไม่รู้ความชอบผู้ใช้ดี การเน้นหนังสือที่ได้รับการโปรโมทจะเพิ่มโอกาส conversion และช่วยเก็บ interaction data เพื่อการทำ cold-start smoothing เป็นอีกทางเลือกหนึ่งในการให้สัดส่วนต่อไป
Feature:   Min-max normalize promotion_budget; Top-100 Book’s score
Similarity / Method:  Weighted blend: 70% personal + 30/50% promotion

#### 3.4.8 Model 8: Surprise Recommendation (Rank 5 & 10)

เพื่อเพิ่มความแปลกใหม่ในระบบแนะนำ Greed Route ได้ออกแบบ slot เฉพาะสำหรับ Surprise Recommendation โดยสุ่มจาก percentile ที่ 40-60 ของคะแนนรวมจาก Model 1-6 เพื่อให้ได้หนังสือที่ผู้ใช้น่าจะยังไม่เคยเห็น แต่ไม่ได้สุ่มแบบไร้ทิศทาง (คะแนนยังคงอยู่ระดับกลาง ๆ ไม่ใช่ต่ำสุด) โดย slot นี้ใช้ที่อันดับ 5 และ 10 ของหนังสือแนะนำใน Top-10
จาก Sum Score ของ Model 1-6 ระบบจะคำนวณ percentile ของคะแนนรวมของหนังสือทุกเล่ม แล้วสุ่มเลือก 2 เล่มจากช่วง percentile 40-60 ซึ่งเป็นช่วงกลาง โดยจะไม่ใช่หนังสือยอดฮิตที่คาดเดาได้ แต่ก็ไม่ใช่หนังสือที่ผู้ใช้ไม่น่าจะสนใจ (ถ้าเป็น percentile ที่ 0-10 ไปเลย ผู้ใช้ก็อาจจะไม่สนใจไปเลย) โดยหนังสือทั้ง 2 เล่มนี้จะถูกวางที่อันดับ 5 และ 10 ของคำแนะนำ Top-10
Feature: Percentile ranking
Similarity / Method: Random sampling ในช่วง percentile 40-60


#### 3.4.9 Trending Recommendation (สำหรับผู้ใช้ทุกคน)

สำหรับ Non-personalized feed ที่ใช้ Weighted Rating Formula สำหรับจัดอันดับหนังสือยอดฮิตและหนังสือใหม่ ระบบแนะนำแบบไม่ขึ้นกับผู้ใช้ (Trending Recommendation) จะใช้ Weighted Rating ตามสูตรของ IMDB Top 250 เพื่อหลีกเลี่ยง bias จากหนังสือที่มี rating สูงแต่มีจำนวน rating น้อย คือ
WR =(vv+mx R) +(mv+mx C) 
•      v = จำนวน rating ของหนังสือเล่มนั้น
•      m = จำนวน rating ขั้นต่ำที่กำหนดให้เข้ารอบ Top Chart
•      R = ค่าเฉลี่ย rating ของหนังสือเล่มนั้น
•      C = ค่าเฉลี่ย rating ของหนังสือทั้งหมดใน dataset
จากสมการนี้ หนังสือที่ทั้งมีคะแนนดีและมีจำนวนรีวิวเพียงพอผ่าน threshold จะถือว่าถูก veriified
Trending Recommendation จะถูกวางในหน้าแรก (ใน tab 'สำรวจ') และหน้า browse-explore เพื่อช่วยให้ผู้ใช้ค้นพบหนังสือใหม่ๆ ที่ไม่ได้ขึ้นมาจาก personalized feed
Feature: v, m, R, C scalars
Similarity / Method: Weighted Rating Formula (IMDB-style)
### 3.5 Hybrid Recommendation
Hybrid Recommendation เป็นการรวมคะแนนจากหลายโมเดลเพื่อใช้จุดแข็งของแต่ละวิธีร่วมกัน และเพิ่มความหลากหลายของข้อมูลที่ใช้ในการแนะนำ 
ระบบของ Greed Route ใช้การรวมโมเดลแบบ Weighted Ensemble หรือการรวมคะแนนแบบถ่วงน้ำหนัก โดยแต่ละโมเดลสามารถมีน้ำหนักแตกต่างกันได้ ซึ่งในที่นี้ คะแนนจากโมเดลหลักทั้ง 6 โมเดล (M1–M6) จะถูกนำมารวมเป็น Personal Score ก่อนเพิ่ม Commercial Score จาก Model 7 เพื่อจัดอันดับหนังสือ Top-8 สุดท้าย

ขั้นตอนการคำนวณ Hybrid Score มีดังนี้
รับคะแนนจากโมเดลหลักทั้ง 6 โมเดล (M1–M6)
ปรับคะแนนของแต่ละโมเดลให้อยู่ในช่วงเดียวกันด้วย Min-Max Normalization [0,1]
คูณคะแนนที่ปรับแล้วด้วยน้ำหนักของแต่ละโมเดล
รวมคะแนนถ่วงน้ำหนักทั้งหมดเป็น Personal Score
เพิ่ม Commercial Score จาก Model 7 ตามสัดส่วนที่กำหนด
จัดอันดับหนังสือและเลือก Top-8 เป็นผลลัพธ์สุดท้าย 

ขั้นตอนที่ 3–4 เป็นกระบวนการ Weighted Ensemble ซึ่งเป็นการรวมคะแนนจากหลายโมเดลโดยการถ่วงน้ำหนักและรวมเป็นคะแนนเดียว

คำนวณ Hybrid Score

#### 3.5.1 Weighted Ensemble via Full Outer Join
ในการคำนวณ Hybrid Score ระบบแบ่งคะแนนออกเป็น 2 ส่วนหลัก ได้แก่ Personal Score และ Commercial Score โดย Personal Score สะท้อนความสนใจของผู้ใช้แต่ละคนจากทั้ง 6 โมเดล(M1–M6) ขณะที่ Commercial Score (Model 7) สะท้อนปัจจัยเชิงธุรกิจ กล่าวคือ promotion_budget ที่สำนักพิมพ์จ่ายให้เพื่อโอกาสที่หนังสือจะถูกแนะนำ โดยการรวมคะแนน Personal Score จากทั้ง 6 โมเดลใช้แนวทาง Weighted Ensemble ซึ่งเป็นการนำคะแนนจากแต่ละโมเดล ที่ผ่านการปรับให้อยู่ในช่วงเดียวกัน มาคูณกับน้ำหนักของโมเดลนั้น และรวมเป็นคะแนนเดียว

เนื่องจากแต่ละโมเดลอาจแนะนำหนังสือคนละชุดกัน เช่น Model 1 อาจแนะนำหนังสือที่ Model 3 ไม่ได้แนะนำ ระบบจึงใช้การทำ full outer join ของตารางผลลัพธ์ (user_id, book_id, score_i) จากทั้ง 6 โมเดล เพื่อให้ครอบคลุมหนังสือทุกเล่มที่มีอย่างน้อยหนึ่งโมเดลให้คะแนน โดยข้อมูลที่ไม่มีค่า (null) จะถูกกำหนดเป็น 0 เพื่อให้สามารถนำไปคำนวณต่อได้
ขั้นตอนการคำนวณ Weighted Ensemble มีดังนี้

Score Aggregation (Full Outer Join): รวมคะแนนจากโมเดลทั้ง 6 (M1–M6) ด้วย full outer join บน (user_id, book_id)
Score Normalization: ปรับคะแนนของแต่ละโมเดลให้อยู่ในช่วงเดียวกันด้วย Min-Max Normalization [0,1]
Personal Score Computation - Weighted Ensemble (Apply Model Weights):  คูณคะแนนของแต่ละโมเดลด้วยน้ำหนักที่กำหนด เพื่อสะท้อนความสำคัญของโมเดลนั้นๆ    เพื่อให้ได้ Personal Score ของแต่ละคู่ ผู้ใช้และหนังสือ (user, book)
Commercial Adjustment (Model 7): เพิ่ม Commercial Score (M7) เพื่อสะท้อนปัจจัยเชิงธุรกิจ เช่น promotion หรือความนิยม
Ranking: จัดอันดับหนังสือตาม Final Score และเลือก Top-K  ในที่นี้คือ Top-8 เป็นผลลัพธ์ 

จากรูปตัวอย่างการคำนวณ ในกรณีของ ผู้ใช้คนที่ 1 หนังสือเล่มที่ 5 (U1, B5) แม้ Model 1 จะไม่มีคะแนน กล่าวถือ ถูกกำหนดเป็น 0) แต่ Model 2 มีคะแนน 0.71 ทำให้หนังสือเล่มนี้ยังสามารถมี Personal Score และมีโอกาสถูกจัดอันดับเมื่อรวม Commercial Score

ตัวอย่างการทำ full outer join ของผลลัพธ์และการคำนวณ hybrid score


จากขั้นตอนข้างต้น คะแนนของแต่ละโมเดลจะถูกปรับให้อยู่ในช่วงเดียวกันก่อนนำมาคูณกับน้ำหนักที่กำหนด เพื่อให้คะแนนจากโมเดลที่มีสเกลต่างกันสามารถนำมารวมกันได้อย่างเหมาะสม โดยระบบกำหนดสัดส่วนคะแนนระหว่าง Personal Score และ Commercial Score แตกต่างกันตามประเภทผู้ใช้ โดยให้ i แทนลำดับของโมเดลที่ 1-6 (i ∈ {1,…,6}) และ s{i,u,b} แทนคะแนนจากโมเดลที่ i สำหรับผู้ใช้ u และหนังสือ b และ wi แทนน้ำหนักของโมเดลที่ i

Existing Users (3+ ratings) สำหรับผู้ใช้ที่มีประวัติ rating อย่างน้อย 3 รายการ ระบบจะใช้คะแนนจากโมเดลหลักทั้ง 6 โมเดล (M1–M6) ในการคำนวณ Personal Score ดังนี้

			Personal Scoreu,b = Σ wi × normalize(si,u,b) 

โดยกำหนดให้  Σ wi = 0.7 ซึ่งเป็นการจำกัดค่าสูงสุดของ Personal Score ไว้ที่ 0.7
จากนั้นระบบจะนำ Personal Score มาบวกกับ Commercial Score จาก Model 7 ซึ่งมาจาก promotion factor ที่ผ่านการ normalize และถ่วงน้ำหนักแล้ว ดังนี้

		Final Scoreu,b= Personal Scoreu,b + Commercial Scoreu,b

โดย s7 ∈ [0, 0.3] ดังนั้น สำหรับ Existing Users สัดส่วนคะแนนรวมจะเป็น Personal Score สูงสุด 0.7 และ Commercial Score สูงสุดไม่เกิน 0.3
New Users (0-2 ratings): สำหรับผู้ใช้ใหม่ที่มีข้อมูลจำกัด ระบบจะใช้เฉพาะ Model 2 Content-based metadata  ซึ่งอิงจากข้อมูลหนังสือ เนื่องจากโมเดลอื่นต้องอาศัยข้อมูลพฤติกรรมผู้ใช้เพิ่มเติม เช่น rating หรือ interaction โดยในที่นี้กำหนดให้ โดยกำหนดให้ w2 = 0.5 และ Commercial Score มีค่าสูงสุดไม่เกิน 0.5 ( s7  ∈ [0, 0.5] ) ดังนั้นสัดส่วนคะแนนรวมจะเป็น Personal Score 0.5 และ Commercial Score สูงสุด 0.5 

		Final Score = Personal Score + s7 

#### 3.5.2 Weight Tuning ด้วย Bayesian Optimization
การกำหนดน้ำหนักของโมเดลในส่วน Personal Score สำหรับ Existing Users (ผู้ใช้ที่มี ≥ 3 ratings) ใช้วิธี Bayesian Optimization บน validation set เพื่อค้นหาชุดน้ำหนักที่เหมาะสมที่สุดสำหรับ Model 1-6 
โดยกำหนด objective function เป็นการ maximize ค่า NDCG@K บน latest-1 rating ของผู้ใช้แต่ละคน ซึ่งสะท้อนความสามารถของระบบในการจัดอันดับหนังสือที่ผู้ใช้ให้คะแนนล่าสุดในชุด validation สามารถเขียนได้ดังนี้
Objective: max NDCG@K on latest-1 interaction
Search space: w1 , w2 , w3 , w4 , w5 , w6 ∈ {0, 5, 10, …, 70}
Constraint: w1 + w2 + w3  + w4  + w5  + w6 = 70%  
 w7  ∈ [30%, 50%] 
Bayesian Optimization ถูกเลือกแทน Grid Search เนื่องจากสามารถเรียนรู้ลักษณะของ objective function ผ่าน surrogate model เช่น Gaussian Process ทำให้ค้นหาค่าที่เหมาะสมได้เร็วและมีประสิทธิภาพมากกว่า โดยไม่จำเป็นต้องทดลองทุก combination ใน search space
สำหรับ New Users (0–2 ratings) ระบบไม่ทำ weight tuning และใช้ค่าคงที่แทน โดยกำหนดให้ Model 2 (Content-based Metadata) มีน้ำหนัก 50% เนื่องจากโมเดลอื่นต้องอาศัยข้อมูลพฤติกรรมผู้ใช้ ซึ่งยังไม่เพียงพอในกรณีนี้

Weight Tuning ด้วย Bayesian Optimization


#### 3.5.3 Weight Smoothing across User Maturity
เนื่องจากระบบมีการแบ่งผู้ใช้เป็น New Users (0–2 ratings) และ Existing Users (≥ 3 ratings) ซึ่งใช้ชุดน้ำหนักที่แตกต่างกัน อาจทำให้เกิดปัญหา “weight jump” เมื่อผู้ใช้เพิ่งเปลี่ยนสถานะจาก new user ไปเป็น existing user ทำให้สัดส่วนของโมเดลที่ใช้ในการแนะนำเปลี่ยนแปลงอย่างรวดเร็ว และอาจส่งผลให้ผลลัพธ์การแนะนำมีความไม่ต่อเนื่อง
เพื่อแก้ปัญหานี้ ระบบจึงใช้แนวทาง Weight Smoothing โดยอาศัย linear interpolation ระหว่างน้ำหนักของ new user และ existing user เพื่อให้การเปลี่ยนผ่านเป็นไปอย่างราบรื่น โดยมีสูตรการคำนวณน้ำหนักดังนี้:
w (ratings) = wnew + t × (wexisting − wnew)
โดยที่ t คือ blend factor ซึ่งมีค่าอยู่ในช่วง [0, 1] และอิงจากจำนวน rating ของผู้ใช้ ดังนี้
0 ratings → t = 0 (new-user weights: M2=50%, M7=50%)
1 rating → t ≈ 0.33
2 ratings → t ≈ 0.67
3+ ratings → t = 1 (existing-user weights จาก Bayesian Optimization)

Weight Smoothing across User Maturity


ดังแสดงในภาพ ระบบจะค่อยๆ ปรับสัดส่วนน้ำหนักจากการพึ่งพา Model 2 (content-based) และ Commercial Score ในช่วงเริ่มต้น ไปสู่การใช้โมเดลหลากหลายมากขึ้น (M1–M6) เมื่อผู้ใช้มีข้อมูลพฤติกรรมเพิ่มขึ้น ในขณะเดียวกัน สัดส่วนของ Commercial Score (M7) จะลดลงอย่างต่อเนื่องจาก 50% ไปเป็น 30% เพื่อให้ personalization มีบทบาทมากขึ้นเมื่อระบบมีข้อมูลผู้ใช้เพียงพอ

---

## บทที่ 4 Evaluation

### 4.1 Offline Evaluation
การศึกษานี้มีวัตถุประสงค์เพื่อประเมินความสามารถของระบบแนะนำหนังสือในการคัดเลือกและจัดอันดับรายการที่สอดคล้องกับความสนใจของผู้ใช้ โดยอ้างอิงจากชุดข้อมูลทดสอบ (test dataset) ซึ่งประกอบด้วยรีวิวล่าสุด (latest rating review) ของผู้ใช้แต่ละราย 
โดยที่ทำการประเมินประสิทธิภาพตามกลุ่ม User 3 กลุ่ม ได้แก่ 
1) Cold start (review 1 ครั้ง) 
2) New User (review 2 ครั้ง)
3) Existing User (review 3 ครั้งขึ้นไป)
ทั้งนี้ การประเมินผลดำเนินการในรูปแบบออฟไลน์ เพื่อวัดประสิทธิภาพของแบบจำลองการแนะนำ โดยมีตัวชี้วัดในการประเมิน ได้แก่

#### Normalized Discounted Cumulative Gain (NDCG)

NDCG (Normalized Discounted Cumulative Gain) เป็นตัวชี้วัดที่ใช้ประเมินคุณภาพของการจัดอันดับ โดยพิจารณาว่าระบบสามารถเรียงลำดับรายการให้สอดคล้องกับความสนใจของผู้ใช้ได้มากน้อยเพียงใด ซึ่งรายการที่มีความเกี่ยวข้องสูงควรถูกจัดให้อยู่ในตำแหน่งต้น ๆ ของผลลัพธ์
ตัวชี้วัดนี้ให้น้ำหนักกับอันดับต้นมากกว่าอันดับล่าง ผ่านการถ่วงด้วยฟังก์ชันลอการิทึม ทำให้สะท้อนคุณภาพของการจัดอันดับได้ชัดเจน
นอกจากนี้ ค่า NDCG ยังถูกปรับให้อยู่ในช่วง 0 ถึง 1 โดยเทียบกับลำดับที่ดีที่สุด (ideal ranking) จึงสามารถใช้เปรียบเทียบประสิทธิภาพของโมเดลได้อย่างเหมาะสม โดยค่าที่เข้าใกล้ 1 แสดงถึงประสิทธิภาพที่ดี 


โดยที่ 
rel[i]​ คือ ระดับความเกี่ยวข้อง (relevance) ของรายการในอันดับที่ i 
IDCG คือ ค่า DCG ที่ได้จากการจัดลำดับที่ดีที่สุด (ideal ranking) 
ในการประเมินผล ค่า NDCG@K จะถูกคำนวณแยกสำหรับผู้ใช้แต่ละราย และนำมาเฉลี่ยเพื่อสะท้อนประสิทธิภาพโดยรวมของโมเดล โดยค่าที่ใกล้ 1 หมายถึงโมเดลสามารถจัดอันดับรายการได้สอดคล้องกับความสนใจของผู้ใช้ได้อย่างมีประสิทธิภาพ ซึ่งสามารถสะท้อนได้ทั้งความถูกต้องของรายการที่แนะนำและความเหมาะสมของลำดับการจัดเรียงรายการ
ตัวอย่างการประเมินผล
Recommended Ranking
User A
User B
Rank 1 | Book A
Book A : Rating 5
Book B : Rating 5
Rank 2 | Book B




Rank 3 | Book C




…




Rank 10 | Book J




NDCG
NDCG = 1
NDCG = 0.63


#### Hit Rate@K

Hit Rate@K เป็นตัวชี้วัดที่ใช้ประเมินประสิทธิภาพของระบบแนะนำ โดยพิจารณาว่าในรายการแนะนำ Top-K มีอย่างน้อย 1 รายการที่ตรงกับความสนใจของผู้ใช้หรือไม่ หากรายการที่ผู้ใช้สนใจปรากฏอยู่ใน K อันดับแรก จะถือว่าการแนะนำสำเร็จ
ค่าของ Hit Rate@K จะมีค่าเป็น 0 หรือ 1 เท่านั้น โดยค่า 1 หมายถึงระบบสามารถแนะนำได้สำเร็จ (hit) และค่า 0 หมายถึงไม่สำเร็จ (miss)
ในการศึกษานี้กำหนดให้ผู้ใช้แต่ละคนมีรายการที่สนใจจริงเพียง 1 รายการ (leave-one-out evaluation) ทำให้การคำนวณ Hit Rate@K สามารถพิจารณาได้ในลักษณะของตัวแปรบ่งชี้ (indicator function) 
เมื่อทำการเฉลี่ยค่า Hit Rate@K ของผู้ใช้ทุกคน จะได้ค่าเฉลี่ยที่สะท้อนประสิทธิภาพโดยรวมของโมเดล โดยค่าที่ใกล้ 1 หมายถึงโมเดลสามารถแนะนำรายการที่ผู้ใช้สนใจได้อย่างมีประสิทธิภาพสูง 
ตัวอย่างการประเมินผล
Recommended Ranking
User A
User B
Rank 1 | Book A
Book A : Rating 5
Book K : Rating 5
Rank 2 | Book B




Rank 3 | Book C




…




Rank 10 | Book J




Book K






Hit Rate@10 = 1 
Hit Rate@10 = 0 

### 4.2 การออกแบบ Online Evaluation
หลังจากระบบถูก deploy แล้ว การประเมินจริงใช้ online metrics ที่สะท้อนพฤติกรรมผู้ใช้จริงเพื่อที่จะหาโมเดลที่ดี่ที่สุดเพื่อนำมาใช้เป็น baseline ในการพัฒนาต่อไป
Click-Through Rate (CTR): Clicks / Impressions  — สะท้อนความสามารถของระบบในการดึงดูดให้ผู้ใช้คลิกคำแนะนำ
Funnel Conversion Analysis: ติดตามพฤติกรรมของผู้ใช้หลังคลิก จาก click → read → complete → purchase เพื่อประเมินว่าคำแนะนำสร้าง engagement และ conversion ระยะยาวได้มากแค่ไหน
A/B Testing: เปรียบเทียบประสิทธิภาพของโมเดล/การกำหนดน้ำหนักที่แตกต่างกันบน traffic จริง โดยแบ่งผู้ใช้เป็นกลุ่ม treatment และ control อย่างสุ่ม
#### 4.2.1 Click-Through Rate (CTR)
เป็นตัวชี้วัดหลักในการประเมินประสิทธิภาพของระบบแนะนำ โดย CTR เป็นตัวชี้วัดที่สะท้อนถึงความน่าจะเป็นที่ผู้ใช้จะคลิกในรายการที่ระบบแนะนำให้ ซึ่งแสดงถึงระดับความน่าสนใจและความสอดคล้องของคำแนะนำกับความต้องการของผู้ใช้ค่า CTR คำนวณจากอัตราส่วนระหว่างจำนวนครั้งที่ผู้ใช้คลิก (clicks) ต่อจำนวนครั้งที่รายการถูกแสดง (impressions)
CTR = ClicksImpressions
ซึ่งข้อมูลที่นำมาใช้นำมาจากตาราง recommendation_log ซึ่งบันทึกพฤติกรรมของผู้ใช้โดยมีการเชื่อมโยงกับข้อมูลจากตาราง book และ genre
#### 4.2.2 Funnel Conversion Analysis
เป็นการวิเคราะห์ที่ผสมผสานระหว่างการวัดพฤติกรรมในเชิงปริมาณ (จำนวนการคลิก) และเชิงคุณภาพ (พฤติกรรมหลังการคลิก) โดย CTR ใช้ในการวัดความสามารถของระบบในการดึงดูดให้ผู้ใช้คลิก ในขณะที่ Funnel Analysis ใช้ในการติดตามพฤติกรรมของผู้ใช้หลังจากการคลิก การวิเคราะห์ร่วมกันนี้ช่วยให้สามารถประเมินประสิทธิภาพของระบบแนะนำได้อย่างครอบคลุมมากขึ้น ทั้งในด้านการสร้างความสนใจ (engagement) และการเปลี่ยนเป็นผลลัพธ์เชิงธุรกิจ (conversion)
•      Purchase rate = จำนวนผู้ใช้ที่ซื้อ (Intent = 4) / จำนวนผู้ใช้ที่คลิก
•      Read rate = จำนวนผู้ใช้ที่อ่าน (Intent = 5) / จำนวนผู้ใช้ที่คลิก
•      Rating rat  = จำนวนผู้ใช้ที่รีวิว (Intent = 7) / จำนวนผู้ใช้ที่คลิก
ซึ่งข้อมูลที่นำมาใช้นำมาจากตาราง user_book_event ซึ่งบันทึกพฤติกรรมของผู้ใช้
Retention สัดส่วนของผู้ใช้ที่กลับมาใช้งานระบบซ้ำหลังจากการใช้งานครั้งแรก โดยใช้เป็นตัวชี้วัดความสามารถของระบบในการรักษาผู้ใช้ในระยะยาว (user engagement ในระยะยาว)ใช้ column session_id ในการดูว่ามีผู้ใช้งานกี่คนที่กลับมาใช้ใหม่และใช้ user_id ในการดูจำนวนคนที่เข้ามาใช้งานทั้งหมด
Retention = จำนวนผู้ที่กลับมาใช้จำนวนผู้ใช้ทั้งหมด

#### 4.2.3 Weighted Scoring Model

Weighted Scoring Model คือวิธีการประเมินและเปรียบเทียบทางเลือกต่าง ๆ โดยการนำหลายตัวชี้วัด (metrics) มารวมกันเป็นคะแนนเดียว (composite score) ผ่านการกำหนด น้ำหนัก (weights)  ให้แต่ละตัวชี้วัดตามความสำคัญโดยสูตรที่ใช้คำนวณจะเป็น 
Score =  0.6 Conversion + 0.2 CTR + 0.2 Retention
โดย  	



---

## บทที่ 5 สรุปภาพรวมและหน้าเว็บไซต์ต้นแบบ

บทนี้กล่าวถึงการออกแบบเว็บไซต์ต้นแบบ และ สรุปภาพรวมการออกแบบระบบแนะนำหนังสือ Greed Route
### 5.1 สรุปภาพรวมสถาปัตยกรรมระบบ
จากการออกแบบระบบแนะนำหนังสือ Greed Route ตั้งแต่กระบวนการรวบรวมข้อมูลไปจนถึงการสร้างโมเดล (บทที่ 1-4) สามารถสรุปเป็น Blueprint Workflow ของระบบแบบ End-to-End ได้ดังนี้:
Data Collection & Intent Capture: ข้อมูลพฤติกรรมผู้ใช้ถูกจัดเก็บในรูปแบบ Star Schema โดยแปลงการกระทำต่างๆ เป็นคะแนนความสนใจ 9 ระดับ (Level of Intent: ตั้งแต่การเลื่อนดู ไปจนถึงการให้คะแนนและการซื้อ) ร่วมกับการเก็บข้อมูล Metadata ของหนังสือ และข้อความรีวิว
Data Preparation & Feature Engineering: แปลงข้อมูลดิบให้อยู่ในรูป Feature Vectors เช่น การทำ TF-IDF Weighted Keyword Embedding เพื่อสกัดความหมายเชิงลึกจากข้อความรีวิว, การทำ Normalization ลดอคติคะแนนผู้ใช้ และ One-hot/Multi-hot Encoding สำหรับข้อมูลหมวดหมู่
Parallel Scoring Pipeline (M1 - M6): โมเดลส่วนบุคคล 6 โมเดลประมวลผลคู่ขนานเพื่อประเมินคะแนนความเหมาะสมของหนังสือให้ผู้ใช้แต่ละคนครอบคลุมทุกมิติ ได้แก่
Content-Based: M1 (พฤติกรรมผู้ใช้ที่คล้ายกัน), M2 (เนื้อหาหนังสือที่คล้ายกัน)
Collaborative Filtering: M3 (ความคล้ายคลึงจากคีย์เวิร์ดรีวิว), M4 (ความสนใจจาก Intent Level), M5 (Item-based Rating), M6 (User-based Rating)
Hybrid Ensemble & Commercial Strategy (M7): นำคะแนน (Score) จากโมเดล M1 ถึง M6 มารวมกันด้วยเทคนิค Hybrid จากนั้นส่งต่อให้ M7 ดำเนินการผสมผสานปัจจัยทางธุรกิจ (Commercial Blend) เช่น งบโปรโมชัน เพื่อจัดอันดับเป็น Top-8 Recommendation (ผสานเนื้อหาที่ตรงใจผู้ใช้เข้ากับกลยุทธ์ของแพลตฟอร์ม)
Serendipity & Trending (M8 & Popularity Base): ทำงานคู่ขนานเพื่อเสริมความหลากหลาย โดย M8 สุ่มเลือกหนังสือใน Percentile ที่ 40-60 (Surprise Recommendation) และโมเดล Trending คำนวณความนิยมในภาพรวม (Non-Personalized)
Delivery & Feedback Loop: ระบบส่งผลลัพธ์ทั้งหมดไปแสดงบนหน้าเว็บไซต์ และเมื่อผู้ใช้มีปฏิสัมพันธ์ (Interaction) ข้อมูลจะถูกจัดเก็บลง user_book_event เพื่อส่งกลับไปเทรนโมเดลให้แม่นยำขึ้นในรอบต่อไป

ใส่ Blueprint ทั้งหมด (Full loop workflow with some details this flow should be covered all step we did)
Key takeaway 
ภาพรวมสถาปัตยกรรมระบบ


### 5.2 การออกแบบหน้าเว็บไซต์ต้นแบบ (Website Prototype Design)
แพลตฟอร์ม Greed Route ได้จำลองการทำงานผ่าน Website Prototype โดยออกแบบ User Interface (UI) ให้สอดคล้องและทำงานร่วมกับผลลัพธ์จากอัลกอริทึมทั้ง 8 โมเดลโดยตรง เพื่อให้เกิดเป็นระบบ Hybrid Recommender System ที่สมบูรณ์ โดยสามารถแบ่ง ส่วนการทำงานหลัก (Key Interfaces) ออกเป็น 6 ส่วน ดังนี้:
หน้าลงทะเบียน 
สำหรับ User Onboarding & Genre Selection: เมื่อผู้ใช้ลงทะเบียนครั้งแรก ระบบจะแสดง Genre Selection Modal ให้เลือก 2–5 หมวดหมู่ที่สนใจ ข้อมูลนี้จะถูกเก็บใน user_genre_preference table และใช้เป็น cold-start signal สำหรับ Content-Based Filtering  (M2 - Book Metadata)
หน้าแรก (Home / News Feed)
ส่วน "Recommended for You": เป็นพื้นที่หลักที่แสดงผลลัพธ์จาก Hybrid Models (M1-M6) มาผสมผสานกับโมเดล M7 (Commercial Blend) ซึ่งเป็นการผสม Top ranking กับสัดส่วนเชิงพาณิชย์ (Promotion Budget) เพื่อให้เกิดความสมดุลระหว่างสิ่งที่ผู้ใช้ชอบและสิ่งที่แพลตฟอร์มต้องการนำเสนอ รวมถึงในตำแหน่งที่ 5 และ 10 ระบบจะใช้ โมเดล M8 (Surprise Recommendation) สุ่มหนังสือในกลุ่ม Percentile กลางๆ (40-60) เพื่อสร้างความประหลาดใจและให้ผู้ใช้ได้ค้นพบสิ่งใหม่ๆ 
หน้าแรก (tab “แนะนำ”)

ส่วน "Trending Now": ขับเคลื่อนโดยโมเดล Trending (Weighted Popularity) แสดงหนังสือที่กำลังเป็นกระแสในภาพรวมโดยไม่อิงกับโปรไฟล์ส่วนตัวของผู้ใช้
หน้าแรก (tab “สำรวจ”)


Recommendation Touchpoints on the Website
หน้า
Recommendation Type
Algorithm
หน้าแรก (tab “แนะนำ”)
Recommended for You
Hybrid (Collaborative + Content) (M1–M6 + M7 + M8)
หน้าแรก (tab “สำรวจ”)
Trending Now
Weighted Popularity
Browse Personalized
Personalized by Genre
Hybrid
Browse Explore
Random Picks
M8 + Popularity


Interaction Tracking: ทุก interaction เช่น การคลิกหนังสือหรือการเขียนรีวิว จะถูกบันทึกเป็น user_book_event พร้อม intent_level, dwell_time, scroll_depth เพื่อป้อนกลับเข้าระบบแนะนำ



หน้าแรก (tab “อัปเดต”)

หน้าแรก (tab “ฟีตข่าว”)







---

## Appendices

> *(Do we have to add data tables + sample?)*

### Appendix A: Database Schema Reference

#### Complete Table List
#
Table Name
Type
Rows
PK
1
language
Dimension
5
language_id
2
device
Dimension
3
device_id
3
traffic_source
Dimension
9
traffic_source_id
4
level_of_intent
Dimension
9
intent_level
5
discovery_channel
Dimension
8
channel_id
6
genre
Core
117
genre_id
7
publisher
Core
51
publisher_id
8
book_store
Core
12
store_id
9
tag
Core
57
tag_id
10
book
Core
6,000
book_id
11
book_tag
Bridge
~24,000
(book_id, tag_id)
12
user_genre_preference
Bridge
~2,700
(user_id, genre_id)
13
publisher_promotion
Bridge
120
promo_id
14
book_store_promotion
Bridge
60
promo_id
15
user
Core
1,000
user_id
16
user_system_event
Fact
~30,000
event_id
17
user_book_event
Fact
~200,000+
event_id
18
recommendation_log
Fact
50,000
rec_id


### Appendix B: LLM Configuration for Data Synthesize

Parameter
Value
Model
gemini-2.5-flash-lite
Use cases
Book titles (TH/EN), descriptions (TH), reviews (TH)
Batch size
50 books per API call
Temperature
0.8 (creative content)
Max tokens
~2,000 per response



