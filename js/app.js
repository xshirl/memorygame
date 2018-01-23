/*
 * Create a list that holds all of your cards
 */
var symbols = ['bicycle', 'bicycle', 'leaf', 'leaf', 'cube', 'cube', 'anchor', 'anchor', 'paper-plane-o', 'paper-plane-o', 'bolt', 'bolt', 'bomb', 'bomb', 'diamond', 'diamond'];
var opened = [];
var matched = [];
var clicks = 0;
var stars = 3;
var timer;
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

var $deck = $(".deck");
// shuffles cards 

function initGame() {
  var cards = shuffle(symbols);
  for (var i = 0; i < cards.length; i++) {
		$deck.append($('<li class="card"><i class="fa fa-' + cards[i] + '"></i></li>'));
	}
  }


initGame();

var cards = [];
for (var i = 0; i<16; i++) {
	cards.push($(".card")[i]);
	$(cards[i]).attr('id',i);	
}

$('.card').on('click', click);


//Adds classes "open" and "show" to clicked cards and removes them if they don't match. adds numbers of clicks to moves.  
function click() {
    if (opened.length < 2) {

        $(this).addClass('open show');
        opened.push(this);
        if (opened.length === 2 && $(opened[0]).attr('id') === $(opened[1]).attr('id')) {
            matched = [];
            $(opened[1]).removeClass('show open');
            opened = [];
            $('.moves').text(clicks);
        } else if (opened.length === 2) {
            clicks += 1;
            $('.moves').text(clicks);
            setTimeout(check, 1500);
        }
    }
	if (clicks >8 && clicks <16) {
		$('.star-three').hide();   
	}
	else if (clicks > 16) {
		$('.star-two').hide();
	}


}

//checks cards to see if they match. if matching, add class "match"
function check() {
    while (opened.length === 2) {
        if (opened[0].innerHTML !== opened[1].innerHTML) {
            opened.map(function(card){
                $(card).removeClass('open show');
            });
            opened = [];
        } else {
            opened.map(function(card) {
                $(card).addClass('match');
                matched.push(card);
                if (matched.length === 16) {
					findWinner();
                    
                }
            });



            opened = [];
        }
    }


}
// restarts game
function restartGame() {
  $(".restart").on("click", function() {
      location.reload();
  });
  }

restartGame();

// at the end of the game, the modal pops up with time, number of moves, and star level.
function findWinner() {

  if (matched.length === 16) {

    var modal = document.getElementById('win-popup');
    var span = document.getElementsByClassName("close")[0];

    $("#total-moves").text(clicks);
    $("#total-stars").text(stars);

    modal.style.display = "block";

  // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    };

   $("#play-again-btn").on("click", function() {
       location.reload();
   });

   clearInterval(timer);


 }
}

// starts timer
function startTimer() {
  var clicks = 0;
  $(".card").on("click", function() {
    clicks += 1;
    if (clicks === 1) {
      var sec = 0;
      function time ( val ) { return val > 9 ? val : "0" + val; }
      timer = setInterval( function(){
        $(".seconds").html(time(++sec % 60));
        $(".minutes").html(time(parseInt(sec / 60, 10)));
      }, 1000);
    }
  });
 }
 
startTimer();
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
