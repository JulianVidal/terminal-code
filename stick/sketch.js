let width = 50;
let height = 160;

let rows = [1, 3, 5, 7];

const spacing = 10;

let board = [];

const boardB = [];

let totalB = [];

let turn = 0;

let AI = true;

let button;

let rowLock = false;
let rowLockIndex = -1;

let win = 0;

let update = 0;

const moves = [];

let rowDeleted = false;

let sel;

function setup() {
  createCanvas(windowWidth, windowHeight);

  width = windowWidth / 30;
  height = windowHeight / 5;

  for (let i = 0; i < rows.length; i++) {
    board[i] = [];
    for (let j = 0; j < rows[i]; j++) {
      board[i].push(1);
    }

  }

  /*board = [
      [1],
      [1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 1, 1, 0, 0]
  ];*/

    //rows = [1, 1, 1, 3];

    buttonSize = createVector(windowWidth / 4, windowHeight/8);
    buttonPos = createVector(windowWidth / 16, windowHeight / 2 - buttonSize.x);

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background('#222222');

  if (update % 30 === 0) {

  }
  update++;
  width = windowWidth / 30;
  height = windowHeight / 5;
  buttonSize = createVector(windowWidth / 4, windowHeight/8);
  buttonPos = createVector(windowWidth / 16, windowHeight / (1.5) - buttonSize.x);

  drawBoard();

  textB();

  fill('#999999');

  noStroke()
  rect(buttonPos.x, buttonPos.y, buttonSize.x, buttonSize.y);
  fill(255);
  textSize(windowWidth / 48);
  text("Next Turn", buttonPos.x + (buttonSize.y / (1.5)), buttonPos.y + (buttonSize.y / (1.5)));

    if (turn === 1 && win === 0) {

      if (AI) {
        console.log("AI move");
        pick();

          rowLock = false;
          rowLockIndex = -1;
      }
      turn = 0;

    }

  winText();

}

function pick() {
    let rowAmount = 0;
    rows.forEach(num => num > 0 ? rowAmount++ : 5);

    let total = 0;
    for (let i = 0; i < rows.length; i++) {
        let stickAmount = 0;

        board[i].forEach(num => num > 0 ? stickAmount++ : 0);
        boardB[i] = toBinary(stickAmount).arr;
        total += toBinary(stickAmount).num;
    }
    total = `${total}`;

    let zero = "";
    for (let i = total.length; i < 3; i++) {
        zero += "0";
    }

    for (var i = 0; i < 3; i++) {
      totalB[i] = parseInt(zero.concat(total)[i])
    }

    if (rowAmount !== 2) {
      console.log("More or less than two rows");
        if (rowAmount === 1) {
          console.log("1 row");
          let stickAmount = 0;

          for (sticks of board) {
            for (stick of sticks) {
              if (stick === 1) {
                stickAmount++;
              }
            }
          }

            if (stickAmount > 1) {
              console.log("All but one");
              allButOne();
            } else {
              console.log("Remove Last");
              removeLast();
            }

        } else {
          console.log("More than 2 rows");
            console.log("Odd Even");
            oddEven();
        }
    }



    if (rowAmount === 2) {
        let oneRowOne = false;
        console.log("Two rows")

        for (let i = 0; i < rows.length; i++) {
            if (rows[i] === 1) {
                oneRowOne = true;
            }
        }

        if (oneRowOne) {
            console.log("One row with one stick");
            console.log("remove all from other row");
            removeAllFromOther();

        }  else {

            console.log("Both rows have more than one stick")
            console.log("Odd Even");
            oddEven();

        }

    }

    total = 0;
    for (let i = 0; i < rows.length; i++) {
        let stickAmount = 0;

        board[i].forEach(num => num > 0 ? stickAmount++ : 0);
        boardB[i] = toBinary(stickAmount).arr;
        total += toBinary(stickAmount).num;
    }
    total = `${total}`;

    zero = "";
    for (let i = total.length; i < 3; i++) {
        zero += "0";
    }

    for (var i = 0; i < 3; i++) {
      totalB[i] = parseInt(zero.concat(total)[i])
    }

    console.log("This is the board")
    console.table(board);

    console.log("This is the board in binary");
    console.table(boardB);

    console.log("This is the total in binary");
    console.table(totalB);

    console.log("Amount of sticks per row");
    console.table(rows);

    if (checkBoard()) {
      win = 1;
      console.log("I lose");
    }
}

