function register() {
    const nama = document.getElementById('nama').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('https://ets-pemrograman-web-f.cyclic.app/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nama, email, password })
    })
    .then(response => response.json())
    .then(data => {
        // console.log(data);
        if (data.status === 'success') {
            alert(data.message);
            window.location.href = '../index.html'; // Ganti dengan halaman login Anda
        } else {
            alert(data.error);
        }
    })
    .catch(error => console.error('Error:', error));
}
