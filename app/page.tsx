"use client";
import { useEffect, useState } from "react";
import Input from "./components/Input";
import SelectInput from "./components/Select";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Radio from "./components/Radio";
import { MultiValue, SingleValue } from "react-select";
import { toast } from "sonner";
import Loader from "@/components/ui/Loader";
import { generateDietChart } from "@/lib/apiCall";
import DietChart from "./components/ShowDietChat";

export type FormType = {
  name: string;
  height: string;
  weight: string;
  age: string;
  medical_history: MultiValue<{ label: string; value: string }>;
  diet_preference: string;
  phosphorus?: string;
  serum?: string;
  creatine?: string;
  stage?: string;
  type: SingleValue<{ label: string; value: string }>;
};

export default function Home() {
  const [formData, setFormData] = useState<FormType>({
    name: "",
    height: "",
    weight: "",
    age: "",
    medical_history: [],
    diet_preference: "",
    phosphorus: "",
    serum: "",
    creatine: "",
    stage: "",
    type: { label: "choose type of disease", value: "" },
  });
  const [pageIndex, setpageIndex] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [DietData, setDietData] = useState();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return null;
  }

  const handleSubmit = async () => {
    if (
      !formData.name ||
      !formData.age ||
      !formData.diet_preference ||
      !formData.weight ||
      !formData.height ||
      !formData.type?.value
    ) {
      return toast("Kindly fill all the necessary fields");
    }
    try {
      setIsLoading(true);
      const result = await generateDietChart(formData);
      console.log(result);
      setDietData(result);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full overflow-auto min-h-screen py-10 flex items-center justify-center overflow-y-auto">
      {DietData ? (
        <DietChart data={DietData} />
      ) : (
        <Loader isLoading={isLoading}>
          <div className="w-full items-center justify-center flex flex-col">
            <div className="text-center justify-center items-center w-full flex flex-col">
              <h1 className="text-4xl lg:w-6xl pb-10 text-white opacity-90 font-bold">
                KidneyCare Diet Planner
              </h1>
              <h3 className="text-gray-700 opacity-90 font-semibold md:w-[80vw] lg:w-[60vw] text-center pb-5 text-lg leading-6">
                Create custom diet charts designed specifically for kidney
                patients Backed by science. Stay healthy with KidneyCare.
              </h3>
              <p className="text-lg font-medium tracking-wider pb-5">
                Begin your kidney-friendly diet journey—enter your details below
              </p>
            </div>
            <div className="w-2/3 lg:w-1/3 bg-white py-5 rounded-xl flex flex-col opacity-80">
              {pageIndex === 1 && (
                <div>
                  <h3 className="text-center text-2xl font-bold">
                    Personal Details
                  </h3>
                  <div className="flex flex-col">
                    <Input
                      placeholder="Enter Your name"
                      onchange={(e) => {
                        setFormData({ ...formData, name: e });
                      }}
                      value={formData.name || ""}
                    />
                    <Input
                      type="number"
                      placeholder="Enter Your height in cm"
                      onchange={(e) => {
                        setFormData({ ...formData, height: e });
                      }}
                      value={formData.height}
                      min={0}
                      max={1000}
                    />
                    <Input
                      type="number"
                      placeholder="Enter Your weight in kg"
                      onchange={(e) => {
                        setFormData({ ...formData, weight: e });
                      }}
                      value={formData.weight}
                      min={0}
                      max={1000}
                    />
                    <Input
                      type="number"
                      placeholder="Enter Your age"
                      onchange={(e) => {
                        setFormData({ ...formData, age: e });
                      }}
                      value={formData.age}
                    />
                  </div>
                  <div className="pt-2 pb-4">
                    <SelectInput
                      value={formData.medical_history}
                      onchange={(data) =>
                        setFormData({
                          ...formData,
                          medical_history: data as MultiValue<{
                            label: string;
                            value: string;
                          }>,
                        })
                      }
                      isMulti={true}
                      type={"history"}
                      placeholder={"Choose other medical conditions"}
                    />
                  </div>

                  <SelectInput
                    value={formData.type}
                    onchange={(data) =>
                      setFormData({
                        ...formData,
                        type: data as SingleValue<{
                          label: string;
                          value: string;
                        }>,
                      })
                    }
                    type={"types"}
                    placeholder={"choose type of disease"}
                  />

                  {formData.type?.value === "CKD" && (
                    <Input
                      onchange={(data) =>
                        setFormData({ ...formData, stage: data })
                      }
                      placeholder="Enter the stage of CKD (1-5)"
                      type="number"
                      value={formData.stage!}
                      max={5}
                      min={1}
                    />
                  )}
                </div>
              )}

              {pageIndex === 2 && (
                <div>
                  <h3 className="text-center font-bold text-2xl">
                    Dietary Preferences
                  </h3>
                  <div className="px-5 py-5">
                    <Radio
                      onchange={(data) =>
                        setFormData({ ...formData, diet_preference: data })
                      }
                      value={formData.diet_preference}
                    />
                  </div>
                </div>
              )}

              {pageIndex === 3 && (
                <div className="px-5">
                  <h3 className="text-center text-2xl font-bold py-2">
                    Lab Parameters Entry
                  </h3>
                  <p className="text-sm text-center text-gray-500 -mt-1">
                    optional but highly recommended
                  </p>
                  <div className="flex flex-col">
                    <Input
                      onchange={(data) =>
                        setFormData({ ...formData, phosphorus: data })
                      }
                      placeholder="Phosphorus value"
                      type="number"
                      value={formData.phosphorus!}
                    />
                    <Input
                      onchange={(data) =>
                        setFormData({ ...formData, serum: data })
                      }
                      placeholder="Serum value"
                      value={formData.serum!}
                      type="number"
                    />
                    <Input
                      onchange={(data) =>
                        setFormData({ ...formData, creatine: data })
                      }
                      placeholder="Creatine value"
                      value={formData.creatine!}
                      type="number"
                    />
                  </div>
                </div>
              )}

              <div className="max-w-[100%] justify-between px-2 mt-5 flex -ml-1 md:px-8">
                {pageIndex > 1 ? (
                  <button
                    type="button"
                    className="text-white bg-gradient-to-b from-blue-500  to-blue-400 hover:bg-blue-900 focus:ring-4 focus:outline-none  rounded-lg text-sm text-center font-bold cursor-pointer ml-3 me-2 mb-2 flex flex-row gap-2 px-2 py-1 items-center"
                    onClick={() => setpageIndex(pageIndex - 1)}
                  >
                    <ArrowLeft size={"20"} />
                    Previous{" "}
                  </button>
                ) : (
                  <div></div>
                )}
                <button
                  type="button"
                  className="text-white bg-gradient-to-b from-blue-500  to-blue-400 hover:bg-blue-900 focus:ring-4 focus:outline-none  rounded-lg text-sm text-center font-bold cursor-pointer mb-2 flex flex-row gap-5 px-2 py-2 items-center justify-center  focus:border-white"
                  onClick={
                    pageIndex < 3
                      ? () => setpageIndex(pageIndex + 1)
                      : handleSubmit
                  }
                >
                  {pageIndex < 3 ? (
                    <span className="flex flex-row gap-2">
                      {" "}
                      Continue <ArrowRight size={"20"} />
                    </span>
                  ) : (
                    <span className="px-5">Submit</span>
                  )}{" "}
                </button>
              </div>
            </div>
          </div>
        </Loader>
      )}
    </div>
  );
}
