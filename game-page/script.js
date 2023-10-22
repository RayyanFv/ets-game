// deklarasi global variable
let game, orang, nyawa, infoNyawa, totalNyawa = 3, framehukum, hukum = false, durasi = 500,
  timerBikinhukum = false, timerCollision = false, papanNilai, nilai, strNilai = 0, info,
  namaGame, instruksi, strNamaGame = 'KORUPTOR KABUR', strInstruksi = 'Bantu KORUPTOR ini untuk melarikan diri dari jeratan hukum TEKAN (space) untuk mulai dan lompat, tekan (p) untuk pause';

let aturOrang = { 'lebar': 50, 'tinggi': 80 };

function range(min, max) {
  durasi = Math.floor(Math.random() * (max - min + 1) + min);
  return durasi;
}

function hukumSudahAda() {
  if (hukum !== false) {
    return true;
  }
  return false;
}

function pause() {
  game.addClass('pause');
  orang.addClass('pause');
  tampilkanInfo();
  if (hukumSudahAda()) {
    hukum.addClass('pause');
    window.clearTimeout(timerBikinhukum);
    window.clearTimeout(timerCollision);
  }
}

function jalan() {
  intervalhukum();
  game.removeClass('pause');
  orang.removeClass('pause');
 
  if (hukumSudahAda()) {
    hukum.removeClass('pause');
  }
 
  setTimeout(collisionhukum, 1000);
}

function hapushukum() {
  
  hukum.on("animationend", function () {
    $(this).remove();
  });
}

function lompat() {
  orang.addClass('lompat');
 
  orang.on("animationend", function () {
    $(this).removeClass("lompat");
  });
}

function tampilkanNyawa() {
  return infoNyawa.animate({ 'top': '10' }, 1000).promise();
}

function tampilkanInfo() {
  return info.animate({ 'top': '25' }, 1000).promise();
}

function hilangkanInfo() {
  return info.animate({ 'top': '-150' }, 1000).promise();
}

function tampilkanPapanNilai() {
  nilai.show();
  return papanNilai.animate({ 'top': '100' }, 700).promise();
}

function mati() {
	totalNyawa -= 1;
	$('#infoNyawa :last-child').remove();
	game.addClass('pause');
	orang.addClass('mati');
  
	if (totalNyawa == 0) {
    tampilkanInfo();
	  game.addClass('reset');
	  
	  info.append('<h3 class="gameOver">YAHH KAMU GAGAL <br> MELINDUNGI KORUPTOR DARI JERATAN HUKUM</h3>');
	} else {
	  game.addClass('lanjutMain');
	}
  
	updateHighestScore(); // Tambahkan ini
  }
  


function lanjutMain() {
  game.removeClass('lanjutMain');
  game.removeClass('pause');
  orang.removeClass('mati');
  $('.belumLewat').addClass('tantangan');
}

function reset() {
  // info.hide();
  // window.clearTimeout(timerBikinhukum);
  // window.clearTimeout(timerCollision);
  // orang.removeClass('mati');
  // framehukum.html(''); //hapus semua hukum
  // strNilai = 0;
  // nilai.text(strNilai);
  location.reload();
}

function collisionhukum() {
  timerCollision = setTimeout(function () {
    hukum.each(function (index, obj) {
    
      let posOrang = {
        'lebar': orang.width(),
        'tinggi': orang.height(),
        'x': orang.offset().left,
        'y': orang.offset().top
      };
     
      let poshukum = {
        'lebar': $(this).width(),
        'tinggi': $(this).height(),
        'x': $(this).offset().left,
        'y': $(this).offset().top
      };
     
      let lebarOrang = posOrang.x + posOrang.lebar - aturOrang.lebar;
      let lebarhukum = poshukum.x + poshukum.lebar;
      let tinggiOrang = posOrang.y + posOrang.tinggi - aturOrang.tinggi;
      let tinggihukum = poshukum.y + poshukum.tinggi;

      if (lebarOrang >= poshukum.x && posOrang.x <= lebarhukum && tinggiOrang >= poshukum.y) {
        if ($(this).hasClass('tantangan')) {
          mati();
        }
        $(this).removeClass('belumLewat');
        $(this).removeClass('tantangan');
      }
      else if (posOrang.x > lebarhukum) {
        if ($(this).hasClass('tantangan')) {
          $(this).removeClass('tantangan');
          $(this).removeClass('belumLewat');
         
          strNilai = strNilai + 1;
          nilai.text(strNilai);
          hapushukum();
        }
      }
    });

    collisionhukum();
  }, 1);
}

