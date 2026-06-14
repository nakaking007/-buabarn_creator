const missions = [
    { id: 'pixar3d', label: 'การ์ตูน 3D Pixar', image: 'assets/pixar3d.png' },
    { id: 'japananime', label: 'อนิเมะญี่ปุ่น', image: 'assets/japananime.png' },
    { id: 'thaicinema', label: 'ภาพยนตร์ไทยสมจริง', image: 'assets/thaicinema.png' },
    { id: 'naga', label: 'พญานาค / นาคา', image: 'assets/naga.png' },
    { id: 'dharmaMystery', label: 'ธรรมะลึกลับไทย', image: 'assets/dharmaMystery.png' },
    { id: 'cartDrama', label: 'ละครปักตะกร้า', image: 'assets/cartDrama.png' },
    { id: 'shortfilm', label: 'Storyboard หนังสั้น', image: 'assets/shortfilm.png' },
    { id: 'suno', label: 'เพลงสำหรับ Suno', image: 'assets/suno.png' }
];

const grid = document.getElementById('mission-grid');
const homeView = document.getElementById('home-view');
const commandCenter = document.getElementById('command-center');
const musicCenter = document.getElementById('music-center');
const missionTitle = document.getElementById('mission-title');
const outputVault = document.getElementById('output-vault');
const aiEnabled = document.getElementById('ai-enabled');
const aiProvider = document.getElementById('ai-provider');
const aiKey = document.getElementById('ai-key');
const aiModel = document.getElementById('ai-model');
const aiEndpoint = document.getElementById('ai-endpoint');
const aiStatus = document.getElementById('ai-status');
const imageEnabled = document.getElementById('image-enabled');
const imageKey = document.getElementById('image-key');
const imageModel = document.getElementById('image-model');
const imageStatus = document.getElementById('image-status');
const videoEnabled = document.getElementById('video-enabled');
const videoKey = document.getElementById('video-key');
const videoModel = document.getElementById('video-model');
const videoStatus = document.getElementById('video-status');
const imagePlan = document.getElementById('image-plan');
const videoPlan = document.getElementById('video-plan');
const voicePanel = document.getElementById('voice-panel');
const categoryInputPanel = document.getElementById('category-input-panel');
const categoryInputTitle = document.getElementById('category-input-title');
const categoryFields = document.getElementById('category-fields');
const musicExtraFields = document.getElementById('music-extra-fields');

init();

async function init() {
    renderMissions();
    hydrateAiForm(await AIBridge.loadConfig());
    hydrateImageForm(await AIBridge.loadImageConfig());
    hydrateVideoForm(await AIBridge.loadVideoConfig());
    updateProductionPanels();
}

function renderMissions() {
    grid.innerHTML = '';
    missions.forEach((mission) => {
        const item = document.createElement('button');
        item.className = 'mission-item';
        item.type = 'button';
        item.innerHTML = `<img class="mission-thumb" src="${mission.image}" alt="${mission.label}"><p>${mission.label}</p>`;
        item.addEventListener('click', () => launchMission(mission.id, mission.label));
        grid.appendChild(item);
    });
}

function launchMission(id, label) {
    homeView.hidden = true;
    outputVault.innerHTML = '';
    window.activeMissionId = id;
    if (id === 'suno') {
        commandCenter.hidden = true;
        musicCenter.hidden = false;
        renderMusicInputs();
        return;
    }
    musicCenter.hidden = true;
    commandCenter.hidden = false;
    missionTitle.innerText = label;
    imagePlan.value = 'scene';
    videoPlan.value = 'none';
    renderCategoryInputs(id);
    updateProductionPanels();
}

function backToHome() {
    homeView.hidden = false;
    commandCenter.hidden = true;
    musicCenter.hidden = true;
}

async function syncFromWeb() {
    const data = await WebScraper.scrapeCurrentTab();
    if (!data.ok) {
        alert(data.message);
        return;
    }
    document.getElementById('main-desc').value = [data.title, data.description].filter(Boolean).join('\n');
}

function hydrateAiForm(config) {
    aiEnabled.checked = Boolean(config.enabled);
    aiProvider.value = config.provider || 'openrouter';
    aiKey.value = config.apiKey || '';
    aiModel.value = config.model || '';
    aiEndpoint.value = config.endpoint || '';
    updateAiStatus(config);
}

function hydrateImageForm(config) {
    imageEnabled.checked = Boolean(config.enabled);
    imageKey.value = config.apiKey || '';
    imageModel.value = config.model || 'black-forest-labs/FLUX.1-schnell';
    updateImageStatus(config);
}

