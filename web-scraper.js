const WebScraper = {
    async scrapeCurrentTab() {
        if (typeof chrome === 'undefined' || !chrome.tabs || !chrome.scripting) {
            return {
                title: '',
                description: '',
                ok: false,
                message: 'โหมดเว็บตัวอย่างไม่สามารถอ่านแท็บเว็บอื่นได้ กรุณาพิมพ์ไอเดียเอง หรือใช้งานแบบ Chrome Extension'
            };
        }
        try {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            const result = await chrome.scripting.executeScript({
                target: { tabId: tab.id },
                func: () => ({
                    title: document.title || '',
                    description: document.querySelector('meta[name="description"]')?.content || ''
                })
            });
            const page = result[0]?.result || {};
            const title = String(page.title || '').trim();
            const description = String(page.description || '').trim();
            if (!title && !description) {
                throw new Error('ไม่พบข้อมูลที่ดึงได้จากหน้านี้');
            }
            return { title, description, ok: true };
        } catch (error) {
            return {
                title: '',
                description: '',
                ok: false,
                message: 'ไม่สามารถดึงข้อมูลได้ในหน้านี้ กรุณาพิมพ์ไอเดียเอง หรือเปิดเว็บที่อนุญาตให้ส่วนขยายอ่านข้อมูล'
            };
        }
    }
};
