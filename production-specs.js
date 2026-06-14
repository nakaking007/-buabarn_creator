globalThis.PRODUCTION_SPECS = {
    central: {
        role: 'Creative Director + Prompt Engineer + Storyboard Artist + Film Director + Copywriter + Music Producer',
        requiredSections: [
            'Concept',
            'Structure',
            'Production Prompt',
            'Negative / Guardrail',
            'QC Checklist',
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
        outputLayers: [
            'Concept — งานนี้คืออะไร',
            'Structure — โครงเรื่อง / โครงฉาก / โครงเพลง',
            'Production Prompt — ให้ AI สร้างภาพ วิดีโอ เพลง หรือสคริปต์ต่อได้',
            'Negative / Guardrail — กันหลุด กันผิด กันเพี้ยน',
            'QC Checklist — ตรวจว่างานพร้อมใช้จริงหรือยัง'
        ],
        qualityRules: [
            'ต้องเป็นแพ็กเกจงานพร้อมใช้ ไม่ใช่แค่คำแนะนำ',
            'ต้องแยกหมวดชัดเจน เช่น Concept, Script, Storyboard, Prompt, Caption, QC',
            'ต้องมีข้อมูลพอให้ AI ตัวต่อไปใช้ต่อได้ เช่น ฉาก ตัวละคร แสง กล้อง อารมณ์ รายละเอียด',
            'ต้องเป็นรูปแบบกึ่งโครงสร้าง เช่น Scene 1, Scene 2, Shot 1, Prompt, Negative Prompt',
            'ต้องมี Output หลายชั้น ทั้งชั้นคนอ่านเข้าใจและชั้น prompt สำหรับ AI ใช้ต่อ',
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
                'Concept เรื่องแบบสั้นและชัด',
                'ชื่อเรื่องภาษาไทย + อังกฤษ',
                'แก่นเรื่อง / Theme',
                'ข้อคิดหลัก',
                'กลุ่มผู้ชม',
                'Character Bible',
                'ชื่อตัวละคร อายุ บุคลิก จุดแข็ง จุดอ่อน เป้าหมาย',
                'รูปร่าง หน้าตา เสื้อผ้า สีประจำตัว',
                'World Design',
                'โลกของเรื่อง ฉากหลัก สี แสง บรรยากาศ รายละเอียดสถานที่',
                'Storyboard ตามจำนวนฉาก',
                'ภาพ การกระทำ อารมณ์ และจุดประสงค์ของแต่ละฉาก',
                'Prompt ภาพรายฉาก',
                'Prompt วิดีโอรายฉากถ้าเลือกวิดีโอ',
                'Voiceover / Dialogue เหมาะกับเด็กและครอบครัว',
                'Negative Prompt',
                'Final Quality Checklist'
            ],
            checklist: [
                'ตัวละครน่ารักแต่ไม่ลอกสตูดิโอจริง',
                'แสงนุ่มและสีไม่หม่น',
                'หน้าตาไม่บิดเบี้ยว นิ้วไม่เกิน',
                'ภาพไม่น่ากลัวและเหมาะกับเด็ก',
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
                'Anime Concept',
                'ชื่อเรื่อง',
                'แนวเรื่อง',
                'อารมณ์หลัก',
                'ความขัดแย้งของเรื่อง',
                'Character Profile',
                'ชื่อตัวละคร อายุ บุคลิก ปมในใจ ความต้องการ',
                'รูปลักษณ์ ทรงผม ชุด สีประจำตัว',
                'Emotional Arc',
                'Scene Mood',
                'แสง ฤดูกาล ลม ฝน ท้องฟ้า เมืองหรือธรรมชาติ',
                'Storyboard แบบภาพยนตร์',
                'Anime Image Prompt รายฉาก',
                'Video Prompt ถ้าเลือกวิดีโอ',
                'Dialogue สั้น มีความรู้สึกลึก',
                'Negative Prompt'
            ],
            checklist: [
                'ไม่อ้างหรือลอกตัวละครมีลิขสิทธิ์',
                'แววตาและอารมณ์ต้องชัด',
                'ฉากหลังต้องมีบรรยากาศ',
                'ห้ามฉากว่างเปล่าหรือตัวละครลอย ๆ',
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
                'Thai Film Concept',
                'ชื่อเรื่อง',
                'แนวหนัง',
                'ประเด็นสังคมหรือชีวิต',
                'แก่นอารมณ์',
                'ตัวละครแบบคนไทยจริง',
                'ชื่อ อายุ อาชีพ ภูมิหลัง ภาษาพูด บุคลิก ปัญหาในชีวิต',
                'Location Bible',
                'สถานที่ไทยจริง รายละเอียดฉาก บรรยากาศพื้นที่ เวลาในฉาก',
                'Scene Breakdown',
                'ฉากเปิด ฉากปัญหา ฉากเผชิญหน้า ฉากเปลี่ยนใจ ฉากจบ',
                'Dialogue ธรรมชาติ',
                'Shot List',
                'Image Prompt แบบหนังไทย',
                'Video Prompt ถ้าเลือกวิดีโอ',
                'Sound Design',
                'Negative Prompt',
                'Checklist ความสมจริง'
            ],
            checklist: [
                'ผิวและสัดส่วนต้องดูจริง',
                'สถานที่ต้องเชื่อได้ว่าอยู่ในไทย',
                'บทพูดต้องเป็นธรรมชาติ',
                'ห้ามหน้าฝรั่งถ้าเป็นตัวละครไทย',
                'ห้ามผิวพลาสติกหรือแสงแฟชั่นเกินจริง',
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
                'Naga Identity Sheet',
                'ชื่อนาคา ประเภทนาคา สี จำนวนเศียร พลัง ความหมาย อารมณ์',
                'Thai Naga Lock',
                'รายละเอียดรูปลักษณ์ เศียร หงอน เกล็ด ลายกนก ลำตัว สีตา แสงรอบตัว',
                'Scene Design',
                'ถ้ำ แม่น้ำโขง วัดไทย เมืองบาดาล ปราสาทหิน ป่าหิมพานต์',
                'Human Composition',
                'ตำแหน่งมนุษย์ ขนาดเทียบกับนาคา ท่าทาง ความสัมพันธ์',
                'Image Prompt',
                'Video Prompt ถ้าเลือกวิดีโอ',
                'Negative Prompt กันมังกร',
                'Checklist อัตลักษณ์พญานาคไทย'
            ],
            identityLock: [
                'ลำตัวงูยาวแบบพญานาคไทย',
                'ไม่มีเท้า',
                'ไม่มีปีก',
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
                'ห้ามมีปีก',
                'ห้ามมีหนวดหรือเครามังกร',
                'ห้ามหน้ามังกร ไดโนเสาร์ หรือกิ้งก่า',
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
                'Dharma Core',
                'แก่นธรรม คติสอนใจ ประเด็นกรรมหรือสติ ข้อคิดท้ายเรื่อง',
                'Mystical Hook 3-5 วินาทีแรก',
                'Story Structure',
                'เปิดปมลึกลับ เผชิญทุกข์ พบคำสอน เข้าใจธรรมะ จบด้วยปัญญา',
                'ตัวละคร',
                'Scene Prompt',
                'วัดป่า ถ้ำ แม่น้ำโขง ศาลเก่า ป่าฝน แสงเทียน หมอกเช้า',
                'Script / Voiceover',
                'Caption',
                'Ethical Guardrail',
                'Checklist ความเหมาะสมทางศาสนา'
            ],
            checklist: [
                'ต้องเคารพพุทธศาสนา',
                'ห้ามอ้างว่าปาฏิหาริย์จริงแน่นอน',
                'ห้ามทำให้พระเป็นหมอผี',
                'ห้ามเน้นกลัวมากกว่าปัญญา',
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
                'Product Angle',
                'Pain Point Analysis',
                'Hook หลายแบบ',
                'Hook แรง 3 วินาทีแรก',
                'Hook แบบปัญหา รีวิว เปรียบเทียบ และแม่ค้าพูดตรง ๆ',
                'Drama Script',
                'Dialogue ภาษาคนพูดจริง',
                'Basket CTA',
                'Caption + Hashtag',
                'Shot List สินค้า',
                'Compliance Check',
                'Checklist งานขาย'
            ],
            checklist: [
                'เห็นสินค้าชัด',
                'Hook ต้องเปิดเร็ว',
                'Pain Point ต้องตรงลูกค้า',
                'CTA ไม่ยัดเยียด',
                'ห้ามเคลมรักษาโรคหรือเห็นผล 100%',
                'ห้ามรีวิวปลอมหรือบอกของใกล้หมดถ้าไม่จริง',
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
                'Short Film Concept',
                'ชื่อเรื่อง แนวหนัง ประเด็นหลัก ข้อคิดหรือเป้าหมาย',
                'Hook Opening 3 วินาทีแรก',
                'Short Structure',
                'Timeline 0-60 วินาที',
                'Scene-by-scene Storyboard',
                'เวลา ภาพ การกระทำ บทพูด มุมกล้อง เสียง ข้อความบนจอ',
                'Shot List',
                'Dialogue',
                'Video Prompt',
                'Subtitle Text',
                'Thumbnail Text',
                'Caption / CTA'
            ],
            checklist: [
                'Hook ต้องแรงใน 3 วินาทีแรก',
                'คนดูต้องเข้าใจปัญหาทันที',
                'ฉากไม่เยอะเกินถ่ายจริง',
                'ภาพต้องเล่าเรื่องได้แม้ปิดเสียง',
                'ตอนจบต้องมีอารมณ์หรือข้อคิด',
                'ความยาวไม่บวม'
            ]
        },
        suno: {
            title: 'เพลงสำหรับ Suno',
            menuLabel: 'เพลงสำหรับ Suno',
            description: 'เนื้อเพลงไทยพร้อม Suno Style Prompt ใช้งานได้ทันที',
            style: 'cinematic Thai music mood, clear vocal direction, memorable hook, radio-ready mix',
            visualMood: 'เวทีเสียง คลื่นเพลง แสงชมพูทอง และภาพปกเพลงพรีเมียม',
            outputSections: [
                'Song Concept',
                'ชื่อเพลง แนวเพลง อารมณ์ กลุ่มผู้ฟัง ข้อความหลักของเพลง',
                'Suno Style Prompt',
                'Lyrics แบบมีโครงเพลง',
                '[Intro] [Verse 1] [Pre-Chorus] [Chorus] [Verse 2] [Bridge] [Final Chorus] [Outro]',
                'Hook ที่จำง่าย',
                'โครงเพลงพร้อม Tag',
                'Vocal Direction',
                'Instrument Direction',
                'Alternative Hook 2-3 แบบ',
                'Short Prompt for Suno',
                'Prompt ปกเพลง',
                'Caption โปรโมตเพลง',
                'QC Checklist'
            ],
            checklist: [
                'ห้ามลอกเพลงดัง',
                'ห้ามใส่ชื่อศิลปินจริงใน style prompt ถ้าไม่จำเป็น',
                'ฮุกต้องจำง่าย',
                'คำร้องต้องร้องได้จริง',
                'โครงเพลงต้องครบ Intro ถึง Outro',
                'Prompt สั่ง Suno ต้องชัดและไม่ยาวเกินไป',
                'เพลงต้องมีอารมณ์เดียวกันทั้งเพลง'
            ]
        }
    }
};
