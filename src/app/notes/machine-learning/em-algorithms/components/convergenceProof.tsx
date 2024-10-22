import { BlockMath, InlineMath } from "react-katex";
import Content from "~/app/notes/_components/content";
import Section from "~/app/notes/_components/section";

export default function ConvergenceProof() {
  return (
    <Section heading="Proof of Convergence">
      <Content>
        <div>
          It can be shown that the EM algorithm converges to the maximum likelihood estimate of <InlineMath math="\theta" /> as the number of iterations goes to infinity.
        </div>
        <div>
          We saw that the for any given value of <InlineMath math="\theta" /> and any distribution over <InlineMath math="z" />, our log-likelihood <InlineMath math="\ell(\theta) = \log p(x;\theta)" /> is
          always greater than the <InlineMath math="\text{ELBO}(x; Q, \theta)" />.
        </div>
        <div>
          Hence, <BlockMath math="\ell(\theta^{(t+1)}) \geq \sum_{i=1}^{n} \text{ELBO}(x^{(i)}; Q_i^{(t)}, \theta^ {(t+1)})" />
        </div>
        <div>
          Moreover, since in the <InlineMath math="M" /> step, <InlineMath math="\theta^{(t+1)}" /> is chosen to maximize <InlineMath math="\text{ELBO}(x; Q^{(t)}, \theta^ {(t)})" />:
        </div>
        <div>
          Therefore,
          <BlockMath math="\sum_{i=1}^{n} \text{ELBO}(x^{(i)}; Q_i^{(t)}, \theta^ {(t+1)}) \geq \sum_{i=1}^{n} \text{ELBO}(x^{(i)}; Q_i^{(t)}, \theta^ {(t)})" />
        </div>
        <div>
          Finally, in the <InlineMath math="E" /> step, <InlineMath math="Q(z)" /> is choosen such that for the current value of <InlineMath math="\theta" />, the log-likelihood and the evidence lower
          bound are equal.
          <BlockMath math="\sum_{i=1}^{n} \text{ELBO}(x^{(i)}; Q_i^{(t)}, \theta^ {(t)}) = \ell(\theta^{(t)})" />
        </div>
        <div>
          Putting it all together, we have the following <BlockMath math="\ell(\theta^{(t+1)}) \geq \ell(\theta^{(t)})" />
        </div>
        <div>
          Note that the reason we wanted a tight bound on our inequality was to guarantee convergence. Otherwise after the <InlineMath math="E" /> step, our{" "}
          <InlineMath math="\text{ELBO}(x; Q^{(t)}, \theta^{(t)})" /> could have been lower than our log-likelihood <InlineMath math="\ell(\theta^{(t)})" />. This would&apos;ve meant that{" "}
          <InlineMath math="\ell(\theta^{(t+1)})" /> could have been lower than <InlineMath math="\ell(\theta^{(t)})" />.
        </div>
      </Content>
    </Section>
  );
}
