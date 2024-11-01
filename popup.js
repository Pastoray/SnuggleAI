const button = document.getElementById('clickButton')
const input = document.getElementById('input')
const spinner = document.getElementById('spinner')
const output = document.getElementById('message')

const promptAi = async () => {
  if (typeof window.ai !== "undefined")
  {
    try {
      const session = await window.ai.languageModel.create()
      const input_value = input.value
      
      if(input_value !== "")
      {
        button.disabled = true
        input.disabled = true
        spinner.style.display = "inline-block"
        
        const prompt = `You are a fact-checking assistant. \
          Your main responsibility is to verify the accuracy of information provided to you. \
          If a user asks a question that is outside your scope or is irrelevant, \
          respond with: 'I'm sorry, but I can't help with that.' Please provide accurate and concise answers to all fact-checking requests. \
          Here is your prompt: ${input_value}`
  
        const result = await session.prompt(prompt)
        output.innerText = result
      }
    }
    catch (error)
    {
      console.error("Error using window.ai:", error)
      document.getElementById("message").innerText = "Failed to generate a response."
    }
  }
  else
  {
    console.log("window.ai is not available.")
    document.getElementById("message").innerText = "AI functionality is not available."
  }
  spinner.style.display = "none"
  button.disabled = false
  input.disabled = false
  input.value = ""
}

document.addEventListener("keydown", async (event) => {
  if (event.key === "Enter") await promptAi()
})
button.addEventListener("click", promptAi)
