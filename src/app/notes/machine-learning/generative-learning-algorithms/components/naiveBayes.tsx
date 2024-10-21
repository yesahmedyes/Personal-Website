import { BlockMath, InlineMath } from "react-katex";
import Content from "~/app/notes/_components/content";
import Derivation from "~/app/notes/_components/derivation";
import DerivationContent from "~/app/notes/_components/derivationContent";
import Info from "~/app/notes/_components/info";
import Section from "~/app/notes/_components/section";

export default function NaiveBayes() {
  return (
    <Section heading="Naive Bayes">
      <Content>
        <div>
          When our feacture vectors <InlineMath math="x" /> take on discrete values, we can use the Naive Bayes.
        </div>
        <div>
          <BlockMath math="x \in \{0, 1\}^d" />
        </div>
        <div>
          We also make the assumption that <InlineMath math="x_i" />
          &apos;s are conditionally independent given <InlineMath math="y" />.
        </div>
        <div>
          <BlockMath math="p(x_1, \ldots, x_d | y) = \prod_{j=1}^d p(x_j | y)" />
        </div>
        <div>
          We also assume that <InlineMath math="y" /> takes on two values, <InlineMath math="0" /> and <InlineMath math="1" />. Our likelihood function then becomes:
        </div>
        <div className="flex flex-col">
          <BlockMath math="\ell(\phi_y, \phi_{j \mid y = 0}, \phi_{j \mid y = 1}) = \log \, \prod_{i=1}^n \, p \left( x^{(i)}, y^{(i)} ; \phi_y, \phi_{j \mid y = 0}, \phi_{j \mid y = 1} \right)" />
          <BlockMath math="= \log \, \prod_{i=1}^n \, \left( \prod_{j=1}^d p\left(x_j^{(i)} \mid y^{(i)} ; \phi_{j \mid y = 0}, \phi_{j \mid y = 1}\right) \right) p\left(y^{(i)} ; \phi_y\right)" />
        </div>
        <div>Maximizing our log likelihood function with respect to our parameters, we get:</div>
        <div className="flex flex-col">
          <BlockMath math="\phi_{j \mid y = 1} = \frac{\sum_{i=1}^{n} 1\left\{x_j^{(i)} = 1 \land y^{(i)} = 1\right\}}{\sum_{i=1}^{n} 1\left\{y^{(i)} = 1\right\}}" />
          <BlockMath math="\phi_{j \mid y = 0} = \frac{\sum_{i=1}^{n} 1\left\{x_j^{(i)} = 1 \land y^{(i)} = 0\right\}}{\sum_{i=1}^{n} 1\left\{y^{(i)} = 0\right\}}" />
          <BlockMath math="\phi_{y} = \frac{1}{n} \, \sum_{i=1}^{n} 1\left\{y^{(i)} = 1\right\}" />
        </div>
      </Content>
      <div className="flex flex-col">
        <Derivation>
          <DerivationContent>
            <div className="flex flex-col">
              <BlockMath math="\ell(\phi_y, \phi_{j \mid y = 0}, \phi_{j \mid y = 1}) = \log \, \prod_{i=1}^n \, \left( \prod_{j=1}^d p\left(x_j^{(i)} \mid y^{(i)} ; \phi_{j \mid y = 0}, \phi_{j \mid y = 1}\right) \right) p\left(y^{(i)} ; \phi_y\right)" />
              <BlockMath math="= \sum_{i=1}^n \, \left( \sum_{j=1}^d \left( \log \left(\phi_{j \mid y = 1} \right)^{x_j^{(i)} y^{(i)}} + \log \left(1 - \phi_{j \mid y = 1} \right)^{\left(1 - x_j^{(i)} \right) y^{(i)}} + \log \left(\phi_{j \mid y = 0}\right)^{x_j^{(i)} \left(1 - y^{(i)} \right)} + \log \left(\phi_{j \mid y = 0}\right)^{\left(1 - x_j^{(i)} \right) \left(1 - y^{(i)} \right)}  \right) \right." />
              <BlockMath math="\left. + \, \log \left(\phi_y\right)^{y^{(i)}} + \log \left(1 - \phi_y\right)^{\left(1 - y^{(i)} \right)} \right)" />
            </div>
          </DerivationContent>
          <DerivationContent>
            <div>
              Taking the derivative of our log likelihood function with respect to <InlineMath math="\phi_y" />, we get:
            </div>
            <div className="flex flex-col">
              <Info
                info={
                  <div>
                    Ignoring terms that are constant with respect to <InlineMath math="\phi_y" />.
                  </div>
                }
              >
                <BlockMath math="\nabla_{\phi_y} \, \sum_{i=1}^n \left( y^{(i)} \log \phi_y + (1 - y^{(i)}) \log (1 - \phi_y) \right)" />
              </Info>
              <BlockMath math="= \sum_{i=1}^n \left( \frac{y^{(i)}}{\phi_y} - \frac{1 - y^{(i)}}{1 - \phi_y} \right)" />
              <BlockMath math="= \sum_{i=1}^n \left( \frac{y^{(i)}}{\phi_y (1 - \phi_y)} - \frac{1}{1 - \phi_y} \right)" />
            </div>
          </DerivationContent>
          <DerivationContent>
            <div>Setting this equal to 0, we get:</div>
            <BlockMath math="\sum_{i=1}^n \left( \frac{y^{(i)}}{\phi_y (1 - \phi_y)} - \frac{1}{1 - \phi_y} \right) = 0" />
            <BlockMath math="\Rightarrow \sum_{i=1}^n \left(\frac{y^{(i)}}{\phi_y (1 - \phi_y)}\right) = \frac{n}{1 - \phi_y}" />
            <BlockMath math="\Rightarrow \frac{1}{n} \sum_{i=1}^n y^{(i)} = \phi_y" />
            <Info
              info={
                <div>
                  Since <InlineMath math="y^{(i)}" /> is either 0 or 1
                </div>
              }
            >
              <BlockMath math="\Rightarrow \phi_y = \frac{1}{n} \sum_{i=1}^n 1\left\{y^{(i)} = 1\right\}" />
            </Info>
          </DerivationContent>
        </Derivation>
        <Derivation>
          <DerivationContent>
            <div className="flex flex-col">
              <BlockMath math="\sum_{i=1}^n \, \left( \sum_{j=1}^d \left( \log \left(\phi_{j \mid y = 1} \right)^{x_j^{(i)} y^{(i)}} + \log \left(1 - \phi_{j \mid y = 1} \right)^{\left(1 - x_j^{(i)} \right) y^{(i)}} + \log \left(\phi_{j \mid y = 0}\right)^{x_j^{(i)} \left(1 - y^{(i)} \right)} + \log \left(\phi_{j \mid y = 0}\right)^{\left(1 - x_j^{(i)} \right) \left(1 - y^{(i)} \right)}  \right) \right." />
              <BlockMath math="\left. + \, \log \left(\phi_y\right)^{y^{(i)}} + \log \left(1 - \phi_y\right)^{\left(1 - y^{(i)} \right)} \right)" />
            </div>
          </DerivationContent>
          <DerivationContent>
            <div>
              Taking the derivative with respect to <InlineMath math="\phi_{k \mid y = 1}" />, we get:
            </div>
            <div className="flex flex-col">
              <Info
                info={
                  <div>
                    Ignoring terms that are constant with respect to <InlineMath math="\phi_{k \mid y = 1}" />.
                  </div>
                }
              >
                <BlockMath math="\nabla_{\phi_{k \mid y = 1}} \, \sum_{i=1}^n \sum_{j=1}^d \left( x_j^{(i)} y^{(i)} \log \phi_{k \mid y = 1} + \left(1 - x_j^{(i)} \right) y^{(i)} \log \left(1 - \phi_{k \mid y = 1} \right) \right)" />
              </Info>
              <BlockMath math="= \sum_{i=1}^n \left( x_k^{(i)} y^{(i)} \cdot \frac{1}{\phi_{k \mid y = 1}} - \left(1 - x_k^{(i)} \right) y^{(i)} \cdot \frac{1}{ \left(1 - \phi_{k \mid y = 1} \right)} \right)" />
              <BlockMath math="= \sum_{i=1}^n \left(y^{(i)} \cdot \frac{x_k^{(i)} - x_k^{(i)}\phi_{k \mid y = 1} - \phi_{k \mid y = 1} + x_k^{(i)}\phi_{k \mid y = 1} }{\phi_{k \mid y = 1} \left(1 - \phi_{k \mid y = 1} \right)} \right)" />
              <BlockMath math="= \sum_{i=1}^n \left(y^{(i)} \cdot \frac{x_k^{(i)}  - \phi_{k \mid y = 1}  }{\phi_{k \mid y = 1} \left(1 - \phi_{k \mid y = 1} \right)} \right)" />
            </div>
          </DerivationContent>
          <DerivationContent>
            <div>Setting this equal to 0, we get:</div>
            <div className="flex flex-col">
              <BlockMath math="\sum_{i=1}^n y^{(i)} x_k^{(i)} = \sum_{i=1}^n y^{(i)} \phi_{k \mid y = 1}" />
              <BlockMath math="\Rightarrow \phi_{k \mid y = 1} = \frac{\sum_{i=1}^n y^{(i)} x_k^{(i)}}{\sum_{i=1}^n y^{(i)}}" />
              <Info
                info={
                  <div>
                    Since both <InlineMath math="x_k^{(i)}" /> and <InlineMath math="y^{(i)}" /> are either <InlineMath math="0" /> or <InlineMath math="1" />.
                  </div>
                }
              >
                <BlockMath math="\Rightarrow \phi_{k \mid y = 1} = \frac{\sum_{i=1}^{n} 1\left\{x_k^{(i)} = 1 \land y^{(i)} = 1\right\}}{\sum_{i=1}^{n} 1\left\{y^{(i)} = 1\right\}}" />
              </Info>
            </div>
          </DerivationContent>
          <DerivationContent>
            <div>
              Similarly, taking the derivative with respect to <InlineMath math="\phi_{k \mid y = 0}" />, we get:
            </div>
            <div className="flex flex-col">
              <BlockMath math="\Rightarrow \phi_{k \mid y = 1} = \frac{\sum_{i=1}^n \left(1 - y^{(i)} \right) x_k^{(i)}}{\sum_{i=1}^n \left(1 - y^{(i)} \right)}" />
              <Info
                info={
                  <div>
                    Since both <InlineMath math="x_k^{(i)}" /> and <InlineMath math="y^{(i)}" /> are either <InlineMath math="0" /> or <InlineMath math="1" />.
                  </div>
                }
              >
                <BlockMath math="\Rightarrow \phi_{k \mid y = 1} = \frac{\sum_{i=1}^{n} 1\left\{x_k^{(i)} = 1 \land y^{(i)} = 0\right\}}{\sum_{i=1}^{n} 1\left\{y^{(i)} = 0\right\}}" />
              </Info>
            </div>
          </DerivationContent>
        </Derivation>
      </div>
      <Content>
        <div>Having fit all these parameters, to make a prediction on a new example, we simply calculate:</div>
        <div className="flex flex-col">
          <BlockMath math="p(y = 1|x) = \frac{p(x|y = 1)p(y = 1)}{p(x)}" />
          <BlockMath math="p(y = 1|x) = \frac{\left( \prod_{j=1}^{d} p(x_j|y = 1) \right) p(y = 1)}{\left( \prod_{j=1}^{d} p(x_j|y = 1) \right) p(y = 1) + \left( \prod_{j=1}^{d} p(x_j|y = 0) \right) p(y = 0)}" />
        </div>
      </Content>
      <Content>
        <div>However, there is a problem with this approach. If any of the <InlineMath math="p(x_j|y = 1)" />, then our prediction will be 0. This happens if we don't have any training example for which a particular <InlineMath math="x_j" /> is <InlineMath math="1" />.</div>
        <div>As a work around, we apply Laplace smoothing. Our parameters then become:</div>
        <div className="flex flex-col">
          <BlockMath math="\phi_{j \mid y = 1} = \frac{1 + \sum_{i=1}^{n} 1\left\{x_j^{(i)} = 1 \land y^{(i)} = 1\right\}}{2 + \sum_{i=1}^{n} 1\left\{y^{(i)} = 1\right\}}" />
          <BlockMath math="\phi_{j \mid y = 0} = \frac{1 + \sum_{i=1}^{n} 1\left\{x_j^{(i)} = 1 \land y^{(i)} = 0\right\}}{2 + \sum_{i=1}^{n} 1\left\{y^{(i)} = 0\right\}}" />
          <BlockMath math="\phi_y = \frac{1}{n} \, \sum_{i=1}^{n} 1\left\{y^{(i)} = 1\right\}" />
        </div>
      </Content>
    </Section>
  );
}
