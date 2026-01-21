document.getElementById('name-form').addEventListener('submit', function(e) {
    e.preventDefault(); 

    const formData = new URLSearchParams(new FormData(this));

    fetch('/name-form', {
        method: 'POST',
        body: formData,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById('reponse').textContent = `${data}`;
    });
});
