import openai
from datetime import datetime
import os

class IndianNutritionChatbot:
    def __init__(self):
        """Initialize the nutrition chatbot with API key and context."""
        self.client = openai.OpenAI(api_key=os.getenv('OPENAI_API_KEY'))
        # System prompt for Indian nutrition context
        self.system_prompt = """You are an expert nutritionist specializing in Indian dietary patterns and nutrition.
        keep the output in a point format and as short as possible if the user asks for only a recomendation for type of food just give him names in separate lines
        see that u start new point in a new line when u give outupt keep it chort and precise 4-5 lines is preferable"""

        self.conversation_history = [{"role": "system", "content": self.system_prompt}]

    def generate_response(self, user_query):
        """Generate a nutrition-focused response based on user query."""
        try:
            self.conversation_history.append({"role": "user", "content": user_query})

            response = self.client.chat.completions.create(
                model="gpt-4o",
                messages=self.conversation_history,
                max_tokens=500,
                temperature=0.7,
                presence_penalty=0.6,
                frequency_penalty=0.3
            )

            chatbot_response = response.choices[0].message.content
            self.conversation_history.append({"role": "assistant", "content": chatbot_response})

            return chatbot_response

        except Exception as e:
            return f"Error generating response: {str(e)}"

    def reset_conversation(self):
        """Reset the conversation history while maintaining the system prompt."""
        self.conversation_history = [{"role": "system", "content": self.system_prompt}]
