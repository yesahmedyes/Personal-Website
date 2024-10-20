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
                    Ignoring terms that are constant with respect to <InlineMath math="\phi" />.
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
      </div>
    </Section>
  );
}
