const saveLimit = document.getElementById('saveLimit');
const resetSpend = document.getElementById('resetSpend');
const limit = document.getElementById('limit');

saveLimit.addEventListener('click', () => {
  let limitValue = document.getElementById('limit').value;

  if (limitValue) {
    chrome.storage.sync.set({
      limit: parseInt(limitValue)
    });
  }
});

resetSpend.addEventListener('click', () => {
  chrome.storage.sync.set({
    total: 0
  });
});

chrome.storage.sync.get('limit', function (budget) {
  if (budget.limit) {
    limit.value = budget.limit;
  }
});