function removeLast() {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === 1) {
        board[i][j] = 0;
        rows[i]--;
      }
    }
  }
}

function removeAllFromOther() {
    let index = 0;
    let record = 0;

    for (let i = 0; i < rows.length; i++) {
        if (rows[i] > record) {
            record = rows[i];
            index = i;
        }
    }

    rows[index] = 0;
    let removed = 0;

    for (let i = 0; i < board[index].length; i++) {
        board[index][i] = 0;
        removed++;
    }
    console.log(`${removed} sticks removed`);
}

function allButOne() {
    let index;
    let amountOff;

    for (let i = 0; i < rows.length; i++) {
        if (rows[i] > 0) {
            index = i;
            amountOff = rows[i] - 1;
            break;
        }
    }

    rows[index] -= amountOff;

    let removed = 0;
    for (let j = 0; j < board[index].length; j++) {

        if (board[index][j] > 0) {
            board[index][j] = 0;
            removed++;
        }

        if (removed === amountOff) {
            break;
        }
    }

    console.log(`${removed} sticks removed`);

}

function oddEven() {
    let odd = "";
    let amountOff;

    for (let i = 0; i < totalB.length; i++) {
        if (totalB[i] % 2 !== 0)  {
            odd = odd.concat("1");
        } else {
            odd = odd.concat("0");
        }

    }
    amountOff = toInt(odd);

    removeStickEvenOdd(amountOff, odd);
}

function mousePressed() {
  for (let i = 0; i < board.length; i++) {

    for (let j = 0; j < board[i].length; j++) {

      if (mouseX > width * (j + 1) + (j * spacing) + (windowWidth / 2 - (width * (2 + 1) + (2 * spacing))) && mouseX < width * (j + 1) + (j * spacing) + width + (windowWidth / 2 - (width * (2 + 1) + (2 * spacing)))) {
        if (mouseY > height * (i + 0.3) + (i * spacing) && mouseY < height * (i + 0.3) + (i * spacing) + height) {
          if (!rowLock) {
            if (rowLockIndex === -1) {
              if (turn === 0) {
                board[i][j] = 0;
                rows[i]--;
                rowLockIndex = i;
                rowDeleted = true;

                if (checkBoard()) {
                  win = 2;
                  console.log("I win");
                }
              }
            } else if (rowLockIndex === i) {
              if (turn === 0) {
              board[i][j] = 0;
              rows[i]--;

              if (checkBoard()) {
                console.log("I win");
              }
            }
            }

          }
        }
      }

    }

  }

  if (mouseX > buttonPos.x && mouseX < buttonPos.x + buttonSize.x) {
    if (mouseY > buttonPos.y && mouseY < buttonPos.y + buttonSize.y && rowDeleted === true) {
      turn = 1;
      rowDeleted = false;
      console.log("Next Turn")
    }
  }
}

function mouseDragged() {
    for (let i = 0; i < board.length; i++) {

      for (let j = 0; j < board[i].length; j++) {

        if (mouseX > width * (j + 1) + (j * spacing) + (windowWidth / 2 - (width * (2 + 1) + (2 * spacing))) && mouseX < width * (j + 1) + (j * spacing) + width + (windowWidth / 2 - (width * (2 + 1) + (2 * spacing)))) {
          if (mouseY > height * (i + 0.3) + (i * spacing) && mouseY < height * (i + 0.3) + (i * spacing) + height) {
            if (!rowLock) {
              if (rowLockIndex === -1) {
                if (turn === 0) {
                  board[i][j] = 0;
                  rows[i]--;
                  rowLockIndex = i;
                  rowDeleted = true;

                  if (checkBoard()) {
                    win = 2;
                    console.log("I win");
                  }
                }
              } else if (rowLockIndex === i) {
                if (turn === 0) {
                board[i][j] = 0;
                rows[i]--;

                if (checkBoard()) {
                  console.log("I win");
                }
              }
              }

            }
          }
        }

      }

    }

    rows = [0, 0, 0, 0];
    for (var i = 0; i < board.length; i++) {
      for (var j = 0; j < board[i].length; j++) {
        if (board[i][j] === 1) {
          rows[i]++;
        }
      }
    }

}



