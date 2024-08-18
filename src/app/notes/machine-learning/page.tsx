"use client";

import Link from "next/link";
import { useState } from "react";

export default async function MachineLearning() {
  const [topic, setTopic] = useState<string | null>(null);

  const data = [
    {
      title: "Linear Regression",
    },
    {
      title: "Classification and Logistic Regression",
    },
    {
      title: "Generalized Linear Models",
    },
    {
      title: "Generative Learning Algorithms",
    },
    {
      title: "Gaussian Discriminant Analysis",
    },
    {
      title: "Naive Bayes",
    },
    {
      title: "Kernel Methods",
    },
    {
      title: "Deep Learning",
    },
    {
      title: "Generalization and Regularization",
    },
    {
      title: "Clustering and K-Means",
    },
    {
      title: "Principal Component Analysis",
    },
    {
      title: "Independent Component Analysis",
    },
    {
      title: "Expectation Maximization Algorithms",
    },
    {
      title: "Gaussian Mixture Models",
    },
    {
      title: "Factor Analysis",
    },
    {
      title: "Variational Autoencoders",
    },
    {
      title: "Self-Supervised Learning",
    },
    {
      title: "Reinforcement Learning 1",
    },
    {
      title: "Reinforcement Learning 2",
    }
  ];

  return (
    <div className="from-bgDark to-bgDarkShade flex h-screen w-full justify-center bg-gradient-to-b">
      <div className="flex h-screen w-full flex-row overflow-y-auto">
        <div className="bg-componentDark flex h-full w-3/12 flex-col gap-4 px-8 py-12 font-light text-white text-opacity-95 overflow-y-auto no-scrollbar">
          {!topic &&
            data.map((item, index) => (
              <div
                onClick={() => setTopic(item.title)}
                key={index}
                className="cursor-pointer hover:text-orange-500"
              >
                {item.title}
              </div>
            ))}
        </div>
        <div className="flex h-full w-9/12 flex-col place-items-center overflow-y-auto py-12 text-opacity-95">
          <div className="flex w-10/12 flex-col rounded-sm bg-white p-12 gap-8">
            <div className="font-medium text-3xl font-serif w-full text-center">Machine Learning</div>
            <div className="leading-loose font-roboto">
              These notes are adapted from and meant to be a supplementary
              resource to the Andrew Ng's notes for the CS229 Machine Learning
              Course at Stanford.
            </div>
            <div className="flex flex-col gap-3.5 w-full bg-[#CCE5FE] p-10 rounded">
              {data.map((item, index) => (
                <div
                  onClick={() => setTopic(item.title)}
                  key={index}
                  className="cursor-pointer text-[#007bff] hover:text-[#004085]"
                >
                  {index + 1}. {item.title}
                </div>
              ))}
            </div>
            <div className="leading-loose italic">
              <span className="font-semibold">Acknowledgments: </span>
              These notes are adapted from and meant to be a supplementary
              resource to the Andrew Ng's Notes for the CS229 Machine Learning
              Course at Stanford.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
