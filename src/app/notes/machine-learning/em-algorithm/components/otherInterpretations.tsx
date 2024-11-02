import { BlockMath, InlineMath } from "react-katex";
import Content from "~/app/notes/_components/content";
 
import Derivation, { DerivationContent } from "~/app/notes/_components/derivation";
import Lemma from "~/app/notes/_components/lemma";
import Section from "~/app/notes/_components/section";

export default function OtherInterpretations() {
  return (
    <Section heading="Other Interpretations">
      <Content>
        <div>The evidence lower bound can be rewritten as:</div>
        <div>
          <BlockMath math="\text{ELBO}(x; Q, \theta) = \mathbb{E}_{z \sim Q} \left[ \log p(x \mid z; \theta) \right] - D_{KL}(Q \parallel p_z)" />
        </div>
        <div>
          This would mean that maximizing <InlineMath math="\text{ELBO}" /> over <InlineMath math="\theta" /> is equivalent to maximizing <InlineMath math="p(x | z; \theta)" /> since the KL-divergence
          term does not depend on <InlineMath math="\theta" />.
        </div>
      </Content>
      <Derivation>
        <Lemma>
          <div>
            For any two distributions over a random variable <InlineMath math="z" />, the KL-divergence between the two distributions is given by:
          </div>
          <div className="flex flex-col">
            <BlockMath math="D_{KL}(Q \parallel p) = \sum_z \left[Q(z) \log \frac{Q(z)}{p(z)} \right]" />
            <BlockMath math="= \mathbb{E}_{z \sim Q} \left[ \log \frac{Q(z)}{p(z)} \right]" />
          </div>
        </Lemma>
        <DerivationContent>
          <div className="flex flex-col">
            <BlockMath math="\text{ELBO}(x; Q, \theta) = \mathbb{E}_{z \sim Q} \left[\log \frac{p(x, z; \theta)}{Q(z)} \right]" />
            <BlockMath math="= \mathbb{E}_{z \sim Q} \left[\log \frac{p(x | z; \theta)p(z)}{Q(z)} \right]" />
            <BlockMath math="= \mathbb{E}_{z \sim Q} [\log p(x | z; \theta) + \log p(z) - \log Q(z)]" />
            <BlockMath math="= \mathbb{E}_{z \sim Q} \left[\log p(x | z; \theta) - \log \frac{Q(z)}{p(z)}\right]" />
            <BlockMath math="= \mathbb{E}_{z \sim Q} \left[\log p(x | z; \theta)\right] - \mathbb{E}_{z \sim Q} \left[\log \frac{Q(z)}{p(z)}\right]" />
            <BlockMath math="= \mathbb{E}_{z \sim Q} \left[ \log p(x \mid z; \theta) \right] - D_{KL}(Q \parallel p_z)" />
          </div>
        </DerivationContent>
      </Derivation>
      <Content>
        <div>Similarly, the evidence lower bound can also be rewritten as:</div>
        <div>
          <BlockMath math="\text{ELBO}(x; Q, \theta) = \log p(x) - D_{KL}(Q \parallel p_{z | x})" />
        </div>
        <div>
          This shows us that <InlineMath math="\text{ELBO}" /> is maximized for a given value of <InlineMath math="\theta" /> when the KL divergence between <InlineMath math="Q(z)" /> and <InlineMath math="p(z | x; \theta)" /> is minimized, which is
          when they are equal. This is exactly what we saw while deriving the algorithm above.
        </div>
      </Content>
      <Derivation>
        <DerivationContent>
          <div className="flex flex-col">
            <BlockMath math="\text{ELBO}(x; Q, \theta) = \mathbb{E}_{z \sim Q} \left[\log \frac{p(x, z; \theta)}{Q(z)} \right]" />
            <BlockMath math="= \mathbb{E}_{z \sim Q} \left[\log \frac{p(z | x; \theta)p(x)}{Q(z)} \right]" />
            <BlockMath math="= \mathbb{E}_{z \sim Q} [\log p(z | x; \theta) + \log p(x) - \log Q(z)]" />
            <BlockMath math="= \mathbb{E}_{z \sim Q} \left[\log p(x) - \log \frac{Q(z)}{p(z | x; \theta)}\right]" />
            <BlockMath math="= \mathbb{E}_{z \sim Q} \left[\log p(x)\right] - \mathbb{E}_{z \sim Q} \left[\log \frac{Q(z)}{p(z | x; \theta)}\right]" />
            <BlockMath math="= \log p(x) - D_{KL}(Q \parallel p_{z | x})" />
          </div>
        </DerivationContent>
      </Derivation>
    </Section>
  );
}
