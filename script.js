function login() {
    console.log('Login button pressed');
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('https://ets-pemrograman-web-f.cyclic.app/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password }),
        redirect: 'follow'
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            // untuk menyimpan token
            const accessToken = data.data.access_token;
            sessionStorage.setItem('token', accessToken);

            console.log('Redirecting to game page'); // Tambahkan pesan log
            console.log(data);
            window.location.href = './game-page/index.html';
            
        } else {
            console.log(data);
            alert(data.error);
        }
    })
    .catch(error => console.error('Error:', error));
}
