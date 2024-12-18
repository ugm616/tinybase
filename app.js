let workbook;

// Load the Excel file from the same directory as the HTML file
fetch('Testsheet.xlsx')
    .then(response => response.arrayBuffer())
    .then(data => {
        workbook = XLSX.read(new Uint8Array(data), { type: 'array' });
    })
    .catch(error => console.error('Error loading the Excel file:', error));

function readExcel() {
    const code = document.getElementById('codeInput').value;
    if (!workbook) {
        alert('Excel file not loaded yet.');
        return;
    }

    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    const headers = jsonData[0];
    const dataRows = jsonData.slice(1);

    const result = dataRows.find(row => row[0] === code);
    if (result) {
        displayResult(headers, result);
    } else {
        document.getElementById('output').innerHTML = 'No data found for the entered code.';
    }
}

function displayResult(headers, data) {
    let html = '<table>';
    html += '<tr>';
    headers.forEach(header => {
        html += `<th>${header}</th>`;
    });
    html += '</tr>';
    html += '<tr>';
    data.forEach(cell => {
        html += `<td>${cell}</td>`;
    });
    html += '</tr>';
    html += '</table>';

    document.getElementById('output').innerHTML = html;
}
