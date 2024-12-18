let workbook;

// Load the Excel file from the same directory as the HTML file
fetch('Testsheet.xlsx')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.arrayBuffer();
    })
    .then(data => {
        workbook = XLSX.read(new Uint8Array(data), { type: 'array' });
        console.log('Excel file loaded successfully');
    })
    .catch(error => console.error('Error loading the Excel file:', error));

function readExcel() {
    const code = document.getElementById('codeInput').value.trim();
    if (!workbook) {
        alert('Excel file not loaded yet.');
        return;
    }

    console.log('Entered code:', code);

    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    console.log('Sheet data:', jsonData);

    const headers = jsonData[0];
    const dataRows = jsonData.slice(1);

    const result = dataRows.find(row => row[0].toString().trim() === code);
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
