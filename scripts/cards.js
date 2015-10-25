"use strict";

{
    var Card = function(suit, num) {
        this.suit = suit;
        this.num = num;
    };
    Card.SUIT_NONE  = 0;
    Card.SUIT_SPADE = 1;
    Card.SUIT_DIA   = 2;
    Card.SUIT_HEART = 3;
    Card.SUIT_CLUB  = 4;

    var Deck = function() {
        this.cards = [];
        
        for (let i = 0; i < Deck.SUIT_MAX; ++i) {
            for (let j = 0; j < Deck.NUMBER_MAX; ++j) {
                this.cards.push(new Card(i + 1, j));
            }
        }
        this.cards.reverse();
    };
    Deck.SUIT_MAX = 4;
    Deck.NUMBER_MAX = 13;

    Deck.prototype = {
        shuffle: function() {
            var i = this.cards.length;
            while(i){
                var j = Math.floor(Math.random() * i);
                var t = this.cards[--i];
                this.cards[i] = this.cards[j];
                this.cards[j] = t;
            }
            return this.cards;
        },
        popCard: function() {
            return this.cards.pop();
        },
        pushCard: function(card) {
            this.cards.push(card);
        }
    };
}
