document.getElementById('calculate').addEventListener('click', () => {
    // Get input values
    const startDate = new Date(document.getElementById('start-date').value);
    const endDate = new Date(document.getElementById('end-date').value);
    const daysToAdd = parseInt(document.getElementById('days-to-add').value) || 0;
    const daysToSubtract = parseInt(document.getElementById('days-to-subtract').value) || 0;

    if (!startDate || !endDate || isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        alert('Please enter valid dates.');
        return;
    }

    // Calculate number of days between dates, including the end date
    const countDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

    // Add and subtract days
    const newDateAfterAdd = new Date(startDate);
    newDateAfterAdd.setDate(startDate.getDate() + daysToAdd);
    
    const newDateAfterSubtract = new Date(startDate);
    newDateAfterSubtract.setDate(startDate.getDate() - daysToSubtract);

    // Calculate duration
    const duration = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

    // Update results
    document.getElementById('count-days').textContent = `Count Days (including end date): ${countDays}`;
    document.getElementById('add-days').textContent = `Date After Adding Days: ${newDateAfterAdd.toDateString()}`;
    document.getElementById('subtract-days').textContent = `Date After Subtracting Days: ${newDateAfterSubtract.toDateString()}`;
    document.getElementById('duration').textContent = `Duration (in days): ${duration}`;
});
