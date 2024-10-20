import { BlockMath, InlineMath } from "react-katex";
import Content from "~/app/notes/_components/content";
import Derivation from "~/app/notes/_components/derivation";
import DerivationContent from "~/app/notes/_components/derivationContent";
import Section from "~/app/notes/_components/section";

export default function MulticlassClassification() {
  return (
    <Section heading="Multiclass Classification">
      <Content>
        <div>
          For multi-class classification, if we have <InlineMath math="k" /> classes, we will have <InlineMath math="k * \theta" /> parameters and will use a one-vs-all approach.
        </div>
        <div>
          <BlockMath math="p(y = i \mid x ; \theta) =  \phi_i = \frac{exp\left(\theta_i^T x\right)}{\sum_{j=1}^{k} exp\left(\theta_j^T x\right)}" />
        </div>
        <div>Our cross-entropy loss (which is the negative log-likelihood) can then be written as:</div>
        <div>
          <BlockMath math="\ell_{ce}(\theta) = \sum_{i=1}^m \,- \log \left( \frac{exp\left(\theta_{y^{(i)}}^T x^{(i)}\right)}{\sum_{j=1}^k exp\left(\theta_j^T x^{(i)}\right)} \right)" />
        </div>
        <div>
          Taking the derivative of the cross-entropy loss with respect to <InlineMath math="\theta_j" />, we get:
        </div>
        <div>
          <BlockMath math="\frac{\partial}{\partial \theta_j} \ell_{ce}(\theta) = \sum_{i=1}^m \left( \phi_j^{(i)} - 1\left\{y^{(i)} = j\right\} \right) x^{(i)}" />
        </div>
        <div>
          Note that <InlineMath math="\phi_j^{(i)} = p(y^{(i)} = j \mid x^{(i)}; \theta)" />.
        </div>
        <div>
          Therefore, since <InlineMath math="\phi_j^{(i)}" /> is a probability between 0 and 1, if <InlineMath math="y^{(i)} = j" />, we add a negative value of <InlineMath math="x^{(i)}" /> to our
          gradient. And if <InlineMath math="y^{(i)} \neq j" />, we add a positive value of <InlineMath math="x^{(i)}" /> to our gradient.
        </div>
        <div>Our gradient descent update rule is then:</div>
        <div>
          <BlockMath math="\theta_j = \theta_j - \alpha \sum_{i=1}^m \left( \phi_j^{(i)} - 1\left\{y^{(i)} = j\right\} \right) x^{(i)}" />
        </div>
      </Content>
      <Derivation>
        <DerivationContent>
          <div className="flex flex-col">
            <BlockMath math="\frac{\partial}{\partial \theta_l} \ell_{ce}(\theta) = \frac{\partial}{\partial \theta_l} \, \sum_{i=1}^m \,- \log \left( \frac{exp\left(\theta_{y^{(i)}}^T x^{(i)}\right)}{\sum_{j=1}^k exp\left(\theta_j^T x^{(i)}\right)} \right)" />
            <BlockMath math="= \frac{\partial}{\partial \theta_l} \, \sum_{i=1}^m \, \left[ - \theta_{y^{(i)}}^T x^{(i)} + \log \sum_{j=1}^k exp\left(\theta_j^T x^{(i)}\right) \right]" />
            <BlockMath math="= \sum_{i=1}^m \, \left[\frac{\partial}{\partial \theta_l} \left(\log \sum_{j=1}^k exp\left(\theta_j^T x^{(i)}\right)\right) - \frac{\partial}{\partial \theta_l} \left(\theta_{y^{(i)}}^T x^{(i)}\right) \right]" />
            <BlockMath math="= \sum_{i=1}^m \, \left[\frac{1}{\sum_{j=1}^k exp\left(\theta_j^T x^{(i)}\right)} \cdot \left(\frac{\partial}{\partial \theta_l} \sum_{j=1}^k exp\left(\theta_j^T x^{(i)}\right) \right) - x^{(i)} \left\{ y^{(i)} = l \right\} \right]" />
            <BlockMath math="= \sum_{i=1}^m \, \left[\frac{exp\left(\theta_l^T x^{(i)}\right)}{\sum_{j=1}^k exp\left(\theta_j^T x^{(i)}\right)} \cdot x^{(i)} - x^{(i)} \left\{ y^{(i)} = l \right\} \right]" />
            <BlockMath math="= \sum_{i=1}^m \, \left(\frac{exp\left(\theta_l^T x^{(i)}\right)}{\sum_{j=1}^k exp\left(\theta_j^T x^{(i)}\right)} - 1 \left\{ y^{(i)} = l \right\} \right) x^{(i)}" />
            <BlockMath math="= \sum_{i=1}^m \left( \phi_l^{(i)} - 1\left\{y^{(i)} = l\right\} \right) x^{(i)}" />
          </div>
        </DerivationContent>
      </Derivation>
    </Section>
  );
}