function toBinary(num) {
    const binary = parseInt(num, 10);
    let binaryStr = binary.toString(2);
    let   binaryArr = [];
    let zero = "";
    let newBinary = "";

    for (let i = 0; i < binaryStr.length; i++) {
        newBinary += binaryStr[(binaryStr.length - 1) - i];
    }

    //binaryStr = newBinary;

    for (let i = 0; i < 3; i++) {

        if (binaryStr[i]) {
            binaryArr[i] = parseInt(binaryStr[i]);

        } else {
            binaryArr.splice(0, 0, 0);
            zero += "0";
        }


    }

    return {
        arr: binaryArr,
        string: zero.concat(binaryStr),
        num: parseInt(zero.concat(binaryStr))
    };
}

function drawBoard() {
    for (let i = 0; i < board.length; i++) {

        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] > 0) {
              if (mouseX > width * (j + 1) + (j * spacing) + (windowWidth / 2 - (width * (2 + 1) + (2 * spacing))) && mouseX < width * (j + 1) + (j * spacing) + width + (windowWidth / 2 - (width * (2 + 1) + (2 * spacing)))) {
                if (mouseY > height * (i + 0.3) + (i * spacing) && mouseY < height * (i + 0.3) + (i * spacing) + height) {
                  fill(100);
                } else {
                  fill('#EEEEEE');
                }
              } else {
                fill('#EEEEEE');
              }
                rect(width * (j + 1) + (j * spacing) + (windowWidth / 2 - (width * (2 + 1) + (2 * spacing))), height * (i + 0.3) + (i * spacing), width, height);
            }
        }

    }
}

function textB() {
    let total = 0;
    for (let i = 0; i < rows.length; i++) {
        let stickAmount = 0;

        board[i].forEach(num => num > 0 ? stickAmount++ : 0);
        stroke(255);
        textSize(28);
        //text( `Bin: ${toBinary(stickAmount).string}`, width * 18, height * (i + 1) + ((i + 5) * spacing));
        boardB[i] = toBinary(stickAmount).arr;
        total += toBinary(stickAmount).num;
    }
    total = `${total}`;

    let zero = "";
    for (let i = total.length; i < 3; i++) {
        zero += "0";
    }

    //text( `Total: ${zero.concat(total)}`, width * 17, height * (5) + ((6) * spacing));

    for (var i = 0; i < 3; i++) {
      totalB[i] = parseInt(zero.concat(total)[i])
    }

}

function toInt(binary) {
    let integer = 0;

    for (let i = 0; i < binary.length; i++) {
        if ( binary[i] !== "0") {
            integer += Math.pow(2, (binary.length - 1) - i);
        }
    }

    return integer;
}

