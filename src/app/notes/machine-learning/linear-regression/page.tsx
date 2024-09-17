import MainWithSidebar from "../../_components/mainWithSidebar";
import Section from "../../_components/section";

export default function LinearRegression() {
  return (
    <MainWithSidebar>
      <Section heading="First Section">
        <div className="flex flex-row place-items-center gap-2">Here is some inline math: $x^2 + y^2 = z^2$</div>
      </Section>
    </MainWithSidebar>
  );
}
