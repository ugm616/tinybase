let jsonData;

// Load the JSON file from the same directory as the HTML file
fetch('data.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        jsonData = data;
        console.log('JSON file loaded successfully');
    })
    .catch(error => console.error('Error loading the JSON file:', error));

function readData() {
    const code = document.getElementById('codeInput').value.trim();
    if (!jsonData) {
        alert('JSON file not loaded yet.');
        return;
    }

    console.log('Entered code:', code);
    console.log('JSON data:', jsonData);

    const headers = Object.keys(jsonData[0]);
    const result = jsonData.find(row => row.code === code);

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
    headers.forEach(header => {
        html += `<td>${data[header]}</td>`;
    });
    html += '</tr>';
    html += '</table>';

    document.getElementById('output').innerHTML = html;
}