function removeStickEvenOdd(amount, odd) {

let special = true;

let rowAmount = 0;
rows.forEach(num => num > 0 ? rowAmount++ : 5);
let ind = 0;

if (rowAmount === 3) {
  let rowOne = 0;
  for (var i = 0; i < rows.length; i++) {
    if (rows[i] === 1) {
      rowOne++;
    }
  }
  if (rowOne === 2) {
    for (var i = 0; i < rows.length; i++) {
      if (rows[i] > 1) {
        ind = i;
        special = true;
        console.log("Special Case");
        break;
      }
    }

  } else {
    special = false;
  }
} else {
  special = false;

}

if (!special) {
  console.log("Not special Case")
  let index = 0;
  let amountB = toBinary(amount).string;
  let removed = 0;
  let backup = false;

  for (let i = 0; i < rows.length; i++) {

      if (rows[i] >= amount) {
          let possible = true;

          for (let j = 0; j < boardB[i].length; j++) {

             if (amountB[j] === "1") {

                 if (boardB[i][j] == amountB[j]) {
                 } else {
                     possible = false;
                     break;
                 }
             }
          }


          if (possible) {
              index = i;
              rows[index] -= amount;

              for (let j = 0; j < board[index].length; j++) {

                  if (board[index][j] !== 0) {
                      board[index][j] = 0;
                      removed++;
                  }

                  let total = 0;
                  for (let t = 0; t < rows.length; t++) {
                      let stickAmount = 0;

                      board[t].forEach(num => num > 0 ? stickAmount++ : 0);
                      boardB[t] = toBinary(stickAmount).arr;
                      total += toBinary(stickAmount).num;
                  }

                  if (total === 4) {
                    console.log("4 Case")
                    console.log(amount)
                    for (var t = 0; t < board[index].length; t++) {
                      if (board[index][t] ===  1) {
                        board[index][t] = 0;
                        removed++;
                        console.log(board[index])
                        rows[index]--;
                        break;
                      }
                    }


                  }

                  if (removed === amount) {
                      break;
                  }
              }
              break;
          }
      }
  }

  console.log(`${removed} sticks removed`);

  if (removed === 0) {
    console.log("Back up function");

    let index;
    let binaryString = "";
    let amountBinary = "";

    for (var i = 0; i < boardB.length; i++) {
      for (var j = 0; j < boardB[i].length; j++) {

        if (boardB[i][j] === parseInt(odd[j])) {
          amountBinary = amountBinary.concat("0");
        } else {
          amountBinary = amountBinary.concat("1");
        }

      }

      if (toInt(amountBinary) > rows[i]) {
        amountBinary = "";
      } else {
        index = i;
        break;
      }
    }

    for (var i = 0; i < boardB[index].length; i++) {
      binaryString = binaryString.concat(`${boardB[index][i]}`);
    }

    let amount = rows[index] - toInt(amountBinary);
    let removed = 0;

    for (var i = 0; i < board[index].length; i++) {
      if (board[index][i] === 1) {
        board[index][i] = 0;
        removed++;

        let total = 0;
        for (let i = 0; i < rows.length; i++) {
            let stickAmount = 0;

            board[i].forEach(num => num > 0 ? stickAmount++ : 0);
            boardB[i] = toBinary(stickAmount).arr;
            total += toBinary(stickAmount).num;
        }
        total = `${total}`;

        let zero = "";
        for (let t = total.length; t < 3; t++) {
            zero += "0";
        }

        for (var t = 0; t < 3; t++) {
          totalB[t] = parseInt(zero.concat(total)[i])
        }


        if (total === 4) {


          for (var t = 0; t < board[index].length; t++) {
            if (board[index][t] ===  1) {
              board[index][t] = 0;
              rows[index]--;
              removed++;
              break;
            }
          }

        }

        if (amount === removed) {
          rows[index] -= amount;

          break;
        }
      }
    }
    console.log(`${removed} sticks removed`);

  }

} else {
  let removed = 0;
  for (var i = 0; i < board[ind].length; i++) {
    if (board[ind][i] === 1) {
      board[ind][i] = 0;
      removed++;
    }

    if (removed === (rows[ind] - 1)) {
      break;
    }
  }
  rows[ind] -= 2;

}

}

function checkBoard() {
  let empty = true;
  for (sticks of board) {
    for (stick of sticks) {
      if (stick === 1) {
        empty = false;
        break;
      }
    }
  }
  return empty;
}

function winText() {
  if (win > 0) {
    if (win === 1) {
      textSize(32);
      fill(255);
      text("You win", 100, 100)
    } else if (win === 2) {
      textSize(32);
      fill(255);
      text("You lose", 100, 100)
    }

  }
}
