import MainWithSidebar from "../../_components/mainWithSidebar";
import GDA from "./components/gda";
import NaiveBayes from "./components/naiveBayes";

export default function Page() {
  return (
    <MainWithSidebar>
      <GDA />
      <NaiveBayes />
    </MainWithSidebar>
  );
}
