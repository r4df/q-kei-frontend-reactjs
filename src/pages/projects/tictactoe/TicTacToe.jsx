import React, { useState } from 'react'
import ContainerType1 from '../../../component/ContainerType1'
const SYMBOL_X = "X"
const SYMBOL_O = "O"

const TicTacToe = () => {
    const [board, setBoard] = useState(Array(9).fill(null))
    const [panelColor, setPanelColor] = useState(Array(9).fill("btn-dark"))
    const [currentMove, setCurrentMove] = useState(SYMBOL_X)

    const handleClickTicTac = (index) => {

        const initCheckWinnerResult = checkWinner(board)
        if (board[index] || initCheckWinnerResult[0]) return;

        const newBoard = board.slice() // Shallow copy (To make sure update is detected)
        let newPanelColor = panelColor.slice() // Shallow copy (To make sure update is detected)

        newBoard[index] = currentMove
        newPanelColor[index] = "btn-light"

        const reCheckWinnerResult = checkWinner(newBoard)
        newPanelColor = winnerPanel(newPanelColor, reCheckWinnerResult[1])

        setBoard(newBoard)
        setPanelColor(newPanelColor)
        changeMove()
        
        return
    }

    const handleClickReset = () => {
        setBoard(Array(9).fill(null));
        setPanelColor(Array(9).fill("btn-dark"));
        setCurrentMove(SYMBOL_X)
        return
    }

    const winnerPanel = (tempBoard, winningPattern) =>{
        if(winningPattern){
            const [a, b, c] = winningPattern
            tempBoard[a] = "btn-success"
            tempBoard[b] = "btn-success"
            tempBoard[c] = "btn-success"
        }
        return tempBoard
    }

    const checkWinner = (tempBoard) => {
        const winnerCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ]

        for (const item of winnerCombinations) {
            const [a, b, c] = item
            if (tempBoard[a] && (tempBoard[a] === tempBoard[b] && tempBoard[b] === tempBoard[c])) {
                return [tempBoard[a], item]
            }
        }
        return [null, null]
    }

    const changeMove = () => {
        if (currentMove === SYMBOL_X) {
            setCurrentMove(SYMBOL_O)
        } else {
            setCurrentMove(SYMBOL_X)
        }
    }


    const winner = checkWinner(board);

    return (
        <div className='container'>

            <ContainerType1 className='d-lg-block d-none'>
                <h1>TicTacToe</h1>
            </ContainerType1>

            <ContainerType1 style={{ fontFamily: "zx-spectrum" }}>
                <div className='container col-lg-4'>
                    <div className="row mb-3">
                        {
                            board.map((item, index) => (
                                <div className='col-4 p-0 m-0' key={index}>
                                    <button
                                        className={`btn ${panelColor[index]} ratio ratio-1x1 w-100 h-100 border border-1 border-gray`}
                                        key={index}
                                        onClick={() => handleClickTicTac(index)}>
                                        <span className='d-flex align-items-center justify-content-center fs-lg-4 fs-1'>{item}</span>
                                    </button>
                                </div>
                            ))
                        }
                    </div>

                    <div className='row'>
                        <p className='p-0'>Status: {winner[0] ? `${winner[0]} won` : `-`}</p>
                    </div>

                    <div className='row'>
                        <button className='btn btn-primary mb-3' onClick={() => handleClickReset()}>Reset<i class="bi bi-arrow-clockwise ms-3"></i></button>
                    </div>
                </div>

            </ContainerType1>

        </div>
    )
}

export default TicTacToe
