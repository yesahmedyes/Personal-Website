import LinksSection from "../_components/linksSection";
import Main from "../_components/main";

export default function MachineLearning() {
  const data = [
    {
      title: "Linear Regression",
      link: "/notes/machine-learning/linear-regression",
    },
    {
      title: "Classification",
      link: "/notes/machine-learning/classification",
    },
    {
      title: "Generative Learning Algorithms",
      link: "/notes/machine-learning/generative-learning-algorithms",
    },
    {
      title: "Kernel Methods",
      link: "/notes/machine-learning/kernel-methods",
    },
    {
      title: "Learning Theory",
      link: "/notes/machine-learning/learning-theory",
    },
    {
      title: "Expectancy Maximization Algorithm",
      link: "/notes/machine-learning/em-algorithm",
    },
    {
      title: "Clustering",
      link: "/notes/machine-learning/clustering",
    },
    {
      title: "Dimensionality Reduction",
      link: "/notes/machine-learning/dimensionality-reduction",
    },
    {
      title: "Variational Autoencoders",
      link: "/notes/machine-learning/variational-autoencoders",
    },
    {
      title: "Independent Component Analysis",
      link: "/notes/machine-learning/independent-component-analysis",
    },
    {
      title: "Decision Trees",
      link: "/notes/machine-learning/decision-trees",
    },
    {
      title: "Reinforcement Learning",
      link: "/notes/machine-learning/reinforcement-learning",
    },
  ];

  return (
    <Main heading="Machine Learning">
      <LinksSection links={data} />
      <div className="italic">
        <span className="font-semibold">Acknowledgments: </span>
        These notes are adapted from and meant to be a supplementary resource to the Andrew Ng&apos;s Notes for the CS229 Machine Learning Course at Stanford.
      </div>
    </Main>
  );
}
