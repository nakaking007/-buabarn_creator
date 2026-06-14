function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (char) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    }[char]));
}

class EngineLogic {
    constructor(mission, tone, dna, production = {}) {
        this.mission = mission || 'shortfilm';
        this.tone = tone || 'อบอุ่น พรีเมียม และเล่าเรื่องชัด';
        this.dna = dna || '';
        this.outputType = production.outputType || (this.mission === 'suno' ? 'music' : 'image');
        this.imagePlan = production.imagePlan || (this.outputType === 'image' ? 'scene' : 'none');
        this.videoPlan = production.videoPlan || (this.outputType === 'video' ? 'scene' : 'none');
        this.sceneCount = Number(production.sceneCount || 3);
        this.character = production.character || 'ตัวละครใหม่ตามคำสั่งผู้ใช้';
        this.voiceType = production.voiceType || 'เสียงผู้หญิงอบอุ่น ชัดเจน';
        this.voiceTarget = production.voiceTarget || 'voice over narration';
        this.musicStyle = production.musicStyle || 'Thai pop cinematic';
        this.singerType = production.singerType || 'Thai female warm vocal';
        this.references = production.references || 'ไม่มีภาพต้นฉบับอ้างอิง';
        this.audioSample = production.audioSample || 'ไม่มีไฟล์เสียง/วิดีโอตัวอย่าง';
        this.customInputs = production.customInputs || 'ผู้ใช้ยังไม่ได้กรอก input เฉพาะหมวดเพิ่มเติม';
        this.customInputMap = this.parseCustomInputs(this.customInputs);
    }

    build(input) {
        const mission = missionPresets[this.mission] || missionPresets.shortfilm;
        const central = this.getCentralSpec();
        const categorySpec = this.getCategorySpec(mission);
        const system = [
            'คุณคือ Buabarn VIP Creater Tools ผู้กำกับการผลิตคอนเทนต์ AI ภาษาไทย',
            `บทบาทมาตรฐาน: ${central.role}`,
            'ผลิตชิ้นงานสำเร็จรูป ไม่ใช่แค่คำแนะนำ',
            'ต้องใช้มาตรฐานกลางร่วมกับมาตรฐานเฉพาะหมวดงาน',
            'ถ้าไม่เลือกภาพ ห้ามสร้าง prompt ภาพ',
            'ถ้าไม่เลือกวิดีโอ ห้ามสร้าง prompt วิดีโอหรือเสียงประกอบวิดีโอ',
            'ถ้าเลือกภาพหรือวิดีโอรายฉาก ต้องสร้าง prompt ให้ครบตามจำนวนฉาก',
            'Output ต้องแยกหมวดชัดเจน เช่น Concept, Script, Storyboard, Prompt, Caption, QC',
            'Output ต้องมีข้อมูลพอให้ AI ตัวต่อไปใช้ต่อได้ เช่น ฉาก ตัวละคร แสง กล้อง อารมณ์ วัสดุ และข้อห้าม',
            'Output ต้องเป็นกึ่งโครงสร้าง เช่น Scene 1, Scene 2, Shot, Prompt, Negative Prompt',
            'Output ต้องมีหลายชั้น ทั้งชั้นสำหรับคนอ่านเข้าใจ และชั้น prompt สำหรับ AI ภาพ/วิดีโอใช้ต่อ',
            'ห้ามตอบเป็น template แข็งๆ ต้องวิเคราะห์ input เฉพาะหมวดและขยายรายละเอียดอย่างมีเหตุผล'
        ].join('\n');
        const instruction = [
            `หมวดงาน: ${mission.title}`,
            `ไอเดีย: ${input}`,
            `จำนวนฉาก: ${this.sceneCount}`,
            `แผนภาพ: ${this.imagePlan === 'scene' ? 'สร้าง prompt ภาพรายฉาก' : 'ไม่เลือกภาพ'}`,
            `แผนวิดีโอ: ${this.videoPlan === 'scene' ? 'สร้าง prompt วิดีโอรายฉากพร้อมเสียง' : 'ไม่เลือกวิดีโอ'}`,
            `โทนงาน: ${this.tone}`,
            `เสียง: ${this.videoPlan === 'scene' ? this.voiceType : 'ไม่ใช้เสียง'}`,
            `ภาพอ้างอิง: ${this.references}`,
            `Input เฉพาะหมวดจากผู้ใช้:\n${this.customInputs}`,
            `มาตรฐานเฉพาะหมวด: ${categorySpec.outputSections.join(', ')}`
        ].join('\n');
        return { system, instruction, mission };
    }

    renderLocalPlan(input) {
        const request = this.build(input);
        return {
            fullText: this.generateLocalOutput(input, request.mission),
            request,
            display: `
                <strong>${escapeHtml(request.mission.title)}</strong>
                <p>${escapeHtml(request.mission.description)}</p>
                <p>${escapeHtml(this.getReadyMessage())}</p>
            `
        };
    }

