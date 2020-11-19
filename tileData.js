export function createElementFromData(type, row, column) {
    //position is a bounds representing most top row and most left element but could be empty
    let newElement = new Object()
    // line with 2 elements and its rotated children
    if (type == "2line") {
        newElement.type = "2line"
        newElement.position = new Object()
        newElement.position.row = row
        newElement.position.column = column
        newElement.occupancy = [[row, column], [row + 1, column]]
        newElement.height = 2
        newElement.width = 1
        newElement.clockwiseRotation = "2line90"
        return newElement
    }
    if (type == "2line90") {
        newElement.type = "2line90"
        newElement.position = new Object()
        newElement.position.row = row + 1
        newElement.position.column = column
        newElement.occupancy = [[row + 1, column], [row + 1, column + 1]]
        newElement.height = 1
        newElement.width = 2
        newElement.clockwiseRotation = "2line180"
        return newElement
    }
    if (type == "2line180") {
        newElement.type = "2line180"
        newElement.position = new Object()
        newElement.position.row = row
        newElement.position.column = column
        newElement.occupancy = [[row, column], [row + 1, column]]
        newElement.height = 2
        newElement.width = 1
        newElement.clockwiseRotation = "2line270"
        return newElement
    }
    if (type == "2line270") {
        newElement.type = "2line270"
        newElement.position = new Object()
        newElement.position.row = row
        newElement.position.column = column - 1
        newElement.occupancy = [[row, column - 1], [row, column]]
        newElement.height = 1
        newElement.width = 2
        newElement.clockwiseRotation = "2lineSub"
        return newElement
    }
    if (type == "2lineSub") {
        newElement.type = "2lineSub"
        newElement.position = new Object()
        newElement.position.row = row - 1
        newElement.position.column = column + 1
        newElement.occupancy = [[row - 1, column + 1], [row, column + 1]]
        newElement.height = 2
        newElement.width = 1
        newElement.clockwiseRotation = "2line90"
        return newElement
    }

    // line with 3 elements and its rotated children
    if (type == "3line") {
        newElement.type = "3line"
        newElement.position = new Object()
        newElement.position.row = row
        newElement.position.column = column
        newElement.occupancy = [[row, column], [row + 1, column], [row + 2, column]]
        newElement.height = 3
        newElement.width = 1
        newElement.clockwiseRotation = "3line90"
        return newElement
    }
    if (type == "3line90") {
        newElement.type = "3line90"
        newElement.position = new Object()
        newElement.position.row = row + 2
        newElement.position.column = column
        newElement.occupancy = [[row + 2, column], [row + 2, column + 1], [row + 2, column + 2]]
        newElement.height = 1
        newElement.width = 3
        newElement.clockwiseRotation = "3line180"
        return newElement
    }
    if (type == "3line180") {
        newElement.type = "3line180"
        newElement.position = new Object()
        newElement.position.row = row
        newElement.position.column = column
        newElement.occupancy = [[row, column], [row + 1, column], [row + 2, column]]
        newElement.height = 3
        newElement.width = 1
        newElement.clockwiseRotation = "3line270"
        return newElement
    }
    if (type == "3line270") {
        newElement.type = "3line270"
        newElement.position = new Object()
        newElement.position.row = row
        newElement.position.column = column - 2
        newElement.occupancy = [[row, column - 2], [row, column - 1], [row, column]]
        newElement.height = 1
        newElement.width = 3
        newElement.clockwiseRotation = "3lineSub"
        return newElement
    }
    if (type == "3lineSub") {
        newElement.type = "3lineSub"
        newElement.position = new Object()
        newElement.position.row = row - 2
        newElement.position.column = column + 2
        newElement.occupancy = [[row - 2, column + 2], [row - 1, column + 2], [row, column + 2]]
        newElement.height = 3
        newElement.width = 1
        newElement.clockwiseRotation = "3line90"
        return newElement
    }

    // L with leg to the left that is one block high and its rotated children
    if (type == "1Lleft") {
        newElement.type = "1Lleft"
        newElement.position = new Object()
        newElement.position.row = row 
        newElement.position.column = column - 1
        newElement.occupancy = [[row, column], [row + 1, column], [row + 1, column - 1]]
        newElement.height = 2
        newElement.width = 2
        newElement.clockwiseRotation = "1Lleft90"
        return newElement
    }
    if (type == "1Lleft90") {
        newElement.type = "1Lleft90"
        newElement.position = new Object()
        newElement.position.row = row - 1
        newElement.position.column = column
        newElement.occupancy = [[row - 1, column], [row, column], [row, column + 1]]
        newElement.height = 2
        newElement.width = 2
        newElement.clockwiseRotation = "1Lleft180"
        return newElement
    }
    if (type == "1Lleft180") {
        newElement.type = "1Lleft180"
        newElement.position = new Object()
        newElement.position.row = row
        newElement.position.column = column + 1
        newElement.occupancy = [[row, column + 1], [row, column + 2], [row + 1, column + 1]]
        newElement.height = 2
        newElement.width = 2
        newElement.clockwiseRotation = "1Lleft270"
        return newElement
    }
    if (type == "1Lleft270") {
        newElement.type = "1Lleft270"
        newElement.position = new Object()
        newElement.position.row = row + 1
        newElement.position.column = column
        newElement.occupancy = [[row + 1, column], [row + 1, column + 1], [row + 2, column + 1]]
        newElement.height = 2
        newElement.width = 2
        newElement.clockwiseRotation = "1LleftSub"
        return newElement
    }
    if (type == "1LleftSub") {
        newElement.type = "1LleftSub"
        newElement.position = new Object()
        newElement.position.row = row
        newElement.position.column = column - 1
        newElement.occupancy = [[row, column], [row + 1, column], [row + 1, column - 1]]
        newElement.height = 2
        newElement.width = 2
        newElement.clockwiseRotation = "1Lleft90"
        return newElement
    }

    // L with leg to the right that is one block high and its rotated children
    if (type == "1Lright") {
        newElement.type = "1Lright"
        newElement.position = new Object()
        newElement.position.row = row 
        newElement.position.column = column
        newElement.occupancy = [[row, column], [row + 1, column], [row + 1, column + 1]]
        newElement.height = 2
        newElement.width = 2
        newElement.clockwiseRotation = "1Lright90"
        return newElement
    }
    if (type == "1Lright90") {
        newElement.type = "1Lright90"
        newElement.position = new Object()
        newElement.position.row = row
        newElement.position.column = column - 1
        newElement.occupancy = [[row, column], [row, column - 1], [row + 1, column - 1]]
        newElement.height = 2
        newElement.width = 2
        newElement.clockwiseRotation = "1Lright180"
        return newElement
    }
    if (type == "1Lright180") {
        newElement.type = "1Lright180"
        newElement.position = new Object()
        newElement.position.row = row - 1
        newElement.position.column = column
        newElement.occupancy = [[row, column + 1], [row - 1, column + 1], [row - 1, column]]
        newElement.height = 2
        newElement.width = 2
        newElement.clockwiseRotation = "1Lright270"
        return newElement
    }
    if (type == "1Lright270") {
        newElement.type = "1Lright270"
        newElement.position = new Object()
        newElement.position.row = row
        newElement.position.column = column + 1
        newElement.occupancy = [[row + 1, column + 1], [row + 1, column + 2], [row, column + 2]]
        newElement.height = 2
        newElement.width = 2
        newElement.clockwiseRotation = "1LrightSub"
        return newElement
    }
    if (type == "1LrightSub") {
        newElement.type = "1LrightSub"
        newElement.position = new Object()
        newElement.position.row = row + 1
        newElement.position.column = column
        newElement.occupancy = [[row + 1, column], [row + 2, column], [row + 2, column + 1]]
        newElement.height = 2
        newElement.width = 2
        newElement.clockwiseRotation = "1Lright90"
        return newElement
    }

    // L with leg to the left that is two blocks high and its rotated children
    if (type == "2Lleft") {
        newElement.type = "2Lleft"
        newElement.position = new Object()
        newElement.position.row = row 
        newElement.position.column = column - 1
        newElement.occupancy = [[row, column], [row + 1, column], [row + 2, column], [row + 2, column - 1]]
        newElement.height = 3
        newElement.width = 2
        newElement.clockwiseRotation = "2Lleft90"
        return newElement
    }
    if (type == "2Lleft90") {
        newElement.type = "2Lleft90"
        newElement.position = new Object()
        newElement.position.row = row - 1
        newElement.position.column = column - 1
        newElement.occupancy = [[row, column + 1], [row, column], [row, column - 1], [row - 1, column - 1]]
        newElement.height = 2
        newElement.width = 3
        newElement.clockwiseRotation = "2Lleft180"
        return newElement
    }
    if (type == "2Lleft180") {
        newElement.type = "2Lleft180"
        newElement.position = new Object()
        newElement.position.row = row - 1
        newElement.position.column = column + 2
        newElement.occupancy = [[row + 1, column + 2], [row, column + 2], [row - 1, column + 2], [row - 1, column + 3]]
        newElement.height = 3
        newElement.width = 2
        newElement.clockwiseRotation = "2Lleft270"
        return newElement
    }
    if (type == "2Lleft270") {
        newElement.type = "2Lleft270"
        newElement.position = new Object()
        newElement.position.row = row + 2
        newElement.position.column = column
        newElement.occupancy = [[row + 2, column], [row + 2, column + 1], [row + 2, column + 2], [row + 3, column + 2]]
        newElement.height = 2
        newElement.width = 3
        newElement.clockwiseRotation = "2LleftSub"
        return newElement
    }
    if (type == "2LleftSub") {
        newElement.type = "2LleftSub"
        newElement.position = new Object()
        newElement.position.row = row
        newElement.position.column = column - 1
        newElement.occupancy = [[row, column], [row + 1, column], [row + 2, column], [row + 2, column - 1]]
        newElement.height = 3
        newElement.width = 2
        newElement.clockwiseRotation = "2Lleft90"
        return newElement
    }

    // L with leg to the right that is two blocks high and its rotated children
    if (type == "2Lright") {
        newElement.type = "2Lright"
        newElement.position = new Object()
        newElement.position.row = row 
        newElement.position.column = column
        newElement.occupancy = [[row, column], [row + 1, column], [row + 2, column], [row + 2, column + 1]]
        newElement.height = 3
        newElement.width = 2
        newElement.clockwiseRotation = "2Lright90"
        return newElement
    }
    if (type == "2Lright90") {
        newElement.type = "2Lright90"
        newElement.position = new Object()
        newElement.position.row = row 
        newElement.position.column = column - 2
        newElement.occupancy = [[row, column], [row, column - 1], [row, column - 2], [row + 1, column - 2]]
        newElement.height = 2
        newElement.width = 3
        newElement.clockwiseRotation = "2Lright180"
        return newElement
    }
    if (type == "2Lright180") {
        newElement.type = "2Lright180"
        newElement.position = new Object()
        newElement.position.row = row - 2
        newElement.position.column = column + 1
        newElement.occupancy = [[row, column + 2], [row - 1, column + 2], [row - 2, column + 2], [row - 2, column + 1]]
        newElement.height = 3
        newElement.width = 2
        newElement.clockwiseRotation = "2Lright270"
        return newElement
    }
    if (type == "2Lright270") {
        newElement.type = "2Lright270"
        newElement.position = new Object()
        newElement.position.row = row + 1
        newElement.position.column = column + 1
        newElement.occupancy = [[row + 2, column + 1], [row + 2, column + 2], [row + 2, column + 3], [row + 1, column + 3]]
        newElement.height = 2
        newElement.width = 3
        newElement.clockwiseRotation = "2LrightSub"
        return newElement
    }
    if (type == "2LrightSub") {
        newElement.type = "2LrightSub"
        newElement.position = new Object()
        newElement.position.row = row + 1
        newElement.position.column = column
        newElement.occupancy = [[row + 1, column], [row + 2, column], [row + 3, column], [row + 3, column + 1]]
        newElement.height = 3
        newElement.width = 2
        newElement.clockwiseRotation = "2Lright90"
        return newElement
    }

    // L with leg to the left that is three blocks high and its rotated children
    if (type == "3Lleft") {
        newElement.type = "3Lleft"
        newElement.position = new Object()
        newElement.position.row = row 
        newElement.position.column = column - 1
        newElement.occupancy = [[row, column], [row + 1, column], [row + 2, column], [row + 3, column], [row + 3, column - 1]]
        newElement.height = 4
        newElement.width = 2
        newElement.clockwiseRotation = "3Lleft90"
        return newElement
    }
    if (type == "3Lleft90") {
        newElement.type = "3Lleft90"
        newElement.position = new Object()
        newElement.position.row = row - 1
        newElement.position.column = column - 2
        newElement.occupancy = [[row, column + 1], [row, column], [row, column - 1], [row, column -2], [row -1, column - 2]]
        newElement.height = 2
        newElement.width = 4
        newElement.clockwiseRotation = "3Lleft180"
        return newElement
    }
    if (type == "3Lleft180") {
        newElement.type = "3Lleft180"
        newElement.position = new Object()
        newElement.position.row = row - 2
        newElement.position.column = column + 3
        newElement.occupancy = [[row + 1, column + 3], [row, column + 3], [row - 1, column + 3], [row - 2, column + 3], [row - 2, column + 4]]
        newElement.height = 4
        newElement.width = 2
        newElement.clockwiseRotation = "3Lleft270"
        return newElement
    }
    if (type == "3Lleft270") {
        newElement.type = "3Lleft270"
        newElement.position = new Object()
        newElement.position.row = row + 3
        newElement.position.column = column
        newElement.occupancy = [[row + 3, column], [row + 3, column + 1], [row + 3, column + 2], [row + 3, column + 3], [row + 4, column + 3]]
        newElement.height = 2
        newElement.width = 4
        newElement.clockwiseRotation = "3LleftSub"
        return newElement
    }
    if (type == "3LleftSub") {
        newElement.type = "3LleftSub"
        newElement.position = new Object()
        newElement.position.row = row
        newElement.position.column = column - 1
        newElement.occupancy = [[row, column], [row + 1, column], [row + 2, column], [row + 3, column], [row + 3, column - 1]]
        newElement.height = 4
        newElement.width = 2
        newElement.clockwiseRotation = "3Lleft90"
        return newElement
    }

    // L with leg to the right that is three blocks high and its rotated children
    if (type == "3Lright") {
        newElement.type = "3Lright"
        newElement.position = new Object()
        newElement.position.row = row 
        newElement.position.column = column
        newElement.occupancy = [[row, column], [row + 1, column], [row + 2, column], [row + 3, column], [row + 3, column + 1]]
        newElement.height = 4
        newElement.width = 2
        newElement.clockwiseRotation = "3Lright90"
        return newElement
    }
    if (type == "3Lright90") {
        newElement.type = "3Lright90"
        newElement.position = new Object()
        newElement.position.row = row 
        newElement.position.column = column - 3
        newElement.occupancy = [[row, column], [row, column - 1], [row, column - 2], [row, column - 3], [row + 1, column -3]]
        newElement.height = 2
        newElement.width = 4
        newElement.clockwiseRotation = "3Lright180"
        return newElement
    }
    if (type == "3Lright180") {
        newElement.type = "3Lright180"
        newElement.position = new Object()
        newElement.position.row = row - 3
        newElement.position.column = column + 2
        newElement.occupancy = [[row, column + 3], [row - 1, column + 3], [row - 2, column + 3], [row - 3, column + 3], [row - 3, column + 2]]
        newElement.height = 4
        newElement.width = 2
        newElement.clockwiseRotation = "3Lright270"
        return newElement
    }
    if (type == "3Lright270") {
        newElement.type = "3Lright270"
        newElement.position = new Object()
        newElement.position.row = row + 2
        newElement.position.column = column + 1
        newElement.occupancy = [[row + 3, column + 1], [row + 3, column + 2], [row + 3, column + 3], [row + 3, column + 4], [row + 2, column + 4]]
        newElement.height = 2
        newElement.width = 4
        newElement.clockwiseRotation = "3LrightSub"
        return newElement
    }
    if (type == "3LrightSub") {
        newElement.type = "3LrightSub"
        newElement.position = new Object()
        newElement.position.row = row + 1
        newElement.position.column = column
        newElement.occupancy = [[row + 1, column], [row + 2, column], [row + 3, column], [row + 4, column], [row + 4, column + 1]]
        newElement.height = 4
        newElement.width = 2
        newElement.clockwiseRotation = "3Lright90"
        return newElement
    }
}