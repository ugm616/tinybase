document.getElementById('inputFile').addEventListener('change', handleFile, false);

let workbook;

function handleFile(e) {
    const files = e.target.files;
    const reader = new FileReader();
    reader.onload = function(event) {
        const data = new Uint8Array(event.target.result);
        workbook = XLSX.read(data, { type: 'array' });
    };
    reader.readAsArrayBuffer(files[0]);
}

function readExcel() {
    const code = document.getElementById('codeInput').value;
    if (!workbook) {
        alert('Please upload an Excel file first.');
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
