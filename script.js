document.addEventListener('DOMContentLoaded', function() {
    const images = ['pic1.jpg', 'pic2.jpg', ..., 'pic11.jpg'];
    const cardContainer = document.getElementById('card-container');

    images.forEach((img, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.cardId = index;
        card.style.backgroundImage = `url('images/${img}')`;
        card.onclick = revealCard;
        cardContainer.appendChild(card);
    });

    function revealCard() {
        this.classList.add('revealed');
        this.onclick = null; // Disable further clicks on this card
        checkAllRevealed();
    }

    function checkAllRevealed() {
        const revealedCards = document.querySelectorAll('.card.revealed');
        if (revealedCards.length === images.length) {
            setTimeout(shuffleCards, 1000);
        }
    }

    function shuffleCards() {
        // Shuffle logic here (simplified example)
        const cards = Array.from(document.querySelectorAll('.card'));
        cards.forEach(card => {
            cardContainer.appendChild(cardContainer.removeChild(card));
        });
        cards.forEach(card => {
            card.onclick = arrangeOrder;
        });
    }

    let orderedCards = [];
    function arrangeOrder() {
        this.style.order = orderedCards.length; // Flex order property to rearrange cards
        orderedCards.push(this);
        if (orderedCards.length === images.length) {
            checkOrder();
        }
    }

    function checkOrder() {
        const isCorrect = orderedCards.every((card, index) => Number(card.dataset.cardId) === index);
        if (isCorrect) {
            orderedCards.forEach((card, index) => {
                const text = document.createElement('span');
                text.className = 'text-under-card';
                text.textContent = `Message ${index + 1}`;
                card.after(text);
                text.style.display = 'block';
            });
            document.getElementById('background-music').play();
        }
    }
});
