import { createElementFromData } from "./tileData.js"

export default class Game {

    constructor(height, width) {
        this.height = height
        this.width = width
        this.currentElement = null
        this.currentColorVar = null
        this.changeListeners = []
        this.loseListeners = []
        this.state = new Object()
        this.state.board = []
        this.state.score = 0
        this.state.over = false
        this.initializeBoard()
        this.insertTile()
    }

    //sets up arrays to initialize game board
    initializeBoard() {
        this.state.board = new Array(this.height)
        for (let i = 0; i < this.height; i++) {
            this.state.board[i] = new Array(this.width)
        }
    }

    //begins process to insert a set of elements into the game board
    //tile and element are used synonymously throughout the code
    insertTile() {
        //randomize horizontal spot to insert new element, border of 2 spots on each side to not place
        let randomSpot = Math.floor(Math.random() * (this.width - 4)) + 2
        //create new element and verify there is space to place it
        let newElement = this.randomizeElement(0, randomSpot)
        this.currentColorVar = this.randomizeColor()
        if (this.noCollision(newElement)) {
            this.insertElement(newElement)
            this.currentElement = newElement
            //notify event listeners of game board change
            for (let i = 0; i < this.changeListeners.length; i++) {
                this.changeListeners[i](this.state)
            }
        } else {
            //otherwise if there is no space, game is over
            this.state.over = true
            for (let i = 0; i < this.loseListeners.length; i++) {
                this.loseListeners[i](this.state)
            }
        }
        return
    }

    //implement bias to randomly select one of eight possible starting tile configurations
    randomizeElement(row, column) {
        let randomizer = Math.floor(Math.random() * 9)
        if (randomizer == 0) {
            return this.createElement("2line", row, column)
        }
        if (randomizer == 1) {
            return this.createElement("3line", row, column)
        }
        if (randomizer == 2) {
            return this.createElement("1Lleft", row, column)
        }
        if (randomizer == 3) {
            return this.createElement("1Lright", row, column)
        }
        if (randomizer == 4) {
            return this.createElement("2Lleft", row, column)
        }
        if (randomizer == 5) {
            return this.createElement("2Lright", row, column)
        }
        if (randomizer == 6) {
            return this.createElement("3Lleft", row, column)
        }
        if (randomizer == 7) {
            return this.createElement("3Lright", row, column)
        }
        if (randomizer == 8) {
            return this.createElement("2box", row, column)
        }
    }

    //initialize tile element and all corresponding data
    createElement(type, row, column) {
        //utilizes tileData.js to condense this file and accumulate array-like data in a single file
       return createElementFromData(type, row, column)
    }

    //check to see if elements are already in any spots that the tile would be inserted or if elements are outside of board boundries
    noCollision(element) {
        for (let i = 0; i < element.occupancy.length; i++) {
            //row rotation is outside of board boundries
            if ((element.occupancy[i][0] < 0) | (element.occupancy[i][0] >= this.height)) {
                return false
            }
            //column rotation is outside of board boundries
            if ((element.occupancy[i][1] < 0) | (element.occupancy[i][1] >= this.width)) {
                return false
            }
            //existing elements are in intended spots
            if (this.state.board[element.occupancy[i][0]][element.occupancy[i][1]] != undefined) {
                return false
            }
        }
        return true
    }

    //randomize color and represent one of six options via variables a, b, c, x, y, z
    randomizeColor() {
        let randomNum = Math.floor(Math.random() * 6)
        let randomVar = "x"
        switch (randomNum) {
            case 0:
                randomVar = "a"
                break;
            case 1:
                randomVar = "b"
                break;
            case 2:
                randomVar = "c"
                break;
            case 3:
                randomVar = "x"
                break;
            case 4:
                randomVar = "y"
                break;
            case 5:
                randomVar = "z"
                break;
        }
        return randomVar
    }

    //insert intended tile into the board
    insertElement(element) {
        for (let i = 0; i < element.occupancy.length; i++) {
            this.state.board[element.occupancy[i][0]][element.occupancy[i][1]] = this.currentColorVar
        }
    }

    //master function used to control game for lateral movements
    move(direction) {
        let validMove = false
        if (direction == "left") {
            //do not allow any more movement if tile has reached bottom
            if (this.rowsHaveSpaceLeft() & this.hasSpaceDown()) {
                this.moveElementLeft()
                validMove = true
            }
        }
        if (direction == "right") {
            //do not allow any more movement if tile has reached bottom
            if (this.rowsHaveSpaceRight() & this.hasSpaceDown()) {
                this.moveElementRight()
                validMove = true
            }
        }
        if (direction == "down") {
            if (this.hasSpaceDown()) {
                this.moveElementDown()
                validMove = true
            } else {
                //check if any rows are complete
                this.checkCompleteRow()
                //no space down, insert new element
                this.insertTile()
            }
        }
        if (validMove) {
            //if a valid move, notify game event change listeners the board has changed
            for (let i = 0; i < this.changeListeners.length; i++) {
                this.changeListeners[i](this.state)
            }
        }
    }

