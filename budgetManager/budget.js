const spendAmount = document.getElementById('spendAmount');
const limit = document.getElementById('limit');

spendAmount.addEventListener('click', () => {
  chrome.storage.sync.get('total', function (budget) {
    let newTotal = 0;
    if (budget.total) {
      newTotal += parseInt(budget.total);
    }

    let amount = document.getElementById('amount').value;

    if (amount) {
      newTotal += parseInt(amount);
    }

    chrome.storage.sync.set({
      total: newTotal
    });

    document.getElementById('total').innerText = newTotal;
    amount = '';
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