    generateLocalOutput(input, mission) {
        input = this.cleanTopic(input);
        const central = this.getCentralSpec();
        const categorySpec = this.getCategorySpec(mission);
        if (this.outputType === 'music' || this.mission === 'suno') {
            return this.generateSuno(input, mission);
        }

        const scenes = this.makeScenes(input, mission);
        const lines = [
            `# Buabarn VIP Content Pack: ${input}`,
            '',
            '## 1. ชื่อผลงาน',
            this.buildWorkTitle(input, categorySpec),
            '',
            '## Concept',
            `${mission.conceptPrefix}${input} ในโทน ${this.tone} ให้เล่าเรื่องชัด ภาพสวย และพร้อมนำไปผลิตต่อ`,
            '',
            '## 2. Core Concept',
            this.buildCoreConcept(input, categorySpec),
            '',
            '## 3. กลุ่มเป้าหมาย',
            this.buildTargetAudience(),
            '',
            '## User Input Brief',
            this.customInputs,
            '',
            '## 4. Mood & Tone',
            `โทนหลัก: ${this.tone}\nสไตล์ภาพ: ${categorySpec.style}\nอารมณ์รวม: ${categorySpec.visualMood}`,
            '',
            '## 5. มาตรฐานกลางที่ใช้กับงานนี้',
            this.renderBulletList(central.requiredSections),
            '',
            '## 5.1 Output 5 ชั้นที่ต้องครบ',
            this.renderBulletList(central.outputLayers || []),
            '',
            `## 6. มาตรฐานเฉพาะหมวด: ${categorySpec.title}`,
            this.renderBulletList(categorySpec.outputSections),
            '',
            '## Character Sheet',
            `- ตัวละครหลัก/วัตถุหลัก: ${this.describeSubject(input).main}`,
            `- รายละเอียดเด่น: ${this.describeSubject(input).details}`,
            `- ภาพอ้างอิง: ${this.references}`,
            '',
            '## Scene Mood',
            `${mission.visualMood} ใช้แสง cinematic rim light, soft glow, controlled contrast, depth of field และเฟรมที่อ่านง่ายบนมือถือ`,
            '',
            '## Story Structure',
            this.buildStoryStructure(input),
            '',
            `## Storyboard (${scenes.length} ฉาก)`,
            scenes.map((scene, index) => this.renderStoryboardScene(scene, index)).join('\n\n')
        ];

        if (this.mission === 'naga') {
            lines.push('', '## Naga Identity Lock', this.renderBulletList(categorySpec.identityLock || []));
        }

        if (this.mission === 'cartDrama') {
            lines.push('', '## Sales Pack', this.buildSalesPack(input));
        }

        if (this.mission === 'shortfilm') {
            lines.push('', '## Timeline หนังสั้น', this.buildShortfilmTimeline());
        }

        if (this.imagePlan === 'scene') {
            lines.push('', `## Prompt ภาพรายฉาก (${scenes.length} ฉาก)`);
            scenes.forEach((scene, index) => {
                lines.push('', `### Prompt ภาพฉากที่ ${index + 1}`, this.buildSceneImagePrompt(input, mission, scene, index));
            });
            lines.push('', '## Negative Prompt สำหรับภาพ');
            lines.push('low quality, blurry, bad anatomy, distorted face, extra fingers, flat lighting, noisy image, watermark, text overlay, logo, duplicate subject, oversaturated colors, cheap CGI');
        } else {
            lines.push('', '## ภาพ');
            lines.push('ไม่เลือกภาพ: ระบบไม่สร้าง prompt ภาพตามคำสั่งผู้ใช้');
        }

        if (this.videoPlan === 'scene') {
            lines.push('', `## Prompt วิดีโอรายฉาก (${scenes.length} ฉาก)`);
            scenes.forEach((scene, index) => {
                lines.push('', `### Prompt วิดีโอฉากที่ ${index + 1}`, this.buildSceneVideoPrompt(input, mission, scene, index));
                lines.push(`เสียงประกอบวิดีโอฉากที่ ${index + 1}: ${scene.sound}`);
                lines.push(`Voice Over ฉากที่ ${index + 1}: ${scene.voice}`);
            });
        } else {
            lines.push('', '## วิดีโอ');
            lines.push('ไม่เลือกวิดีโอ: ระบบไม่สร้าง prompt วิดีโอหรือเสียงประกอบตามคำสั่งผู้ใช้');
        }

        lines.push('', '## Caption', this.buildCaption(input, mission));
        lines.push('', '## Quality Checklist');
        lines.push(this.renderChecklist([...(categorySpec.checklist || []), ...central.qualityRules]));
        lines.push('', '## เวอร์ชันทางเลือก 3 แบบ');
        lines.push(this.buildAlternatives(input, categorySpec));
        lines.push('', '## คำแนะนำการนำไปใช้จริง');
        lines.push(this.buildPracticalUseNotes());
        lines.push('', '## ข้อเสนอปรับปรุง 3 ข้อ');
        lines.push('1. ใส่ภาพอ้างอิงให้ครบ 3 ภาพถ้าต้องการล็อกหน้าตา ตัวสินค้า หรือโทนภาพ');
        lines.push('2. ถ้าต้องการวิดีโอ ให้เลือกกล่องวิดีโอเพื่อเปิด prompt และเสียงประกอบรายฉาก');
        lines.push('3. ถ้าต้องการเพลง ให้เข้ากล่องเพลงแยก เพื่อไม่ให้เนื้อเพลงปนกับ prompt ภาพ/วิดีโอ');
        return lines.join('\n');
    }

