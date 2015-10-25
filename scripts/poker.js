"use strict";

{
    var Poker = function() {
        
    };
    Poker.ROYAL_FLUSH      = 120;
    Poker.STRAIGHT_FLUSH   = 110;
    Poker.FLUSH            = 100;
    Poker.ROYAL_STRAIGHT   = 20;
    Poker.STRAIGHT         = 10;
    Poker.FOUR_OF_A_KIND   = 6;
    Poker.FULL_HOUSE       = 4;
    Poker.THREE_OF_A_KIND  = 3;
    Poker.TWO_PAIR         = 2;
    Poker.ONE_PAIR         = 1;
    Poker.NO_PAIR          = 0;

    Poker.getScore = function(cards) {
        var flush = 1;
        for(let i = 1; i < 5; ++i) {
            if (cards[0].suit != cards[i].suit) {
                flush = 0;
                break;
            }
        }
        var pair = 0;
        for(let i = 0; i < 4; ++i) {
            for(let j = i + 1; j < 5; ++j){
                if (cards[i].num == cards[j].num) {
                    ++pair;
                }
            }
        }
        cards.sort(function(a, b) {
            return (a.num > b.num) ? 1 : -1;
        });
        var straight = 1;
        for(let i = 1; i < 5; ++i) {
            if (cards[i - 1].num + 1 != cards[i].num) {
                straight = 0;
                break;
            }
        }
        if (cards[0].num == 1 && cards[1].num == 10 && cards[2].num == 11 && cards[3].num == 12 && cards[4].num == 13) {
            straight = 2;
        }
        return (flush * 100 + straight * 10 + pair);
    };
    
    Poker.scoreToName = function(score) {
        switch(score) {
            case Poker.ROYAL_FLUSH: return "Royal flush";
            case Poker.STRAIGHT_FLUSH: return "Straight flush";
            case Poker.FLUSH: return "Flush";
            case Poker.ROYAL_STRAIGHT: return "Royal Straight";
            case Poker.STRAIGHT: return "Straight";
            case Poker.FOUR_OF_A_KIND: return "Four of a kind";
            case Poker.FULL_HOUSE: return "Full House";
            case Poker.THREE_OF_A_KIND: return "Three of a kind";
            case Poker.TWO_PAIR: return "Two pair";
            case Poker.ONE_PAIR: return "One pair";
            case Poker.NO_PAIR: return "No pair";
        }
        return "";
    };
    
    Poker.scoreToRank = function(score) {
        switch(score) {
            case Poker.NO_PAIR:         return 0;
            case Poker.ONE_PAIR:        return 1;
            case Poker.TWO_PAIR:        return 2;
            case Poker.THREE_OF_A_KIND: return 3;
            case Poker.STRAIGHT:        return 4;
            case Poker.ROYAL_STRAIGHT:  return 4;
            case Poker.FLUSH:           return 5;
            case Poker.FULL_HOUSE:      return 6;
            case Poker.FOUR_OF_A_KIND:  return 7;
            case Poker.STRAIGHT_FLUSH:  return 8;
            case Poker.ROYAL_FLUSH:     return 9;
            default: return "";
        }
        return 0;
    };
}