    //master function used to control game for rotations
    rotate(direction) {
        let validMove = false
        if (direction == "left") {
            //three clockwise rotations are equivilant to a counterclockwise rotation
            let rotationIterationArray = new Array(3)
            rotationIterationArray[0] = this.createElement(this.currentElement.clockwiseRotation, this.currentElement.position.row, this.currentElement.position.column)
            //evaluate equivilant three rotations
            for (let i = 0; i <= 1; i++) {
                rotationIterationArray[i + 1] = this.createElement(rotationIterationArray[i].clockwiseRotation, rotationIterationArray[i].position.row, rotationIterationArray[i].position.column)
            }
            this.clearBoardElement(this.currentElement)
            //rotations not permitted if tile has reached bottom
            if (this.noCollision(rotationIterationArray[2]) & this.hasSpaceDown()) {
                this.insertElement(rotationIterationArray[2])
                this.currentElement = rotationIterationArray[2]
                validMove = true
            } else {
                this.insertElement(this.currentElement)
            }
        }
        if (direction == "right") {
            let potentialRotation = this.createElement(this.currentElement.clockwiseRotation, this.currentElement.position.row, this.currentElement.position.column)
            this.clearBoardElement(this.currentElement)
            //rotations not permitted if tile has reached bottom
            if (this.noCollision(potentialRotation) & this.hasSpaceDown()) {
                this.insertElement(potentialRotation)
                this.currentElement = potentialRotation
                validMove = true
            } else {
                this.insertElement(this.currentElement)
            }
        }
        if (validMove) {
            //if a valid move, notify game event change listeners the board has changed
            for (let i = 0; i < this.changeListeners.length; i++) {
                this.changeListeners[i](this.state)
            }
        }
    }

    //check to see if there is a spot to the left for each piece of a tile for potential movement
    rowsHaveSpaceLeft() {
        let mostLeftParts = this.determineMostLeftParts()
        if (this.currentElement.position.column - 1 < 0) {
            return false
        }
        for (let i = 0; i < mostLeftParts.length; i++) {
            if (this.state.board[mostLeftParts[i][0]][mostLeftParts[i][1] - 1] != undefined) {
                return false
            }
        }
        return true
    }

    //check to see if there is a spot to the right for each piece of a tile for potential movement
    rowsHaveSpaceRight() {
        let mostRightParts = this.determineMostRightParts()
        if (this.currentElement.position.column + this.currentElement.width >= this.width) {
            return false
        }
        for (let i = 0; i < mostRightParts.length; i++) {
            if (this.state.board[mostRightParts[i][0]][mostRightParts[i][1] + 1] != undefined) {
                return false
            }
        }
        return true
    }

    //remove a tile from the board
    clearBoardElement() {
        for (let i = 0; i < this.currentElement.occupancy.length; i++) {
            this.state.board[this.currentElement.occupancy[i][0]][this.currentElement.occupancy[i][1]] = undefined
        }
    }

    //insert a tile into a new position one set of blocks left
    moveElementLeft() {
        this.clearBoardElement()
        for (let i = 0; i < this.currentElement.occupancy.length; i++) {
            this.currentElement.occupancy[i][1] = (this.currentElement.occupancy[i][1] - 1)
        }
        this.currentElement.position.column = (this.currentElement.position.column - 1)
        this.insertElement(this.currentElement)
    }

    //insert a tile into a new position one set of blocks right
    moveElementRight() {
        this.clearBoardElement()
        for (let i = 0; i < this.currentElement.occupancy.length; i++) {
            this.currentElement.occupancy[i][1] = (this.currentElement.occupancy[i][1] + 1)
        }
        this.currentElement.position.column = (this.currentElement.position.column + 1)
        this.insertElement(this.currentElement)
    }

    //for each row, return an array with the 2D index point of the most left element
    determineMostLeftParts() {
        //first sort the occupancy list by rows in a new object
        let rowSort = new Array()
        let offset = this.currentElement.position.row
        for (let i = 0; i < this.currentElement.height; i++) {
            rowSort[i] = new Array()
        }
        for (let j = 0; j < this.currentElement.occupancy.length; j++) {
            rowSort[this.currentElement.occupancy[j][0] - offset].push(this.currentElement.occupancy[j])
        }
        //row sort is complete, return most left column point for each set of arrays in rowsort master array
        let lowestPoints = new Array()
        for (let l = 0; l < this.currentElement.height; l++) {
            lowestPoints[l] = [0, this.width]
        }
        for (let k = 0; k < rowSort.length; k++) {
            for (let m = 0; m < rowSort[k].length; m++) {
                if (rowSort[k][m][1] < lowestPoints[k][1]) {
                    lowestPoints[k] = rowSort[k][m]
                }
            }
        }
        return lowestPoints
    }

