const API_KEY = "AIzaSyCmho05whQKuzqH-9XI-13tBak-ZdiXy0Q";

export const model = {
  async generateContent(prompt: string | any) {
    const textPrompt = typeof prompt === "string" ? prompt : JSON.stringify(prompt);
    
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: textPrompt }] }]
        })
      }
    );

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error?.message || `HTTP ${response.status}`);
    }

    const data = await response.json();
    const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";

    return {
      response: {
        text: () => replyText
      }
    };
  }
};