    getCentralSpec() {
        const specs = typeof window !== 'undefined' ? window.PRODUCTION_SPECS : globalThis.PRODUCTION_SPECS;
        return specs?.central || {
            role: 'Creative Director + Prompt Engineer + Film Director + Copywriter',
            requiredSections: ['ชื่อผลงาน', 'Core Concept', 'Storyboard', 'Prompt', 'Negative Prompt', 'Checklist'],
            qualityRules: ['ต้องเป็นงานพร้อมใช้', 'ต้องมี prompt แก้ไขต่อได้', 'ต้องมี checklist']
        };
    }

    getCategorySpec(mission) {
        const specs = typeof window !== 'undefined' ? window.PRODUCTION_SPECS : globalThis.PRODUCTION_SPECS;
        return specs?.categories?.[this.mission] || {
            title: mission.title,
            menuLabel: mission.title,
            description: mission.description,
            style: mission.style,
            visualMood: mission.visualMood,
            outputSections: ['Concept', 'Storyboard', 'Prompt รายฉาก', 'Caption', 'Checklist'],
            checklist: ['ภาพต้องชัด', 'เรื่องต้องเข้าใจง่าย', 'นำไปใช้ต่อได้']
        };
    }

    renderBulletList(items) {
        return (items || []).map((item) => `- ${item}`).join('\n') || '- ไม่มีข้อมูลเฉพาะ';
    }

    renderChecklist(items) {
        return (items || []).map((item) => `- [ ] ${item}`).join('\n') || '- [ ] ตรวจคุณภาพก่อนใช้งาน';
    }

    buildWorkTitle(input, spec) {
        return `${spec.menuLabel || spec.title}: ${input}`;
    }

    buildCoreConcept(input, spec) {
        const deliverables = ['โครงเรื่อง', 'ฉาก', 'กล้อง', 'แสง', 'ข้อห้าม', 'checklist'];
        if (this.imagePlan === 'scene') {
            deliverables.push('Prompt ภาพ');
        }
        if (this.videoPlan === 'scene') {
            deliverables.push('Prompt วิดีโอ', 'เสียงประกอบ', 'Voice Over');
        }
        return `ผลิตแพ็กเกจคอนเทนต์เรื่อง “${this.buildProductionSubject(input)}” ในหมวด ${spec.title} โดยให้มี${deliverables.join(', ')} พร้อมนำไปผลิตต่อจริง`;
    }

    buildTargetAudience() {
        if (this.mission === 'cartDrama') {
            return 'ผู้ขายสินค้าออนไลน์ แอดมินเพจ ไลฟ์สด TikTok Shop และผู้ต้องการคลิปปิดการขาย';
        }
        if (this.mission === 'suno') {
            return 'ครีเอเตอร์เพลง ผู้ทำคอนเทนต์วิดีโอสั้น และผู้ต้องการเพลงประกอบสำหรับแบรนด์';
        }
        if (this.mission === 'shortfilm') {
            return 'ครีเอเตอร์ TikTok, YouTube Shorts, Reels และทีมผลิตหนังสั้นแนวตั้ง';
        }
        return 'ครีเอเตอร์ไทย เจ้าของสินค้า เพจคอนเทนต์ และผู้ใช้ AI ที่ต้องการงานพร้อมผลิต';
    }

    parseCustomInputs(text) {
        const map = {};
        String(text || '').split('\n').forEach((line) => {
            const match = line.match(/^-\s*([^:：]+)[:：]\s*(.+)$/);
            if (match) {
                map[match[1].trim()] = match[2].trim();
            }
        });
        return map;
    }

    getCustomValue(label) {
        return this.customInputMap?.[label] || '';
    }

    buildProductionSubject(input) {
        const title = this.getCustomValue('หัวข้อเรื่อง');
        const character = this.getCustomValue('ตัวละครหลัก');
        const location = this.getCustomValue('สถานที่ไทย');
        const parts = [input];
        if (title && !input.includes(title)) {
            parts.push(`หัวข้อเรื่อง: ${title}`);
        }
        if (character && !input.includes(character)) {
            parts.push(`ตัวละครหลัก: ${character}`);
        }
        if (location && !input.includes(location)) {
            parts.push(`สถานที่: ${location}`);
        }
        return parts.join(' | ');
    }

