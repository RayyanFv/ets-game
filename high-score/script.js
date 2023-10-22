document.addEventListener('DOMContentLoaded', function() {
    const highscoreList = document.getElementById('highscoreList');

    function fetchHighscores() {
        fetch('https://ets-pemrograman-web-f.cyclic.app/scores/score', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            displayHighscores(data.data); // Mengambil data dari respon
        })
        .catch(error => console.error('Error:', error));
    }

    function displayHighscores(highscores) {
        highscoreList.innerHTML = ''; // Clear sebelum menampilkan

        highscores.forEach(score => {
            const highscoreItem = document.createElement('div');
            highscoreItem.classList.add('highscore-item');
            highscoreItem.textContent = `${score.nama}: ${score.score}`;
            highscoreList.appendChild(highscoreItem);
        });
    }

    fetchHighscores(); // Panggil fungsi untuk mengambil highscores
});
