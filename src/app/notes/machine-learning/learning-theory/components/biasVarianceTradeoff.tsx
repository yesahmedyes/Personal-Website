import Content from "~/app/notes/_components/content";
import Section from "~/app/notes/_components/section";
import { InlineMath, BlockMath } from "react-katex";
import Derivation from "~/app/notes/_components/derivation";
import DerivationContent from "~/app/notes/_components/derivationContent";
import Info from "~/app/notes/_components/info";
import Lemma from "~/app/notes/_components/lemma";

export default function BiasVarianceTradeoff() {
  return (
    <Section title="Learning Theory" heading="Bias-Variance Tradeoff">
      <Content>
        <div>
          Let <InlineMath math="S" /> be our set of training examples that are related using the following equation:
        </div>
        <div>
          <BlockMath math="y^{(i)} = h^*(x^{(i)}) + \xi^{(i)}" />
        </div>
        <div>
          where <InlineMath math="h^*" /> is the best possible classifier that maps the relationship between <InlineMath math="x" /> and <InlineMath math="y" />, and{" "}
          <InlineMath math="\xi^{(i)} \in \mathcal{N}(0, \sigma^2)" /> is the noise in the <InlineMath math="ith" /> example.
        </div>
        <div>
          Also, let <InlineMath math="{h}_s" /> be our best fit model for the dataset <InlineMath math="S" />. The Mean Squared Error (MSE) can be written as:
        </div>
        <div>
          <BlockMath math="MSE = \mathbb{E} \left[ (y - h_{s}(x))^2 \right]" />
        </div>
        <div>
          Also, let <InlineMath math="h_{avg}(x) = \mathbb{E_s}[h_s(x)]" /> be the &quot;average model&quot; - the model obtained by drawing an infinite number of datasets, training on them, and
          averaging their predictions on <InlineMath math="x" />.
        </div>
        <div>Then, the Mean Squared Error can be further broken down into 3 components:</div>
        <div>
          <BlockMath math="MSE = \sigma^2 + (h^*(x) - h_{avg}(x))^2 + var(h_s(x))" />
        </div>
        <div>
          The first part is the inherent, unavoidable error. It is the noise in the data that cannot be explained by any model, regardless of its complexity. The second part is the bias which is the
          error introduced by the &quot;expressivity handicap&quot; of our classifier. This error occurs because of underfitting. And, the third term is the variance which is an error that measures
          how much the model&apos;s predictions would change if it were trained on a different dataset.
        </div>
      </Content>
      <Derivation>
        <Lemma>
          <div>
            For two independent events A and B such that <InlineMath math="\mathbb{E}[A] = 0" />
          </div>
          <div className="flex flex-col">
            <BlockMath math="\mathbb{E}\left[(A+B)^{2}\right] = \mathbb{E}\left[A^2 + B^2 + 2AB \right]"></BlockMath>
            <BlockMath math="= \mathbb{E}[A^2] + \mathbb{E}[B^2] + 2\mathbb{E}[AB]"></BlockMath>
            <Info info={<div>For two indepedent events, their joint expectancy is the product of their individual expectancies.</div>}>
              <BlockMath math="= \mathbb{E}[A^2] + \mathbb{E}[B^2] + 2\mathbb{E}[A]\mathbb{E}[B]"></BlockMath>
            </Info>
            <Info
              info={
                <div>
                  Since <InlineMath math="\mathbb{E}[A] = 0" />
                </div>
              }
            >
              <BlockMath math="= \mathbb{E}[A^2] + \mathbb{E}[B^2]"></BlockMath>
            </Info>
          </div>
        </Lemma>
        <DerivationContent>
          <div className="flex flex-col">
            <BlockMath math="MSE = \mathbb{E} \left[ (y - h_{s}(x))^2 \right]" />
            <BlockMath math="= \mathbb{E} \left[ (h^*(x + \xi - h_{s}(x))^2 \right]" />
            <BlockMath math="= \mathbb{E} \left[ \left(\xi + (h^*(x) - h_{s}(x))\right)^2 \right]" />
            <Info
              info={
                <div>
                  Since <InlineMath math="\mathbb{E}[\xi] = 0" /> because the noise is normally distributed with mean <InlineMath math="0" />, we use the identity we prove above
                </div>
              }
            >
              <BlockMath math="= \mathbb{E}\left[\xi^2\right] + \mathbb{E} \left[ \left(h^*(x) - h_{s}(x)\right)^2\right]" />
            </Info>
            <Info
              info={
                <div>
                  <InlineMath math="\mathbb{E}[\xi^2] = \mathbb{E}[\xi^2] - (\mathbb{E}[\xi])^2" /> since <InlineMath math="\mathbb{E}[\xi] = 0" />. This is just the variance which is equal to{" "}
                  <InlineMath math="\sigma^2" />.
                </div>
              }
            >
              <BlockMath math="= \sigma^2 + \mathbb{E} \left[ \left(h^*(x) - h_{s}(x)\right)^2\right]" />
            </Info>
            <BlockMath math="= \sigma^2 + \mathbb{E}\left[([h^*(x) - h_{avg}(x)] + [h_{avg}(x) - h_{s}(x)])^2\right]" />
          </div>
        </DerivationContent>
        <Lemma>
          <div className="flex flex-col">
            Note that since
            <BlockMath math="h_{avg}(x) = \mathbb{E}[h_s(x)]" />
            <Info info={<div>Expectancy of a constant is the constant itself</div>}>
              <BlockMath math="\Rightarrow \mathbb{E}[h_{avg}(x)] = h_{avg}(x)" />
            </Info>
          </div>
          <div className="flex flex-col">
            Thus,
            <BlockMath math="\mathbb{E}\left[h_{avg}(x) - h_s(x)\right] = h_{avg}(x) - \mathbb{E}\left[h_s(x)\right] = 0" />
          </div>
          <div>
            Also, <BlockMath math="\mathbb{E}\left[(h_{avg}(x) - h_s(x))^2\right] = \mathbb{E}\left[(\mathbb{E}[h_s(x)] - h_s(x))^2\right] = var(h_s(x))" />
          </div>
        </Lemma>
        <DerivationContent>
          <div className="flex flex-col">
            <Info
              info={
                <div>
                  Using the identity we prove above and the fact that <InlineMath math="\mathbb{E}[A] = 0" /> where <InlineMath math="A = h_{avg}(x) - h_{s}(x)" />.
                </div>
              }
            >
              <BlockMath math="MSE = \sigma^2 + \mathbb{E}\left[(h^*(x) - h_{avg}(x))^2\right] + \mathbb{E}\left[(h_{avg}(x) - h_{s}(x))^2\right]" />
            </Info>
            <Info
              info={
                <div>
                  <InlineMath math="h_{avg}(x)" /> and <InlineMath math="h^*(x)" /> are both constants. And expectation of a constant is the constant itself.
                </div>
              }
            >
              <BlockMath math="\Rightarrow MSE = \sigma^2 + (h^*(x) - h_{avg}(x))^2 + \mathbb{E}\left[(h_{avg}(x) - h_{s}(x))^2\right]" />
            </Info>
            <BlockMath math="\Rightarrow MSE = \sigma^2 + (h^*(x) - h_{avg}(x))^2 + var(h_s(x))" />
          </div>
        </DerivationContent>
      </Derivation>
      <Content>
        <div>
          The Bias-Variance tradeoff tells us that as we increase the number of parameters in our neural network, the test error will decreasebecause the bias is decreasing. However, after a certain
          point the variance starts increasing faster than the bias is decreasing and therefore, the test error will start to increase.
        </div>
        <div>
          In reality, however, we see a double descent phenomenon wherein the test error starts to decrease again at the point where the number of parameters <InlineMath math="d" /> are approximately
          equal to the number of training examples <InlineMath math="d" />. This is called the over-parameterization regime.
        </div>
      </Content>
    </Section>
  );
}