    buildStoryStructure(input) {
        if (this.mission === 'shortfilm') {
            return [
                'Act 1: Hook เปิดปัญหาหรือภาพจำใน 3 วินาทีแรก',
                'Act 2: เหตุการณ์พัฒนาและจุดเปลี่ยน',
                'Act 3: เฉลย อารมณ์ปิดเรื่อง หรือ CTA'
            ].join('\n');
        }
        if (this.mission === 'cartDrama') {
            return [
                'เปิดด้วย Pain Point ที่ลูกค้าเข้าใจทันที',
                'นำสินค้าเข้าแก้ปัญหาแบบเห็นภาพ',
                'ปิดด้วย Offer และ CTA ปักตะกร้า'
            ].join('\n');
        }
        return [
            `เปิดด้วยภาพจำของ ${input}`,
            'ขยายรายละเอียดตัวละคร ฉาก และอารมณ์',
            'ปิดด้วยเฟรมที่จำง่ายและนำไปใช้เป็นภาพ/คลิปต่อได้'
        ].join('\n');
    }

    buildSalesPack(input) {
        return [
            `Hook: ${input} แก้ปัญหาที่ลูกค้ารู้สึกอยู่แล้วภายใน 3 วินาทีแรก`,
            'Pain Point: ลูกค้าเสียเวลา ไม่มั่นใจ หรือยังไม่เห็นผลลัพธ์ที่ต้องการ',
            'Benefit: ทำให้เห็นผลลัพธ์ชัดขึ้น ใช้ง่ายขึ้น และตัดสินใจเร็วขึ้น',
            'Offer: เสนอราคา โปรโมชัน หรือของแถมตามแคมเปญจริง',
            'CTA: กดตะกร้า / ทักแชต / สั่งซื้อวันนี้',
            'คำพูดปักตะกร้า: ถ้าต้องการแบบนี้ กดตะกร้าด้านล่างไว้ก่อน ของพร้อมส่งและมีจำนวนจำกัด'
        ].join('\n');
    }

    buildShortfilmTimeline() {
        return [
            '0-3 วินาที: Hook',
            '4-10 วินาที: ปัญหา',
            '11-25 วินาที: เหตุการณ์พัฒนา',
            '26-40 วินาที: จุดเปลี่ยน',
            '41-55 วินาที: เฉลย / หักมุม',
            '56-60 วินาที: ข้อคิด / CTA'
        ].join('\n');
    }

    buildAlternatives(input, spec) {
        return [
            `1. เวอร์ชันพรีเมียม: เน้นภาพสวย รายละเอียดสูง และอารมณ์ลึกในหมวด ${spec.title}`,
            `2. เวอร์ชันไวรัล: เปิดเร็ว มี Hook ชัด และเหมาะกับคลิปสั้นเรื่อง ${input}`,
            `3. เวอร์ชันขายได้: เพิ่ม Pain Point, Benefit และ CTA เพื่อใช้กับสินค้า/บริการ`
        ].join('\n');
    }

    buildPracticalUseNotes() {
        const notes = [];
        if (this.imagePlan === 'scene') {
            notes.push('- ใช้ Prompt ภาพกับเครื่องมือสร้างภาพ เช่น Hugging Face, Stable Diffusion, Midjourney หรือเครื่องมือที่รองรับ');
        }
        if (this.videoPlan === 'scene') {
            notes.push('- ใช้ Prompt วิดีโอกับ API วิดีโอที่รองรับจริง เช่น fal.ai, Runway หรือ Replicate');
            notes.push('- ใช้ Voice Over เป็นสคริปต์บันทึกเสียง หรือใส่ใน Buabarn Local Video Maker');
        }
        notes.push('- ตรวจ checklist ก่อนส่งงานทุกครั้ง');
        return notes.join('\n');
    }

    renderStoryboardScene(scene, index) {
        const lines = [
            `### ฉากที่ ${index + 1}: ${scene.title}`,
            `ภาพ: ${scene.visual}`,
            `การกระทำ: ${scene.action}`,
            `กล้อง: ${scene.camera}`
        ];
        if (this.videoPlan === 'scene') {
            lines.push(`เสียง: ${scene.sound}`);
        }
        return lines.join('\n');
    }

