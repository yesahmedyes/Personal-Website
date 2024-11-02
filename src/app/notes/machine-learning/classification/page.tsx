import Main from "../../_components/main";
import LogisticRegression from "./components/logisticRegression";
import MulticlassClassification from "./components/multiclassClassification";

export default function Page() {
  return (
    <Main>
      <LogisticRegression />
      <MulticlassClassification />
    </Main>
  );
}
