const cardDeckBase = [
    "HeartsA", "Hearts2", "Hearts3", "Hearts4", "Hearts5", "Hearts6", "Hearts7",
    "Hearts8", "Hearts9", "Hearts10", "HeartsJ", "HeartsQ", "HeartsK",
    "DiamondsA", "Diamonds2", "Diamonds3", "Diamonds4", "Diamonds5", "Diamonds6", "Diamonds7",
    "Diamonds8", "Diamonds9", "Diamonds10", "DiamondsJ", "DiamondsQ", "DiamondsK",
    "SpadesA", "Spades2", "Spades3", "Spades4", "Spades5", "Spades6", "Spades7",
    "Spades8", "Spades9", "Spades10", "SpadesJ", "SpadesQ", "SpadesK",
    "ClubsA", "Clubs2", "Clubs3", "Clubs4", "Clubs5", "Clubs6", "Clubs7",
    "Clubs8", "Clubs9", "Clubs10", "ClubsJ", "ClubsQ", "ClubsK"
];

let cardDeck = cardDeckBase;

const ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "0", "J", "Q", "K", "A"];
let piles = {"pile1":[], "pile2":[], "pile3":[], "pile4":[]};

function cardClicked(id){
    for (let i = 1; i <= 4; i++){
        if (id !== i){
            console.log(piles[`pile${id}`][0]?.slice(0, (piles[`pile${id}`][0].indexOf("s")+1)), piles[`pile${i}`][0]?.slice(0, (piles[`pile${i}`][0].indexOf("s")+1)));
            if (piles[`pile${id}`][0]?.slice(0, (piles[`pile${id}`][0].indexOf("s")+1)) === piles[`pile${i}`][0]?.slice(0, (piles[`pile${i}`][0].indexOf("s")+1))){
                if (ranks.indexOf(piles[`pile${id}`][0]?.at(-1)) < ranks.indexOf(piles[`pile${i}`][0]?.at(-1))){
                    discard(id)
                }
            }
        }  else return;
    } // end of for loop
}

function dealCards(){
    if (cardDeck.length === 0) return;

    for (let i = 1; i <= 4; i++){
        const deck = document.getElementById("deck");
        const card = document.getElementById(`card${i}`);

        const startPosition = deck.getBoundingClientRect();
        const targetPosition = card.getBoundingClientRect();

        if (cardDeck.length <= 4) deck.className = "hidden";

        const flyer = document.createElement("div");
        flyer.className = "flyer";
        flyer.style.marginLeft = "-58vw"
        flyer.style.backgroundImage = "url('assets/Cards/cardBack_red2.png')"
        flyer.style.left = `${deck.left}px`;
        flyer.style.top = `${deck.top}px`;

        document.getElementById("spread").appendChild(flyer);

        requestAnimationFrame(() => {
            const xDistance = targetPosition.left - startPosition.left;
            const yDistance = targetPosition.top - startPosition.top;

            flyer.style.transform = `translate(${xDistance}px, ${yDistance}px)`;
        })

        flyer.addEventListener("transitionend", () => {
            card.classList.remove("hidden");
            card.classList.add("revealed");

            let dealtCard = cardDeck[Math.floor(Math.random() * cardDeck.length)];
            document.getElementById(`face${i}`).style.backgroundImage = `url("assets/Cards/card${dealtCard}.png")`;
            piles[`pile${i}`].unshift(dealtCard);
            checkPileSize()
            cardDeck.splice(cardDeck.indexOf(dealtCard), 1);

            flyer.remove();
            card.classList.add("flip");
        }, {once: true});
    }
    console.log(piles);
}

function discard(id){
    const card = document.getElementById(`face${id}`);
    console.log(card.style.backgroundImage)
    document.getElementById("discardedFace").style.backgroundImage = `${card.style.backgroundImage}`;
    document.getElementById("discardedCard").classList.remove("hidden");
    document.getElementById("discardedCard").classList.add("revealed");
    if (piles[`pile${id}`].length > 0){
        console.log(piles[`pile${id}`][1])
        card.style.backgroundImage = `url("assets/Cards/card${piles[`pile${id}`][1]}.png")`;
    } else {
        card.classList.add("hidden");
        card.classList.remove("revealed");
    }

    piles[`pile${id}`].splice(0, 1);
    checkPileSize()
}

function checkPileSize() {
    for (let i = 1; i <= 4; i++){
        if (piles[`pile${i}`].length > 1){
            document.getElementById(`card${i}`).classList.add("stacked")
        } else {
            document.getElementById(`card${i}`).classList.remove("stacked")
        }
    }
}