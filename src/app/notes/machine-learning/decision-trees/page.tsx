import Main from "../../_components/main";
import AdaBoost from "./components/adaboost";
import Bagging from "./components/bagging";
import Boosting from "./components/boosting";
import Introduction from "./components/introduction";

export default function Page() {
  return (
    <Main>
      <Introduction />
      <Bagging />
      <Boosting />
      <AdaBoost />
    </Main>
  );
}
