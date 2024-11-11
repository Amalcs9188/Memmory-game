import React, { useEffect, useState } from 'react'



const Game = () => {
  const [boardSize, setBoardSize] = useState(4)
  const [cards, setCards] = useState([])
  const [selectedCards, setSelectedCards] = useState([])
  const [solved, setSolved] = useState([]);
  const [won, setWon] = useState();





  const getNumbers = (e) => {
    const newSize = parseInt(e.target.value)
    if (newSize >= 2 && newSize <= 10) {

      setBoardSize(newSize)
    } else {
      alert('Please enter a number between 2 and 10')
    }



  }

  const initialize = () => {
    const totalNumbers = boardSize * boardSize
    const numbers = Math.floor(totalNumbers / 2)
    const numbersArray = [...Array(numbers).keys()].map((num) => num + 1)
    const newarray = [...numbersArray, ...numbersArray].sort(() => (Math.random() - 0.5))
    const shuffledarray = newarray.map((num, index) => ({ id: index, num }))
    setCards(shuffledarray)
  }
  useEffect(() => {
    initialize()
  }, [boardSize])

  useEffect(() => {
    if (solved.length === cards.length && cards.length > 0) {
      setWon(true);

    }



  }, [solved, cards]);

  const checkNum = (secondid) => {
    const firstid = selectedCards[0];

    if (cards[firstid].num === cards[secondid].num) {
      setSolved([...solved, firstid, secondid]);
      setSelectedCards([]);

    }
    else {
      setTimeout(() => {
        setSelectedCards([]);

      }, 1000);

    }



  }

  const playgame = (id) => {
    if (selectedCards.length == 0) {
      setSelectedCards([id]);
      

    }
    if (selectedCards.length == 1) {
      if (selectedCards[0] !== id) {
        setSelectedCards([...selectedCards, id]);
        checkNum(id)

      }
      else {

        setSelectedCards([])

      }
    }

  }
  const reset = () => {
    setSelectedCards([])
    setSolved([])
    setWon(false)
    initialize()
  }



  const isSelected = (id) => selectedCards.includes(id) || solved.includes(id)
  const isSolved = (id) => solved.includes(id)








  return (
    <div className=' flex justify-center items-center flex-col'>
      <h1 className=' text-4xl text-green-800 font-serif font-bold mb-5' >Memmory Game</h1>
      {/* Game Board */}
      <div>
        <label htmlFor="board">Select Board</label>
        <input min={2} max={10} onChange={getNumbers} placeholder='set your board' className='  px-4 mx-4 text-center w-32 border border-gray-600 placeholder:text-gray-700' type="number" name="board" value={boardSize} id="board" />
      </div>
      <div className=''
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${boardSize},minmax(0,1fr))`,
          gridGap: '1rem',
          padding: '2rem'
        }}>

        {
          cards?.map((card) => {
            return <div
              key={card.id}
              onClick={() => playgame(card.id)}
              className={` transition-all aspect-square  flex justify-center items-center p-4 rounded-lg ${isSelected(card.id)
                ? isSolved(card.id) ? "bg-green-600 text-white" : "bg-blue-600 text-white" : "bg-slate-400"}`}
            >{isSelected(card.id) ? card.num : "?"}</div>
          })
        }

      </div>

      {won && <h1 className='text-5xl text-green-800 text-center animate-bounce'>You Won!</h1>}
      <button  onClick={reset} className=' transition-all duration-500 px-4 py-2 text-white bg-green-600 mt-9 hover:bg-green-800 rounded-lg'>Play Again</button>
    </div>
  )
}

export default Game
