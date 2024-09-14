import Content from "~/app/notes/_components/content";
import Section from "~/app/notes/_components/section";
import { InlineMath, BlockMath } from "react-katex";
import Detour from "~/app/notes/_components/detour";
import Subsection from "~/app/notes/_components/subsection";
import Derivation from "~/app/notes/_components/derivation";
import DerivationContent from "~/app/notes/_components/derivationContent";
import Info from "~/app/notes/_components/info";
import Lemma from "~/app/notes/_components/lemma";

export default function ComplexityBounds() {
  return (
    <Section heading="Complexity Bounds">
      <Subsection>
        <Content>
          <div>
            For any hypothesis <InlineMath math="h" />, the true error is given by:
          </div>
          <div>
            <BlockMath math="\epsilon(h) = P(h(x) \neq y)" />
          </div>
          <div>
            However, since we have no way of determining the underlying probability distribution <InlineMath math="\mathcal{D}" />, we cannot determine the true error of the hypothesis. Instead, we
            estimate the empirical error of the hypothesis over our <InlineMath math="n" /> training examples.
          </div>
          <div>
            <BlockMath math="\hat{\epsilon}(h) = \frac{1}{n} \sum_{i=1}^{n} 1\{h(x_i) \neq y_i\}" />
          </div>
          <div>
            Let <InlineMath math="\mathcal{H}" /> be the set of all possible hypotheses that we are considering. To find the hypothesis that minimizes the empirical error over our training set, we
            find:
          </div>
          <div>
            <BlockMath math="\hat{h} = argmin_{h \in \mathcal{H}} \hat{\epsilon}(h)" />
          </div>
        </Content>
      </Subsection>
      <Detour about="Hoeffding Inequality">
        <Content>
          <div>
            Hoeffding inequality states that for <InlineMath math="n" /> independent random variables drawn from a Bernoulli distribution i.e. <InlineMath math="P(Z_i = 1) = \phi" /> and{" "}
            <InlineMath math="P(Z_i = 0) = 1 - \phi" />, the following inequality holds:
          </div>
          <div>
            <BlockMath math="P\left( \left|\phi - \hat{\phi}\right| > \gamma \right) \leq 2\exp\left(-2\gamma^2 n\right)" />
          </div>
          <div>
            where <InlineMath math="\hat{\phi} = \frac{1}{n} \sum_{i=1}^{n} Z_i" /> and <InlineMath math="\gamma" /> is some constant greater than 0.
          </div>
        </Content>
        <Content>
          <div>
            Imagine a biased coin that comes up heads with a probability of <InlineMath math="\phi" />. We toss this coin <InlineMath math="n" /> times and record the average number of times we got
            heads. We denote this average by <InlineMath math="\hat{\phi}" />.
          </div>
          <div>
            The probability that &quot;the true probability of getting heads is away from our estimated probability by a difference more than <InlineMath math="\gamma" />
            &quot; is denoted by <InlineMath math="P(|\phi - \hat{\phi}| > \gamma)" />. This is always less than or equal to <InlineMath math="2\exp\left(-2\gamma^2 n\right)" />.
          </div>
        </Content>
      </Detour>
      <Subsection>
        <Content>
          <div>Using Hoeffding inequality, we note that the true error and the estimated empirical error of our selected hypothesis follow the following inequality:</div>
          <div>
            <BlockMath math="P\left( \left|\epsilon(h_i) - \hat{\epsilon}(h_i)\right | > \gamma \right) \leq 2\exp\left(-2\gamma^2 n\right)" />
          </div>
          <div>
            Now we want to find an inequality for our entire set of hypotheses <InlineMath math="\mathcal{H} = \{ h_1, \dots, h_k \}" />. We see that the following inequality holds:
          </div>
          <div>
            <BlockMath math="P\left(\forall h \in \mathcal{H}.\left|\epsilon(h_i) - \hat{\epsilon}(h_i)\right | \leq \gamma \right) \geq 1 - 2k\exp\left(-2\gamma^2 n\right)" />
          </div>
          <div>We call this the uniform convergence result.</div>
          <div>
            This means that as n increases, the probability of the true error being close to the empirical error is bounded by a bigger value. Whereas, as we increases the number of hypotheses in our
            set, this probability is actually bounded by a smaller value.
          </div>
          <div>
            In the context of learning, we can say that the more complex our model, the lower our probability of minimizing the empirical error. And the more the number of training examples, the
            higher our probability of minimizing the empirical error.
          </div>
        </Content>
      </Subsection>
      <Derivation>
        <Lemma>
          <div>For any k events the union bound of probabilities tells us that</div>
          <div>
            <BlockMath math="P(A_1 \cup \cdots \cup A_k) \leq P(A_1) + P(A_2) + ... + P(A_k)" />
          </div>
        </Lemma>
        <DerivationContent>
          <div>
            The probability that there exists a hypothesis in our set <InlineMath math="\mathcal{H}" /> for which the difference between the empirical error and the true error is more than{" "}
            <InlineMath math="\gamma" /> can be written as:
          </div>
          <div>
            <BlockMath math="P\left(\exists h \in \mathcal{H}.\left|\epsilon(h_i) - \hat{\epsilon}(h_i)\right | > \gamma \right)" />
          </div>
        </DerivationContent>
        <DerivationContent>
          <div>
            Let <InlineMath math="A_i" /> be the event that <InlineMath math="|\epsilon(h_i) - \hat{\epsilon}(h_i) | > \gamma" />. Then:
          </div>
          <div className="flex flex-col">
            <BlockMath math="P\left(\exists h \in \mathcal{H}.\left|\epsilon(h_i) - \hat{\epsilon}(h_i)\right | > \gamma \right)" />
            <BlockMath math="= P(A_1 \cup \cdots \cup A_k)" />
            <BlockMath math="\leq P(A_1) + P(A_2) + ... + P(A_k)" />
            <BlockMath math="\leq \sum_{i=1}^k 2\exp\left(-2\gamma^2 n\right)" />
            <BlockMath math="= 2k\exp\left(-2\gamma^2 n\right)" />
          </div>
        </DerivationContent>
        <DerivationContent>
          <div className="flex flex-col">
            Thus,
            <BlockMath math="P\left(\exists h \in \mathcal{H}.\left|\epsilon(h_i) - \hat{\epsilon}(h_i)\right | > \gamma \right) \leq 2k\exp\left(-2\gamma^2 n\right)" />
            <BlockMath math="\Rightarrow 1 - P\left(\exists h \in \mathcal{H}.\left|\epsilon(h_i) - \hat{\epsilon}(h_i)\right | > \gamma \right) > 1 - 2k\exp\left(-2\gamma^2 n\right)" />
            <BlockMath math="\Rightarrow P\left(\forall h \in \mathcal{H}.\left|\epsilon(h_i) - \hat{\epsilon}(h_i)\right | \leq \gamma \right) \geq 1 - 2k\exp\left(-2\gamma^2 n\right)" />
          </div>
        </DerivationContent>
      </Derivation>
      <Subsection>
        <Content>
          <div>
            Now let <InlineMath math="\delta = 2k\exp\left(-2\gamma^2 n\right)" />
          </div>
          <div>
            We see that if we want the probability of &quot;the true error being within <InlineMath math="\gamma" /> to the empirical error for all hypothesiss under our consideration&quot; to be at
            least <InlineMath math="1 - \delta" />, our <InlineMath math="n" /> needs to be atleast as large as:
          </div>
          <div>
            {" "}
            <BlockMath math="n \geq \frac{1}{2\gamma^2} \log \frac{2k}{\delta}" />
          </div>
        </Content>
      </Subsection>
      <Derivation>
        <DerivationContent>
          <div className="flex flex-col">
            <BlockMath math="\delta = 2k\exp\left(-2\gamma^2 n\right)" />
            <BlockMath math="\Rightarrow \frac{\delta}{2k} = \exp\left(-2\gamma^2 n\right)" />
            <BlockMath math="\Rightarrow \log\left(\frac{\delta}{2k}\right) = -2\gamma^2 n" />
            <BlockMath math="\Rightarrow \log\left(\frac{\delta}{2k}\right) = -2\gamma^2 n" />
            <BlockMath math="\Rightarrow -\frac{1}{2\gamma^2}\log\left(\frac{\delta}{2k}\right) = n" />
            <Info info={<InlineMath math="-log(a) = log\left(\frac{1}{a}\right)" />}>
              <BlockMath math="\Rightarrow \frac{1}{2\gamma^2}\log\left(\frac{2k}{\delta}\right) = n" />
            </Info>
          </div>
          <div>
            If <InlineMath math="n" /> is equal to the left hand value, then
            <BlockMath math="P\left(\forall h \in \mathcal{H}.\left|\epsilon(h_i) - \hat{\epsilon}(h_i)\right | \leq \gamma \right) \geq 1 - \delta" />
          </div>
          <div>
            Therefore n need to be atleast as large as:
            <BlockMath math="\Rightarrow n \geq \frac{1}{2\gamma^2} \log \frac{2k}{\delta}" />
          </div>
        </DerivationContent>
      </Derivation>
      <Subsection>
        <Content>
          <div>
            Similarly, we can also see that given <InlineMath math="k" /> and <InlineMath math="n" />, the difference between the true error and the empirical error (for all hypotheses is our set)
            will always be less than:
          </div>
          <div>
            <BlockMath math="\left|\epsilon(h_i) - \hat{\epsilon}(h_i)\right | \leq \sqrt{\frac{1}{2n} \log \frac{2k}{\delta}}" />
          </div>
        </Content>
      </Subsection>
      <Derivation>
        <DerivationContent>
          <div className="flex flex-col">
            <BlockMath math="\delta = 2k\exp\left(-2\gamma^2 n\right)" />
            <BlockMath math="\Rightarrow \frac{\delta}{2k} = \exp\left(-2\gamma^2 n\right)" />
            <BlockMath math="\Rightarrow \log\left(\frac{\delta}{2k}\right) = -2\gamma^2 n" />
            <BlockMath math="\Rightarrow \log\left(\frac{\delta}{2k}\right) = -2\gamma^2 n" />
            <BlockMath math="\Rightarrow -\frac{1}{2n}\log\left(\frac{\delta}{2k}\right) = \gamma^2" />
            <BlockMath math="\Rightarrow \sqrt{\frac{1}{2n}\log\frac{2k}{\delta}} = \gamma" />
          </div>
          <div>
            If <InlineMath math="\gamma" /> is equal to the left hand value, then:
            <BlockMath math="P\left(\forall h \in \mathcal{H}.\left|\epsilon(h_i) - \hat{\epsilon}(h_i)\right | \leq \gamma \right) \geq 1 - \delta" />
          </div>
          <div>
            Therefore the difference in the true and empirical error will always be less than or equal to:
            <BlockMath math="\left|\epsilon(h_i) - \hat{\epsilon}(h_i)\right | \leq \sqrt{\frac{1}{2n} \log \frac{2k}{\delta}}" />
          </div>
        </DerivationContent>
      </Derivation>
      <Content>
        <div>
          Next, in our set of hypothesiss <InlineMath math="\mathcal{H}" />, let <InlineMath math="h^*" /> be the hypothesis that minimizes the true error and <InlineMath math="\hat{h}" /> be the
          hypothesis that minimizes our empirical error.
        </div>
        <div>Using our uniform convergence assumption, we can see that:</div>
        <BlockMath math="\epsilon(\hat{h}) \leq \epsilon(h^*) + 2\sqrt{\frac{1}{2n} \log \frac{2k}{\delta}}" />
        <div>
          With a probability of <InlineMath math="1 - \delta" />, the true error of our selected hypothesis is less than or equal to the true error of the best hypothesis + some term that depends on
          the number of hypotheses and the number of training examples.
        </div>
        <div>
          The first term on the right can be thought of as the bias. And the second term can be thought of as the variance. We see that as we increase k, the first term either stays the same or
          potentially decreases. Whereas, the second term increases.
        </div>
        <div>
          This is similar to what we saw in the Bias-Variance tradeoff. As we increase the complexity of our model, variance increases and the potential for our model to overfit also increases.
        </div>
      </Content>
      <Derivation>
        <DerivationContent>
          <div className="flex flex-col">
            <BlockMath math="\left| \epsilon(\hat{h}) - \hat{\epsilon}(\hat{h}) \right| \leq \gamma" />
            <Info
              info={
                <div>
                  Using uniform convergence and the fact that <InlineMath math="\hat{h}" /> minimizes empirical error
                </div>
              }
            >
              <BlockMath math="\Rightarrow \epsilon(\hat{h}) \leq \hat{\epsilon}(\hat{h}) + \gamma" />
            </Info>
            <Info
              info={
                <div>
                  <InlineMath math="\hat{h}" /> by definition minimizes our estimated empirical error.
                </div>
              }
            >
              <BlockMath math="\leq \hat{\epsilon}(h^*) + \gamma" />
            </Info>
            <Info
              info={
                <div>
                  Using uniform convergence and the fact that <InlineMath math="h^*" /> minimizes true error, we know that <InlineMath math="\hat{\epsilon}(h^*) \leq \epsilon(h^*) + \gamma" />
                </div>
              }
            >
              <BlockMath math="\leq \epsilon(h^*) + 2\gamma" />
            </Info>
          </div>
          <div className="flex flex-col">
            Thus, <BlockMath math="\epsilon(\hat{h}) \leq \epsilon(h^*) + 2\gamma" />
            <BlockMath math="\epsilon(\hat{h}) \leq \epsilon(h^*) + 2\sqrt{\frac{1}{2n} \log \frac{2k}{\delta}}" />
          </div>
        </DerivationContent>
      </Derivation>
    </Section>
  );
}
