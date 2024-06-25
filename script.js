let sponsors = {};

function saveSponsor() {
    const sponsorName = document.getElementById('sponsor-name').value;
    const sponsorNumber = document.getElementById('sponsor-number').value;

    if (sponsorName && sponsorNumber >= 1 && sponsorNumber <= 75) {
        sponsors[sponsorNumber] = sponsorName;
        alert(`Patrocinador ${sponsorName} cadastrado para a pedra ${sponsorNumber}!`);
        document.getElementById('sponsor-name').value = '';
        document.getElementById('sponsor-number').value = '';
    } else {
        alert('Por favor, insira um nome de patrocinador válido e um número de pedra entre 1 e 75.');
    }
}

function startGame() {
    localStorage.setItem('sponsors', JSON.stringify(sponsors));
    window.location.href = 'bingo.html';
}

function goBack() {
    window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', () => {
    const savedSponsors = localStorage.getItem('sponsors');
    if (savedSponsors) {
        sponsors = JSON.parse(savedSponsors);
    }

    if (document.getElementById('bingo-board')) {
        const bingoLetters = ['B', 'I', 'N', 'G', 'O'];
        const bingoBoard = document.getElementById('bingo-board');
        const lastSelection = document.getElementById('last-selection');
        const sponsorInfo = document.getElementById('sponsor-info');

        const bingoNumbers = Array.from({ length: 75 }, (_, i) => i + 1);
        const columns = {
            B: bingoNumbers.slice(0, 15),
            I: bingoNumbers.slice(15, 30),
            N: bingoNumbers.slice(30, 45),
            G: bingoNumbers.slice(45, 60),
            O: bingoNumbers.slice(60, 75),
        };

        bingoLetters.forEach(letter => {
            columns[letter].forEach(number => {
                const cell = document.createElement('div');
                cell.classList.add('bingo-cell');
                cell.textContent = `${letter}${number}`;
                cell.addEventListener('click', () => {
                    if (cell.classList.contains('bingo')) {
                        cell.classList.remove('bingo');
                    } else if (cell.classList.contains('selected')) {
                        cell.classList.add('bingo');
                        lastSelection.textContent = `BINGO!!! ${letter}-${number}`;
                    } else {
                        cell.classList.add('selected');
                        lastSelection.textContent = `${letter}-${number}`;
                    }

                    if (sponsors[number]) {
                        sponsorInfo.textContent = ` ${sponsors[number]}`;
                    } else {
                        sponsorInfo.textContent = '';
                    }
                });
                bingoBoard.appendChild(cell);
            });
        });
    }
});