    generateSuno(input) {
        input = this.cleanTopic(input);
        const spec = this.getCategorySpec(missionPresets.suno);
        return [
            `# Buabarn VIP Music Pack: ${input}`,
            '',
            '## 1. ชื่อเพลง',
            input,
            '',
            '## 2. แนวเพลง',
            this.musicStyle,
            '',
            '## 3. อารมณ์',
            'อบอุ่น ภาพยนตร์ จำง่าย และเหมาะกับคอนเทนต์ไทย',
            '',
            '## 4. BPM / Key โดยประมาณ',
            'BPM: 80-96 BPM\nKey: C major หรือ G major สำหรับโทนอบอุ่นร้องง่าย',
            '',
            '## 5. Concept',
            `เพลงไทยสำหรับเรื่อง ${input} โทนอบอุ่น ภาพยนตร์ จำง่าย และพร้อมนำไปวางใน Suno`,
            '',
            '## User Input Brief',
            this.customInputs,
            '',
            '## 6. Suno Style Prompt',
            `${this.musicStyle}, ${this.singerType}, cinematic Thai arrangement, emotional intro, clear verse, memorable hook, clean modern mix`,
            '',
            '## 7. เนื้อเพลงไทยเต็มเพลง',
            '[Intro]',
            'แสงอุ่นค่อย ๆ เปิดทางให้หัวใจ',
            '',
            '[Verse 1]',
            `ในคืนที่แสงยังค่อย ๆ ผ่านใจ`,
            `มีเรื่องราวของ ${input} ที่ยังไม่จาง`,
            'เหมือนดอกบัวที่รอแสงกลางเส้นทาง',
            'ค่อย ๆ บานเมื่อใจเริ่มเข้าใจ',
            '',
            '[Pre-Chorus]',
            'ทุกความเงียบมีความหมายซ่อนอยู่',
            'ทุกความกลัวสอนให้เราได้เรียนรู้',
            '',
            '[Chorus]',
            `ให้ ${input} เป็นแสงจำของหัวใจ`,
            'พาเราข้ามคืนยาวไปอย่างอ่อนโยน',
            'ไม่ต้องรีบ แค่เชื่อในความดีที่เติบโต',
            'แล้ววันหนึ่งใจจะบานเหมือนบัวงาม',
            '',
            '[Bridge]',
            'ถ้าโลกยังหมุนด้วยความสับสน',
            'ขอให้ความดีเป็นทางของทุกคน',
            '',
            '[Final Chorus]',
            `ให้ ${input} เป็นแสงจำของหัวใจ`,
            'พาเราเดินต่อไปด้วยความหมาย',
            'ไม่ต้องรีบ แค่เชื่อในสิ่งดีที่ไม่หาย',
            'แล้วใจจะบานเหมือนบัวกลางแสงทอง',
            '',
            '[Outro]',
            'ให้ใจค่อย ๆ บาน เหมือนบัวกลางแสงทอง',
            '',
            '## 8. โครงเพลงพร้อม Tag',
            '[Intro] -> [Verse 1] -> [Pre-Chorus] -> [Chorus] -> [Bridge] -> [Final Chorus] -> [Outro]',
            '',
            '## 9. Vocal Direction',
            `${this.singerType}, ออกเสียงไทยชัด อบอุ่น มีอารมณ์ แต่ไม่ลากเสียงจนฟังยาก`,
            '',
            '## 10. Instrument Direction',
            'soft piano, warm strings, subtle Thai percussion, gentle cinematic drums, clean modern mix',
            '',
            '## 11. Mixing Mood',
            'เสียงร้องเด่น ดนตรีไม่กลบ เน้นความอบอุ่น พรีเมียม และใช้ประกอบวิดีโอสั้นได้',
            '',
            '## 12. Alternative Hook 3 แบบ',
            `1. ให้ ${input} เป็นแสงนำทางหัวใจ`,
            `2. เมื่อ ${input} บานขึ้นในใจเรา`,
            `3. แค่เชื่อในแสงดี ๆ ที่ยังไม่หาย`,
            '',
            '## 13. Prompt ปกเพลง',
            `glowing pink lotus, ${input}, cinematic Thai spiritual atmosphere, warm gold light, premium album cover, no text, no watermark`,
            '',
            '## 14. Caption',
            `${input} เวอร์ชันเพลงไทยพร้อมใช้กับ Suno #BuabarnVIP #SunoThai #เพลงAI`,
            '',
            '## 15. Quality Checklist',
            this.renderChecklist(spec.checklist || [])
        ].join('\n');
    }

    getReadyMessage() {
        if (this.outputType === 'music') {
            return 'สร้างกล่องเพลงแยก พร้อมเนื้อเพลงไทยและ Suno Style Prompt';
        }
        if (this.imagePlan === 'scene' && this.videoPlan === 'scene') {
            return 'สร้าง prompt ภาพรายฉากและ prompt วิดีโอรายฉากแยกกันครบตามจำนวนฉาก';
        }
        if (this.imagePlan === 'scene') {
            return 'สร้างเฉพาะ prompt ภาพรายฉากครบตามจำนวนฉาก ไม่สร้างวิดีโอหรือเสียง';
        }
        if (this.videoPlan === 'scene') {
            return 'สร้างเฉพาะ prompt วิดีโอรายฉาก พร้อมเสียงประกอบรายฉาก ไม่สร้างภาพ';
        }
        return 'สร้างเฉพาะโครงเรื่อง ไม่มี prompt ภาพ วิดีโอ หรือเพลง';
    }

