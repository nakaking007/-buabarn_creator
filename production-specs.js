globalThis.PRODUCTION_SPECS = {
    central: {
        role: 'Creative Director + Prompt Engineer + Storyboard Artist + Film Director + Copywriter + Music Producer',
        requiredSections: [
            'ชื่อผลงาน',
            'Core Concept',
            'กลุ่มเป้าหมาย',
            'Mood & Tone',
            'Story Structure',
            'Character / Subject Bible',
            'Setting / World Design',
            'Storyboard',
            'Prompt ภาพหรือวิดีโอ',
            'Negative Prompt',
            'Quality Checklist',
            'คำแนะนำการนำไปใช้จริง'
        ],
        qualityRules: [
            'ต้องเป็นแพ็กเกจงานพร้อมใช้ ไม่ใช่แค่คำแนะนำ',
            'ห้ามตอบกว้าง ต้องมีรายละเอียดฉาก กล้อง แสง เสียง และข้อห้าม',
            'ถ้าเลือกภาพ ต้องสร้าง Prompt ภาพครบตามจำนวนฉาก',
            'ถ้าเลือกวิดีโอ ต้องสร้าง Prompt วิดีโอ เสียง และ Voice Over ครบตามจำนวนฉาก',
            'ถ้าไม่เลือกภาพหรือวิดีโอ ห้ามสร้างส่วนที่ไม่ได้เลือก',
            'ทุก prompt ต้องแก้ไขต่อได้ง่ายและใช้ได้กับเครื่องมือ AI ภายนอก'
        ]
    },
    categories: {
        pixar3d: {
            title: 'การ์ตูน 3D Family Animation',
            menuLabel: 'การ์ตูน 3D Pixar',
            description: 'งานการ์ตูน 3D อบอุ่น สีสวย ตัวละครมีอารมณ์ เหมาะกับครอบครัวและสินค้า',
            style: '3D family animated feature film style, warm cinematic lighting, expressive character, high detail',
            visualMood: 'โลก 3D อบอุ่น สีสด แสงนุ่ม ดวงตาแสดงอารมณ์ ฉากมีความลึก',
            outputSections: [
                'ชื่อเรื่องภาษาไทย + อังกฤษ',
                'Logline',
                'Theme',
                'Character Bible',
                'World Design',
                'Storyboard ตามจำนวนฉาก',
                'Prompt ภาพรายฉาก',
                'Prompt วิดีโอรายฉากถ้าเลือกวิดีโอ',
                'Voice Tone',
                'Music Mood',
                'Negative Prompt',
                'Final Quality Checklist'
            ],
            checklist: [
                'ตัวละครน่ารักแต่ไม่ลอกสตูดิโอจริง',
                'แสงนุ่มและสีไม่หม่น',
                'หน้าตาไม่บิดเบี้ยว นิ้วไม่เกิน',
                'ฉากอ่านง่ายบนมือถือ'
            ]
        },
        japananime: {
            title: 'อนิเมะญี่ปุ่นภาพยนตร์',
            menuLabel: 'อนิเมะญี่ปุ่น',
            description: 'อนิเมะญี่ปุ่นคุณภาพสูง อารมณ์ชัด แสงสวย และมี mood ภาพยนตร์',
            style: 'Japanese cinematic anime film, emotional eyes, detailed background, beautiful light and shadow',
            visualMood: 'ฉากอนิเมะรายละเอียดสูง แสงเย็นผสมทอง ลม ฝน ท้องฟ้า และความเงียบเชิงอารมณ์',
            outputSections: [
                'Title',
                'Genre',
                'Visual Style Bible',
                'Character Design',
                'Emotional Arc',
                'Scene Mood',
                'Storyboard ตามจำนวนฉาก',
                'Cinematic Prompt รายฉาก',
                'Dialogue สั้น',
                'Camera Direction',
                'Lighting Direction',
                'Negative Prompt'
            ],
            checklist: [
                'ไม่อ้างหรือลอกตัวละครมีลิขสิทธิ์',
                'แววตาและอารมณ์ต้องชัด',
                'ฉากหลังต้องมีบรรยากาศ',
                'แสงและเงาต้องเป็นภาษาภาพยนตร์'
            ]
        },
        thaicinema: {
            title: 'ภาพยนตร์ไทยสมจริง',
            menuLabel: 'ภาพยนตร์ไทยสมจริง',
            description: 'ภาพสมจริงแบบหนังไทย ผิว แสง สถานที่ และอารมณ์ใกล้ชีวิตจริง',
            style: 'Thai cinematic realism, natural skin texture, realistic location, film still, dramatic warm light',
            visualMood: 'สถานที่ไทยสมจริง แสงธรรมชาติหรือแสงหนังไทย ผิวคนจริง วัสดุจริง อารมณ์ดราม่า',
            outputSections: [
                'ชื่อเรื่อง',
                'Logline',
                'Realistic Character Brief',
                'Location Design',
                'Lighting Plan',
                'Shot List',
                'Storyboard',
                'Image Prompt แบบหนังไทย',
                'Video Prompt ถ้าเลือกวิดีโอ',
                'Dialogue / Voice Over',
                'Negative Prompt',
                'Checklist ความสมจริง'
            ],
            checklist: [
                'ผิวและสัดส่วนต้องดูจริง',
                'สถานที่ต้องเชื่อได้ว่าอยู่ในไทย',
                'แสงไม่เวอร์หรือ CGI เกินไป',
                'ภาพต้องเหมือน still จากภาพยนตร์'
            ]
        },
        naga: {
            title: 'พญานาคไทย / นาคา',
            menuLabel: 'พญานาค / นาคา',
            description: 'งานนาคาไทย แฟนตาซีไทย ลำน้ำ แสงศักดิ์สิทธิ์ และความเชื่อร่วมสมัย',
            style: 'authentic Thai Naga serpent fantasy, sacred river mist, spiritual cinematic light, ultra detailed scales',
            visualMood: 'ลำน้ำ หมอก แสงจันทร์ แสงศักดิ์สิทธิ์ เกล็ดนาคไทย เครื่องประดับทอง และบรรยากาศลึกลับ',
            outputSections: [
                'ชื่อเรื่อง',
                'ตำนาน / Core Myth',
                'Naga Identity Lock',
                'Human Character',
                'Sacred Setting',
                'Storyboard',
                'Prompt ภาพรายฉาก',
                'Prompt วิดีโอรายฉากถ้าเลือกวิดีโอ',
                'Sound / Chant / Atmosphere',
                'Negative Prompt กันมังกร',
                'Checklist อัตลักษณ์พญานาคไทย'
            ],
            identityLock: [
                'ลำตัวงูยาวแบบพญานาคไทย',
                'ไม่มีเท้า',
                'ไม่มีกรงเล็บ',
                'ไม่มีหนวดหรือเคราแบบมังกรจีน',
                'มีนอเดียวตรงกลางเศียร',
                'มีแผงหลังหรือสันหลัง',
                'มีเครื่องประดับคาดลำตัว',
                'มีลูกแก้ว',
                'ไม่ใช่มังกรจีน ไม่ใช่มังกรตะวันตก'
            ],
            checklist: [
                'ห้ามมีเท้าหรือกรงเล็บ',
                'ห้ามมีหนวดหรือเครามังกร',
                'ต้องมีนอเดียวและแผงหลัง',
                'ต้องมีลูกแก้วหรือเครื่องประดับไทย',
                'บรรยากาศต้องเป็นไทย ไม่ใช่จีน'
            ]
        },
        dharmaMystery: {
            title: 'เรื่องเล่าธรรมะลึกลับไทย',
            menuLabel: 'ธรรมะลึกลับไทย',
            description: 'เรื่องลึกลับ ความเชื่อพุทธศาสนา คติสอนใจ และสังคมไทย',
            style: 'Thai Buddhist mystery, temple silhouette, lotus glow, candle light, respectful spiritual atmosphere',
            visualMood: 'วัด เทียน หมอก เงา ดอกบัว แสงศักดิ์สิทธิ์ และความสงบแบบมีปริศนา',
            outputSections: [
                'ชื่อเรื่อง',
                'คติธรรมหลัก',
                'ปริศนา / Mystery Hook',
                'ตัวละคร',
                'สถานที่ศักดิ์สิทธิ์',
                'โครงเรื่อง',
                'Storyboard',
                'Prompt ภาพรายฉาก',
                'Voice Over ธรรมะ',
                'Sound Design',
                'Negative Prompt',
                'Checklist ความเหมาะสมทางศาสนา'
            ],
            checklist: [
                'ต้องเคารพพุทธศาสนา',
                'ไม่ทำให้พิธีกรรมหรือความเชื่อดูตลก',
                'ต้องมีคติสอนใจชัด',
                'บรรยากาศลึกลับแต่ไม่หยาบหรือหลอกลวง'
            ]
        },
        cartDrama: {
            title: 'ละครปักตะกร้า / คอนเทนต์ขายสินค้า',
            menuLabel: 'ละครปักตะกร้า',
            description: 'ละครสั้นขายสินค้า รีวิวสินค้า และ CTA สำหรับแพลตฟอร์มโซเชียล',
            style: 'Thai social commerce drama, lively presenter, product close-up, clear CTA, commercial lighting',
            visualMood: 'รีวิวสินค้า แสงสว่าง เห็นสินค้าเด่น ตัวละครมีชีวิตชีวา และมีจังหวะขาย',
            outputSections: [
                'ชื่อแคมเปญ',
                'กลุ่มลูกค้า',
                'Hook 3 วินาทีแรก',
                'Pain Point',
                'Benefit',
                'Offer',
                'CTA',
                'คำพูดปักตะกร้า',
                'Storyboard ขายสินค้า',
                'Shot List สินค้า',
                'Prompt ภาพ/วิดีโอ',
                'Caption + Hashtag',
                'Checklist งานขาย'
            ],
            checklist: [
                'เห็นสินค้าชัด',
                'Hook ต้องเปิดเร็ว',
                'Pain Point ต้องตรงลูกค้า',
                'CTA ไม่ยัดเยียด',
                'คำพูดต้องใช้จริงในไลฟ์หรือคลิปสั้นได้'
            ]
        },
        shortfilm: {
            title: 'Storyboard หนังสั้น TikTok / YouTube Shorts',
            menuLabel: 'Storyboard หนังสั้น',
            description: 'หนังสั้นแนวตั้ง มี Hook จุดเปลี่ยน ตอนจบ และ CTA',
            style: 'cinematic short-form storyboard, clear camera plan, emotional pacing, mobile-first vertical framing',
            visualMood: 'เฟรมภาพยนตร์แนวตั้ง ลำดับภาพชัด อารมณ์ต่อเนื่อง และถ่ายทำได้จริง',
            outputSections: [
                'ชื่อเรื่อง',
                'Logline',
                'ความยาว',
                'Platform',
                'Theme',
                'ตัวละคร',
                'โครง 3 Act แบบสั้น',
                'Timeline 0-60 วินาที',
                'Storyboard แบบตาราง',
                'Shot List',
                'Dialogue',
                'Camera Direction',
                'Sound',
                'Caption',
                'Thumbnail Text',
                'Ending Twist',
                'CTA'
            ],
            checklist: [
                'Hook ต้องแรงใน 3 วินาทีแรก',
                'คนดูต้องเข้าใจปัญหาทันที',
                'ฉากไม่เยอะเกินถ่ายจริง',
                'ภาพต้องเล่าเรื่องได้แม้ปิดเสียง',
                'ตอนจบต้องมีอารมณ์หรือข้อคิด'
            ]
        },
        suno: {
            title: 'เพลงสำหรับ Suno',
            menuLabel: 'เพลงสำหรับ Suno',
            description: 'เนื้อเพลงไทยพร้อม Suno Style Prompt ใช้งานได้ทันที',
            style: 'cinematic Thai music mood, clear vocal direction, memorable hook, radio-ready mix',
            visualMood: 'เวทีเสียง คลื่นเพลง แสงชมพูทอง และภาพปกเพลงพรีเมียม',
            outputSections: [
                'ชื่อเพลง',
                'แนวเพลง',
                'อารมณ์',
                'BPM โดยประมาณ',
                'Key โดยประมาณ',
                'Suno Style Prompt',
                'Lyrics เต็มเพลง',
                'โครงเพลงพร้อม Tag',
                'Vocal Direction',
                'Instrument Direction',
                'Mixing Mood',
                'Alternative Hook 3 แบบ',
                'Prompt ปกเพลง',
                'Caption'
            ],
            checklist: [
                'ห้ามลอกเพลงดัง',
                'ห้ามใส่ชื่อศิลปินจริงใน style prompt ถ้าไม่จำเป็น',
                'ฮุกต้องจำง่าย',
                'คำร้องต้องร้องได้จริง',
                'โครงเพลงต้องครบ Intro ถึง Outro'
            ]
        }
    }
};
