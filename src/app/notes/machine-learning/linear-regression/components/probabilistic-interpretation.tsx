import { BlockMath, InlineMath } from "react-katex";
import Content from "~/app/notes/_components/content";
import Derivation from "~/app/notes/_components/derivation";
import DerivationContent from "~/app/notes/_components/derivationContent";
import Info from "~/app/notes/_components/info";
import Section from "~/app/notes/_components/section";

export default function ProbabilisticInterpretation() {
  return (
    <Section heading="Probabilistic Interpretation">
      <Content>
        <div>
          We assume that <InlineMath math="y^{(i)}" /> with <InlineMath math="\epsilon^{(i)}" /> as the noise in the <InlineMath math="i" />
          th example such that <InlineMath math="\epsilon^{(i)} \sim \mathcal{N}(0, \sigma^2)" />
        </div>
        <div>
          <BlockMath math="y^{(i)} = \theta^T x^{(i)} + \epsilon^{(i)}" />
        </div>
        <div>
          This can be rewritten as <InlineMath math="\epsilon^{(i)} = \theta^T x^{(i)} - y^{(i)}" />. Now, since <InlineMath math="\epsilon^{(i)} \sim \mathcal{N}(0, \sigma^2)" />, hence{" "}
          <InlineMath math="\left(y^{(i)} - \theta^T x^{(i)} \right) \sim \mathcal{N}(0, \sigma^2)" />.
        </div>
        <div>
          Finally, if we are given <InlineMath math="x^{(i)}" />, then <InlineMath math="y^{(i)} \mid x^{(i)}" /> will also follow <InlineMath math="\mathcal{N} (0, \sigma^2)" /> shifted by{" "}
          <InlineMath math="\theta^T x^{(i)}" />.
        </div>
        <div>
          <BlockMath math="P \left(y^{(i)} \mid x^{(i)}; \theta \right) \sim \mathcal{N} \left(\theta^T x^{(i)}, \sigma^2 \right)" />
        </div>
        <div>
          To find the maximum likelihood estimate of <InlineMath math="\theta" />, we need to maximize:
        </div>
        <div>
          <BlockMath math="L(\theta) = L(\theta; X, Y) = \prod_{i=1}^{n} p(y^{(i)} \mid x^{(i)}; \theta)" />
        </div>
        <div>
          Since <InlineMath math="log" /> is a monotonically increasing function, we can maximize the following instead:
        </div>
        <div>
          <BlockMath math="\ell(\theta) = \log \prod_{i=1}^{n} p(y^{(i)} \mid x^{(i)}; \theta)" />
        </div>
        <div>
          Solving this we see that maximizing <InlineMath math="\ell(\theta)" /> is equivalent to minimizing:
        </div>
        <div>
          <BlockMath math="-\frac{1}{2} \sum_{i=1}^{n} \left(y^{(i)} - \theta^T x^{(i)} \right)^2" />
        </div>
        <div>
          Notice, that the function that we need to minimized does not depend on <InlineMath math="\sigma" /> which means that we don&apos;t need to know that variance of our noise to be able to
          maximize our likelihood.
        </div>
      </Content>
      <Derivation>
        <DerivationContent>
          <div className="flex flex-col">
            <BlockMath math="\ell(\theta) = \log \prod_{i=1}^{n} p(y^{(i)} \mid x^{(i)}; \theta)" />
            <BlockMath math="= \sum_{i=1}^{n} \log p(y^{(i)} \mid x^{(i)}; \theta)" />
            <BlockMath math="= \sum_{i=1}^{n} \log \left[\frac{1}{\sigma\sqrt{2\pi}} \exp \left( -\frac{(y^{(i)} - \theta^T x^{(i)})^2}{2\sigma^2} \right) \right]" />
            <BlockMath math="= \sum_{i=1}^{n} \left( \log \left[\frac{1}{\sigma\sqrt{2\pi}} \right] -\frac{(y^{(i)} - \theta^T x^{(i)})^2}{2\sigma^2} \right)" />
            <BlockMath math="= n \left( \log \left[\frac{1}{\sigma\sqrt{2\pi}} \right] \right) -\frac{1}{2\sigma^2}  \left( \sum_{i=1}^{n} (y^{(i)} - \theta^T x^{(i)})^2 \right)" />
          </div>
        </DerivationContent>
        <DerivationContent>
          <div>
            To find the <InlineMath math="\theta" /> that maximizes <InlineMath math="\ell(\theta)" />, we need to find:
          </div>
          <div className="flex flex-col">
            <BlockMath math="\theta = \arg \max_{\theta} \ell(\theta)" />
            <BlockMath math="= \arg \max_{\theta} \left[ n \left( \log \left[\frac{1}{\sigma\sqrt{2\pi}} \right] \right) -\frac{1}{2\sigma^2}  \left( \sum_{i=1}^{n} (y^{(i)} - \theta^T x^{(i)})^2 \right) \right]" />
            <Info
              info={
                <div>
                  Since the first term does not depend on <InlineMath math="\theta" />
                </div>
              }
            >
              <BlockMath math="= \arg \max_{\theta} \left[ -\frac{1}{2\sigma^2}  \left( \sum_{i=1}^{n} (y^{(i)} - \theta^T x^{(i)})^2 \right) \right]" />
            </Info>
            <BlockMath math="= \arg \min_{\theta} \left[ \frac{1}{2\sigma^2}  \left( \sum_{i=1}^{n} (y^{(i)} - \theta^T x^{(i)})^2 \right) \right]" />
            <Info
              info={
                <div>
                  Excluding <InlineMath math="\sigma^2" /> does not change the result
                </div>
              }
            >
              <BlockMath math="= \arg \min_{\theta} \left[ \frac{1}{2}  \left( \sum_{i=1}^{n} (y^{(i)} - \theta^T x^{(i)})^2 \right) \right]" />
            </Info>
          </div>
        </DerivationContent>
      </Derivation>
    </Section>
  );
}
