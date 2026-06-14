const StorageVault = {
    saveJob(data) {
        if (typeof chrome === 'undefined' || !chrome.storage?.local) {
            const history = JSON.parse(localStorage.getItem('history') || '[]');
            history.unshift(data);
            localStorage.setItem('history', JSON.stringify(history.slice(0, 10)));
            return;
        }
        chrome.storage.local.get(['history'], (result) => {
            const history = result.history || [];
            history.unshift(data);
            chrome.storage.local.set({ history: history.slice(0, 10) });
        });
    }
};
