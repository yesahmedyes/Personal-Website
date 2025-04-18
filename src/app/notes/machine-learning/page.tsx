import LinksSection from "../_components/linksSection";
import Main from "../_components/main";
import Section from "../_components/section";

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
    // {
    //   title: "Bayesian Learning",
    //   link: "/notes/machine-learning/bayesian-learning",
    // },
    {
      title: "Learning Theory",
      link: "/notes/machine-learning/learning-theory",
    },
    {
      title: "Clustering",
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
      title: "Expectancy Maximization Algorithm",
      link: "/notes/machine-learning/em-algorithm",
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
      title: "Decision Trees",
      link: "/notes/machine-learning/decision-trees",
    },
    {
      title: "Reinforcement Learning",
      link: "/notes/machine-learning/reinforcement-learning",
    },
  ];

  return (
    <Main>
      <Section title="Machine Learning">
        <LinksSection links={data} />

        <div className="text-sm leading-7 pt-4">
          <span className="font-semibold">Note: </span>I wrote these notes for my own reference while I was taking the CS229 Machine Learning course at Stanford offered by Anand Avati in Summer 2020.
          I hope they are useful for others.
        </div>
      </Section>
    </Main>
  );
}
