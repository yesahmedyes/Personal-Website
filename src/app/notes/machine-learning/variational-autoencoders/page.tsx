import MainWithSidebar from "../../_components/mainWithSidebar";
import OtherInterpretations from "./components.tsx/otherInterpretations";
import VariationalAutoencoder from "./components.tsx/variationalAutoencoder";

export default function Page() {
  return (
    <MainWithSidebar>
      <VariationalAutoencoder />
      {/* <OtherInterpretations /> */}
    </MainWithSidebar>
  );
}