function hydrateVideoForm(config) {
    videoEnabled.checked = Boolean(config.enabled);
    videoKey.value = config.apiKey || '';
    videoModel.value = config.model || 'Wan-AI/Wan2.2-TI2V-5B';
    updateVideoStatus(config);
}

function collectAiConfig() {
    const apiKey = cleanKeyInput(aiKey.value);
    return {
        enabled: Boolean(apiKey),
        provider: aiProvider.value,
        apiKey,
        model: aiModel.value.trim(),
        endpoint: aiEndpoint.value.trim()
    };
}

function collectImageConfig() {
    const apiKey = cleanKeyInput(imageKey.value);
    return {
        enabled: Boolean(apiKey),
        apiKey,
        model: imageModel.value.trim() || 'black-forest-labs/FLUX.1-schnell'
    };
}

function collectVideoConfig() {
    const apiKey = cleanKeyInput(videoKey.value);
    return {
        enabled: Boolean(apiKey),
        apiKey,
        model: videoModel.value.trim() || 'Wan-AI/Wan2.2-TI2V-5B'
    };
}

function cleanKeyInput(value) {
    return String(value || '')
        .trim()
        .replace(/^Bearer\s+/i, '')
        .replace(/[^\x20-\x7E]/g, '')
        .trim();
}

async function saveAiConfig() {
    const config = collectAiConfig();
    await AIBridge.saveConfig(config);
    updateAiStatus(config, 'บันทึกแล้ว');
}

async function saveImageConfig() {
    const config = collectImageConfig();
    await AIBridge.saveImageConfig(config);
    updateImageStatus(config, 'บันทึกแล้ว');
}

async function saveVideoConfig() {
    const config = collectVideoConfig();
    await AIBridge.saveVideoConfig(config);
    updateVideoStatus(config, 'บันทึกแล้ว');
}

function updateAiStatus(config, prefix = '') {
    const ready = Boolean(config.apiKey);
    aiStatus.textContent = ready ? `${prefix} พร้อมใช้ AI จริงสำหรับเขียนงาน` : 'ยังไม่ได้กรอก API สำหรับ AI เขียนงาน ระบบจะใช้ template สำรอง';
    aiStatus.classList.toggle('ready', Boolean(ready));
}

function updateImageStatus(config, prefix = '') {
    const ready = Boolean(config.apiKey);
    imageStatus.textContent = ready ? `${prefix} พร้อมสร้างภาพ` : 'ยังไม่ได้กรอก API ภาพ';
    imageStatus.classList.toggle('ready', Boolean(ready));
}

function updateVideoStatus(config, prefix = '') {
    const ready = Boolean(config.apiKey);
    videoStatus.textContent = ready ? `${prefix} พร้อมสร้างวิดีโอ` : 'ยังไม่ได้กรอก API วิดีโอ';
    videoStatus.classList.toggle('ready', Boolean(ready));
}

function updateProductionPanels() {
    const hasVideo = videoPlan.value === 'scene';
    voicePanel.hidden = !hasVideo;
}

function renderCategoryInputs(missionId) {
    const spec = globalThis.PRODUCTION_INPUT_SPECS?.[missionId];
    categoryFields.innerHTML = '';
    if (!spec) {
        categoryInputPanel.hidden = true;
        return;
    }
    categoryInputPanel.hidden = false;
    categoryInputTitle.textContent = spec.title || 'Input เฉพาะหมวด';
    spec.fields.forEach((field, index) => {
        const wrap = document.createElement('div');
        wrap.className = `control-group ${index === spec.fields.length - 1 ? 'wide-field' : ''}`;
        const inputId = `category-${field.id}`;
        wrap.innerHTML = `
            <label for="${inputId}">${escapeHtml(field.label)}</label>
            <input type="text" id="${inputId}" class="category-input" data-field-id="${escapeHtml(field.id)}" data-field-label="${escapeHtml(field.label)}" placeholder="${escapeHtml(field.placeholder || '')}">
        `;
        categoryFields.appendChild(wrap);
    });
}

