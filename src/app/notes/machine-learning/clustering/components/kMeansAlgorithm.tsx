import Section from "../../../_components/section";
import Algorithm from "~/app/notes/_components/algorithm";
import { BlockMath, InlineMath } from "react-katex";

export default function KMeansAlgorithm() {
  return (
    <Section heading="K-Means Algorithm" title="Clustering">
      <div>
        For a given dataset <InlineMath math="x^{(1)}, \ldots, x^{(n)}" /> without any labels <InlineMath math="y^{(i)}" />, clustering is the task of finding a partition of the data into subsets
        (clusters) such that the data points in the same cluster are more similar to each other than to those in other clusters. For this purpose, we usually use the k-means algorithm.
      </div>

      <Algorithm>
        <BlockMath math="\text{Initialize cluster centroids } \mu_1, \ldots, \mu_k \text{ randomly}" />
        <BlockMath math="\text{Repeat until convergence \{}" />
        <BlockMath math="\hspace{2em} \text{For each } i, \text{ set } \text{\{}" />
        <BlockMath math="\hspace{4em} c^{(i)} \leftarrow \arg \min_j \| x^{(i)} - \mu_j \|^2" />
        <BlockMath math="\hspace{2em} \text{\}}" />
        <BlockMath math="\hspace{2em} \text{For each } j, \text{ set } \text{\{}" />
        <BlockMath math="\hspace{4em} \mu_j \leftarrow \frac{\sum_{i=1}^n 1\left\{c^{(i)} = j\right\} \, x^{(i)}}{\sum_{i=1}^n 1\left\{c^{(i)} = j\right\}}" />
        <BlockMath math="\hspace{2em} \text{\}}" />
        <BlockMath math="\text{\}}" />
      </Algorithm>

      <div>
        The first loop gives us the centroid <InlineMath math="c^{(i)}" /> that is closest to each data point <InlineMath math="x^{(i)}" />. The second loop updates the centroid{" "}
        <InlineMath math="\mu_j" /> for each cluster <InlineMath math="j" /> as the mean of all data points <InlineMath math="x^{(i)}" /> assigned to that cluster.
      </div>

      <div>The distortion function (that measures the sum of the squared distances between each data point and its assigned centroid) can be written as:</div>
      <div>
        <BlockMath math="J(c, \mu) = \sum_{i=1}^n \| x^{(i)} - \mu_{c^{(i)}} \|^2" />
      </div>
      <div>
        In each step of the k-means algorithm, <InlineMath math="J" /> either decreases or stays the same. Therefore, the algorithm is guaranteed to converge. However, the convergence is not
        guaranteed to reach a global minimum since <InlineMath math="J" /> is non-convex.
      </div>
    </Section>
  );
}
