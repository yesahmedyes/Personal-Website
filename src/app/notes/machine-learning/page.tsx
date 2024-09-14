import LinksSection from "../_components/linksSection";
import Main from "../_components/main";

export default function MachineLearning() {
  const data = [
    {
      title: "Linear Regression",
      link: "/notes/machine-learning/linear-regression",
    },
    {
      title: "Classification and Logistic Regression",
      link: "/notes/machine-learning/logistic-regression",
    },
    {
      title: "Generalized Linear Models",
      link: "/notes/machine-learning/generalized-linear-models",
    },
    {
      title: "Generative Learning Algorithms",
      link: "/notes/machine-learning/generative-learning-algorithms",
    },
    {
      title: "Gaussian Discriminant Analysis",
      link: "/notes/machine-learning/gaussian-discriminant-analysis",
    },
    {
      title: "Naive Bayes",
      link: "/notes/machine-learning/naive-bayes",
    },
    {
      title: "Kernel Methods",
      link: "/notes/machine-learning/kernel-methods",
    },
    {
      title: "Deep Learning",
      link: "/notes/machine-learning/deep-learning",
    },
    {
      title: "Generalization",
      link: "/notes/machine-learning/generalization",
    },
    {
      title: "Clustering and K-Means",
      link: "/notes/machine-learning/clustering",
    },
    {
      title: "Principal Component Analysis",
      link: "/notes/machine-learning/principal-component-analysis",
    },
    {
      title: "Independent Component Analysis",
      link: "/notes/machine-learning/independent-component-analysis",
    },
    {
      title: "Expectation Maximization Algorithms",
      link: "/notes/machine-learning/expectation-maximization-algorithms",
    },
    {
      title: "Gaussian Mixture Models",
      link: "/notes/machine-learning/gaussian-mixture-models",
    },
    {
      title: "Factor Analysis",
      link: "/notes/machine-learning/factor-analysis",
    },
    {
      title: "Variational Autoencoders",
      link: "/notes/machine-learning/variational-autoencoders",
    },
    {
      title: "Self-Supervised Learning",
      link: "/notes/machine-learning/self-supervised-learning",
    },
    {
      title: "Reinforcement Learning 1",
      link: "/notes/machine-learning/reinforcement-learning-1",
    },
    {
      title: "Reinforcement Learning 2",
      link: "/notes/machine-learning/reinforcement-learning-2",
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
