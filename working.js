$(document).ready(function() {
    let position = ['b-01', 'b-02', 'b-03', 'b-04', 'b-05', 'b-06', 'b-07', 'b-08',
            'b-11', 'b-12', 'b-13', 'b-14', 'b-15', 'b-16', 'b-17', 'b-s18',
            'b-21', 'b-22', 'b-23', 'b-24', 'b-25', 'b-26', 'b-27', 'b-28',
            'b-31', 'b-32', 'b-33', 'b-34', 'b-35', 'b-36', 'b-37', 'b-38',
            'b-41', 'b-42', 'b-43', 'b-44', 'b-45', 'b-46', 'b-47', 'b-48',
            'b-51', 'b-52', 'b-53', 'b-54', 'b-55', 'b-56', 'b-57', 'b-58',
            'b-61', 'b-62', 'b-63', 'b-64', 'b-65', 'b-66', 'b-67', 'b-68',
            'b-71', 'b-72', 'b-73', 'b-74', 'b-75', 'b-76', 'b-77', 'b-78',
            'b-81', 'b-82', 'b-83', 'b-84', 'b-85', 'b-86', 'b-87', 'b-88',
        ],
        bomb = [],
        place = [];
    $(".blocks").addClass("inactive");
    setGame();
    $(".blocks").on("click", function() {
        if ($(this).hasClass("active") == false) {
            $(this).removeClass("inactive warning").addClass("active");
            gameOver($(this));
            clearArea($(this));
        }
    });
    $(".blocks").contextmenu(function() {
        if ($(this).hasClass("inactive") == true) {
            $(this).addClass("warning");
        }
    });

    function incrementValue() {
        for (let i = 0; i < place.length; i++) {
            let addNumber = $("[blockNumber=" + place[i] + "]");
            numbers = parseInt(addNumber.html());
            numbers = numbers + 1;
            addNumber.html(numbers);
        }
    }

    function setGame() {
        $(".blocks").html("").removeClass("danger values");
        for (i = 0; i < 10; i++) {
            let show = position[Math.floor(Math.random() * position.length)],
                block = ($("[blockNumber=" + show + "]"));

            if ($(block).hasClass("danger") == false) {
                $(block).addClass("danger");
                bomb.push(block);
                let pass = block.attr("blockNumber").split("-")[1]
                placeNumbers(pass);
            } else {
                i = i - 1;
            }
        }
        incrementValue();
    }

    function gameOver(block) {
        if (block.hasClass("danger") == true) {
            $(".danger").removeClass("active inactive warning");
            alert("Game Over, Try Again");
        } else if ($(".blocks").hasClass("inactive") == false) {
            alert("You won!");
        }
    }

    function clearArea(block) {
        if (block.html() == "" && block.hasClass("danger") == false) {
            let pass = block.attr("blockNumber").split("-")[1];
            searchNeighbour(pass);
        }
    }

    function searchNeighbour(block) {
        digits = generateDigits(block);
        firstDigit = digits[0];
        secondDigit = digits[1];
        for (let i = 0; i < firstDigit.length; i++) {
            for (let j = 0; j < secondDigit.length; j++) {
                let num = firstDigit[i] + secondDigit[j],
                    block = $("[blockNumber=b-" + num + "]");
                block.removeClass("inactive").addClass("active");
            }
        }
    }

    function placeNumbers(bomb) {
        digits = generateDigits(bomb);
        firstDigit = digits[0];
        secondDigit = digits[1];
        for (let i = 0; i < firstDigit.length; i++) {
            for (let j = 0; j < secondDigit.length; j++) {
                let num = firstDigit[i] + secondDigit[j],
                    block = $("[blockNumber=b-" + num + "]");
                block.addClass("values");
                place.push(block.attr("blockNumber"));
            }
        }
        $(".values").html(0);
        $(".danger").html("");
    }

    function generateDigits(bomb) {
        second = bomb.split("")[1];
        first = bomb.split("")[0];
        secondDigitOne = second - 1;
        secondDigitTwo = bomb.split("")[1];
        secondDigitThree = parseInt(second) + 1;
        secondDigitOne = secondDigitOne.toString();
        secondDigitTwo = secondDigitTwo.toString();
        secondDigitThree = secondDigitThree.toString();
        firstDigitOne = first - 1;
        firstDigitTwo = bomb.split("")[0];
        firstDigitThree = parseInt(first) + 1;
        firstDigitOne = firstDigitOne.toString();
        firstDigitTwo = firstDigitTwo.toString();
        firstDigitThree = firstDigitThree.toString();
        firstDigit = [firstDigitOne, firstDigitTwo, firstDigitThree];
        secondDigit = [secondDigitOne, secondDigitTwo, secondDigitThree];
        digits = [firstDigit, secondDigit];
        return digits;
    }
});
// for (let i = 0; i < clear.length; i++) {
//     clearArea(clear[i]);
// }
// if (block.html() == "") {
//     if (clear.indexOf(block.attr("blockNumber")) === -1) {
//         clear.push(block.attr("blockNumber"));
//     } else {
//         let index = clear.indexOf(block.attr("blockNumber"));
//         clear.pop(clear[index]);
//         clear.push(block.attr("blockNumber"));
//     }
// }