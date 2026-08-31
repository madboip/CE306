const totalIncomeEl = document.getElementById('total-income');
const totalExpenseEl = document.getElementById('total-expense');
const netBalanceEl = document.getElementById('net-balance');
const list = document.getElementById('list');
const form = document.querySelector('.form-control');
const textInput = document.getElementById('text');
const amountInput = document.getElementById('amount');
const typeInput = document.getElementById('type');
const categoryInput = document.getElementById('category');
const searchInput = document.getElementById('search');
const btnAdd = document.getElementById('btn-add');
const btnClear = document.getElementById('btn-clear');

let transactions = [];
let currentId = 1;

// Add new transaction
btnAdd.addEventListener('click', () => {
    if (textInput.value.trim() === '' || amountInput.value.trim() === '' || categoryInput.value === '') {
        alert('กรุณากรอกข้อมูลให้ครบทุกช่อง');
        return;
    }

    const transaction = {
        id: currentId++,
        text: textInput.value,
        amount: parseFloat(amountInput.value),
        type: typeInput.value,
        category: categoryInput.value
    };

    transactions.push(transaction);
    updateUI();

    textInput.value = '';
    amountInput.value = '';
    categoryInput.value = '';
});

// Task 2: Search Input Real-time Filtering
searchInput.addEventListener('input', (e) => {
    const searchText = e.target.value.toLowerCase();
    updateUI(searchText);
});

// Task 5: Clear History Button with confirm()
btnClear.addEventListener('click', () => {
    if (confirm('คุณต้องการล้างข้อมูลทั้งหมดในตารางใช่หรือไม่?')) {
        transactions = [];
        currentId = 1;
        updateUI();
    }
});

// Update the DOM
function updateUI(filterText = '') {
    list.innerHTML = '';

    // Filter transactions if search text exists
    const filteredTransactions = transactions.filter(t => 
        t.text.toLowerCase().includes(filterText)
    );

    // Task 3: Render history list
    filteredTransactions.forEach(t => {
        const li = document.createElement('li');
        li.classList.add(t.type);
        
        const typeLabel = t.type === 'income' ? 'รายรับ' : 'รายจ่าย';
        const sign = t.type === 'income' ? '+' : '-';

        li.innerHTML = `
            <div class="item-details">
                <strong>${t.text}</strong>
                <span class="item-meta">ID: ${t.id} | ${typeLabel} | หมวดหมู่: ${t.category}</span>
            </div>
            <span>${sign}฿${t.amount.toFixed(2)}</span>
        `;
        list.appendChild(li);
    });

    updateSummary();
}

// Task 4: Calculate and update totals
function updateSummary() {
    const amounts = transactions.map(t => ({
        amount: t.amount,
        type: t.type
    }));

    const totalIncome = amounts
        .filter(item => item.type === 'income')
        .reduce((acc, item) => (acc += item.amount), 0);

    const totalExpense = amounts
        .filter(item => item.type === 'expense')
        .reduce((acc, item) => (acc += item.amount), 0);

    const netBalance = totalIncome - totalExpense;

    totalIncomeEl.innerText = `฿${totalIncome.toFixed(2)}`;
    totalExpenseEl.innerText = `฿${totalExpense.toFixed(2)}`;
    netBalanceEl.innerText = `฿${netBalance.toFixed(2)}`;
}

// Initial Call
updateUI();