import { FormType } from "@/app/page";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!); // Replace with your actual API key

type OptionType = { label: string; value: string };

interface DietFormInput {
  name: string;
  height: string;
  weight: string;
  age: string;
  medical_history: OptionType[];
  diet_preference: string;
  phosphorus?: string;
  serum?: string;
  creatine?: string;
  stage?: string;
  type: OptionType | null;
}

export async function generateDietChart(data: FormType) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `
You are a certified renal dietitian AI. A patient has submitted their information to generate a personalized kidney-safe diet plan. create detailed Indian style diet plan with multiple options along with proper timing ranges.

Patient Details:
- Name: ${data.name}
- Age: ${data.age}
- Height: ${data.height} cm
- Weight: ${data.weight} kg
- Disease Type: ${data.type?.label || "Not specified"}
- Stage (if CKD): ${data.stage || "Not specified"}
- Dietary Preference: ${data.diet_preference}
- Medical History: ${
    data.medical_history.map((m) => m.label).join(", ") || "None"
  }

Lab Parameters (Optional):
- Phosphorus: ${data.phosphorus || "Not provided"}
- Serum: ${data.serum || "Not provided"}
- Creatine: ${data.creatine || "Not provided"}

Please generate a JSON response with the following structure:
{
  "name": "Patient Name",
  "recommendations": {
    "overview": "Summary of the condition and dietary needs",
    "daily_calories": "Estimated daily calorie intake",
    "macronutrients": {
      "protein": "...",
      "carbohydrates": "...",
      "fats": "..."
    },
    "meal_plan": [{
    "meal_name" : "...",
    "options" : [
    "name" : "...",
    "description" : "...",
    "considerations" : "...",
    "nutrients" :{
    "calories" : "...",
    "protein" : "...",
    "carbohydrates : "...",
    "fats" : "..."
    }
    ]
    }]
    "foods_to_avoid": [High-potassium vegetables (...)
      High-phosphorus foods (...)
      High-sodium foods (...)
      High-oxalate foods (...)
      Fruits like ...
      ...
      ],
    "hydration_advice": "...",
    "additional_notes": "Any other specific advice"
  }
}
Only respond with the JSON. Do not add any text outside the JSON.
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response.text();

  try {
    console.log(response);
    console.log(response.replace("```", "").replace("```json", ""));
    return JSON.parse(
      response.replace("```json", "").replace("```", "").replace("json", "")
    );
  } catch (e) {
    console.error("Failed to parse Gemini response:", response);
    throw new Error("Invalid JSON returned from Gemini");
  }
}