    //for each row, return an array with the 2D index point of the most right element
    determineMostRightParts() {
        //first sort the occupancy list by rows in a new object
        let rowSort = new Array()
        let offset = this.currentElement.position.row
        for (let i = 0; i < this.currentElement.height; i++) {
            rowSort[i] = new Array()
        }
        for (let j = 0; j < this.currentElement.occupancy.length; j++) {
            rowSort[this.currentElement.occupancy[j][0] - offset].push(this.currentElement.occupancy[j])
        }
        //row sort is complete, return most right column point for each set of arrays in rowsort master array
        let lowestPoints = new Array()
        for (let l = 0; l < this.currentElement.height; l++) {
            lowestPoints[l] = [0, 0]
        }
        for (let k = 0; k < rowSort.length; k++) {
            for (let m = 0; m < rowSort[k].length; m++) {
                if (rowSort[k][m][1] > lowestPoints[k][1]) {
                    lowestPoints[k] = rowSort[k][m]
                }
            }
        }
        return lowestPoints
    }

    //check to see if an element has space to be moved downwards
    hasSpaceDown() {
        let lowestPoints = this.determineLowestParts()
        if (this.currentElement.position.row + this.currentElement.height >= this.height) {
            return false
        }
        for (let i = 0; i < lowestPoints.length; i++) {
            if (this.state.board[lowestPoints[i][0] + 1][lowestPoints[i][1]] != undefined) {
                return false
            }
        }
        return true
    }

    //move an element downwards if space check passed
    moveElementDown() {
        this.clearBoardElement()
        for (let i = 0; i < this.currentElement.occupancy.length; i++) {
            this.currentElement.occupancy[i][0] = (this.currentElement.occupancy[i][0] + 1)
        }
        this.currentElement.position.row = (this.currentElement.position.row + 1)
        this.insertElement(this.currentElement)
    }

    //for each column, return an array with the 2D index point of each lowest row
    determineLowestParts() {
        //first sort the occupancy list by columns in a new object
        let columnSort = new Array()
        let offset = this.currentElement.position.column
        for (let i = 0; i < this.currentElement.width; i++) {
            columnSort[i] = new Array()
        }
        for (let j = 0; j < this.currentElement.occupancy.length; j++) {
            columnSort[this.currentElement.occupancy[j][1] - offset].push(this.currentElement.occupancy[j])
        }
        //column sort is complete, return lowest row point for each set of arrays in columnsort master array
        //where lowest row is the highest numerically
        let lowestPoints = new Array()
        for (let l = 0; l < this.currentElement.width; l++) {
            lowestPoints[l] = [0, 0]
        }
        for (let k = 0; k < columnSort.length; k++) {
            for (let m = 0; m < columnSort[k].length; m++) {
                if (lowestPoints[k][0] < columnSort[k][m][0]) {
                    lowestPoints[k] = columnSort[k][m]
                }
            }
        }
        return lowestPoints
    }

    //check to see if any rows are completely full; if so remove that row, move entire game board down, and update score
    checkCompleteRow() {
        for (let i = 0; i < this.height; i++) {
            let rowFull = true
            for (let j = 0; j < this.width; j++) {
                if (this.state.board[i][j] == undefined) {
                    rowFull = false
                    break
                }
            }
            if (rowFull) {
                this.moveGameBoardDown(i)
                this.state.score += this.width
            }
        }
        return
    }

    //move down game board at spot of completing a row
    moveGameBoardDown(row) {
        for (let i = row; i >= 1; i--) {
            this.state.board[i] = [...this.state.board[i - 1]]
        }
        this.state.board[0] = new Array(this.width)
        //notify event listeners of game board change
        for (let i = 0; i < this.changeListeners.length; i++) {
            this.changeListeners[i](this.state)
        }
    }

    //used for console testing
    toString() {
        let returnString = ""
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width - 1; j++) {
                if (this.state.board[i][j] != undefined) {
                    returnString += (this.state.board[i][j] + "-")
                } else {
                    returnString += " -"
                }
            }
            if (this.state.board[i][this.width-1] != undefined) {
                returnString += (this.state.board[i][this.width-1])
            } else {
                returnString += " "
            }
            returnString += "\n"
        }
        returnString += "Score: " + this.state.score + "\n"
        returnString += "Over: " + this.state.over + "\n"
        return returnString
    }

    //register a callback as a listener for any game board changes, such as movements or rotations
    onChange(callback) {
        this.changeListeners[this.changeListeners.length] = callback
    }

    //register a callback as a listener for a game over event
    onLose(callback) {
        this.loseListeners[this.loseListeners.length] = callback
    }

    //return the current gamestate, which includes board, score, and boolean over state
    getGameState() {
        return this.state
    }

}