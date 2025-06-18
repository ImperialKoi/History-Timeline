"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { CheckCircle, XCircle, RotateCcw, Trophy, Clock, GripVertical } from "lucide-react"

interface HistoricalEvent {
  id: string
  name: string
  date: string
  year: number
}

const historicalEvents: HistoricalEvent[] = [
  { id: "1",  name: "Schlieffen Plan Developed",                date: "1905-01-01", year: 1905 },
  { id: "2",  name: "Assassination of Archduke Franz Ferdinand", date: "1914-06-28", year: 1914 },
  { id: "3",  name: "Start of World War I",                     date: "1914-07-28", year: 1914 },
  { id: "4",  name: "First Battle of the Ypres",                date: "1914-10-19", year: 1914 },
  { id: "5",  name: "Second Battle of the Ypres",               date: "1915-04-22", year: 1915 },
  { id: "6",  name: "Battle of the Somme (begin)",              date: "1916-07-01", year: 1916 },
  { id: "7",  name: "Zimmerman Telegram",                       date: "1917-01-17", year: 1917 },
  { id: "8",  name: "Vimy Ridge",                               date: "1917-04-09", year: 1917 },
  { id: "9",  name: "United States Enters WWI",                 date: "1917-04-06", year: 1917 },
  { id: "10", name: "Conscription Crisis (Canada)",             date: "1917-06-01", year: 1917 },
  { id: "11", name: "Passchendaele (Third Battle of Ypres)",    date: "1917-07-31", year: 1917 },
  { id: "12", name: "Russia Withdraws WW1",                     date: "1917-11-07", year: 1917 },
  { id: "13", name: "Halifax Explosion",                        date: "1917-12-06", year: 1917 },
  { id: "14", name: "Battle of Amiens",                         date: "1918-08-08", year: 1918 },
  { id: "15", name: "Armistice of World War I",                 date: "1918-11-11", year: 1918 },
  { id: "16", name: "Paris Peace Conference & Treaty of Versailles", date: "1919-06-28", year: 1919 },
  { id: "17", name: "Winnipeg General Strike",                  date: "1919-05-15", year: 1919 },
  { id: "18", name: "Prohibition Begins       ",                date: "1920-01-17", year: 1920 },
  { id: "19", name: "Munich Putsch",                            date: "1923-11-08", year: 1923 },
  { id: "20", name: "Hitler Sent to Prison",                    date: "1923-11-11", year: 1923 },
  { id: "21", name: "Persons Case Decision",                    date: "1929-10-18", year: 1929 },
  { id: "22", name: "Black Tuesday (Stock Market Crash)",       date: "1929-10-29", year: 1929 },
  { id: "23", name: "First Relief Camp Established in Canada",  date: "1932-01-01", year: 1932 },
  { id: "24", name: "Statute of Westminster",                   date: "1931-12-11", year: 1931 },
  { id: "25", name: "Hitler Becomes Chancellor",                date: "1933-01-30", year: 1933 },
  { id: "26", name: "Reichstag Fire",                           date: "1933-02-27", year: 1933 },
  { id: "27", name: "Night of the Long Knives",                 date: "1934-06-30", year: 1934 },
  { id: "28", name: "Hindenburg Dies; Hitler Assumes Full Power", date: "1934-08-02", year: 1934 },
  { id: "29", name: "On-to-Ottawa Trek",                       date: "1935-04-05", year: 1935 },
  { id: "30", name: "Regina Riot",                              date: "1935-07-01", year: 1935 },
  { id: "31", name: "Nuremberg Laws",                           date: "1935-01-01", year: 1935 },
  { id: "32", name: "Munich Agreement",                         date: "1938-09-30", year: 1938 },
  { id: "33", name: "Kristallnacht",                            date: "1938-11-09", year: 1938 },
  { id: "34", name: "S.S. St. Louis Departs",                   date: "1939-05-13", year: 1939 },
  { id: "35", name: "Non Agression Pact",                       date: "1939-08-23", year: 1939 },
  { id: "36", name: "Start of World War II",                    date: "1939-09-01", year: 1939 },
  { id: "37", name: "Pearl Harbor",                             date: "1941-12-07", year: 1941 },
  { id: "38", name: "Japanese Internment in Canada",            date: "1942-02-19", year: 1942 },
  { id: "39", name: "Dieppe Raid",                              date: "1942-08-19", year: 1942 },
  { id: "40", name: "Italian Campaign",                         date: "1943-07-10", year: 1943 },
  { id: "41", name: "D-Day (Operation Overlord)",               date: "1944-06-06", year: 1944 },
  { id: "42", name: "VE Day",                                   date: "1945-05-08", year: 1945 },
  { id: "43", name: "Hiroshima (Little Boy)",                   date: "1945-08-06", year: 1945 },
  { id: "44", name: "Nagasaki (Fat Man)",                       date: "1945-08-09", year: 1945 },
  { id: "45", name: "VJ Day",                                   date: "1945-08-15", year: 1945 },
  { id: "46", name: "WWII Officially Ends",                     date: "1945-09-02", year: 1945 },
  { id: "47", name: "Suez Canal Crisis",                        date: "1956-10-01", year: 1956 },
  { id: "48", name: "Sputnik Launched",                         date: "1957-10-04", year: 1957 },
  { id: "49", name: "NATO Founded",                             date: "1949-04-04", year: 1949 },
  { id: "50", name: "Korean War Begins",                        date: "1950-06-25", year: 1950 },
  { id: "51", name: "Vietnam War Begins",                       date: "1955-11-01", year: 1955 },
  { id: "52", name: "Canadian Bill of Rights",                  date: "1960-08-10", year: 1960 },
  { id: "53", name: "Cuban Missile Crisis",                     date: "1962-10-16", year: 1962 },
  { id: "54", name: "New Canadian Flag Adopted",                date: "1965-02-15", year: 1965 },
  { id: "55", name: "Vive le Québec Libre Speech",              date: "1967-07-24", year: 1967 },
  { id: "56", name: "Official Languages Act",                   date: "1969-07-07", year: 1969 },
  { id: "57", name: "White Paper on Indigenous Policy",         date: "1969-06-08", year: 1969 },
  { id: "58", name: "October Crisis",                           date: "1970-10-05", year: 1970 },
  { id: "59", name: "Multiculturalism Policy Announced",        date: "1971-10-08", year: 1971 },
  { id: "60", name: "Canada Act (Patriation)",                  date: "1982-04-17", year: 1982 },
  { id: "61", name: "Same‑Sex Marriage Legalized in Canada",    date: "2005-07-20", year: 2005 },
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

function getRandomEvents(count: number): HistoricalEvent[] {
  const shuffled = shuffleArray(historicalEvents)
  return shuffled.slice(0, count)
}

export default function Component() {
  const [events, setEvents] = useState<HistoricalEvent[]>([])
  const [gameEvents, setGameEvents] = useState<HistoricalEvent[]>([])
  const [gameState, setGameState] = useState<"playing" | "checking" | "completed">("playing")
  const [score, setScore] = useState(0)
  const [startTime, setStartTime] = useState<number>(Date.now())
  const [elapsedTime, setElapsedTime] = useState(0)
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const [dropIndicatorIndex, setDropIndicatorIndex] = useState<number | null>(null)
  const [showAnswerKey, setShowAnswerKey] = useState(false)

  useEffect(() => {
    resetGame()
  }, [])

  useEffect(() => {
    if (gameState === "playing") {
      const interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000))
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [gameState, startTime])

  const resetGame = () => {
    const selectedEvents = getRandomEvents(10)
    setGameEvents(selectedEvents)
    setEvents(shuffleArray(selectedEvents))
    setGameState("playing")
    setScore(0)
    setStartTime(Date.now())
    setElapsedTime(0)
    setShowAnswerKey(false)
  }

  const moveEvent = (index: number, direction: "up" | "down") => {
    if (gameState !== "playing") return

    const newEvents = [...events]
    const targetIndex = direction === "up" ? index - 1 : index + 1

    if (targetIndex >= 0 && targetIndex < newEvents.length) {
      ;[newEvents[index], newEvents[targetIndex]] = [newEvents[targetIndex], newEvents[index]]
      setEvents(newEvents)
    }
  }

  const moveToPosition = (currentIndex: number, newPosition: number) => {
    if (gameState !== "playing") return
    if (newPosition < 1 || newPosition > events.length) return

    const targetIndex = newPosition - 1
    if (targetIndex === currentIndex) return

    const newEvents = [...events]
    const [movedEvent] = newEvents.splice(currentIndex, 1)
    newEvents.splice(targetIndex, 0, movedEvent)
    setEvents(newEvents)
  }

  const getDropPosition = (e: React.DragEvent, cardIndex: number): number => {
    const card = e.currentTarget as HTMLElement
    const rect = card.getBoundingClientRect()
    const y = e.clientY
    const cardMiddle = rect.top + rect.height / 2

    // If dragging over the top half, insert before this card
    // If dragging over the bottom half, insert after this card
    return y < cardMiddle ? cardIndex : cardIndex + 1
  }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    if (gameState !== "playing" || draggedIndex === null) return
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"

    const dropPosition = getDropPosition(e, index)
    setDropIndicatorIndex(dropPosition)
  }

  const handleDrop = (e: React.DragEvent, cardIndex: number) => {
    if (gameState !== "playing" || draggedIndex === null) return
    e.preventDefault()

    const dropPosition = getDropPosition(e, cardIndex)

    // Calculate the actual target index for array manipulation
    let targetIndex = dropPosition
    if (draggedIndex < dropPosition) {
      targetIndex = dropPosition - 1
    }

    if (targetIndex !== draggedIndex && targetIndex >= 0 && targetIndex <= events.length) {
      const newEvents = [...events]
      const [draggedEvent] = newEvents.splice(draggedIndex, 1)
      newEvents.splice(targetIndex, 0, draggedEvent)
      setEvents(newEvents)
    }

    setDraggedIndex(null)
    setDropIndicatorIndex(null)
  }

  const handleDragStart = (e: React.DragEvent, index: number) => {
    if (gameState !== "playing") return
    setDraggedIndex(index)
    e.dataTransfer.effectAllowed = "move"
  }

  const handleDragLeave = (e: React.DragEvent) => {
    // Only clear if we're leaving the entire drop zone area
    const relatedTarget = e.relatedTarget as HTMLElement
    if (!relatedTarget || !e.currentTarget.contains(relatedTarget)) {
      setDropIndicatorIndex(null)
    }
  }

  const handleDragEnd = () => {
    setDraggedIndex(null)
    setDropIndicatorIndex(null)
  }

  // Touch event handlers for mobile
  const handleTouchStart = (e: React.TouchEvent, index: number) => {
    if (gameState !== "playing") return
    setDraggedIndex(index)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (gameState !== "playing" || draggedIndex === null) return
    e.preventDefault()

    const touch = e.touches[0]
    const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY)
    const cardElement = elementBelow?.closest("[data-event-index]")

    if (cardElement) {
      const rect = cardElement.getBoundingClientRect()
      const cardIndex = Number.parseInt(cardElement.getAttribute("data-event-index") || "0")
      const cardMiddle = rect.top + rect.height / 2

      const dropPosition = touch.clientY < cardMiddle ? cardIndex : cardIndex + 1
      setDropIndicatorIndex(dropPosition)
    }
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (gameState !== "playing" || draggedIndex === null || dropIndicatorIndex === null) return

    // Calculate the actual target index for array manipulation
    let targetIndex = dropIndicatorIndex
    if (draggedIndex < dropIndicatorIndex) {
      targetIndex = dropIndicatorIndex - 1
    }

    if (targetIndex !== draggedIndex && targetIndex >= 0 && targetIndex <= events.length) {
      const newEvents = [...events]
      const [draggedEvent] = newEvents.splice(draggedIndex, 1)
      newEvents.splice(targetIndex, 0, draggedEvent)
      setEvents(newEvents)
    }

    setDraggedIndex(null)
    setDropIndicatorIndex(null)
  }

  const checkRelativeOrder = () => {
    // Sort the game events by their actual chronological order
    const correctOrder = [...gameEvents].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    // Create a map of event ID to its correct chronological position
    const correctPositions = new Map<string, number>()
    correctOrder.forEach((event, index) => {
      correctPositions.set(event.id, index)
    })

    let correctCount = 0

    // Check each event's relative position
    events.forEach((event, currentIndex) => {
      const correctPos = correctPositions.get(event.id)!
      let isCorrectRelative = true

      // Check if this event is in correct order relative to all other events
      events.forEach((otherEvent, otherIndex) => {
        if (event.id === otherEvent.id) return

        const otherCorrectPos = correctPositions.get(otherEvent.id)!

        // If this event should come before the other event chronologically
        if (correctPos < otherCorrectPos) {
          // But in current order it comes after, then it's wrong
          if (currentIndex > otherIndex) {
            isCorrectRelative = false
          }
        }
        // If this event should come after the other event chronologically
        else if (correctPos > otherCorrectPos) {
          // But in current order it comes before, then it's wrong
          if (currentIndex < otherIndex) {
            isCorrectRelative = false
          }
        }
      })

      if (isCorrectRelative) {
        correctCount++
      }
    })

    setScore(correctCount)
    setGameState(correctCount === events.length ? "completed" : "checking")
    setShowAnswerKey(true)
  }

  const getEventStatus = (index: number): "correct" | "incorrect" | "neutral" => {
    if (gameState === "playing") return "neutral"

    // Sort the game events by their actual chronological order
    const correctOrder = [...gameEvents].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

    // Create a map of event ID to its correct chronological position
    const correctPositions = new Map<string, number>()
    correctOrder.forEach((event, idx) => {
      correctPositions.set(event.id, idx)
    })

    const event = events[index]
    const correctPos = correctPositions.get(event.id)!

    // Check if this event is in correct order relative to all other events
    let isCorrectRelative = true
    events.forEach((otherEvent, otherIndex) => {
      if (event.id === otherEvent.id) return

      const otherCorrectPos = correctPositions.get(otherEvent.id)!

      if (correctPos < otherCorrectPos && index > otherIndex) {
        isCorrectRelative = false
      } else if (correctPos > otherCorrectPos && index < otherIndex) {
        isCorrectRelative = false
      }
    })

    return isCorrectRelative ? "correct" : "incorrect"
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-4 sm:space-y-6 my-6 sm:my-8">
      <div className="text-center space-y-3 sm:space-y-4">
        <h1 className="text-2xl sm:text-3xl font-bold">Historical Timeline Challenge</h1>
        <p className="text-sm sm:text-base text-muted-foreground px-2">
          Arrange these 10 historical events in chronological order
        </p>
        <p className="text-xs sm:text-sm text-muted-foreground px-2">
          💡 Drag and drop, use buttons, or type a position number to reorder
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span className="text-sm sm:text-base">{formatTime(elapsedTime)}</span>
          </div>
          {gameState !== "playing" && (
            <div className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              <span className="text-sm sm:text-base">
                Score: {score}/{events.length}
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 pb-4">
          <Button onClick={checkRelativeOrder} disabled={gameState !== "playing"} className="w-full sm:w-auto">
            Check Answer
          </Button>
          <Button onClick={resetGame} variant="outline" className="w-full sm:w-auto">
            <RotateCcw className="h-4 w-4 mr-2" />
            New Game
          </Button>
        </div>
      </div>

      {gameState === "completed" && (
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 text-green-700">
              <Trophy className="h-5 w-5" />
              <span className="font-semibold">Perfect! All events in correct order!</span>
            </div>
            <p className="text-green-600 mt-2">Completed in {formatTime(elapsedTime)}</p>
          </CardContent>
        </Card>
      )}

      {showAnswerKey && (
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-blue-800">📚 Answer Key - Correct Timeline</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAnswerKey(false)}
                className="text-blue-600 hover:text-blue-800"
              >
                Hide
              </Button>
            </div>
            <div className="space-y-2">
              {[...gameEvents]
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                .map((event, index) => (
                  <div
                    key={event.id}
                    className="flex items-center gap-3 p-2 bg-white rounded-lg border border-blue-100"
                  >
                    <Badge variant="secondary" className="min-w-[50px] justify-center text-xs">
                      #{index + 1}
                    </Badge>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{event.name}</h4>
                      <p className="text-xs text-muted-foreground">
                        {new Date(event.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-blue-700">{event.year}</p>
                    </div>
                  </div>
                ))}
            </div>
            <div className="mt-4 p-3 bg-blue-100 rounded-lg">
              <p className="text-xs text-blue-700">
                💡 <strong>Tip:</strong> Events are sorted by their exact dates. Some events from the same year may
                surprise you with their specific timing!
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-2 sm:space-y-3 relative">
        {events.map((event, index) => {
          const status = getEventStatus(index)
          const isDragging = draggedIndex === index

          return (
            <div key={event.id} className="relative">
              {/* Drop indicator line - shows above this card */}
              {dropIndicatorIndex === index && (
                <div className="absolute -top-1 left-0 right-0 h-0.5 bg-blue-500 rounded-full z-10 shadow-lg">
                  <div className="absolute -left-1 -top-1 w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="absolute -right-1 -top-1 w-2 h-2 bg-blue-500 rounded-full"></div>
                </div>
              )}

              <Card
                data-event-index={index}
                draggable={gameState === "playing"}
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, index)}
                onDragEnd={handleDragEnd}
                onTouchStart={(e) => handleTouchStart(e, index)}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                className={`transition-all duration-200 ${
                  status === "correct"
                    ? "bg-green-50 border-green-200"
                    : status === "incorrect"
                      ? "bg-red-50 border-red-200"
                      : "hover:bg-gray-50"
                } ${isDragging ? "opacity-50 scale-95 rotate-2 shadow-lg" : ""} ${
                  gameState === "playing" ? "cursor-move active:cursor-grabbing" : ""
                }`}
              >
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                      {gameState === "playing" && <GripVertical className="h-4 w-4 text-gray-400 flex-shrink-0" />}
                      <Badge
                        variant="outline"
                        className="min-w-[50px] sm:min-w-[60px] justify-center text-xs sm:text-sm"
                      >
                        #{index + 1}
                      </Badge>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm sm:text-base leading-tight">{event.name}</h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                      {gameState === "playing" && (
                        <div className="flex items-center gap-1 sm:gap-2">
                          <span className="text-xs text-muted-foreground hidden sm:inline">Move to:</span>
                          <Input
                            type="number"
                            min="1"
                            max={events.length}
                            placeholder="#"
                            className="w-12 sm:w-16 h-7 sm:h-8 text-center text-xs sm:text-sm"
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                const value = Number.parseInt((e.target as HTMLInputElement).value)
                                if (value >= 1 && value <= events.length) {
                                  moveToPosition(index, value)
                                  ;(e.target as HTMLInputElement).value = ""
                                }
                              }
                            }}
                          />
                        </div>
                      )}

                      {gameState !== "playing" && (
                        <div className="mr-1 sm:mr-2">
                          {status === "correct" ? (
                            <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                          ) : (
                            <XCircle className="h-4 w-4 sm:h-5 sm:w-5 text-red-600" />
                          )}
                        </div>
                      )}

                      {gameState === "playing" && (
                        <div className="flex flex-col gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => moveEvent(index, "up")}
                            disabled={index === 0}
                            className="h-6 sm:h-7 w-12 sm:w-16 text-xs p-1"
                          >
                            ↑
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => moveEvent(index, "down")}
                            disabled={index === events.length - 1}
                            className="h-6 sm:h-7 w-12 sm:w-16 text-xs p-1"
                          >
                            ↓
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Drop indicator line - shows below the last card */}
              {dropIndicatorIndex === events.length && index === events.length - 1 && (
                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-500 rounded-full z-10 shadow-lg">
                  <div className="absolute -left-1 -top-1 w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="absolute -right-1 -top-1 w-2 h-2 bg-blue-500 rounded-full"></div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {gameState === "checking" && score < events.length && (
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-4 text-center">
            <p className="text-yellow-700 text-sm sm:text-base">
              {score} out of {events.length} events are in correct relative order.
              <br className="sm:hidden" />
              <span className="block sm:inline mt-1 sm:mt-0"> Keep adjusting to get them all right!</span>
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
