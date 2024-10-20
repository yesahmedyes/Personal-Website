import MainWithSidebar from "../../_components/mainWithSidebar";
import LogisticRegression from "./components/logisticRegression";
import MulticlassClassification from "./components/multiclassClassification";

export default function Classification() {
  return (
    <MainWithSidebar>
      <LogisticRegression />
      <MulticlassClassification />
    </MainWithSidebar>
  );
}
