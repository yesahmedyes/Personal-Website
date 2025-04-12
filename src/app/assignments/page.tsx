import Navbar from "../_components/navbar";
import CourseAssignments from "./courseAssignments";

export default function Assignments() {
  return (
    <div className="flex flex-col h-full w-full lg:w-9/12 2xl:w-8/12 place-self-center pb-20 px-6 lg:px-0 gap-3 overflow-y-auto">
      <Navbar />

      <CourseAssignments />
    </div>
  );
}
