import React from "react";
import Comparison from "./Comparison";

const Routine = () => {
  const schedule = [
    {
      part: "4:30 AM to 12:00 PM",
      firstStep: {
        details: {
          time: "4:30 AM - 6:30 AM",
          normalTask: ["Higher Order-1", "Islamic Knowledge"],
          focusOn: ["Physics School and Collage Revise new"],
          teachingPrivate: "6:30 AM to 9:30 AM",
        },
      },
      secondStep: {
        details: {
          time: "9:30 AM - 12:00 PM",
          normalTask: ["Take Bath"],
          focusOn: ["Write what you have revised on FirstStep"],
          teachingPrivate: "No Private Or another task have to do",
        },
      },
    },
    {
      part: "12:00 PM to 6:00 PM",
      firstStep: {
        details: {
          time: "12:00 PM - 2:30 PM",
          normalTask: ["Higher Order-2", "Lunch"],
          focusOn: ["Preliminary: For School And Collage"],
          teachingPrivate: "No Private Task Found here",
        },
      },
      secondStep: {
        details: {
          time: "2:30 PM - 6:00 PM",
          normalTask: ["Higher Order-3,4", "Islamic Knowledge"],
          focusOn: [
            "Preliminary: For School And Collage",
            "Private Home Batch",
          ],
          teachingPrivate: "4 PM to 5:30 PM",
        },
      },
    },
    {
      part: "6:00 PM to 11:00 PM",
      firstStep: {
        details: {
          time: "6:00 PM - 8:30 PM",
          normalTask: ["Higher Order-5"],
          focusOn: ["Web Development"],
          teachingPrivate: "No Private Task Found here",
        },
      },
      secondStep: {
        details: {
          time: "8:30 PM - 11:00 PM",
          normalTask: ["Dinner", "Books Reading + Play Badminton"],
          focusOn: ["Interview Question", "Documentation"],
          teachingPrivate: "No Private Task Found here",
        },
      },
    },
  ];

  return (
    <>
      <div style={{ background: "#4C44B9" }} className="min-h-screen p-6">
        <h1 className="text-3xl font-bold mb-6 text-yellow-300 text-center mt-12">
          Daily Routine
        </h1>
        <div className="overflow-x-auto">
          <table className="table-auto bg-white shadow-lg rounded-lg w-full max-w-5xl mx-auto border border-gray-300">
            <thead>
              <tr className="bg-blue-100">
                {/* <th className="px-4 py-3 text-left text-blue-800 font-semibold">
                Time Period
              </th> */}
                <th className="px-4 py-3 text-left text-blue-800 font-semibold">
                  Step
                </th>
                <th className="px-4 py-3 text-left text-blue-800 font-semibold">
                  Time
                </th>
                <th className="px-4 py-3 text-left text-blue-800 font-semibold">
                  Normal Tasks
                </th>
                <th className="px-4 py-3 text-left text-blue-800 font-semibold">
                  Focus Area
                </th>
                <th className="px-4 py-3 text-left text-blue-800 font-semibold">
                  Teaching Private
                </th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((part, index) => (
                <>
                  <tr
                    key={`part-${index}`}
                    className="bg-blue-200 font-bold border-b"
                  >
                    <td colSpan="6" className="px-4 py-2 text-gray-800">
                      {part.part}- Total time
                    </td>
                  </tr>

                  {["firstStep", "secondStep"].map((step, stepIndex) => (
                    <tr
                      key={`step-${index}-${stepIndex}`}
                      className={`${stepIndex % 2 === 0 ? "bg-blue-50" : "bg-white"
                        } border-b`}
                    >
                      <td className="px-4 py-2 text-gray-700">
                        {stepIndex === 0 ? "First Step" : "Second Step"}
                      </td>
                      <td className="px-4 py-2 text-gray-700">
                        {part[step].details.time}
                      </td>
                      <td className="px-4 py-2 text-gray-700">
                        <ul className="list-disc list-inside">
                          {part[step].details.normalTask.map((task, idx) => (
                            <li key={idx}>{task}</li>
                          ))}
                        </ul>
                      </td>
                      <td className="px-4 py-2 text-gray-700">
                        <ul className="list-decimal list-inside">
                          {part[step].details.focusOn.map((focus, idx) => (
                            <li key={idx}>{focus}</li>
                          ))}
                        </ul>
                      </td>
                      <td className="px-4 py-2 text-gray-700">
                        {part[step].details.teachingPrivate}
                      </td>
                    </tr>
                  ))}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Comparison/>
    </>
  );
};

export default Routine;
