"use strict";

window.onload = function () {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    
    let cardImages = [];
    {
        let suit = ["s", "d", "h", "c"];
        for (let i = 0; i < suit.length; ++i) {
            for (let j = 0; j < Deck.NUMBER_MAX; ++j) {
                let image = new Image();
                let num = j + 1;
                image.src = eval("card_" + suit[i] + (num <= 9 ? "0" + num : num) )
                cardImages.push(image)
            }
        }
    }
    
    let cardToIndex = function(card) {
        return (card.suit - 1) * Deck.NUMBER_MAX + card.num;
    }
    
    
    let deck = new Deck();
    let waitCount = 0;
    let handTextList = [
        'No pair', 'One pair', 'Two pair', 'Three of a kind', 'Straight', 'Royal Straight',
        'Flush', 'Full House', 'Four of a kind', 'Straight flush', 'Royal flush'
    ];
    let handCountList = [];
    for (let i = 0; i < handTextList.length; ++i) {
        handCountList[handTextList[i]] = 0;
    }
    
    setInterval(function() {
        if (waitCount > 0) {
            --waitCount;
            return;
        }
        context.clearRect(0, 0, canvas.width, canvas.height);
        deck.shuffle();

        let hand = [];
        for (let i = 0; i < 5; ++i) {
            let card = deck.popCard();
            hand.push(card);
            context.drawImage(cardImages[cardToIndex(card)], 0 + (i * 100), 0, 100, 150);
        }
        let score = Poker.getScore(hand);
        let result =  Poker.scoreToName(score);
        ++handCountList[result];
        if (Poker.scoreToRank(score) >= 4) {
            waitCount = 60;
        }
        for (let i = 0; i < hand.length; ++i) {
            deck.pushCard(hand[i]);
        }

        context.font = "40px 'Times New Roman'";
        let metrics = context.measureText(result);
        context.fillText(result, (canvas.width / 2) - (metrics.width / 2), 190);
        
        context.font = "20px 'Times New Roman'";
        let x = 55, y = 225, offset = 240;
        for (let i = 0; i < handTextList.length; ++i) {
            context.fillStyle = (result === handTextList[i]) ? 'red' : 'black';
            let left = (i % 2 === 0);
            context.fillText(handTextList[i], x + (left ? 0 : offset), y + (i - (left ? 0 : 1)) * 10);
        }
        for (let i = 0; i < handTextList.length; ++i) {
            context.fillStyle = (result === handTextList[i]) ? 'red' : 'black';
            let left = (i % 2 === 0);
            context.fillText(handCountList[handTextList[i]], (x + 150) + (left ? 0 : offset), y + (i - (left ? 0 : 1)) * 10);
        }
        context.fillStyle = 'black';
    }, 33);
};