function bikinhukum() {
 
  framehukum.prepend('<div class="hukum">');

  hukum = $('.hukum');

  let jenishukum = range(1, 3);
  let pilihhukum = 'hukum' + jenishukum;
  hukum.first().addClass(pilihhukum + ' tantangan belumLewat');
  hukum.first().css({ 'animation': 'maju 18s forwards,  ' + pilihhukum + ' .3s steps(3) infinite' });
}

function intervalhukum() {
  timerBikinhukum = setTimeout(function () {
  
    bikinhukum();
    
    window.clearTimeout(timerBikinhukum);
    
    durasi = range(3000, 5000);
    intervalhukum();
  }, durasi);
}

function kontrol() {
  $(document).on('keydown', function (e) {
   
    if (e.keyCode == 32) {
      if (game.hasClass('start')) {
      
        jalan();
        hilangkanInfo().then(function () {
          tampilkanPapanNilai();
          tampilkanNyawa();
        });
        
        game.removeClass('start');
      }
      else if (game.hasClass('lanjutMain')) {
        lanjutMain();
      }
      else if (game.hasClass('reset')) {
        reset();
        jalan();
      }
      else if (orang.hasClass('pause')) {
        hilangkanInfo();
        jalan();
      } else {
      
        lompat();
      }
    } else if (e.keyCode == 80) {
   
      pause();
    }
  });
}

function updateHighestScore() {
	const highestScore = localStorage.getItem('highestScore');
  
	if (highestScore === null || strNilai > highestScore) {
	  localStorage.setItem('highestScore', strNilai);
	  tampilkanHighestScore(); // Memanggil kembali fungsi untuk memperbarui tampilan skor tertinggi
	}
  }
  

function tampilkanHighestScore() {
	let highestScore = localStorage.getItem('highestScore');
	if (highestScore !== null) {
	  let highestScoreElement = $(`<h5 class="highestScore">Highest Score: ${highestScore}</h5>`);
	  info.append(highestScoreElement);
	}
  }

// function getSession() {
//   if(!sessionStorage.getItem('accessToken')) {
//     alert('login dulu')
//     window.location.href = '../';
//   }
// }
  

function init() {
  getSession();

  // simpan selector di global variable
  game = $('#game');
  orang = $('#orang');
  info = $('#info');
  infoNyawa = $('#infoNyawa');
  papanNilai = $('#papanNilai');
  framehukum = $('#framehukum');
  highestScore = $('#highestScore');

  info.append('<h3 class="namaGame"><h4 class="instruksi">');
  papanNilai.append('<h5 class="nilai">');

  // set nyawa
  let strHati = '';
  for (let i = 1; i <= totalNyawa; i++) {
    strHati += '<div class="nyawa"></div>';
  }
  infoNyawa.append(strHati);

  // simpan selector yang ada di info & infoNyawa ke global variable
  nilai = $('.nilai');
  namaGame = $('.namaGame');
  instruksi = $('.instruksi');
  nyawa = $('.nyawa');

  nilai.text(strNilai);
  namaGame.text(strNamaGame);
  instruksi.text(strInstruksi);

  tampilkanInfo();
  tampilkanNyawa();
  pause();
  kontrol();
  tampilkanHighestScore();
}

$(document).ready(function(){
  setTimeout(init, 1000);
});

function redirectToHighScore() {
  window.location.href = '../high-score/index.html';
}