function renderMusicInputs() {
    const spec = globalThis.PRODUCTION_INPUT_SPECS?.suno;
    musicExtraFields.innerHTML = '';
    if (!spec) {
        return;
    }
    spec.fields.forEach((field, index) => {
        const wrap = document.createElement('div');
        wrap.className = `control-group ${index === spec.fields.length - 1 ? 'wide-field' : ''}`;
        const inputId = `music-extra-${field.id}`;
        wrap.innerHTML = `
            <label for="${inputId}">${escapeHtml(field.label)}</label>
            <input type="text" id="${inputId}" class="music-extra-input" data-field-id="${escapeHtml(field.id)}" data-field-label="${escapeHtml(field.label)}" placeholder="${escapeHtml(field.placeholder || '')}">
        `;
        musicExtraFields.appendChild(wrap);
    });
}

async function pasteFromClipboard(target) {
    try {
        target.value = (await navigator.clipboard.readText()).trim();
        target.dispatchEvent(new Event('input'));
    } catch (error) {
        alert('ไม่สามารถอ่าน clipboard ได้ กรุณา paste ด้วยตนเอง');
    }
}

function openApiSource(event) {
    const url = event.currentTarget.dataset.url;
    if (url) {
        openExternalUrl(url);
    }
}

function openManual() {
    openBundledFile('readme.html');
}

function openInstallGuide() {
    openBundledFile('deploy-guide.txt');
}

function openLocalVideoGuide() {
    openBundledFile('BUABARN_LOCAL_VIDEO/README_LOCAL_VIDEO.txt');
}

function openExternalUrl(url) {
    if (typeof chrome !== 'undefined' && chrome.tabs?.create) {
        chrome.tabs.create({ url });
        return;
    }
    window.open(url, '_blank', 'noopener');
}

function openBundledFile(path) {
    if (typeof chrome !== 'undefined' && chrome.tabs?.create && chrome.runtime?.getURL) {
        chrome.tabs.create({ url: chrome.runtime.getURL(path) });
        return;
    }
    window.open(path, '_blank', 'noopener');
}

function bindClick(id, handler) {
    const element = document.getElementById(id);
    if (element) {
        element.addEventListener('click', handler);
    }
}

bindClick('btn-back', backToHome);
bindClick('btn-back-music', backToHome);
bindClick('manual-btn', openManual);
bindClick('install-guide-btn', openInstallGuide);
bindClick('local-video-btn', openLocalVideoGuide);
bindClick('sync-web-btn', syncFromWeb);
bindClick('btn-save-ai', saveAiConfig);
bindClick('btn-save-image', saveImageConfig);
bindClick('btn-save-video', saveVideoConfig);
bindClick('btn-paste-ai', () => pasteFromClipboard(aiKey));
bindClick('btn-paste-image', () => pasteFromClipboard(imageKey));
bindClick('btn-paste-video', () => pasteFromClipboard(videoKey));
bindClick('btn-generate-music', generateMusicOnly);
document.querySelectorAll('.api-link').forEach((button) => button.addEventListener('click', openApiSource));
imagePlan.addEventListener('change', updateProductionPanels);
videoPlan.addEventListener('change', updateProductionPanels);

['ref-image-1', 'ref-image-2', 'ref-image-3'].forEach((id) => {
    document.getElementById(id).addEventListener('change', updateReferencePreview);
});
document.getElementById('audio-sample').addEventListener('change', updateAudioPreview);

[aiEnabled, aiProvider, aiKey, aiModel, aiEndpoint].forEach((control) => {
    control.addEventListener('change', () => updateAiStatus(collectAiConfig()));
    control.addEventListener('input', () => updateAiStatus(collectAiConfig()));
});
[imageEnabled, imageKey, imageModel].forEach((control) => {
    control.addEventListener('change', () => updateImageStatus(collectImageConfig()));
    control.addEventListener('input', () => updateImageStatus(collectImageConfig()));
});
[videoEnabled, videoKey, videoModel].forEach((control) => {
    control.addEventListener('change', () => updateVideoStatus(collectVideoConfig()));
    control.addEventListener('input', () => updateVideoStatus(collectVideoConfig()));
});

