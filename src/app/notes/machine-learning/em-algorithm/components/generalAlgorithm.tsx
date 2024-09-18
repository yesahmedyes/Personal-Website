import { BlockMath, InlineMath } from "react-katex";
import Algorithm from "~/app/notes/_components/algorithm";
import Content from "~/app/notes/_components/content";
import Derivation from "~/app/notes/_components/derivation";
import DerivationContent from "~/app/notes/_components/derivationContent";
import Detour from "~/app/notes/_components/detour";
import Info from "~/app/notes/_components/info";
import Section from "~/app/notes/_components/section";

export default function GeneralAlgorithm() {
  return (
    <Section title="Expectancy Maximization Algorithm" heading="General Algorithm">
      <Content>
        <div>
          Suppose we have a latent variable model <InlineMath math="p(x, z; \theta)" /> with <InlineMath math="z" /> being the latent variable. The density of <InlineMath math="x" /> can be obtained using marginal probability over <InlineMath math="z" />:
        </div>
        <div>
          <BlockMath math="p(x; \theta) = \sum_z p(x, z; \theta)" />
        </div>
        <div>
          Now to find the maximum likelihood estimate of <InlineMath math="\theta" />, we need to maximize the following function:
        </div>
        <div>
          <BlockMath math="\ell(\theta) = \sum_{i=1}^n \log p(x^{(i)}; \theta)" />
          <BlockMath math="= \sum_{i=1}^n \log \sum_{z^{(i)}} p(x^{(i)}; z^{(i)}; \theta)" />
        </div>
        <div>
          However, the above equation is not concave with respect to <InlineMath math="\theta" />. Hence, we can not use gradient ascent to find the maximum likelihood estimate.
        </div>
        <div>
          Moreover, if <InlineMath math="p(x; z; \theta)" /> is an exponential family distribution, then taking the derivative of the above equation with respect to <InlineMath math="\theta" />{" "}
          doesn&apos;t typically lead to a solvable expression.
        </div>
        <div>
          To get around this, we imagine <InlineMath math="Q(z)" /> to be some distribution over <InlineMath math="z" /> so that <InlineMath math="\sum_z Q(z) = 1" /> and{" "}
          <InlineMath math="Q(z) \geq 0" />
        </div>
      </Content>
      <Detour about="Jensen's Inequality">
        <div>
          Jensen&apos;s inequality states that for a convex function <InlineMath math="[f''(x) \geq 0]" /> the following inequality holds:
        </div>
        <div>
          <BlockMath math="\mathbb{E}[f(X)] \geq f(\mathbb{E}[X])." />
        </div>
        <div>And for concave functions:</div>
        <div>
          <BlockMath math="\mathbb{E}[f(X)] \leq f(\mathbb{E}[X])." />
        </div>
        <div>
          Also, if <InlineMath math="X" /> is a constant then <InlineMath math="X = \mathbb{E}[X]" /> and:
        </div>
        <div>
          <BlockMath math="\mathbb{E}[f(X)] = f(\mathbb{E}[X])." />
        </div>
      </Detour>
      <Content>
        <div className="flex flex-col">
          Using Jensen&apos;s inequality, we can see that the following inequality holds:
          <BlockMath math="\log p(x; \theta) = \log \sum_z Q(z) \frac{p(x, z; \theta)}{Q(z)}" />
          <BlockMath math="\geq \sum_z \left[Q(z) \log\frac{p(x, z; \theta)}{Q(z)}\right]" />
        </div>
      </Content>
      <Derivation>
        <DerivationContent>
          <div className="flex flex-col">
            <BlockMath math="\log p(x; \theta) = \log \sum_z p(x, z; \theta)" />
            <BlockMath math="= \log \sum_z Q(z) \frac{p(x, z; \theta)}{Q(z)}" />
            <Info
              info={
                <div>
                  Since <InlineMath math="\mathbb{E}_{z \sim p}[g(z)] = \sum_z p(z)g(z)" />
                </div>
              }
            >
              <BlockMath math="= \log \mathbb{E}_{z \sim Q}\left[\frac{p(x, z; \theta)}{Q(z)}\right]" />
            </Info>
            <Info info={<div>Using Jensen&apos;s inequality</div>}>
              <BlockMath math="\geq \mathbb{E}_{z \sim Q}\left[\log \frac{p(x, z; \theta)}{Q(z)}\right]" />
            </Info>
            <BlockMath math="= \sum_z \left[Q(z) \log \frac{p(x, z; \theta)}{Q(z)}\right]" />
          </div>
        </DerivationContent>
      </Derivation>
      <Content>
        <div>
          From Jensen&apos;s inequality, we also know that our inequality becomes an equality (the bound becomes right) when the expectation is over a constant:
          <BlockMath math="\frac{p(x, z; \theta)}{Q(z)} = c" />
        </div>
        <div>It turns out that this bound is tight when:</div>
        <div>
          <BlockMath math="Q(z) = p(z | x; \theta)" />
        </div>
      </Content>
      <div>
        <Derivation>
          <DerivationContent>
            <div className="flex flex-col">
              <BlockMath math="\frac{p(x, z; \theta)}{Q(z)} = c" />
              <BlockMath math="Q(z) = \frac{p(x, z; \theta)}{c}" />
            </div>
          </DerivationContent>
          <DerivationContent>
            <div>
              Since <InlineMath math="\sum_z Q(z) = 1" />, therefore the right hand side must also sum to 1:
            </div>
            <div>
              <BlockMath math="\sum_z \left(\frac{p(x, z; \theta)}{c}\right) = 1" />
            </div>
            <div>
              Thus,
              <BlockMath math="c = \sum_z p(x, z; \theta)" />
            </div>
          </DerivationContent>
          <DerivationContent>
            <div className="flex flex-col">
              <BlockMath math="Q(z) = \frac{p(x, z; \theta)}{\sum_z p(x, z; \theta)}" />
              <BlockMath math="= \frac{p(x, z; \theta)}{p(x; \theta)}" />
              <BlockMath math="= p(z | x; \theta)" />
            </div>
          </DerivationContent>
        </Derivation>
        <Derivation>
          <DerivationContent>
            <div>
              We can verfiy that setting <InlineMath math="Q(z) = p(z | x; \theta)" /> leads to a tight bound:
            </div>
            <div className="flex flex-col">
              <BlockMath math="\sum_z \left[Q(z) \log\frac{p(x, z; \theta)}{Q(z)}\right]" />
              <BlockMath math="= \sum_z \left[p(z | x; \theta) \log\frac{p(x, z; \theta)}{p(z | x; \theta)}\right]" />
              <BlockMath math="= \sum_z \left[p(z | x; \theta) \log\frac{p(z | x; \theta)p(x ; \theta)}{p(z | x; \theta)}\right]" />
              <BlockMath math="= \sum_z p(z | x; \theta) \log p(x ; \theta)" />
              <BlockMath math="= \log p(x ; \theta) \left(\sum_z p(z | x; \theta)\right)" />
              <Info
                info={
                  <div>
                    Since <InlineMath math="Q(z) = p(z | x; \theta)" /> and <InlineMath math="\sum_z Q(z) = 1" />
                  </div>
                }
              >
                <BlockMath math="= \log p(x ; \theta)" />
              </Info>
            </div>
          </DerivationContent>
        </Derivation>
      </div>
      <Content>
        <div>For convenience, let&apos;s define Evidence Lower Bound (ELBO) as:</div>
        <div>
          <BlockMath math="\text{ELBO}(x; Q, \theta) = \mathbb{E}_{z \sim Q(z)}\left[\log p(x, z; \theta)\right] = \sum_z \left[Q(z) \log\frac{p(x, z; \theta)}{Q(z)}\right]" />
        </div>
        <div>
          Therefore,
          <BlockMath math="\log p(x: \theta) \geq \text{ELBO}(x; Q, \theta)" />
        </div>
      </Content>
      <Algorithm>
        <BlockMath math="\text{Repeat until convergence \{}" />
        <BlockMath math="\hspace{2em} \text{(E-step) For each } i, \text{ set } \text{\{}" />
        <BlockMath math="\hspace{4em} Q_i(z^{(i)}) := p(z^{(i)} \mid x^{(i)}; \theta)." />
        <BlockMath math="\hspace{2em} \text{\}}" />
        <BlockMath math="\hspace{2em} \text{(M-step) Set } \text{\{}" />
        <BlockMath math="\hspace{4em} \theta := \arg \max_{\theta} \sum_{i=1}^{n} \text{ELBO}(x^{(i)}; Q_i, \theta) " />
        <BlockMath math="\hspace{2em} \text{\}}" />
        <BlockMath math="\text{\}}" />
      </Algorithm>
      <Content>
        <div>
          In the <InlineMath math="E" /> step we find the distributions over <InlineMath math="z^{(i)}" />{" "}
          for which the <InlineMath math="\text{ELBO}" /> and <InlineMath math="p(x;\theta)" /> are equal for our current value of <InlineMath math="\theta" />.
        </div>
        <div>
          In the <InlineMath math="M" /> step we find the new value of <InlineMath math="\theta" /> that maximizes our new <InlineMath math="\text{ELBO}" /> with <InlineMath math="Q_i(z^{(i)}) := p(z^{(i)} \mid x^{(i)}; \theta)" />.
        </div>
      </Content>
    </Section>
  );
}
