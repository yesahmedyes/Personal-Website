import MyLink from "~/app/notes/_components/myLink";
import Section from "../../../_components/section";
import { BlockMath, InlineMath } from "react-katex";
import Content from "~/app/notes/_components/content";
import Derivation from "~/app/notes/_components/derivation";
import DerivationContent from "~/app/notes/_components/derivationContent";
import Info from "~/app/notes/_components/info";

export default function Introduction() {
  return (
    <Section title="Decision Trees" heading="Introduction">
      <Content>
        <div>
          In the <MyLink href="/notes/machine-learning/clustering">K-means Algorithm</MyLink>, we made an inherent assumption that data points of various classes are not randomly sprinkled across the
          space, but instead appear in cluseters of more or less homogeneous space.
        </div>
        <div>Decision trees exploit this very assumption to build a tree structure that recursively divides the feature space into regions with similar labels.</div>
        <div>For this purpose, we use the concept of purity. We want to split the data at each node such that the resulting subsets are as pure as possible.</div>
        <div>Two common impurity measures are Gini impurity and entropy.</div>
        <div>
          Let <InlineMath math="S = \{(x^{(1)}, y^{(1)}), \ldots, (x^{(n)}, y^{(n)})\}" /> be a set of training examples where <InlineMath math="y^{(i)} \in \{1, \ldots, c\}" /> for{" "}
          <InlineMath math="c" /> classes. Then we can define the probability of any class <InlineMath math="k" /> as:
        </div>
        <div>
          <BlockMath math="p_k = \frac{|S_k|}{|S|}" />
        </div>
        <div>
          The Gini impurity of a leaf <InlineMath math="S" /> is given by:
        </div>
        <div>
          <BlockMath math="G(S) = \sum_{k=1}^c p_k (1 - p_k)" />
        </div>
        <div>
          And for a split <InlineMath math="S \rightarrow S_L, \, S_R" />, the Gini impurity is given by:
        </div>
        <div className="flex flex-col">
          <BlockMath math="G(S) = \frac{|S_L|}{|S|} \cdot G(S_L) + \frac{|S_R|}{|S|} \cdot G(S_R)" />
        </div>
        <div>
          Similarly, the entropy of a leaf <InlineMath math="S" /> is given by:
        </div>
        <div>
          <BlockMath math="H(S) = - \sum_{k=1}^c p_k \log p_k" />
        </div>
        <div>
          And for a split <InlineMath math="S \rightarrow S_L, \, S_R" />, the entropy impurity is given by:
        </div>
        <div className="flex flex-col">
          <BlockMath math="H(S) = \frac{|S_L|}{|S|} \cdot H(S_L) + \frac{|S_R|}{|S|} \cdot H(S_R)" />
        </div>
      </Content>
      <Content>
        <div>
          Also, note that the worst case for our probabilities is if they follow a uniform distribution and <InlineMath math="p_k = \frac{1}{c}" /> for each <InlineMath math="k" /> because this would
          mean that each leaf is equally likely and our predictions are as good as random guessing.
        </div>
        <div>
          If we let this distribution be <InlineMath math="q" /> then we see that minimizing the entropy is equivalent to maximizing the KL-divergence <InlineMath math="D_{KL}(p || q)" />.
        </div>
        <div className="flex flex-col">
          <BlockMath math="\arg \max_p D_{KL}\left(p \, || \, q\right) = \arg \min_p \left( - \sum_k p_k \, \log p_k \right)" />
          <BlockMath math=" = \arg \min_p H(p)" />
        </div>
      </Content>
      <Derivation>
        <DerivationContent>
          <div className="flex flex-col">
            <BlockMath math="D_{KL}\left(p \, || \, q\right) = \sum_{i=1}^{c} \left(p_i \, \log \frac{p_i}{q_i}\right)" />
            <Info
              info={
                <div>
                  <BlockMath math="q_i = \frac{1}{c}" />
                </div>
              }
            >
              <BlockMath math="= \sum_{i=1}^{c} \left(p_i \log p_i - p_i \log \frac{1}{c} \right)" />
            </Info>
          </div>
          <BlockMath math="= \sum_{i=1}^{c} p_i \log p_i + \log c \cdot \sum_{i=1}^{c} p_i" />
          <Info
            info={
              <div>
                <BlockMath math="\sum_{i=1}^{c} p_i = 1" />
              </div>
            }
          >
            <BlockMath math="= \sum_{i=1}^{c} p_i \log p_i + \log c" />
          </Info>
        </DerivationContent>
        <DerivationContent>
          <div>Now,</div>
          <div className="flex flex-col">
            <BlockMath math="\arg \max_p D_{KL}\left(p \, || \, q\right) = \arg \max_p \left( \sum_{i=1}^{c} p_i \log p_i + \log c \right)" />
            <Info
              info={
                <div>
                  <InlineMath math="\log c" /> is just a constant and does not depend on <InlineMath math="p" />.
                </div>
              }
            >
              <BlockMath math="= \arg \max_p \left( \sum_{i=1}^{c} p_i \log p_i \right)" />
            </Info>
            <BlockMath math="= \arg \min_p \left( - \sum_{i=1}^{c} p_i \log p_i \right)" />
            <BlockMath math="= \arg \min_p H(s)" />
          </div>
        </DerivationContent>
      </Derivation>
      <Content>
        <div>However, building a maximally compact tree with only pure leaves for any data set is a NP-hard problem. Therefore, we use a greedy approach instead.</div>
        <div>
          One example of this is the ID3 algorithm. In this algorithm, we start at the root node and at each step select the feature <InlineMath math="x_j" /> that best separates the data and
          minimizes the impurity. We then recurse on the left and right subsets defined by this split until we can no longer split the data.
        </div>
        <div>A problem with this approach is that the ID3 algorithm stops splitting if a single split doesn&apos;t reduce impurity, even though a combination of splits might.</div>
        <div>
          Another example of the greedy approach is the CART (Classification and Regression Trees) algorithm. CART can handle both classification and regression tasks. For regression tasks, the cost
          function is the squared error and for classification tasks it is the Gini impurity or entropy.
        </div>
      </Content>
    </Section>
  );
}
