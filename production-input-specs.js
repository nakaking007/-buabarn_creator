globalThis.PRODUCTION_INPUT_SPECS = {
    pixar3d: {
        title: 'Input เฉพาะ: การ์ตูน 3D Family Animation',
        fields: [
            { id: 'storyTopic', label: 'หัวข้อเรื่อง', placeholder: 'เช่น เด็กชายกับเพื่อนวิเศษ' },
            { id: 'mainCharacter', label: 'ตัวละครหลัก', placeholder: 'เช่น เด็กชาย 8 ขวบ ขี้กลัวแต่ใจดี' },
            { id: 'supportingCharacter', label: 'ตัวละครรอง', placeholder: 'เช่น หุ่นยนต์พูดได้ ผู้พิทักษ์ สัตว์คู่ใจ' },
            { id: 'mainSetting', label: 'ฉากหลัก', placeholder: 'เช่น หมู่บ้าน ป่า โรงเรียน เมืองแฟนตาซี' },
            { id: 'theme', label: 'แก่นเรื่อง', placeholder: 'เช่น มิตรภาพ ความกล้า การให้อภัย ความฝัน' },
            { id: 'visualMood', label: 'อารมณ์ภาพ', placeholder: 'เช่น สดใส อบอุ่น ผจญภัย ซึ้ง ตลก' },
            { id: 'audience', label: 'กลุ่มผู้ชม', placeholder: 'เช่น เด็ก 6-12 ปี ครอบครัว คนทั่วไป' },
            { id: 'duration', label: 'ความยาว', placeholder: 'เช่น 30 วินาที 60 วินาที 3 นาที' },
            { id: 'aspectRatio', label: 'สัดส่วนภาพ', placeholder: 'เช่น 9:16 16:9 5:7 1:1' },
            { id: 'wantedOutput', label: 'Output ที่ต้องการ', placeholder: 'เช่น Prompt ภาพ, Prompt วิดีโอ, Storyboard, Script, Caption' }
        ]
    },
    japananime: {
        title: 'Input เฉพาะ: อนิเมะญี่ปุ่นภาพยนตร์',
        fields: [
            { id: 'genre', label: 'แนวเรื่อง', placeholder: 'เช่น ดราม่า แฟนตาซี โรแมนติก ต่อสู้ ลึกลับ' },
            { id: 'storyTopic', label: 'หัวข้อหลัก', placeholder: 'เช่น เด็กสาวผู้ได้ยินเสียงจากดวงจันทร์' },
            { id: 'mainCharacter', label: 'ตัวละครหลัก', placeholder: 'เช่น หญิงสาว 17 ปี เงียบ เหงา มีพลังลับ' },
            { id: 'conflict', label: 'ความขัดแย้งของเรื่อง', placeholder: 'เช่น ต้องเลือกระหว่างครอบครัวกับภารกิจ' },
            { id: 'mainSetting', label: 'ฉากหลัก', placeholder: 'เช่น โรงเรียน เมืองฝนตก ศาลเจ้า ทะเล ภูเขา' },
            { id: 'seasonTime', label: 'ฤดูกาลหรือช่วงเวลา', placeholder: 'เช่น ฤดูฝน ตอนเย็น กลางคืน ฤดูใบไม้ผลิ' },
            { id: 'mood', label: 'อารมณ์งาน', placeholder: 'เช่น เหงา ซึ้ง ลึกลับ โรแมนติก ตื่นเต้น' },
            { id: 'ending', label: 'รูปแบบตอนจบ', placeholder: 'เช่น สุข เศร้า หักมุม เปิดปลาย' },
            { id: 'sceneTarget', label: 'จำนวนฉากที่อยากได้', placeholder: 'เช่น 6 ฉาก 8 ฉาก 12 ฉาก' },
            { id: 'wantedOutput', label: 'Output ที่ต้องการ', placeholder: 'เช่น Storyboard, Prompt ภาพ, Prompt วิดีโอ, Dialogue' }
        ]
    },
    thaicinema: {
        title: 'Input เฉพาะ: ภาพยนตร์ไทยสมจริง',
        fields: [
            { id: 'storyTopic', label: 'หัวข้อเรื่อง', placeholder: 'เช่น ครูบ้านนอกกับเด็กที่ไม่อยากเรียน' },
            { id: 'filmType', label: 'ประเภทหนัง', placeholder: 'เช่น ดราม่า ชีวิต สืบสวน โรแมนติก สังคม' },
            { id: 'thaiLocation', label: 'สถานที่ไทย', placeholder: 'เช่น โรงเรียนชนบท วัด ตลาด กรุงเทพฯ ท้องนา' },
            { id: 'mainCharacter', label: 'ตัวละครหลัก', placeholder: 'เช่น ครูชายวัย 50 ปี สุขุม ใจดี แต่เหนื่อยล้า' },
            { id: 'mainProblem', label: 'ปัญหาหลัก', placeholder: 'เช่น เด็กขาดแรงบันดาลใจในการเรียน' },
            { id: 'dialect', label: 'ภาษาพูด', placeholder: 'เช่น ภาษากลาง อีสาน เหนือ ใต้' },
            { id: 'era', label: 'ยุคสมัย', placeholder: 'เช่น ปัจจุบัน ย้อนยุค กึ่งสารคดี' },
            { id: 'mood', label: 'อารมณ์งาน', placeholder: 'เช่น สมจริง ดราม่า อบอุ่น หน่วง จริงจัง' },
            { id: 'duration', label: 'ความยาว', placeholder: 'เช่น 30 วินาที 60 วินาที 3 นาที' },
            { id: 'wantedOutput', label: 'Output ที่ต้องการ', placeholder: 'เช่น Script, Shot List, Prompt วิดีโอ, Prompt ภาพ, Caption' }
        ]
    },
    naga: {
        title: 'Input เฉพาะ: พญานาค / นาคาไทย',
        fields: [
            { id: 'nagaType', label: 'ประเภทนาคา', placeholder: 'เช่น นาคาคุ้มครอง นาคาบาดาล นาคาเมตตา' },
            { id: 'nagaColor', label: 'สีของนาคา', placeholder: 'เช่น ดำทอง ขาวเงิน เขียวมรกต แดงทอง ทองคำ' },
            { id: 'headCount', label: 'จำนวนเศียร', placeholder: 'เช่น 1 เศียร 3 เศียร 5 เศียร 7 เศียร 9 เศียร' },
            { id: 'mainSetting', label: 'ฉากหลัก', placeholder: 'เช่น แม่น้ำโขง ถ้ำ บาดาล วัดกลางคืน' },
            { id: 'humanCharacter', label: 'ตัวละครมนุษย์', placeholder: 'เช่น หญิงสาวชุดขาว พระ เด็กชาย คนเฝ้าศาล' },
            { id: 'sacredObject', label: 'วัตถุศักดิ์สิทธิ์', placeholder: 'เช่น ลูกแก้ว ผอบทอง ดอกบัว เทียน ธูป' },
            { id: 'mood', label: 'อารมณ์งาน', placeholder: 'เช่น ศักดิ์สิทธิ์ ลึกลับ อบอุ่น น่าเกรงขาม' },
            { id: 'beliefMessage', label: 'ความเชื่อหรือข้อคิด', placeholder: 'เช่น การรักษาสัจจะ บุญกรรม ความเมตตา' },
            { id: 'sceneTarget', label: 'จำนวนฉากที่อยากได้', placeholder: 'เช่น 3 ฉาก 5 ฉาก 10 ฉาก' },
            { id: 'wantedOutput', label: 'Output ที่ต้องการ', placeholder: 'เช่น Prompt ภาพ, Prompt วิดีโอ, Storyboard, Voice Over' }
        ]
    },
    dharmaMystery: {
        title: 'Input เฉพาะ: ธรรมะลึกลับไทย',
        fields: [
            { id: 'lesson', label: 'คติธรรมหลัก', placeholder: 'เช่น ความกตัญญู บุญกรรม สัจจะ เมตตา' },
            { id: 'mysteryHook', label: 'ปริศนาเปิดเรื่อง', placeholder: 'เช่น เสียงระฆังดังเองทุกคืนวันพระ' },
            { id: 'mainCharacter', label: 'ตัวละครหลัก', placeholder: 'เช่น พระชรา แม่ค้าตลาด เด็กวัด หญิงสาว' },
            { id: 'sacredPlace', label: 'สถานที่ศักดิ์สิทธิ์', placeholder: 'เช่น วัดเก่า ศาลาร้าง ป่าช้า ถ้ำริมเขา' },
            { id: 'belief', label: 'ความเชื่อที่เกี่ยวข้อง', placeholder: 'เช่น กรรมเก่า คำสาบาน นิมิต บุญบารมี' },
            { id: 'conflict', label: 'ความขัดแย้ง', placeholder: 'เช่น ตัวละครไม่เชื่อเรื่องกรรมจนเจอเหตุการณ์' },
            { id: 'endingLesson', label: 'ข้อคิดตอนจบ', placeholder: 'เช่น ทำดีไม่สูญเปล่า เวรย่อมระงับด้วยการให้อภัย' },
            { id: 'narrationStyle', label: 'สไตล์บรรยาย', placeholder: 'เช่น สารคดี เล่าเรื่องลึกลับ อบอุ่น เคร่งขรึม' },
            { id: 'sceneTarget', label: 'จำนวนฉากที่อยากได้', placeholder: 'เช่น 5 ฉาก 8 ฉาก 10 ฉาก' },
            { id: 'wantedOutput', label: 'Output ที่ต้องการ', placeholder: 'เช่น Storyboard, Voice Over, Prompt ภาพ, Caption' }
        ]
    },
    cartDrama: {
        title: 'Input เฉพาะ: ละครปักตะกร้า / ขายสินค้า',
        fields: [
            { id: 'productName', label: 'ชื่อสินค้า', placeholder: 'เช่น แก้วเก็บความเย็น 2 ชั้น' },
            { id: 'targetCustomer', label: 'กลุ่มลูกค้า', placeholder: 'เช่น คนทำงาน แม่บ้าน คนรักสุขภาพ' },
            { id: 'painPoint', label: 'ปัญหาลูกค้า', placeholder: 'เช่น น้ำแข็งละลายเร็ว โต๊ะเปียก' },
            { id: 'benefit', label: 'จุดขาย / ประโยชน์', placeholder: 'เช่น เก็บเย็น 12 ชั่วโมง ไม่เกิดหยดน้ำ' },
            { id: 'offer', label: 'โปรโมชัน / ราคา', placeholder: 'เช่น ซื้อวันนี้ลด 20% ส่งฟรี' },
            { id: 'hook', label: 'Hook เปิดคลิป', placeholder: 'เช่น ใครวางแก้วแล้วโต๊ะเปียกต้องดู' },
            { id: 'presenter', label: 'ตัวละคร / คนรีวิว', placeholder: 'เช่น ป้าพริ้ง สายพาน นางแบบ นายแบบ' },
            { id: 'platform', label: 'แพลตฟอร์ม', placeholder: 'เช่น TikTok Shop, Reels, Facebook' },
            { id: 'productShot', label: 'ภาพสินค้าที่ต้องเห็น', placeholder: 'เช่น Close-up วัสดุ ฝา หยดน้ำ กล่องสินค้า' },
            { id: 'cta', label: 'CTA', placeholder: 'เช่น กดตะกร้า ทักแชต สั่งซื้อวันนี้' },
            { id: 'wantedOutput', label: 'Output ที่ต้องการ', placeholder: 'เช่น Script, Storyboard, Shot List, Caption' }
        ]
    },
    shortfilm: {
        title: 'Input เฉพาะ: Storyboard หนังสั้น',
        fields: [
            { id: 'storyTopic', label: 'หัวข้อเรื่อง', placeholder: 'เช่น ลูกชายกลับบ้านไม่ทันวันเกิดแม่' },
            { id: 'genre', label: 'แนวหนัง', placeholder: 'เช่น ดราม่า ตลก สยอง ธรรมะ ขายสินค้า' },
            { id: 'mainCharacter', label: 'ตัวละครหลัก', placeholder: 'เช่น แม่ ลูกชาย ครู พระ เพื่อนบ้าน' },
            { id: 'location', label: 'สถานที่ถ่าย', placeholder: 'เช่น บ้าน โรงเรียน วัด ถนน ร้านค้า' },
            { id: 'hook', label: 'Hook เปิดเรื่อง', placeholder: 'เช่น แม่ครับ ผมไม่มีเวลากอดแม่แล้ว' },
            { id: 'ending', label: 'รูปแบบตอนจบ', placeholder: 'เช่น หักมุม ซึ้ง ข้อคิด CTA ขายสินค้า' },
            { id: 'platform', label: 'แพลตฟอร์ม', placeholder: 'เช่น TikTok, Reels, YouTube Shorts' },
            { id: 'duration', label: 'ความยาว', placeholder: 'เช่น 30 วินาที 60 วินาที 90 วินาที' },
            { id: 'productionLevel', label: 'ระดับการผลิต', placeholder: 'เช่น ถ่ายง่าย Cinematic Studio ใช้ AI Video' },
            { id: 'wantedOutput', label: 'Output ที่ต้องการ', placeholder: 'เช่น Storyboard, Script, Shot List, Prompt วิดีโอ, Caption' }
        ]
    },
    suno: {
        title: 'Input เฉพาะ: เพลงสำหรับ Suno',
        fields: [
            { id: 'songTopic', label: 'หัวข้อเพลง', placeholder: 'เช่น คนสู้ชีวิต' },
            { id: 'songGenre', label: 'แนวเพลง', placeholder: 'เช่น ลูกทุ่ง ป๊อป หมอลำ Rock EDM Lo-fi' },
            { id: 'songMood', label: 'อารมณ์เพลง', placeholder: 'เช่น เศร้า ศรัทธา ให้กำลังใจ สนุก อบอุ่น' },
            { id: 'singer', label: 'นักร้อง', placeholder: 'เช่น ชาย หญิง คู่ หมู่คณะ' },
            { id: 'language', label: 'ภาษา', placeholder: 'เช่น ไทยกลาง อีสาน เหนือ ใต้ ไทยปนอังกฤษ' },
            { id: 'listener', label: 'กลุ่มผู้ฟัง', placeholder: 'เช่น คนทำงาน สายธรรมะ วัยรุ่น ชาวบ้าน' },
            { id: 'hookMessage', label: 'ข้อความหลักของฮุก', placeholder: 'เช่น ล้มกี่ครั้งก็ต้องลุก' },
            { id: 'songLength', label: 'ความยาวเพลง', placeholder: 'เช่น 2 นาที 3 นาที 4 นาที' },
            { id: 'mainInstruments', label: 'เครื่องดนตรีหลัก', placeholder: 'เช่น แคน พิณ กีตาร์ เปียโน กลอง เครื่องสาย' },
            { id: 'forbidden', label: 'ข้อห้าม', placeholder: 'เช่น ห้ามคล้ายเพลงดัง ห้ามใส่ชื่อศิลปิน ห้ามลอกทำนอง' }
        ]
    }
};