document.getElementById('btn-ignite').addEventListener('click', async () => {
    const input = document.getElementById('main-desc').value.trim();
    if (!input) {
        alert('โปรดระบุรายละเอียดชิ้นงานที่ต้องการผลิต');
        return;
    }
    if (isInvalidProductionInput(input)) {
        alert('ข้อความนี้เป็นข้อความ error ไม่ใช่ไอเดียงาน กรุณาพิมพ์หัวข้อใหม่');
        return;
    }

    const engine = createEngine();
    const localPlan = engine.renderLocalPlan(input);
    const textConfig = collectAiConfig();
    await AIBridge.saveConfig(textConfig);
    await AIBridge.saveImageConfig(collectImageConfig());
    await AIBridge.saveVideoConfig(collectVideoConfig());

    if (!textConfig.apiKey) {
        renderResult(localPlan, 'planning');
        return;
    }

    setBusy(true);
    const statusCard = renderResult({
        fullText: 'กำลังให้ AI จริงประมวลผลจาก input ทั้งหมด ถ้า API ใช้ไม่ได้ ระบบจะแจ้งสาเหตุและใช้ template สำรอง',
        display: '<strong>โหมด AI จริง</strong><p>กำลังประมวลผลผ่าน API ที่ตั้งค่าไว้...</p>'
    }, 'planning');
    try {
        const aiResult = await AIBridge.generate({
            config: textConfig,
            instruction: localPlan.request.instruction,
            context: { system: localPlan.request.system }
        });
        if (aiResult.text) {
            statusCard.remove();
            renderResult(engine.renderAiResult(aiResult), 'final');
        }
    } catch (error) {
        statusCard.remove();
        renderResult({
            fullText: `# ใช้ Template สำรอง เพราะ AI จริงไม่สำเร็จ\n\nสาเหตุ:\n${formatApiError(error)}\n\n${localPlan.fullText}`,
            display: `<strong>AI จริงไม่สำเร็จ ใช้ Template สำรอง</strong><p>${escapeHtml(formatApiError(error))}</p>`
        }, 'error');
    } finally {
        setBusy(false);
    }
});

function createEngine() {
    return new EngineLogic(window.activeMissionId || 'shortfilm', document.getElementById('tone-select').value, document.getElementById('dna-input').value.trim(), {
        imagePlan: imagePlan.value,
        videoPlan: videoPlan.value,
        outputType: videoPlan.value === 'scene' ? 'video' : (imagePlan.value === 'scene' ? 'image' : 'story'),
        sceneCount: document.getElementById('scene-count').value,
        character: document.getElementById('character-select').value,
        voiceType: document.getElementById('voice-type').value,
        voiceTarget: document.getElementById('voice-target').value,
        musicStyle: document.getElementById('music-style').value,
        references: getReferenceSummary(),
        audioSample: getAudioSampleSummary(),
        customInputs: getCategoryInputSummary()
    });
}

function generateMusicOnly() {
    const input = document.getElementById('music-idea').value.trim();
    if (!input) {
        alert('โปรดระบุไอเดียเพลงก่อน');
        return;
    }
    const engine = new EngineLogic('suno', 'อบอุ่น พรีเมียม และเล่าเรื่องชัด', '', {
        outputType: 'music',
        musicStyle: document.getElementById('music-style').value,
        singerType: document.getElementById('singer-type').value,
        customInputs: getMusicInputSummary()
    });
    renderResult(engine.renderLocalPlan(input), 'music');
}

function isInvalidProductionInput(input) {
    const normalized = input.toLowerCase().replace(/\s+/g, ' ').trim();
    return normalized === 'error'
        || normalized.includes('error ไม่สามารถดึงข้อมูลได้')
        || normalized.includes('ไม่สามารถดึงข้อมูลได้ในหน้านี้');
}

function updateReferencePreview() {
    const preview = document.getElementById('reference-preview');
    preview.innerHTML = '';
    getReferenceFiles().forEach((file, index) => {
        const url = URL.createObjectURL(file);
        const item = document.createElement('div');
        item.className = 'reference-item';
        item.innerHTML = `<img src="${url}" alt="ภาพอ้างอิง ${index + 1}"><span>${escapeHtml(file.name)}</span>`;
        preview.appendChild(item);
    });
}

function updateAudioPreview() {
    const preview = document.getElementById('audio-preview');
    const file = document.getElementById('audio-sample').files[0];
    if (!file) {
        preview.innerHTML = '';
        return;
    }
    const url = URL.createObjectURL(file);
    const media = file.type.startsWith('video/')
        ? `<video controls src="${url}"></video>`
        : `<audio controls src="${url}"></audio>`;
    preview.innerHTML = `<p>ตัวอย่างเสียง/วิดีโอ: ${escapeHtml(file.name)}</p>${media}`;
}

function getReferenceFiles() {
    return ['ref-image-1', 'ref-image-2', 'ref-image-3']
        .map((id) => document.getElementById(id).files[0])
        .filter(Boolean);
}

function getReferenceSummary() {
    const files = getReferenceFiles();
    if (!files.length) {
        return 'ไม่มีภาพต้นฉบับอ้างอิง';
    }
    return files.map((file, index) => `ภาพอ้างอิง ${index + 1}: ${file.name} (${file.type || 'image'})`).join('\n');
}

