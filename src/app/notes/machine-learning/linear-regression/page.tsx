import MainWithSidebar from "../../_components/mainWithSidebar";
import Section from "../../_components/section";

export default function LinearRegression() {
  return (
    <MainWithSidebar heading="Linear Regression">
      <Section heading="First Section">
        <div className="flex flex-row place-items-center gap-2">Here is some inline math: $x^2 + y^2 = z^2$</div>
      </Section>

      <div id="Second Section" className="h-screen w-full bg-purple-50"></div>
      <div id="Third Section" className="h-screen w-full bg-rose-50"></div>
    </MainWithSidebar>
  );
}
