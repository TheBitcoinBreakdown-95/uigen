import { Button } from "@/components/ui/button"
import { useState } from "react"

// Test component with intentional issues for Claude to fix
export default function TestButton() {
  const [count, setCount] = useState(0)
  const unusedVariable = "This variable is unused"  // Linting error: unused variable
  const anotherUnused = 123

  // Missing type annotation
  const handleClick = (e) => {
    setCount(count + 1)
    console.log("Button clicked")  // Should maybe be removed in production
  }

  // Incorrect prop type
  const disabled: string = false

  return (
    <div className="flex flex-col gap-4 p-4">
      <h2 className="text-2xl font-bold">Test Component</h2>
      <p>Click count: {count}</p>
      <Button
        onClick={handleClick}
        disabled={disabled}
        variant="default"
      >
        Click me ({count})
      </Button>
    </div>
  )
}