    makeScenes(input, mission) {
        const count = Math.max(1, Math.min(10, this.sceneCount));
        const subject = this.buildProductionSubject(input);
        const location = this.getCustomValue('สถานที่ไทย') || 'สถานที่ไทยสมจริง';
        const conflict = this.getCustomValue('ปัญหาหลัก') || 'ความรู้สึกบางอย่างที่ตัวละครต้องเผชิญ';
        const templates = [
            {
                title: 'เปิดเรื่อง',
                visual: `เห็น ${subject} ในบรรยากาศ ${mission.visualMood} ที่ ${location} แสงแรกค่อย ๆ แตะตัวแบบ`,
                action: 'ตัวแบบปรากฏอย่างสง่างาม สร้างความสงสัยและดึงผู้ชมเข้าสู่เรื่อง',
                camera: 'wide shot, slow push in, soft parallax background',
                sound: 'เสียงลมเบา ๆ ดนตรีเปิดแบบลึกลับและอบอุ่น',
                voice: `นี่คือจุดเริ่มต้นของ ${input} เรื่องราวที่กำลังเปิดม่านใต้แสงที่งดงาม`
            },
            {
                title: 'เผยรายละเอียด',
                visual: `กล้องเข้าใกล้รายละเอียดของ ${subject} ให้เห็นผิว วัสดุ แสงสะท้อน และอารมณ์`,
                action: `ตัวแบบขยับช้า ๆ หรือหยุดคิดกับ ${conflict} เผยอารมณ์หลักของฉาก`,
                camera: 'medium close-up, shallow depth of field',
                sound: 'เสียงประกายแสงและ ambience ของสถานที่',
                voice: 'เมื่อมองใกล้ขึ้น เราจะเห็นรายละเอียดที่ทำให้ภาพนี้มีความหมายมากกว่าแค่ความสวยงาม'
            },
            {
                title: 'จุดพีค',
                visual: `เกิดเหตุการณ์สำคัญรอบ ${subject} ทำให้ฉากดูยิ่งใหญ่ขึ้น`,
                action: 'ตัวแบบเผชิญแสงหรือเผยพลังที่เป็นหัวใจของเรื่อง',
                camera: 'low angle hero shot, slow orbit, cinematic flare',
                sound: 'ดนตรีขยายกว้างขึ้น มีเสียง rise ก่อนถึงภาพจำ',
                voice: 'บางวินาทีมีพลังพอจะเปลี่ยนความรู้สึกของทั้งเรื่อง และนี่คือวินาทีนั้น'
            },
            {
                title: 'เชื่อมโยงผู้ชม',
                visual: `${subject} อยู่ในมุมที่ผู้ชมเข้าใจอารมณ์และอยากติดตามต่อ`,
                action: 'ตัวละครหรือวัตถุหลักเชื่อมกับผู้ชมผ่านสายตา การเคลื่อนไหว หรือบรรยากาศ',
                camera: 'smooth tracking shot, clean center composition',
                sound: 'ดนตรีลดพื้นที่ให้เสียงบรรยายเด่นขึ้น',
                voice: 'สิ่งที่ดีต้องทำให้ผู้ชมรู้สึกว่าเรื่องนี้เกี่ยวข้องกับหัวใจของเขาได้จริง'
            },
            {
                title: 'ปิดด้วยภาพจำ',
                visual: `ภาพสุดท้ายของ ${subject} สวย คม และจำง่ายบนมือถือ`,
                action: 'ตัวแบบหยุดในท่าที่ทรงพลัง พร้อมปิดอารมณ์เรื่อง',
                camera: 'final hero frame, slow pull back, clean negative space',
                sound: 'ดนตรีจบแบบ warm resolve',
                voice: 'นี่คือภาพจำที่พร้อมต่อยอดเป็นคอนเทนต์ เป็นคลิป หรือเป็นเรื่องเล่าที่คนดูจำได้'
            }
        ];
        return Array.from({ length: count }, (_, index) => templates[index % templates.length]);
    }

    buildSceneImagePrompt(input, mission, scene, index) {
        const subject = this.buildProductionSubject(input);
        const customBrief = this.customInputs.startsWith('ผู้ใช้ยังไม่ได้กรอก') ? '' : `category brief: ${this.customInputs.replace(/\n/g, '; ')}`;
        if (this.mission === 'naga' || input.includes('นาค')) {
            return [
                `Scene ${index + 1}: Ultra realistic Thai Naga fantasy cinematic still, ${scene.visual}`,
                `main story: ${subject}`,
                customBrief,
                'beautiful young Thai woman in elegant flowing white dress, full moon night, sacred riverbank, misty Mekong atmosphere',
                'massive black Thai Naga serpent, obsidian scales, glowing red eyes, authentic Thai Naga identity, elegant sacred serpent body, no dragon legs, no claws, no Chinese dragon moustache, no dragon beard',
                'Thai Naga anatomy lock: one single horn centered on the head, high back fin or crest along the spine, ornate Thai gold body ornaments, sacred crystal orb, smooth serpent body, Thai temple mythology details',
                `camera: ${scene.camera}, vertical 9:16, premium poster frame, clear subject separation`,
                'lighting: silver moonlight, soft rim light on white fabric, red eye glow reflecting on water, subtle gold spiritual particles',
                'quality: ultra detailed, high resolution, professional film still, realistic texture, no text, no watermark'
            ].join('\n');
        }
        return [
            `Scene ${index + 1}: ${mission.style}, ${scene.visual}`,
            `main subject: ${subject}`,
            customBrief,
            `camera: ${scene.camera}, vertical 9:16, premium cinematic composition`,
            'lighting: soft cinematic rim light, warm highlight, controlled shadow, beautiful contrast',
            'quality: ultra detailed, high resolution, sharp focus, no text, no watermark'
        ].join('\n');
    }

