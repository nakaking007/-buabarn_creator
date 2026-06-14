(function () {
    const STORE_KEY = 'buabarn_license_state';
    const config = window.BUABARN_LICENSE_CONFIG || {};

    document.addEventListener('DOMContentLoaded', () => {
        if (!config.enabled) {
            renderLicenseNotice();
            return;
        }

        const state = loadState();
        if (isStateValid(state)) {
            renderLicenseBadge(state);
            return;
        }

        lockApp();
    });

    function renderLicenseNotice() {
        const notice = document.createElement('div');
        notice.className = 'license-mini-notice';
        notice.textContent = 'ระบบสิทธิ์เตรียมพร้อมแล้ว: ยังไม่ได้เปิดบังคับตรวจ License';
        document.body.appendChild(notice);
    }

    function renderLicenseBadge(state) {
        const badge = document.createElement('div');
        badge.className = 'license-mini-notice active';
        const expiry = state.plan === 'lifetime' ? 'ตลอดชีพ' : `หมดอายุ ${formatThaiDate(state.expiresAt)}`;
        badge.textContent = `สิทธิ์ใช้งาน: ${state.planLabel || state.plan} • ${expiry}`;
        document.body.appendChild(badge);
    }

    function lockApp() {
        document.body.classList.add('license-locked');
        const overlay = document.createElement('div');
        overlay.className = 'license-overlay';
        overlay.innerHTML = `
            <div class="license-card">
                <div class="license-icon">VIP</div>
                <h1>ตรวจสิทธิ์การใช้งาน</h1>
                <p>กรอก License Key เพื่อเข้าใช้ระบบ ${escapeHtml(config.appName || 'Buabarn VIP')}</p>
                <input id="license-key-input" type="text" placeholder="วาง License Key">
                <button id="license-check-btn" type="button">เข้าสู่ระบบ</button>
                <div id="license-message" class="license-message"></div>
                <div class="license-pricing">
                    <div><span>รายเดือน</span><strong>${escapeHtml(config.plans?.monthly?.price || '399 บาท')}</strong></div>
                    <div><span>ตลอดชีพ</span><strong>${escapeHtml(config.plans?.lifetime?.price || '1,999 บาท')}</strong></div>
                </div>
                <p class="license-contact">
                    ติดต่อ ${escapeHtml(config.contactName || 'ดร.เขมวันต์')}<br>
                    กรุณาส่งสลิปการโอนมาที่<br>
                    ID Line: ${escapeHtml(config.lineId || 'charnb015')}<br>
                    e-mail: ${escapeHtml(config.email || 'charnb020@gmail.com')}
                </p>
            </div>
        `;
        document.body.appendChild(overlay);
        document.getElementById('license-check-btn').addEventListener('click', validateLicense);
        document.getElementById('license-key-input').addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                validateLicense();
            }
        });
    }

    async function validateLicense() {
        const input = document.getElementById('license-key-input');
        const message = document.getElementById('license-message');
        const key = input.value.trim();
        if (!key) {
            message.textContent = 'กรุณากรอก License Key';
            return;
        }
        if (!config.validationUrl) {
            message.textContent = 'ยังไม่ได้ตั้งค่า validationUrl สำหรับตรวจสิทธิ์จริง';
            return;
        }
        message.textContent = 'กำลังตรวจสิทธิ์...';
        try {
            const url = `${config.validationUrl}${config.validationUrl.includes('?') ? '&' : '?'}key=${encodeURIComponent(key)}`;
            const response = await fetch(url, { method: 'GET' });
            const data = await response.json();
            if (!data.valid) {
                message.textContent = data.message || 'License ไม่ถูกต้อง หรือหมดอายุแล้ว';
                return;
            }
            const state = normalizeLicenseState(key, data);
            localStorage.setItem(STORE_KEY, JSON.stringify(state));
            location.reload();
        } catch (error) {
            message.textContent = 'ตรวจสิทธิ์ไม่สำเร็จ กรุณาตรวจอินเทอร์เน็ตหรือระบบฐานข้อมูล';
        }
    }

    function normalizeLicenseState(key, data) {
        return {
            key,
            plan: data.plan || 'monthly',
            planLabel: data.planLabel || (data.plan === 'lifetime' ? 'ตลอดชีพ' : 'รายเดือน'),
            customerName: data.customerName || '',
            expiresAt: data.expiresAt || null,
            checkedAt: new Date().toISOString()
        };
    }

    function loadState() {
        try {
            return JSON.parse(localStorage.getItem(STORE_KEY) || 'null');
        } catch (error) {
            return null;
        }
    }

    function isStateValid(state) {
        if (!state?.key) {
            return false;
        }
        if (state.plan === 'lifetime') {
            return true;
        }
        if (!state.expiresAt) {
            return false;
        }
        return new Date(state.expiresAt).getTime() > Date.now();
    }

    function formatThaiDate(value) {
        if (!value) {
            return '-';
        }
        return new Date(value).toLocaleDateString('th-TH', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    function escapeHtml(value) {
        return String(value || '').replace(/[&<>"']/g, (char) => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        }[char]));
    }
})();
