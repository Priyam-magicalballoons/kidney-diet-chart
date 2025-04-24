"use client";
import html2pdf from "html2pdf.js";
import React, { useRef } from "react";
import {
  Apple,
  Drumstick,
  Salad,
  Droplet,
  AlertCircle,
  Flame,
  Utensils,
  BookOpenText,
} from "lucide-react";

interface DietData {
  name: string;
  recommendations: {
    overview: string;
    daily_calories: string;
    macronutrients: {
      protein: string;
      carbohydrates: string;
      fats: string;
    };
    meal_plan: any;
    foods_to_avoid: string[];
    hydration_advice: string;
    additional_notes: string;
  };
}

interface Props {
  data: DietData;
}

const DietChart: React.FC<Props> = ({ data }) => {
  const { recommendations } = data;
  return (
    <div  className="max-w-4xl mx-2 p-6 bg-white rounded-lg mt-10 ">
      <div className="w-full flex justify-end">
      <button className="py-1 px-3 rounded-md bg-blue-400 no-print text-white font-semibold" onClick={window.print}>Export to pdf</button>
      </div>
      <h1 className="text-3xl font-bold text-blue-700 text-center mb-4">
        {data.name}'s Kidney-Friendly Diet Chart
      </h1>

      <section className="mb-6">
        <div className="flex items-center gap-2 text-xl font-semibold text-gray-800">
          <BookOpenText size={22} />
          Overview
        </div>
        <p className="text-gray-700 mt-2">{recommendations.overview}</p>
      </section>

      <section className="mb-6">
        <div className="flex items-center gap-2 text-xl font-semibold text-gray-800">
          <Flame size={22} />
          Daily Calories & Macros
        </div>
        <ul className="ml-4 mt-2 text-gray-700 space-y-1">
          <li>🔥 Calories: {recommendations.daily_calories}</li>
          <li>🥩 Protein: {recommendations.macronutrients.protein}</li>
          <li>🍞 Carbohydrates: {recommendations.macronutrients.carbohydrates}</li>
          <li>🥑 Fats: {recommendations.macronutrients.fats}</li>
        </ul>
      </section>

      <section className="mb-6">
        <div className="flex items-center gap-2 text-xl font-semibold text-gray-800">
          <Utensils size={22} />
          Meal Plan
        </div>
        <ul className="ml-4 mt-2 text-gray-700  space-y-2 py-5">
          {recommendations?.meal_plan?.map((meal:any)=>{
            return (
              <div className="py-2">
                <b className="text-lg">
              {meal.meal_name}
                </b>
              {
                meal.options.map((option:any,index:number)=>{
                  return (
                    <div className="leading-[19px]">
                      <h3><span className="font-semibold ">Option : {index+1} - </span>{option.name}</h3>
                      <p className="ml-5">{option.description}</p>
                      <p className="ml-5">( {option.considerations} )</p>
                      <p className="ml-5 text-sm mb-2">
                        Nutients : Calories - {option.nutrients.calories}, Protein - {option.nutrients.protein}, Carbohydrates - {option.nutrients.carbohydrates}, Fat - {option.nutrients.fats}
                      </p>
                    </div>
                  )
                })
              }
            </div>
            )
          })}
          {/* <li><Drumstick className="inline-block mr-1" /> <strong>Lunch:</strong> {recommendations.meal_plan.lunch}</li>
          <li><Salad className="inline-block mr-1" /> <strong>Dinner:</strong> {recommendations.meal_plan.dinner}</li>
          <li><Utensils className="inline-block mr-1" /> <strong>Snacks:</strong> {recommendations.meal_plan.snacks}</li> */}
        </ul>
      </section>

      <section className="mb-6">
        <div className="flex items-center gap-2 text-xl font-semibold text-gray-800">
          <AlertCircle size={22} />
          Foods to Avoid
        </div>
        <ul className="list-disc list-inside mt-2 text-red-600 space-y-1">
          {recommendations.foods_to_avoid.map((food, index) => (
            <li key={index}>{food}</li>
          ))}
        </ul>
      </section>

      <section className="mb-6">
        <div className="flex items-center gap-2 text-xl font-semibold text-gray-800">
          <Droplet size={22} />
          Hydration Advice
        </div>
        <p className="text-gray-700 mt-2">{recommendations.hydration_advice}</p>
      </section>

      <section>
        <div className="flex items-center gap-2 text-xl font-semibold text-gray-800">
          <BookOpenText size={22} />
          Additional Notes
        </div>
        <p className="text-gray-700 mt-2">{recommendations.additional_notes}</p>
      </section>
    </div>
  );
};

export default DietChart;
