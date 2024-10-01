"use client"

import { useState, useEffect, ChangeEvent} from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


interface NumberGuessingState {
    gameStarted: boolean
    gameOver: boolean
    paused: boolean
    targetNumber: number
    userGuess: number | string
    attempts: number
}

export default function NumberGuessing(): JSX.Element {
    const [gameStarted, setGameStarted] = useState<boolean>(false)
    const [gameOver, setGameOver] = useState<boolean>(false)
    const [paused, setPaused] = useState<boolean>(false)
    const [targetNumber, setTargetNumber] = useState<number>(0)
    const [userGuess, setUserGuess] = useState<number | string>("")
    const [attempts, setAttempts] = useState<number>(0)
    const [feedbackMessage, setFeedbackMessage] = useState<string>("")


    useEffect(() => {
        if(gameStarted && !paused) {
            const randomNumber: number = Math.floor(Math.random() * 10) + 1
             setTargetNumber(randomNumber)
        }
    }, [gameStarted, paused])

    const handleStartGame = (): void => {
        setGameStarted(true)
        setGameOver(false)
        setPaused(false)
        setAttempts(0)
        setFeedbackMessage("")
    }

    const handlePausedGame = (): void => {
        setPaused(true)
    }

    const handleResumeGame = (): void => {
        setPaused(false)
    }

    const handleUserGuess = (): void => {
        if(typeof userGuess === "number" && userGuess === targetNumber) {
            setGameOver(true)
            setFeedbackMessage("Congratulations! You guessed the right number 🎉")
        } else {
            setAttempts(attempts + 1)
            setFeedbackMessage("You guessed the wrong number! Try again")
        }
    }

    const handleTryAgain = (): void => {
        setGameStarted(false)
        setGameOver(false)
        setUserGuess("")
        setAttempts(0)
        setFeedbackMessage("")
    }

    const handleUserGuessChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setUserGuess(parseInt(e.target.value))
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-900 t0-black">
           <div className="bg-gray-400 rounded-lg shadow-lg p-8 w-full max-w-md">
               <h1 className="text-2xl font-bold text-center mb-2 text-black">
                     Number Guessing Game
               </h1>
               <p className="text-center text-gray-800 mb-4">
                    Try to guess the number between 1 and 10
               </p>
               {!gameStarted && (
                <div className="flex justify-center mb-4 ">
                    <Button 
                       onClick={handleStartGame}
                       className="bg-black text-white font-bold py-2 px-4 rounded border-2 border-black hover:bg-transparent hover:text-black hover:border-black"
                    >
                         Start Game
                    </Button>
                </div>
               )}
               {gameStarted && !gameOver && (
                 <div>
                    <div className="flex justify-center mb-4">
                    {paused ? (
                       <Button
                         onClick={handleResumeGame}
                         className="bg-black text-white font-bold py-2 px-4 rounded border-2 border-black hover:bg-transparent hover:text-black hover:border-black"
                       >
                         Resume
                       </Button>
                    ): (
                      
                        <Button
                         onClick={handlePausedGame}
                         className="bg-black text-white font-bold py-2 px-4 rounded border-2 border-black hover:bg-transparent hover:text-black hover:border-black"
                        >
                           Pause
                        </Button>
                    )}
                    </div>
                    <div className="flex justify-center mb-4">
                     <Input
                       type="number"
                       value={userGuess}
                       onChange={handleUserGuessChange}
                       className="bg-gray-100 border border-gray-300 rounded-lg py-2 px-4 w-full max-w-xs"
                     />
                     <Button
                     onClick={handleUserGuess}
                     className="bg-black text-white font-bold py-2 px-4 rounded ml-4 border-2 border-black hover:bg-transparent hover:text-black hover:border-black "
                     >
                       Guess

                     </Button>
                    </div>
                    <div className="text-center text-black">
                      <p>Attempts: {attempts}</p>
                    </div>
                    <div className="text-center text-red-500 font-bold">
                        <p>{feedbackMessage}</p>
                    </div>
                 </div>
               )}
                 {gameOver && (
                    <div>
                        <div className="text-center mb-4 text-black">
                            <h2 className="text-2xl font-bold">Game Over</h2>
                            <p>{feedbackMessage}</p>
                            <p>You guessed the number in {attempts} attempts</p>
                        </div>
                        <div className="flex justify-center">
                            <Button
                             onClick={handleTryAgain}
                             className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                            >
                              Try Again
                            </Button>
                        </div>
                    </div>
                 )}

           </div>
        </div>
    )
}