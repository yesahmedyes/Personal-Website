import { BlockMath, InlineMath } from "react-katex";
import Content from "~/app/notes/_components/content";
import Section from "~/app/notes/_components/section";

export default function AdaBoost() {
  return (
    <Section heading="AdaBoost">
      <Content>
        <div>AdaBoost is a boosting algorithm that is used for classification tasks.</div>
        <div>For this we use an exponential loss function:</div>
        <div>
          <BlockMath math="\ell(H) = \exp\left(-y^{(i)} \cdot H(x^{(i)})\right)" />
        </div>
        <div>The gradient of this loss function is given by:</div>
        <div>
          <BlockMath math="\frac{\partial \ell}{\partial H(x^{(i)})} = -y^{(i)} \cdot \exp\left(-y^{(i)} \cdot H(x^{(i)})\right)" />
        </div>
        <div>
          Using this gradient, we can see that the best classifier <InlineMath math="h_t" /> is the one that minimizes the loss function can be written as a weighted misclassification error:
        </div>
        <div className="flex flex-col">
          <BlockMath math="h_{t+1} = \arg \min_{h \in \mathcal{H}} \left( \sum_{i=1}^{n} \mathbb{1}\left\{y^{(i)} \neq h(x^{(i)})\right\} \cdot w^{(i)} \right)" />
          <BlockMath math="w^{(i)} = \frac{\exp\left(-y^{(i)} \cdot H_t(x^{(i)})\right)}{\sum_{j=1}^{n} \exp\left(-y^{(j)} \cdot H_t(x^{(j)})\right)}" />
        </div>
      </Content>
    </Section>
  );
}
