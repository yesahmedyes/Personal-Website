"use client";

import React, { type ReactElement } from "react";
import { useEffect, useRef, useState } from "react";

interface MainWithSidebarProps {
  heading: string;
  children: React.ReactNode;
}

export default function MainWithSidebar(props: MainWithSidebarProps) {
  const { heading, children } = props;

  const [activeSection, setActiveSection] = useState<string | null>(null);

  const [sectionIds, setSectionIds] = useState<string[]>([]);
  const sectionRefs = useRef<React.RefObject<HTMLParagraphElement>[]>([]);

  useEffect(() => {
    const childrenCount = React.Children.count(children);

    sectionRefs.current = sectionRefs.current.slice(0, childrenCount);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 },
    );

    sectionRefs.current.forEach((ref) => {
      if (ref.current && ref.current instanceof Element) {
        observer.observe(ref.current);
      }
    });

    return () => {
      sectionRefs.current.forEach((ref) => {
        if (ref.current && ref.current instanceof Element) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, [children]);

  useEffect(() => {
    const ids = React.Children.map(children, (child) => {
      if (React.isValidElement<{ id: string }>(child)) {
        return child.props.id;
      }
    });

    setSectionIds(ids!);
  }, [children]);

  const childrenWithRefs = React.Children.map(children, (child, index) => {
    if (React.isValidElement(child)) {
      if (!sectionRefs.current[index]) {
        sectionRefs.current[index] = React.createRef();
      }

      return React.cloneElement(child as ReactElement, {
        ref: sectionRefs.current[index],
        key: index,
      });
    }
  });

  function scrollToSection(id: string) {
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <div className="flex h-full w-full justify-center bg-bgLessDark">
      <div className="flex h-full w-full flex-row">
        <div className="no-scrollbar bg-bgDark flex min-h-full w-[350px] flex-col gap-4 overflow-y-auto bg-componentDark px-8 py-12 font-light text-white text-opacity-95">
          {sectionIds.map((id) => (
            <div
              onClick={() => {
                setActiveSection(id);
                scrollToSection(id);
              }}
              className={`cursor-pointer hover:text-orange-500 ${activeSection === id && "text-orange-500"}`}
              key={id}
            >
              {id}
            </div>
          ))}
        </div>
        <div className="flex min-h-full w-full flex-col place-items-center overflow-y-auto py-16 overflow-x-hidden">
          <div className="flex w-9/12 flex-col gap-8 rounded-sm bg-white p-16">
            <div className="w-full pb-6 text-center font-serif text-3xl font-medium">{heading}</div>
            {childrenWithRefs}
          </div>
        </div>
      </div>
    </div>
  );
}
