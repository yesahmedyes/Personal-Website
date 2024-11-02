import { BlockMath, InlineMath } from "react-katex";
import Algorithm from "~/app/notes/_components/algorithm";
import Content from "~/app/notes/_components/content";
import Derivation from "~/app/notes/_components/derivation";
import DerivationContent from "~/app/notes/_components/derivationContent";
import Info from "~/app/notes/_components/info";
import Lemma from "~/app/notes/_components/lemma";
import Section from "~/app/notes/_components/section";

export default function Boosting() {
  return (
    <Section heading="Boosting">
      <Content>
        <div>Boosting uses an ensemble of weak learners, added in an iterative manner, to form a strong learner with low bias.</div>
        <div>
          In each iteration, we find a classifier <InlineMath math="h" /> from our set of classifiers <InlineMath math="\mathcal{H}" /> that minimizes the loss function <InlineMath math="\ell" />.
        </div>
        <div>
          <BlockMath math="h_{t+1} = \arg \min_{h \in \mathcal{H}} \, \ell(H_t + \alpha h)" />
        </div>
        <div>Our ensemble classifier can thus be written as:</div>
        <div>
          <BlockMath math="H_{t}(x) = \sum_{i=1}^{t} \alpha_i h_i(x)" />
        </div>
        <div>To find the classifier that minimizes the loss function at any given step, we can use gradient descent in function space.</div>
        <div>
          <BlockMath math="h_{t+1} = \arg \min_{h \in \mathcal{H}} \, \ell(H_t + \alpha h)" />
        </div>
        <div>This can be rewritten as:</div>
        <div>
          <BlockMath math="h_{t+1} = \arg \min_{h \in \mathcal{H}} \, \left[ \sum_{i=1}^{n} \frac{\partial \ell}{\partial H_t\left(x^{(i)}\right)} \cdot h\left(x^{(i)}\right) \right]" />
        </div>
        <div>
          If <InlineMath math="\ell" /> is the square loss function, we can further rewrite this as:
        </div>
        <div>
          <BlockMath math="h_{t+1} = \arg \min_{h \in \mathcal{H}} \, \left[ \sum_{i=1}^{n} \left(H_t(x^{(i)}) - y^{(i)}\right) \cdot h(x^{(i)}) \right]" />
        </div>
      </Content>
      <Derivation>
        <Lemma>
          <div>
            <InlineMath math="f(x)" /> can be approximated by its Taylor expansion around <InlineMath math="x_0" /> as:
          </div>
          <div>
            <BlockMath math="f(x) = f(x_0) + f'(x_0)(x - x_0) + \frac{f''(x_0)}{2}(x - x_0)^2 + \cdots" />
          </div>
        </Lemma>
        <DerivationContent>
          <div>
            If we let <InlineMath math="x = H_t + \alpha h" /> and <InlineMath math="x_0 = H_t" />, then using Taylor approximation, we can approximate the loss function <InlineMath math="\ell" /> as:
          </div>
          <div className="flex flex-col">
            <BlockMath math="\ell(H_t + \alpha h) \approx \ell(H_t) + \alpha < \nabla \ell'(H_t), \, h(x) >" />
          </div>
        </DerivationContent>
        <DerivationContent>
          <div>Therefore, the classifier that minimizes the loss function at any given step is:</div>
          <div className="flex flex-col">
            <BlockMath math="h_{t+1} = \arg \min_{h \in \mathcal{H}} \, \ell(H_t + \alpha h)" />
            <BlockMath math="= \arg \min_{h \in \mathcal{H}} \, \ell(H_t) + \alpha < \nabla \ell'(H_t), \, h(x) >" />
            <Info
              info={
                <div>
                  <InlineMath math="H_t" /> is a constant with respect to <InlineMath math="h" />, so we can ignore it.
                </div>
              }
            >
              <BlockMath math="= \arg \min_{h \in \mathcal{H}} \, < \nabla \ell'(H_t), \, h(x) >" />
            </Info>
            <BlockMath math="= \arg \min_{h \in \mathcal{H}} \, \left[ \sum_{i=1}^{n} \frac{\partial \ell}{\partial H_t\left(x^{(i)}\right)} \cdot h\left(x^{(i)}\right) \right]" />
          </div>
        </DerivationContent>
        <DerivationContent>
          <div>For square loss function, the gradient is:</div>
          <div className="flex flex-col">
            <BlockMath math="\frac{\partial \ell}{\partial H_t\left(x^{(i)}\right)} = \frac{1}{2} \cdot \frac{\partial \left(H_t\left(x^{(i)}\right) - y^{(i)}\right)^2}{\partial H_t\left(x^{(i)}\right)}" />
            <BlockMath math="= \frac{1}{2} \cdot 2 \cdot \left(H_t(x^{(i)}) - y^{(i)}\right)" />
            <BlockMath math="= H_t(x^{(i)}) - y^{(i)}" />
          </div>
        </DerivationContent>
        <DerivationContent>
          <div>Putting it all together, we get:</div>
          <div className="flex flex-col">
            <BlockMath math="h_{t+1} = \arg \min_{h \in \mathcal{H}} \, \left[ \sum_{i=1}^{n} \left(H_t(x^{(i)}) - y^{(i)}\right) \cdot h(x^{(i)}) \right]" />
          </div>
        </DerivationContent>
      </Derivation>
      <Content>
        <div>
          Note that <InlineMath math="y^{(i)} - H_t\left(x^{(i)}\right)" /> represents the vector from <InlineMath math="H_t\left(x^{(i)}\right)" /> to <InlineMath math="y^{(i)}" />. Therefore, any{" "}
          <InlineMath math="h_{t+1}" /> that moves us closer to <InlineMath math="y^{(i)}" /> will have a high dot product with this vector.
        </div>
        <div>
          From this it follows that such a vector will have a negative dot product with <InlineMath math="H_t\left(x^{(i)}\right) - y^{(i)}" />.
        </div>
        <div>
          Therefore, we want to select <InlineMath math="h_{t+1}" /> such that:
        </div>
        <div>
          <BlockMath math="\left[H_t\left(x^{(i)}\right) - y^{(i)}\right] \cdot h_{t+1}\left(x^{(i)}\right) \lt 0" />
        </div>
        <div>We can use this observation to write a Generic Boosting algorithm.</div>
      </Content>
      <Algorithm>
        <BlockMath math="\text{Repeat } \{" />
        <BlockMath math="\hspace{2em} \text{For each } i, \text{ let }r^{(i)} = \frac{\partial \ell}{\partial H_t(x^{(i)})}" />
        <BlockMath math="\hspace{2em} h_{t+1} = \arg \min_{h \in \mathcal{H}} \, \sum_{i=1}^n r^{(i)} h(x^{(i)})" />
        <BlockMath math="\hspace{2em} \text{if } \left( \sum_{i=1}^n r^{(i)} h_{t+1}(x^{(i)}) < 0 \right) \text{ then } \{" />
        <BlockMath math="\hspace{4em} H_{t+1} = H_t + \alpha_{t+1} h_{t+1}" />
        <BlockMath math="\hspace{2em} \} \text{ else } \{" />
        <BlockMath math="\hspace{4em} \text{return } H_t" />
        <BlockMath math="\hspace{2em} \}" />
        <BlockMath math="\text{\}}" />
      </Algorithm>
    </Section>
  );
}
