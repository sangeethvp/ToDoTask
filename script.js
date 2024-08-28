
let entries = JSON.parse(localStorage.getItem('entries')) || [];

function updateTotals() {
    let totalIncome = entries.filter(e => e.type === 'income').reduce((sum, entry) => sum + entry.amount, 0);
    let totalExpenses = entries.filter(e => e.type === 'expense').reduce((sum, entry) => sum + entry.amount, 0);
    let netBalance = totalIncome - totalExpenses;

    document.getElementById('total-income').textContent = totalIncome;
    document.getElementById('total-expenses').textContent = totalExpenses;
    document.getElementById('net-balance').textContent = netBalance;
}

function displayEntries(filter = 'all') {
    let entriesList = document.getElementById('entries');
    entriesList.innerHTML = '';

    let filteredEntries = entries.filter(e => filter === 'all' || e.type === filter);

    filteredEntries.forEach((entry, index) => {
        let li = document.createElement('li');
        li.className = entry.type;
        li.innerHTML = `${entry.description}: ${entry.amount} 
            <button onclick="editEntry(${index})">Edit</button>
            <button onclick="deleteEntry(${index})">Delete</button>;`
        entriesList.appendChild(li);
    });
}

function addEntry() {
    let description = document.getElementById('description').value;
    let amount = parseFloat(document.getElementById('amount').value);
    let type = document.getElementById('type').value;

    if (description && amount) {
        entries.push({ description, amount, type });
        localStorage.setItem('entries', JSON.stringify(entries));
        updateTotals();
        displayEntries();
    }
}

function deleteEntry(index) {
    entries.splice(index, 1);
    localStorage.setItem('entries', JSON.stringify(entries));
    updateTotals();
    displayEntries();
}

function editEntry(index) {
    let entry = entries[index];
    document.getElementById('description').value = entry.description;
    document.getElementById('amount').value = entry.amount;
    document.getElementById('type').value = entry.type;
    deleteEntry(index);
}

function filterEntries() {
    let filter = document.querySelector('input[name="filter"]:checked').value;
    displayEntries(filter);
}

document.addEventListener('DOMContentLoaded', () => {
    updateTotals();
    displayEntries();
});