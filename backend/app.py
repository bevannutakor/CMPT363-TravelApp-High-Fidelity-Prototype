import os
import json
import re
from flask import Flask, request, jsonify
from flask_cors import CORS
from google import genai
from google.genai import types
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

client = genai.Client(api_key=os.environ["GEMINI_API_KEY"])

SYSTEM_PROMPT = """You are a travel itinerary assistant. The user will give you a natural language request to modify their travel itinerary.

You MUST respond with ONLY a valid JSON object — no markdown, no code fences, no explanation text before or after the JSON. The JSON must have exactly this structure:

{
  "reply": "<a short, friendly plain-text message confirming what you did>",
  "updatedItinerary": {
    "tripName": "<string>",
    "days": [
      {
        "id": <integer>,
        "name": "<string, e.g. 'Day 1'>",
        "places": [
          {
            "id": "<kebab-case string, e.g. 'english-garden'>",
            "name": "<string>",
            "timeStart": "<HH:MM in 24-hour format>",
            "timeEnd": "<HH:MM in 24-hour format>",
            "description": "<string, can be empty string>",
            "isFavorite": <boolean>,
            "activities": [
              {
                "id": "<string, e.g. 'act1'>",
                "name": "<string>"
              }
            ]
          }
        ]
      }
    ],
    "chatHistory": [
      { "role": "user", "message": "<string>" },
      { "role": "assistant", "message": "<string>" }
    ]
  }
}

Rules you MUST follow:
1. Return ONLY the raw JSON object. No markdown. No ```json. No text before or after.
2. Always return the COMPLETE itinerary every time, not just the changed parts.
3. Times must always be in 24-hour HH:MM format (e.g. "13:30" not "1:30 PM").
4. When adding a new place, generate a unique kebab-case id from the place name (e.g. "english-garden").
5. When adding new activities to a place, generate sequential ids like "act1", "act2", etc.
6. Preserve all existing places and activities unless the user explicitly asks to remove them.
7. When the user asks to add a place without specifying a day, add it to Day 1 by default and mention this in your reply.
8. When the user asks to delete a place or activity, remove it completely from the JSON.
9. Append the new user message and your reply message to the chatHistory array.
10. If the user's request is ambiguous, make a reasonable assumption and explain it in the reply field.
"""


def extract_json(text: str) -> dict:
    """Parse JSON from model response, stripping markdown fences if present."""
    text = text.strip()
    text = re.sub(r'^```json\s*', '', text)
    text = re.sub(r'^```\s*', '', text)
    text = re.sub(r'\s*```$', '', text)
    return json.loads(text.strip())


@app.route("/api/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data.get("message", "").strip()
    itinerary = data.get("itinerary", {})

    if not user_message:
        return jsonify({"error": "message is required"}), 400

    prompt = f"""Current itinerary:
{json.dumps(itinerary, indent=2)}

User request: {user_message}"""

    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash-lite",
            contents=prompt,
            config=types.GenerateContentConfig(
                system_instruction=SYSTEM_PROMPT
            )
        )
        raw_text = response.text

        parsed = extract_json(raw_text)
        return jsonify(parsed), 200

    except json.JSONDecodeError:
        return jsonify({
            "error": "Failed to parse AI response as JSON",
            "raw": raw_text
        }), 500
    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True, port=5001)
