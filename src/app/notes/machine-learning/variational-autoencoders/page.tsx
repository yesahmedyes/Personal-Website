import Main from "../../_components/main";
import OtherInterpretations from "./components.tsx/otherInterpretations";
import VariationalAutoencoder from "./components.tsx/variationalAutoencoder";

export default function Page() {
  return (
    <Main>
      <VariationalAutoencoder />
      {/* <OtherInterpretations /> */}
    </Main>
  );
}
