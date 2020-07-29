
function generateBoard(board) {
    fillBoard(board);
    print(board);
}

function fillBoard(board) {
    for (let i = 0; i < 3; i++)
        for (let j = 0; j < 3; j++)
            fillBox(board, i, j);
}

function fillBox(board, rowNum, colNum) {
    for (let i = rowNum * 3; i < rowNum * 3 + 3; i++) {
        for (let j = colNum * 3; j < colNum * 3 + 3; j++) {
            let num = floor(random(1, 10));
            while (!validateBox(board, rowNum, colNum, num) || !validateCol(board, j) || !validateRow(board, i)) {
                num = floor(random(1, 10));
            }
            board[i][j] = num;
        }
    }
}
function validateBox(board, rowNum, colNum, num) {
    for (let i = rowNum * 3; i < rowNum * 3 + 3; i++) {
        for (let j = colNum * 3; j < colNum * 3 + 3; j++) {
            if (board[i][j] == num)
                return false;
        }
    }
    return true;
}
function validateRow(board, rowNum, num) {
    for (let i = 0; i < 9; i++) {
        if (board[rowNum][i] == num)
            return false;
    }
    return true;
}
function validateCol(board, colNum, num) {
    for (let i = 0; i < 9; i++) {
        if (board[i][colNum] == num)
            return false;
    }
    return true;
}
function removeEl(board,intensity){
    let k= intensity*2*9;
    while(k!=0){
        let cellId= floor(random(81));
        let i = floor(cellId/N); 
            let j = cellId%9; 
            if (j != 0) 
                j = j - 1; 
  
            // System.out.println(i+" "+j); 
            if (board[i][j] != 0) 
            { 
                k--; 
                board[i][j] = 0; 
            } 
    }
        
}