    buildSceneVideoPrompt(input, mission, scene, index) {
        const subject = this.buildProductionSubject(input);
        const customBrief = this.customInputs.startsWith('ผู้ใช้ยังไม่ได้กรอก') ? '' : `category brief: ${this.customInputs.replace(/\n/g, '; ')}`;
        if (this.mission === 'naga' || input.includes('นาค')) {
            return [
                `Scene ${index + 1} video prompt: cinematic Thai Naga legend, ${scene.visual}`,
                `main story: ${subject}`,
                customBrief,
                `action: ${scene.action}`,
                'identity lock: authentic Thai Naga serpent, one single horn centered on head, high back fin or crest, ornate Thai gold body ornaments, sacred crystal orb, smooth long serpent body',
                'avoid: Chinese dragon, dragon legs, claws, moustache, beard, western dragon wings, monster lizard anatomy',
                `camera movement: ${scene.camera}, smooth cinematic motion, 3-5 seconds`,
                `mood: ${this.tone}, mysterious Thai spiritual atmosphere, stable subject continuity`,
                'format: vertical 9:16, no text overlay, no watermark, no flicker'
            ].join('\n');
        }
        return [
            `Scene ${index + 1} video prompt: ${mission.style}, ${scene.visual}`,
            `main story: ${subject}`,
            customBrief,
            `action: ${scene.action}`,
            `camera movement: ${scene.camera}, smooth cinematic motion, 3-5 seconds`,
            `mood: ${this.tone}, emotional pacing, stable subject continuity`,
            'format: vertical 9:16, no text overlay, no watermark, no flicker'
        ].join('\n');
    }

    buildCaption(input, mission) {
        if (this.mission === 'naga' || input.includes('นาค')) {
            return `${input} ภาพเล่าเรื่องพญานาคพรีเมียม แสงสวย ลึกลับ และมีพลังแบบตำนานร่วมสมัย #พญานาค #BuabarnVIP #AIContent`;
        }
        return `${input} ในสไตล์ ${mission.title} พร้อมชิ้นงานแยกตามกล่องที่เลือก #BuabarnVIP #AIContent`;
    }

    describeSubject(input) {
        if (this.dna) {
            return { main: this.dna, details: `${input} ต้องรักษารายละเอียดตาม Character DNA Lock ให้ชัดในทุกฉาก` };
        }
        if (this.mission === 'naga' || input.includes('นาค')) {
            return {
                main: input,
                details: 'หญิงสาวชุดขาวต้องดูสง่างามท่ามกลางแสงจันทร์ ส่วนพญานาคไทยต้องเป็นลำตัวงูยาวไม่มีเท้า ไม่มีกรงเล็บ ไม่มีหนวดหรือเคราแบบมังกร มีนอเดียวตรงกลางเศียร มีแผงหลัง มีเครื่องประดับคาดลำตัว มีลูกแก้ว เกล็ดมีมิติ และต้องไม่ดูเป็นมังกรจีน'
            };
        }
        return { main: this.character, details: `${input} ต้องเด่นตั้งแต่เฟรมแรก มีแสง วัสดุ และบรรยากาศตรงหมวดงาน` };
    }

    cleanTopic(input) {
        const topic = String(input || '').trim();
        const compact = topic.toLowerCase().replace(/\s+/g, ' ');
        if (!topic || compact === 'error' || compact.includes('ไม่สามารถดึงข้อมูลได้ในหน้านี้')) {
            return 'ไอเดียใหม่ของ Buabarn VIP';
        }
        return topic;
    }

    renderAiResult(aiResult) {
        return {
            fullText: aiResult.text || '',
            display: `
                <strong>ชิ้นงานภาษาไทยจาก ${escapeHtml(aiResult.source)}</strong>
                ${aiResult.note ? `<p>${escapeHtml(aiResult.note)}</p>` : ''}
                <p>แก้ไขในกล่องด้านล่าง แล้วกด COPY ALL เพื่อใช้เวอร์ชันล่าสุด</p>
            `
        };
    }