function getAudioSampleSummary() {
    const file = document.getElementById('audio-sample').files[0];
    if (videoPlan.value !== 'scene') {
        return 'ไม่ใช้เสียงประกอบ เพราะไม่ได้เลือกสร้างวิดีโอ';
    }
    return file ? `ไฟล์เสียง/วิดีโอตัวอย่าง: ${file.name} (${file.type || 'media'})` : 'ไม่มีไฟล์เสียง/วิดีโอตัวอย่าง';
}

function getCategoryInputSummary() {
    const values = Array.from(document.querySelectorAll('.category-input'))
        .map((input) => ({
            label: input.dataset.fieldLabel,
            value: input.value.trim()
        }))
        .filter((item) => item.value);
    if (!values.length) {
        return 'ผู้ใช้ยังไม่ได้กรอก input เฉพาะหมวดเพิ่มเติม';
    }
    return values.map((item) => `- ${item.label}: ${item.value}`).join('\n');
}

function getMusicInputSummary() {
    const values = Array.from(document.querySelectorAll('.music-extra-input'))
        .map((input) => ({
            label: input.dataset.fieldLabel,
            value: input.value.trim()
        }))
        .filter((item) => item.value);
    if (!values.length) {
        return 'ผู้ใช้ยังไม่ได้กรอก input เฉพาะเพลงเพิ่มเติม';
    }
    return values.map((item) => `- ${item.label}: ${item.value}`).join('\n');
}

async function createMediaFromCard(card, type) {
    const text = card.querySelector('.editable-output').value;
    const engine = createEngine();
    if (type === 'image') {
        await createImagePreview(card, collectImageConfig(), engine.extractImagePrompt(text));
    } else if (type === 'video') {
        await createVideoPreview(card, collectVideoConfig(), engine.extractVideoPrompt(text));
    } else if (type === 'voice') {
        speakPreview(text);
    }
}

async function createImagePreview(card, imageConfig, prompt) {
    const preview = card.querySelector('.image-preview');
    if (!imageConfig.enabled || !imageConfig.apiKey) {
        preview.innerHTML = '<p>ยังไม่ได้ใส่ API สำหรับสร้างภาพ กรุณาใส่ Hugging Face Token หรือ API ที่รองรับในหน้า ตั้งค่า</p>';
        return;
    }
    preview.innerHTML = '<p>กำลังสร้างภาพตัวอย่าง...</p>';
    try {
        const image = await AIBridge.generateImage({ config: imageConfig, prompt });
        preview.innerHTML = `
            <p>ภาพตัวอย่างจาก ${escapeHtml(image.source)}</p>
            <img src="${image.url}" alt="Generated Buabarn image preview">
            <a class="download-link" href="${image.url}" download="buabarn-generated-image.png">ดาวน์โหลดภาพ</a>
        `;
    } catch (error) {
        preview.innerHTML = `<p>สร้างภาพไม่สำเร็จ: ${escapeHtml(formatApiError(error))}</p>`;
    }
}

async function createVideoPreview(card, videoConfig, prompt) {
    const preview = card.querySelector('.video-preview');
    if (!videoConfig.enabled || !videoConfig.apiKey) {
        preview.innerHTML = '<p>ยังไม่ได้ใส่ API สำหรับสร้างวิดีโอ กรุณาใส่ Token/API ที่รองรับในหน้า ตั้งค่า</p>';
        return;
    }
    preview.innerHTML = '<p>กำลังสร้างวิดีโอตัวอย่าง...</p>';
    try {
        const video = await AIBridge.generateVideo({ config: videoConfig, prompt });
        preview.innerHTML = `
            <p>วิดีโอตัวอย่างจาก ${escapeHtml(video.source)}</p>
            <video controls src="${video.url}"></video>
            <a class="download-link" href="${video.url}" download="buabarn-generated-video.mp4">ดาวน์โหลดวิดีโอ</a>
        `;
    } catch (error) {
        preview.innerHTML = `<p>สร้างวิดีโอไม่สำเร็จ: ${escapeHtml(formatApiError(error))}</p>`;
    }
}

function speakPreview(text) {
    if (!('speechSynthesis' in window)) {
        alert('เบราว์เซอร์นี้ยังไม่รองรับการทดลองเสียง');
        return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text.slice(0, 900));
    utterance.lang = 'th-TH';
    utterance.rate = 0.95;
    utterance.pitch = document.getElementById('voice-type').value.includes('ผู้ชาย') ? 0.82 : 1.06;
    window.speechSynthesis.speak(utterance);
}

