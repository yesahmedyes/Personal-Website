import { BlockMath, InlineMath } from "react-katex";
import Algorithm from "~/app/notes/_components/algorithm";

import Derivation from "~/app/notes/_components/derivation";
import Detour from "~/app/notes/_components/detour";
import Info from "~/app/notes/_components/info";
import Section from "~/app/notes/_components/section";

export default function GeneralAlgorithm() {
  return (
    <Section title="Expectancy Maximization Algorithm" heading="General Algorithm">
      <div>
        Suppose we have a latent variable model <InlineMath math="p(x, z; \theta)" /> with <InlineMath math="z" /> being the latent variable. The density of <InlineMath math="x" /> can be obtained
        using marginal probability over <InlineMath math="z" />:
      </div>
      <div>
        <BlockMath math="p(x; \theta) = \sum_z p(x, z; \theta)" />
      </div>
      <div>Now to maximize likelihood, we need to maximize the following function:</div>
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

      <div className="flex flex-col">
        Using Jensen&apos;s inequality, we can see that the following inequality holds:
        <BlockMath math="\log p(x; \theta) = \log \sum_z Q(z) \frac{p(x, z; \theta)}{Q(z)}" />
        <BlockMath math="\geq \sum_z \left[Q(z) \log\frac{p(x, z; \theta)}{Q(z)}\right]" />
      </div>
      <Derivation>
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
      </Derivation>

      <div>
        From Jensen&apos;s inequality, we also know that our inequality becomes an equality (the bound becomes right) when the expectation is over a constant:
        <BlockMath math="\frac{p(x, z; \theta)}{Q(z)} = c" />
      </div>
      <div>It turns out that this bound is tight when:</div>
      <div>
        <BlockMath math="Q(z) = p(z | x; \theta)" />
      </div>

      <div className="flex flex-col">
        <Derivation>
          <div className="flex flex-col">
            <BlockMath math="\frac{p(x, z; \theta)}{Q(z)} = c" />
            <BlockMath math="Q(z) = \frac{p(x, z; \theta)}{c}" />
          </div>

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

          <div className="flex flex-col">
            <BlockMath math="Q(z) = \frac{p(x, z; \theta)}{\sum_z p(x, z; \theta)}" />
            <BlockMath math="= \frac{p(x, z; \theta)}{p(x; \theta)}" />
            <BlockMath math="= p(z | x; \theta)" />
          </div>
        </Derivation>
        <Derivation>
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
        </Derivation>
      </div>

      <div>For convenience, let&apos;s define Evidence Lower Bound (ELBO) as:</div>
      <div>
        <BlockMath math="\text{ELBO}(x; Q, \theta) = \mathbb{E}_{z \sim Q(z)}\left[\log\frac{p(x, z; \theta)}{Q(z)}\right] = \sum_z \left[Q(z) \log\frac{p(x, z; \theta)}{Q(z)}\right]" />
      </div>
      <div>
        Therefore,
        <BlockMath math="\log p(x; \theta) \geq \text{ELBO}(x; Q, \theta)" />
      </div>

      <Algorithm>
        <BlockMath math="\text{Repeat until convergence \{}" />
        <BlockMath math="\hspace{2em} \text{(E-step) For each } i, \text{ set } \text{\{}" />
        <BlockMath math="\hspace{4em} Q_i(z^{(i)}) \leftarrow p(z^{(i)} | x^{(i)}; \theta)" />
        <BlockMath math="\hspace{2em} \text{\}}" />
        <BlockMath math="\hspace{2em} \text{(M-step) Set } \text{\{}" />
        <BlockMath math="\hspace{4em} \theta \leftarrow \arg \max_{\theta} \sum_{i=1}^{n} \text{ELBO}(x^{(i)}; Q_i, \theta) " />
        <BlockMath math="\hspace{2em} \text{\}}" />
        <BlockMath math="\text{\}}" />
      </Algorithm>

      <div>
        In the <InlineMath math="E" /> step we find the estimated distributions over <InlineMath math="z^{(i)}" /> using our current value of <InlineMath math="\theta" /> and thus our current
        estimated distribution over <InlineMath math="x^{(i)}" /> given <InlineMath math="z^{(i)}" />. We do so using the Bayes&apos; rule:
      </div>
      <BlockMath math="p(z^{(i)} = j | x^{(i)}; \theta) = \frac{p(x^{(i)} | z^{(i)} = j; \theta) p(z^{(i)} = j; \theta)}{\sum_{l=1}^k p(x^{(i)} | z^{(i)} = l; \theta) p(z^{(i)} = l; \theta)}" />
      <div>
        In the <InlineMath math="M" /> step we update the value of <InlineMath math="\theta" /> to maximizes the <InlineMath math="\text{ELBO}" /> for which it is equal to{" "}
        <InlineMath math="\log p(x; \theta)" /> for our current values of <InlineMath math="\theta" />.
      </div>
    </Section>
  );
}
