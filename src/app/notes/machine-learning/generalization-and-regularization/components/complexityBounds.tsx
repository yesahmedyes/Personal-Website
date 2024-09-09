import Content from "~/app/notes/_components/content";
import Section from "~/app/notes/_components/section";
import { InlineMath, BlockMath } from "react-katex";
import Detour from "~/app/notes/_components/detour";
import Subsection from "~/app/notes/_components/subsection";

export default function ComplexityBounds() {
  return (
    <Section heading="Complexity Bounds">
      <Subsection>
        <Content>
          <div>
            For any classifier <InlineMath math="h" />, the true risk of the classifier can be defined as the probability that for any example <InlineMath math="(x, y)" /> sampled from the
            distribution <InlineMath math="\mathcal{D}" /> , it will misclassify the label <InlineMath math="y" /> if given input <InlineMath math="x" />.
          </div>
          <div>
            <BlockMath math="R(h) = P(h(x) \neq y)" />
          </div>
          <div>
            However, since we have no way of determining the underlying probability distribution <InlineMath math="\mathcal{D}" />, we cannot determine the true risk of the classifier. What we can do
            is to estimate the empirical risk of the classifier if we have some training set <InlineMath math="S" /> of <InlineMath math="n" /> training examples.
          </div>
          <div>
            <BlockMath math="\hat{R}(h) = \frac{1}{n} \sum_{i=1}^{n} 1\{h(x_i) \neq y_i\}" />
          </div>
          <div>
            Note that the expression <InlineMath math="1\{h(x_i) \neq y_i\}" /> simply means &quot;
            <InlineMath math="1" /> if <InlineMath math="h(x_i) \neq y_i" /> and <InlineMath math="0" /> otherwise.&quot; So we are essentially just adding up the number of misclassified examples over
            the entire training set.
          </div>
          <div>
            {" "}
            Now, let <InlineMath math="\mathcal{H}" /> be the set of all possible classifiers that we are considering. To find the classifier that minimizes the empirical risk over our training set{" "}
            <InlineMath math="S" />, we find <InlineMath math="\hat{h}" /> where:
          </div>
          <div>
            <BlockMath math="\hat{h} = argmin_{h \in \mathcal{H}} \hat{R}(h)" />
          </div>
        </Content>
      </Subsection>
      <Detour about="Hoeffding inequality">
        <Content>
          <div>
            Hoeffding inequality states that for <InlineMath math="n" /> independent random variables drawn from a Bernoulli distribution i.e. <InlineMath math="P(Z_i = 1) = \phi" /> and{" "}
            <InlineMath math="P(Z_i = 0) = 1 - \phi" />, the following inequality holds:
          </div>
          <div>
            {" "}
            <BlockMath math="P\left( \left|\phi - \hat{\phi}\right| > \gamma \right) \leq 2\exp\left(-2\gamma^2 n\right))" />
          </div>
          <div>
            where <InlineMath math="\hat{\phi} = \frac{1}{n} \sum_{i=1}^{n} Z_i" /> and <InlineMath math="\gamma" /> is some constant greater than 0.
          </div>
        </Content>
        <Content>
          <div>
            To understand this equation intuitiveley, imagine a biased coin that comes up heads with a probability of <InlineMath math="\phi" />. We toss this coin <InlineMath math="n" /> times and
            record the average number of times we got heads. We denote this average by <InlineMath math="\hat{\phi}" />.
          </div>
          <div>
            Now, the probability that the true probability of getting heads is away from our estimated probability of getting heads by a difference more than is <InlineMath math="\gamma" /> is denoted
            by <InlineMath math="P(|\phi - \hat{\phi}| > \gamma)" />. This probability is always less than or equal to <InlineMath math="2\exp\left(-2\gamma^2 n\right)" />.
          </div>
          <div>
            This means that as n increases, <InlineMath math="-2\gamma^2 n" /> decreases and so <InlineMath math="2\exp\left(-2\gamma^2 n\right)" /> decreases. Thus the probability that{" "}
            <InlineMath math="|\phi - \hat{\phi}| > \gamma" /> also decreases.
          </div>
        </Content>
      </Detour>
      <Subsection>
        <Content>
          <div>
            Using Hoeffding inequality, we note that the difference between the true risk and our estimated empirical risk being greater than <InlineMath math="\gamma" /> follows the following
            inequality:
          </div>
          <div>
            <BlockMath math="P\left( \left|R(h) - \hat{R}(h)\right | > \gamma \right) \leq 2\exp\left(-2\gamma^2 n\right))" />
          </div>
        </Content>
      </Subsection>
    </Section>
  );
}