function renderResult(result, kind) {
    const card = document.createElement('div');
    card.className = `archive-card ${kind || ''}`;
    const hasImage = imagePlan?.value === 'scene';
    const hasVideo = videoPlan?.value === 'scene';
    const isMusic = kind === 'music';
    const mediaActions = isMusic
        ? '<div class="media-actions"><button type="button" data-action="copy">คัดลอกไปใช้ใน Suno</button></div>'
        : `
            <div class="media-actions">
                ${hasImage ? '<button type="button" data-action="image">สร้างภาพ</button>' : ''}
                ${hasVideo ? '<button type="button" data-action="video">สร้างวิดีโอ</button><button type="button" data-action="voice">ทดลองเสียง</button>' : ''}
            </div>
        `;
    card.innerHTML = `
        <button class="copy-badge" type="button">COPY ALL</button>
        <p class="result-kicker">[BUABARN AI OUTPUT]</p>
        <div class="result-content">${result.display}</div>
        <label class="editor-label">ชิ้นงานภาษาไทยพร้อมแก้ไข</label>
        <textarea class="editable-output" rows="14" spellcheck="true"></textarea>
        ${mediaActions}
        <div class="image-preview"></div>
        <div class="video-preview"></div>
    `;
    const editor = card.querySelector('.editable-output');
    editor.value = result.fullText;
    card.querySelector('.copy-badge').addEventListener('click', () => copyToClipboard(editor.value));
    card.querySelectorAll('[data-action]').forEach((button) => {
        button.addEventListener('click', () => {
            if (button.dataset.action === 'copy') {
                copyToClipboard(editor.value);
                return;
            }
            createMediaFromCard(card, button.dataset.action);
        });
    });
    if (isMusic) {
        card.classList.add('music');
    }
    outputVault.insertBefore(card, outputVault.firstChild);
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    return card;
}

function setBusy(isBusy) {
    const button = document.getElementById('btn-ignite');
    button.disabled = isBusy;
    button.textContent = isBusy ? 'กำลังผลิตชิ้นงาน...' : 'ผลิตชิ้นงาน';
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('คัดลอกชิ้นงานที่แก้ไขแล้วเรียบร้อย');
    });
}

function formatApiError(error) {
    const message = String(error?.message || error || '');
    if (message.includes('Failed to fetch') || message.includes('ENOTFOUND') || message.includes('NetworkError')) {
        return 'เชื่อมต่อ API ไม่สำเร็จ กรุณาตรวจอินเทอร์เน็ต DNS ไฟร์วอลล์ หรือเปิดหน้าเว็บผู้ให้บริการ API ก่อน';
    }
    if (message.includes('401') || message.toLowerCase().includes('unauthorized')) {
        return 'API/Token ไม่ถูกต้องหรือหมดอายุ กรุณาสร้าง Token ใหม่แล้ววางอีกครั้ง';
    }
    if (message.includes('403') || message.toLowerCase().includes('forbidden')) {
        return 'API มีอยู่แต่ยังไม่มีสิทธิ์ใช้บริการนี้ กรุณาเปิดสิทธิ์ของผู้ให้บริการ หรือใช้ API เจ้าอื่น';
    }
    if (message.includes('sufficient permissions') || message.toLowerCase().includes('permission')) {
        return 'Token ยังไม่มีสิทธิ์เรียกบริการสร้างงาน กรุณาสร้าง Token ใหม่และเปิดสิทธิ์ Inference/Read แล้วนำมาวางอีกครั้ง';
    }
    if (message.includes('402') || message.toLowerCase().includes('payment')) {
        return 'บัญชี API ต้องเปิดเครดิตหรือโควตาสำหรับบริการนี้ ฟรีโควตาอาจหมดแล้ว';
    }
    if (message.includes('429') || message.toLowerCase().includes('rate limit') || message.toLowerCase().includes('quota')) {
        return 'API ใช้เกินโควตาหรือโดนจำกัดความถี่ กรุณารอสักครู่ เปลี่ยนโมเดล หรือใช้ API เจ้าอื่น';
    }
    if (message.includes('503') || message.toLowerCase().includes('loading')) {
        return 'โมเดลกำลังโหลดหรือไม่พร้อมใช้งาน กรุณารอสักครู่แล้วลองใหม่';
    }
    return message || 'เกิดข้อผิดพลาดไม่ทราบสาเหตุ';
}