    extractImagePrompt(text) {
        const source = text || '';
        const match = source.match(/Prompt ภาพฉากที่\s*1\s*([\s\S]{0,1800})/i)
            || source.match(/Prompt ภาพรายฉาก[\s\S]*?###\s*[^\n]+\n([\s\S]{0,1800})/i)
            || source.match(/Image Prompt\s*[:：]?\s*([\s\S]{0,1800})/i);
        const prompt = match ? match[1].split(/\n(?:###|##|Negative Prompt|Prompt วิดีโอ)/i)[0] : source;
        return [prompt.slice(0, 1800), 'high resolution, premium cinematic composition, no watermark, no text'].join('\n');
    }

    extractVideoPrompt(text) {
        const source = text || '';
        const match = source.match(/Prompt วิดีโอฉากที่\s*1\s*([\s\S]{0,1800})/i)
            || source.match(/Prompt วิดีโอรายฉาก[\s\S]*?###\s*[^\n]+\n([\s\S]{0,1800})/i)
            || source.match(/Video Prompt\s*[:：]?\s*([\s\S]{0,1800})/i);
        const prompt = match ? match[1].split(/\n(?:###|##|เสียงประกอบ|Voice Over|Prompt ภาพ)/i)[0] : source;
        return [prompt.slice(0, 1800), 'short vertical video, smooth camera motion, cinematic lighting, no watermark, no text overlay'].join('\n');
    }
}

const missionPresets = {
    pixar3d: {
        title: 'การ์ตูน 3D Pixar',
        description: 'ภาพการ์ตูน 3D สีสวย ตัวละครมีอารมณ์ เหมาะกับครอบครัวและสินค้า',
        style: 'premium 3D family animation, expressive cute character, warm cinematic lighting',
        visualMood: 'โลก 3D สีสด อบอุ่น มีแสงนุ่มและรายละเอียดน่ารัก',
        conceptPrefix: 'สร้างคอนเทนต์การ์ตูน 3D จาก '
    },
    japananime: {
        title: 'การ์ตูนอนิเมะญี่ปุ่น',
        description: 'อนิเมะญี่ปุ่นคุณภาพสูง มี mood ภาพยนตร์ แสงสวย และอารมณ์ชัด',
        style: 'high-end Japanese anime film, emotional character, detailed background, cinematic light',
        visualMood: 'ฉากอนิเมะญี่ปุ่น แสงเย็นผสมทอง รายละเอียดสูง ฉากหลังมีมิติ',
        conceptPrefix: 'สร้างอนิเมะคุณภาพสูงจาก '
    },
    thaicinema: {
        title: 'ภาพยนตร์ไทยสมจริง',
        description: 'ภาพสมจริงแบบหนังไทย ดราม่า อบอุ่น และมีชีวิตจริง',
        style: 'Thai cinematic realism, natural skin texture, dramatic warm light, film still',
        visualMood: 'บรรยากาศไทยสมจริง แสงอบอุ่นแบบภาพยนตร์ เห็นผิวและสิ่งแวดล้อมเป็นธรรมชาติ',
        conceptPrefix: 'สร้างภาพยนตร์ไทยจาก '
    },
    naga: {
        title: 'พญานาค / นาคา',
        description: 'ภาพและเรื่องเกี่ยวกับนาคา ลำน้ำ แสงศักดิ์สิทธิ์ และแฟนตาซีไทย',
        style: 'realistic Thai naga serpent fantasy, glowing scales, sacred river mist, epic spiritual light',
        visualMood: 'ลำน้ำ หมอก แสงศักดิ์สิทธิ์ เกล็ดนาคเรืองแสง และบรรยากาศลึกลับสมจริง',
        conceptPrefix: 'สร้างเรื่องนาคาแฟนตาซีจาก '
    },
    dharmaMystery: {
        title: 'เรื่องเล่าธรรมะลึกลับไทย',
        description: 'เรื่องลึกลับ ความเชื่อพุทธศาสนา และคติสอนใจในสังคมไทย',
        style: 'Thai Buddhist mystery, lotus glow, temple silhouette, mystical sacred atmosphere',
        visualMood: 'วัด เงาแสง เทียน ดอกบัว ความลึกลับ และความสงบศักดิ์สิทธิ์',
        conceptPrefix: 'สร้างเรื่องเล่าธรรมะลึกลับจาก '
    },
    cartDrama: {
        title: 'ละครปักตะกร้า',
        description: 'ละครสั้นขายสินค้า มีตัวละคร รีวิวสินค้า และ CTA ปักตะกร้า',
        style: 'Thai shopping drama, lively presenter, product close-up, commercial lighting',
        visualMood: 'ฉากรีวิวสินค้า แสงสดใส เห็นสินค้าชัด และคนรีวิวมีชีวิตชีวา',
        conceptPrefix: 'สร้างละครขายสินค้าจาก '
    },
    shortfilm: {
        title: 'Storyboard หนังสั้น TikTok / YouTube',
        description: 'สตอรี่บอร์ดหนังสั้นพร้อมภาพ วิดีโอ เสียง และบทพูด',
        style: 'cinematic storyboard, short film frames, clear camera plan, emotional pacing',
        visualMood: 'เฟรมภาพยนตร์หลายฉาก มีลำดับภาพและอารมณ์ต่อเนื่อง',
        conceptPrefix: 'สร้างหนังสั้นจาก '
    },
    suno: {
        title: 'เพลงสำหรับ Suno',
        description: 'เนื้อเพลงไทยและ Suno style prompt พร้อมนำไปวางใช้งาน',
        style: 'cinematic Thai music mood',
        visualMood: 'เวทีเสียง คลื่นเพลง แสงชมพูทอง และบรรยากาศเพลงพรีเมียม',
        conceptPrefix: 'สร้างเพลงจาก '
    }
};
