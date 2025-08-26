const spendAmount = document.getElementById('spendAmount');
const limit = document.getElementById('limit');

spendAmount.addEventListener('click', () => {
  chrome.storage.sync.get(['total', 'limit'], function (budget) {
    let currentTotal = budget.total ? parseInt(budget.total) : 0;
    let amount = parseInt(document.getElementById('amount').value) || 0;
    let newTotal = currentTotal + amount;

    if (amount && budget.limit && newTotal > budget.limit) {
      const notifOptions = {
        type: 'basic',
        title: 'Limit Exceeded!',
        message: `Cannot add $${amount}. It would exceed your limit of $${budget.limit}. Current total: $${currentTotal}`,
        requireInteraction: true
      };

      chrome.notifications.create(
        'limitNotif',
        notifOptions,
        (notificationId) => {
          if (chrome.runtime.lastError) {
            console.error('Notification error:', chrome.runtime.lastError);
            alert(
              `Limit Exceeded! Cannot add $${amount}. Would exceed limit of $${budget.limit}`
            );
          }
        }
      );

      document.getElementById('amount').value = '';
      return;
    }

    chrome.storage.sync.set({ total: newTotal }, () => {
      document.getElementById('total').innerText = newTotal;
      document.getElementById('amount').value = '';

      if (budget.limit && newTotal >= budget.limit * 0.9) {
        const notifOptions = {
          type: 'basic',
          title: 'Approaching Limit!',
          message: `You're getting close to your limit! Spent: $${newTotal} / Limit: $${budget.limit}`,
          requireInteraction: true
        };

        chrome.notifications.create(
          'warningNotif',
          notifOptions,
          (notificationId) => {
            if (chrome.runtime.lastError) {
              alert(
                `Warning: You're getting close to your limit! Spent: $${newTotal} / Limit: $${budget.limit}`
              );
            }
          }
        );
      }
    });
  });
});

function loading() {
  chrome.storage.sync.get(['total', 'limit'], function (budget) {
    if (budget.total) {
      const total = document.getElementById('total');
      total.innerText = budget.total;
    }

    if (budget.limit) {
      limit.textContent = budget.limit;
    }
  });
}

loading();
