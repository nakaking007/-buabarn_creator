const AI_CONFIG_KEY = 'buabarn_ai_config';
const IMAGE_CONFIG_KEY = 'buabarn_image_config';
const VIDEO_CONFIG_KEY = 'buabarn_video_config';

const AIBridge = {
    async loadConfig() {
        if (!hasChromeStorage()) {
            return loadLocalConfig(AI_CONFIG_KEY, {
                enabled: false,
                provider: 'openrouter',
                apiKey: '',
                model: '',
                endpoint: ''
            });
        }
        const result = await chrome.storage.local.get([AI_CONFIG_KEY]);
        return result[AI_CONFIG_KEY] || {
            enabled: false,
            provider: 'openrouter',
            apiKey: '',
            model: '',
            endpoint: ''
        };
    },

    async saveConfig(config) {
        if (!hasChromeStorage()) {
            saveLocalConfig(AI_CONFIG_KEY, config);
            return;
        }
        await chrome.storage.local.set({ [AI_CONFIG_KEY]: config });
    },

    async loadImageConfig() {
        if (!hasChromeStorage()) {
            return loadLocalConfig(IMAGE_CONFIG_KEY, {
                enabled: false,
                apiKey: '',
                model: 'black-forest-labs/FLUX.1-schnell'
            });
        }
        const result = await chrome.storage.local.get([IMAGE_CONFIG_KEY]);
        return result[IMAGE_CONFIG_KEY] || {
            enabled: false,
            apiKey: '',
            model: 'black-forest-labs/FLUX.1-schnell'
        };
    },

    async saveImageConfig(config) {
        if (!hasChromeStorage()) {
            saveLocalConfig(IMAGE_CONFIG_KEY, config);
            return;
        }
        await chrome.storage.local.set({ [IMAGE_CONFIG_KEY]: config });
    },

    async loadVideoConfig() {
        if (!hasChromeStorage()) {
            return loadLocalConfig(VIDEO_CONFIG_KEY, {
                enabled: false,
                apiKey: '',
                model: 'Wan-AI/Wan2.2-TI2V-5B'
            });
        }
        const result = await chrome.storage.local.get([VIDEO_CONFIG_KEY]);
        return result[VIDEO_CONFIG_KEY] || {
            enabled: false,
            apiKey: '',
            model: 'Wan-AI/Wan2.2-TI2V-5B'
        };
    },

    async saveVideoConfig(config) {
        if (!hasChromeStorage()) {
            saveLocalConfig(VIDEO_CONFIG_KEY, config);
            return;
        }
        await chrome.storage.local.set({ [VIDEO_CONFIG_KEY]: config });
    },

    async generate({ config, instruction, context }) {
        if (!config.apiKey) {
            return {
                source: 'local-orchestrator',
                text: '',
                note: 'ยังไม่ได้เปิดการเชื่อมต่อ AI ระบบจึงใช้ชิ้นงานสำเร็จรูปจากเครื่องแทน'
            };
        }

        if (config.provider === 'gemini') {
            return this.generateWithGemini(config, instruction, context);
        }

        if (config.provider === 'claude') {
            return this.generateWithClaude(config, instruction, context);
        }

        return this.generateWithOpenAI(config, instruction, context);
    },

    async generateWithOpenAI(config, instruction, context) {
        const endpoint = getOpenAiEndpoint(config);
        const modelCandidates = getOpenAiModelCandidates(config);
        const apiKey = cleanHeaderValue(config.apiKey);
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        };
        if (config.provider === 'openrouter') {
            headers['HTTP-Referer'] = 'https://buabarn.vip';
            headers['X-Title'] = 'Buabarn VIP Creater Tools';
        }
        const errors = [];
        for (const model of modelCandidates) {
            try {
                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers,
                    body: JSON.stringify({
                        model,
                        messages: [
                            { role: 'system', content: context.system },
                            { role: 'user', content: instruction }
                        ],
                        temperature: 0.8
                    })
                });
                const data = await parseAiResponse(response);
                return {
                    source: model,
                    text: data.choices?.[0]?.message?.content || JSON.stringify(data, null, 2)
                };
            } catch (error) {
                errors.push(`${model}: ${error.message}`);
            }
        }
        throw new Error(errors.join('\n'));
    },

    async generateWithGemini(config, instruction, context) {
        const model = config.model || 'gemini-1.5-flash';
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(config.apiKey)}`;
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: `${context.system}\n\n${instruction}` }]
                }]
            })
        });
        const data = await parseAiResponse(response);
        return {
            source: model,
            text: data.candidates?.[0]?.content?.parts?.map((part) => part.text).join('\n') || JSON.stringify(data, null, 2)
        };
    },

    async generateWithClaude(config, instruction, context) {
        const model = config.model || 'claude-3-5-sonnet-latest';
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': config.apiKey,
                'anthropic-version': '2023-06-01',
                'anthropic-dangerous-direct-browser-access': 'true'
            },
            body: JSON.stringify({
                model,
                max_tokens: 1800,
                system: context.system,
                messages: [{ role: 'user', content: instruction }]
            })
        });
        const data = await parseAiResponse(response);
        return {
            source: model,
            text: data.content?.map((part) => part.text).join('\n') || JSON.stringify(data, null, 2)
        };
    },

    async generateImage({ config, prompt }) {
        if (!config.enabled || !config.apiKey) {
            return null;
        }

        const modelCandidates = getMediaModelCandidates(config.model, [
            'black-forest-labs/FLUX.1-schnell',
            'stabilityai/stable-diffusion-xl-base-1.0'
        ]);
        const apiKey = cleanHeaderValue(config.apiKey);
        const payload = {
            inputs: prompt,
            parameters: {
                guidance_scale: 0,
                num_inference_steps: 4
            }
        };
        const errors = [];
        for (const model of modelCandidates) {
            try {
                const response = await fetchHuggingFaceModel({
                    model,
                    apiKey,
                    accept: 'image/png',
                    payload
                });
                const blob = await response.blob();
                return {
                    source: model,
                    blob,
                    url: URL.createObjectURL(blob)
                };
            } catch (error) {
                errors.push(`${model}: ${error.message}`);
            }
        }
        throw new Error(errors.join('\n'));
    },

    async generateVideo({ config, prompt }) {
        if (!config.enabled || !config.apiKey) {
            return null;
        }

        const modelCandidates = getMediaModelCandidates(config.model, [
            'Wan-AI/Wan2.2-TI2V-5B',
            'Wan-AI/Wan2.1-T2V-1.3B'
        ]);
        const apiKey = cleanHeaderValue(config.apiKey);
        const payload = {
            inputs: prompt,
            parameters: {
                num_frames: 16,
                num_inference_steps: 4
            }
        };
        const errors = [];
        for (const model of modelCandidates) {
            try {
                const response = await fetchHuggingFaceModel({
                    model,
                    apiKey,
                    accept: 'video/mp4',
                    payload
                });
                const blob = await response.blob();
                return {
                    source: model,
                    blob,
                    url: URL.createObjectURL(blob)
                };
            } catch (error) {
                errors.push(`${model}: ${error.message}`);
            }
        }
        throw new Error(errors.join('\n'));
    }
};

function getOpenAiEndpoint(config) {
    if (config.provider === 'openrouter') {
        return 'https://openrouter.ai/api/v1/chat/completions';
    }

    if (config.provider === 'groq') {
        return 'https://api.groq.com/openai/v1/chat/completions';
    }

    if (config.provider === 'openai-compatible' && config.endpoint) {
        return config.endpoint;
    }

    return 'https://api.openai.com/v1/chat/completions';
}

function getOpenAiModel(config) {
    if (config.model) {
        return config.model;
    }

    if (config.provider === 'openrouter') {
        return 'google/gemini-2.5-flash-lite';
    }

    if (config.provider === 'groq') {
        return 'llama-3.3-70b-versatile';
    }

    return 'gpt-4.1-mini';
}

function getOpenAiModelCandidates(config) {
    if (config.model) {
        return [config.model];
    }

    if (config.provider === 'openrouter') {
        return [
            'openrouter/free',
            'deepseek/deepseek-r1:free',
            'google/gemini-2.0-flash-exp:free'
        ];
    }

    if (config.provider === 'groq') {
        return [
            'llama-3.3-70b-versatile',
            'llama-3.1-8b-instant'
        ];
    }

    return [getOpenAiModel(config)];
}

function getMediaModelCandidates(model, defaults) {
    if (!model) {
        return defaults;
    }
    const manual = String(model)
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);
    return [...new Set([...manual, ...defaults])];
}

async function parseAiResponse(response) {
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
        const message = data.error?.message || data.error || response.statusText;
        throw new Error(`${response.status} ${typeof message === 'string' ? message : JSON.stringify(message)}`);
    }
    return data;
}

function encodeHuggingFaceModel(model) {
    return String(model)
        .split('/')
        .map((part) => encodeURIComponent(part))
        .join('/');
}

async function fetchHuggingFaceModel({ model, apiKey, accept, payload }) {
    const modelPath = encodeHuggingFaceModel(model);
    const isVideo = accept.includes('video');
    const endpoints = isVideo
        ? [
            `https://router.huggingface.co/fal-ai/models/${modelPath}`,
            `https://router.huggingface.co/replicate/models/${modelPath}`,
            `https://router.huggingface.co/hf-inference/models/${modelPath}`,
            `https://api-inference.huggingface.co/models/${modelPath}`
        ]
        : [
            `https://router.huggingface.co/hf-inference/models/${modelPath}`,
            `https://api-inference.huggingface.co/models/${modelPath}`
        ];
    const errors = [];
    for (const endpoint of endpoints) {
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                    'Accept': accept
                },
                body: JSON.stringify(payload)
            });
            if (response.ok) {
                return response;
            }
            const text = await response.text();
            errors.push(`${endpoint}: ${response.status} ${text || response.statusText}`);
        } catch (error) {
            errors.push(`${endpoint}: ${error.message}${error.cause?.message ? ` (${error.cause.message})` : ''}`);
        }
    }
    throw new Error(errors.join('\n'));
}

function cleanHeaderValue(value) {
    const cleaned = String(value || '')
        .trim()
        .replace(/^Bearer\s+/i, '')
        .replace(/[^\x20-\x7E]/g, '')
        .trim();
    if (!cleaned) {
        throw new Error('Token/API Key ไม่ถูกต้อง กรุณาวางเฉพาะคีย์ภาษาอังกฤษ ไม่มีข้อความไทย ไม่มีช่องว่าง และไม่มีบรรทัดใหม่');
    }
    return cleaned;
}

function hasChromeStorage() {
    return typeof chrome !== 'undefined' && chrome.storage?.local;
}

function loadLocalConfig(key, fallback) {
    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
    } catch (error) {
        return fallback;
    }
}

function saveLocalConfig(key, config) {
    localStorage.setItem(key, JSON.stringify(config));
}
