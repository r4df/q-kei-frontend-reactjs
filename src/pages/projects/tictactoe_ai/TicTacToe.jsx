import React, { useState } from 'react'
import ContainerType1 from '../../../component/ContainerType1'
import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL;
const MOVE_N = null
const MOVE_X = 0
const MOVE_O = 1

const WON_X = MOVE_X
const WON_O = MOVE_O
const WON_DRAW = 2

const TicTacToe = () => {
    const symbolMap = new Map([[0, "X"], [1, "O"], [null, " "]])
    const initTurnDisplay = { user: { state: 1 }, ai: { state: 0 } }

    const [board, setBoard] = useState(Array(9).fill(null))
    const [boardDisplay, setBoardDisplay] = useState(Array(9).fill(" "))
    const [panelColor, setPanelColor] = useState(Array(9).fill("btn-dark"))
    const [statusDisplay, setStatusDisplay] = useState("User turn.")
    const [boardLock, setBoardLock] = useState(false)
    const [turnDisplay, setTurnDisplay] = useState(structuredClone(initTurnDisplay))

    const aiDelay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

    const turnDisplayStatus = (mode, icon) => {
        switch (mode) {
            default:
            case 0:
                return (
                    <div className="d-flex justify-content-center align-content-center rounded py-1 bg-secondary-subtle text-secondary">
                        <p className='p-0 m-0'><i className={`${icon}`}></i>:
                            <i className="bi bi-hourglass-split"></i>
                        </p>
                    </div>
                )
            case 1:
                return (
                    <div className="d-flex justify-content-center align-content-center rounded py-1 border border-primary bg-primary-subtle text-primary">
                        <p className='p-0 m-0'><i className={`${icon}`}></i>:
                            <i className="bi bi-controller pulse"></i>
                        </p>
                    </div>
                )
            case 3:
                return (
                    <div className="d-flex justify-content-center align-content-center rounded py-1 border border-success bg-success-subtle text-success">
                        <p className='p-0 m-0'><i className={`${icon} bounce-retro`}></i>:
                            <i className="bi bi-trophy-fill"></i>
                        </p>
                    </div>
                )
            case 4:
                return (
                    <div className="d-flex justify-content-center align-content-center rounded py-1 bg-secondary-subtle text-secondary">
                        <p className='p-0 m-0'><i className={`${icon}`}></i>:
                            <i className="bi bi-emoji-frown"></i>
                        </p>
                    </div>
                )
        }
    }

    const updatePanelColor = (winCombination) => {
        const newPanelColor = panelColor.slice()
        newPanelColor[winCombination[0]] = "btn-success"
        newPanelColor[winCombination[1]] = "btn-success"
        newPanelColor[winCombination[2]] = "btn-success"
        setPanelColor(newPanelColor)
    }

    const updateTurnDisplay = (newTurnDisplay, userState, aiState) => {
        let x = structuredClone(newTurnDisplay)
        x.user.state = userState
        x.ai.state = aiState
        setTurnDisplay(x)
        return x
    }

    const updateGameLogDisplay = (msgCode) => {

        switch (msgCode) {
            case 1:
                setStatusDisplay("User turn.")
                break
            case 2:
                setStatusDisplay("AI turn.")
                break
            case 3:
                setStatusDisplay("User won!")
                break
            case 4:
                setStatusDisplay("AI won!")
                break
            case 5:
                setStatusDisplay("Draw.")
                break
            case 6:
                setStatusDisplay("Already taken.")
                break
        }

        return
    }


    const handleClickTicTac = async (index) => {
        const newBoard = board.slice()
        let newTurnDisplay = structuredClone(turnDisplay)

        try {

            if (newBoard[index] != null) {
                updateGameLogDisplay(6)
                return 0
            }

            // ********************************
            // ********** USER turn ***********
            // ********************************
            updateGameLogDisplay(1)
            newTurnDisplay = updateTurnDisplay(newTurnDisplay, 1, 0)
            newBoard[index] = MOVE_X
            setBoard(newBoard)

            const displayUser = newBoard.map(symbol => symbolMap.get(symbol))
            setBoardDisplay(displayUser)

            // *************************************
            // ********** USER Win Check ***********
            // *************************************
            const userWinner = await axios.post(`${API_URL}/api/proj/tictactoe/checkwinner`, { board: newBoard })

            if (userWinner.data.winner === WON_X) {
                updatePanelColor(userWinner.data.combination)
                newTurnDisplay = updateTurnDisplay(newTurnDisplay, 3, 4)
                updateGameLogDisplay(3)
                return 0
            }

            if (userWinner.data.winner === WON_DRAW) {
                updateGameLogDisplay(5)
                setBoardLock(true)
                return 0
            }

            // ******************************
            // ********** AI turn ***********
            // ******************************
            updateGameLogDisplay(2)
            newTurnDisplay = updateTurnDisplay(newTurnDisplay, 0, 1)
            setBoardLock(true)
            const aiMove = await axios.post(`${API_URL}/api/proj/tictactoe/aimove`, { board: newBoard })
            setBoard(aiMove.data.board)
            await aiDelay(1000)

            const displayAi = aiMove.data.board.map(symbol => symbolMap.get(symbol))
            setBoardDisplay(displayAi)

            // ***********************************
            // ********** AI Win Check ***********
            // ***********************************
            const aiWinner = await axios.post(`${API_URL}/api/proj/tictactoe/checkwinner`, { board: aiMove.data.board });

            if (aiWinner.data.winner === WON_O) {
                updatePanelColor(aiWinner.data.combination)
                newTurnDisplay = updateTurnDisplay(newTurnDisplay, 4, 3)
                updateGameLogDisplay(4)
                return 0
            }

            newTurnDisplay = updateTurnDisplay(newTurnDisplay, 1, 0)
            setBoardLock(false)
            updateGameLogDisplay(1)
            return 0

        } catch (error) {
            console.error('Error making move:', error);
        }
    }

    const handleClickReset = () => {
        setBoard(Array(9).fill(null))
        setBoardDisplay(Array(9).fill(" "))
        setPanelColor(Array(9).fill("btn-dark"))
        setStatusDisplay("User turn.")
        setBoardLock(false)
        setTurnDisplay(structuredClone(initTurnDisplay))
        return 0
    }




    return (
        <div className='container'>

            <ContainerType1 className='d-lg-block d-none'>
                <h1>TicTacToe</h1>
            </ContainerType1>

            <ContainerType1 style={{ fontFamily: "zx-spectrum" }}>
                <div className='container col-lg-4'>
                    <div className="row mb-3">
                        {
                            boardDisplay.map((item, index) => (
                                <div className='col-4 p-0 m-0' key={index}>
                                    <button
                                        className={`btn ${panelColor[index]} ratio ratio-1x1 w-100 h-100 border border-1 border-gray`}
                                        key={index}
                                        onClick={() => handleClickTicTac(index)}
                                        disabled={boardLock}>
                                        <span className='d-flex align-items-center justify-content-center fs-lg-4 fs-1'>{item}</span>
                                    </button>
                                </div>
                            ))
                        }
                    </div>

                    <div className='row'>
                        <div className='col'>
                            <p className='p-0'>Status: {statusDisplay}</p>
                        </div>
                    </div>
                    <div className='row mb-3'>
                        <div className='col-6 fs-2'>
                            {turnDisplayStatus(turnDisplay.user.state, "bi bi-person-fill")}
                        </div>
                        <div className='col-6 fs-2'>
                            {turnDisplayStatus(turnDisplay.ai.state, "bi bi-robot")}
                        </div>
                    </div>

                    <div className='row'>
                        <button className='btn btn-primary mb-3' onClick={() => handleClickReset()}>Reset<i className="bi bi-arrow-clockwise ms-3"></i></button>
                    </div>
                </div>

            </ContainerType1>

        </div>
    )
}

export default TicTacToe
