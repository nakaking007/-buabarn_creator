# Buabarn VIP Production Output Specs

เอกสารนี้คือข้อกำหนด output สำหรับระบบ Buabarn VIP Creater Tools
ใช้กำกับทั้ง AI จริงและ template สำรอง เพื่อให้ผลลัพธ์เป็น Production Package ไม่ใช่ข้อความสวย ๆ

## หลักกลางของ Output ที่ดี

Output ทุกงานต้องมี 5 ชั้นเสมอ:

- Concept: งานนี้คืออะไร
- Structure: โครงเรื่อง / โครงฉาก / โครงเพลง
- Production Prompt: ให้ AI สร้างภาพ วิดีโอ เพลง หรือสคริปต์ต่อได้
- Negative / Guardrail: กันหลุด กันผิด กันเพี้ยน
- QC Checklist: ตรวจว่างานพร้อมใช้จริงหรือยัง

กฎกลาง:

- แยกหมวดชัดเจน เช่น Concept, Script, Storyboard, Prompt, Caption, QC
- มีข้อมูลพอให้ AI ตัวต่อไปใช้ต่อได้ เช่น ฉาก ตัวละคร แสง กล้อง อารมณ์ รายละเอียด
- ใช้รูปแบบกึ่งโครงสร้าง เช่น Scene 1, Shot 1, Prompt, Negative Prompt
- มีหลายชั้น ทั้งชั้นคนอ่านเข้าใจและชั้น prompt สำหรับ AI ใช้ต่อ
- ถ้าไม่เลือกภาพ ห้ามสร้าง Prompt ภาพ
- ถ้าไม่เลือกวิดีโอ ห้ามสร้าง Prompt วิดีโอ เสียงประกอบ หรือ Voice Over
- ถ้าเลือกภาพหรือวิดีโอรายฉาก ต้องสร้างครบตามจำนวนฉากที่ผู้ใช้เลือก

## มาตรฐานเฉพาะ 8 หมวด

### 1. การ์ตูน 3D Family Animation

ต้องมี:
- Concept เรื่องแบบสั้นและชัด
- Character Bible: ชื่อ อายุ บุคลิก จุดแข็ง จุดอ่อน เป้าหมาย รูปร่าง เสื้อผ้า สีประจำตัว
- World / Scene Design
- Storyboard รายฉาก
- Image Prompt รายฉาก
- Video Prompt รายฉากถ้าเลือกวิดีโอ
- Voiceover / Dialogue เหมาะกับเด็กและครอบครัว
- Negative Prompt กันหน้าบิด มือเพี้ยน ภาพน่ากลัว และการลอกตัวละครดัง
- QC Checklist

### 2. อนิเมะญี่ปุ่นภาพยนตร์

ต้องมี:
- Anime Concept
- Character Profile
- Emotional Arc
- Scene Mood: แสง ฤดูกาล ลม ฝน ท้องฟ้า เมืองหรือธรรมชาติ
- Storyboard แบบภาพยนตร์
- Anime Image Prompt
- Video Prompt ถ้าเลือกวิดีโอ
- Dialogue สั้น มีความรู้สึกลึก
- Negative Prompt กันตัวละครลิขสิทธิ์ ตาเบี้ยว สัดส่วนผิด ฉากว่าง
- QC Checklist

### 3. ภาพยนตร์ไทยสมจริง

ต้องมี:
- Thai Film Concept
- ตัวละครแบบคนไทยจริง: ชื่อ อายุ อาชีพ ภูมิหลัง ภาษาพูด บุคลิก ปัญหาในชีวิต
- Location Bible
- Scene Breakdown
- Dialogue ธรรมชาติ
- Shot List
- Image / Video Prompt แนวหนังไทย
- Sound Design
- Negative Prompt กันหน้าฝรั่ง ผิวพลาสติก แสงแฟชั่นเกินจริง ฉากไทยปลอม
- QC Checklist

### 4. พญานาค / นาคาไทย

ต้องมี:
- Naga Identity Sheet
- Thai Naga Lock
- รายละเอียดรูปลักษณ์: เศียร หงอน เกล็ด ลายกนก ลำตัว สีตา แสงรอบตัว
- Scene Design: ถ้ำ แม่น้ำโขง วัดไทย เมืองบาดาล ปราสาทหิน ป่าหิมพานต์
- Human Composition
- Image Prompt
- Video Prompt ถ้าเลือกวิดีโอ
- Negative Prompt: no dragon, no Chinese dragon, no western dragon, no wings, no legs, no claws, no lizard body, no dinosaur face
- QC Checklist

### 5. ธรรมะลึกลับไทย

ต้องมี:
- Dharma Core
- Mystical Hook 3-5 วินาทีแรก
- Story Structure
- ตัวละคร
- Scene Prompt
- Script / Voiceover
- Caption
- Ethical Guardrail
- QC Checklist

### 6. ละครปักตะกร้า

ต้องมี:
- Product Angle
- Pain Point Analysis
- Hook หลายแบบ
- Drama Script
- Dialogue ภาษาคนพูดจริง
- Basket CTA
- Caption / Hashtag
- Shot List
- Compliance Check
- QC Checklist

### 7. Storyboard หนังสั้น TikTok / YouTube Shorts

ต้องมี:
- Short Film Concept
- Hook Opening 3 วินาทีแรก
- Short Structure 0-60 วินาที
- Scene-by-scene Storyboard
- Shot List
- Dialogue
- Video Prompt
- Subtitle Text
- Thumbnail Text
- Caption / CTA
- QC Checklist

### 8. เพลงสำหรับ Suno

ต้องมี:
- Song Concept
- Suno Style Prompt ภาษาอังกฤษ
- Lyrics แบบมีโครงเพลงครบ
- Hook ที่จำง่าย
- Vocal Direction
- Instrument Direction
- Alternative Hook 2-3 แบบ
- Short Prompt for Suno
- Caption โปรโมตเพลง
- QC Checklist

## ไฟล์ที่ใช้ในระบบ

- `production-specs.js` ใช้เป็นข้อกำหนดสำหรับระบบจริง
- `engine-logic.js` อ่านข้อกำหนดแล้วผลิต output ตามหมวด
- `PRODUCTION_OUTPUT_SPECS.md` ใช้เป็นเอกสารอธิบายมาตรฐานให้ผู้ใช้หรือทีมพัฒนา
