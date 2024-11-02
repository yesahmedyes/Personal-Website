"use client";

import { ArrowLeft2, ArrowRight2 } from "iconsax-react";
import React, { type ReactElement } from "react";
import { useEffect, useRef, useState } from "react";

interface MainWithSidebarProps {
  children: React.ReactNode;
}

export default function MainWithSidebar(props: MainWithSidebarProps) {
  const { children } = props;

  const [activeSection, setActiveSection] = useState<string | null>(null);

  const [sectionIds, setSectionIds] = useState<string[]>([]);
  const sectionRefs = useRef<React.RefObject<HTMLParagraphElement>[]>([]);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    return;
    setIsSidebarOpen(!isSidebarOpen);
  };

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
      { threshold: 0 },
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
    <div className="flex flex-col h-full w-full justify-center bg-bgLessDark">
      <div className="flex h-full w-full flex-row justify-center transition-all duration-300">
        {/* {isSidebarOpen && (
          <div className="transition-all duration-300 no-scrollbar left-0 fixed bg-bgDark flex min-h-full w-[350px] flex-col gap-5 overflow-y-auto bg-componentDark px-8 pb-12 pt-6 font-light text-white text-opacity-95">
            <div onClick={toggleSidebar} className="place-self-end text-white hover:text-orange-500 cursor-pointer">
              <ArrowLeft2 size={20} />
            </div>

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
        )}
        {!isSidebarOpen && (
          <div className="transition-all duration-300 fixed gap-5 overflow-y-auto px-8 pt-6 left-0">
            <div onClick={toggleSidebar} className="place-self-end text-white hover:text-orange-500 cursor-pointer">
              <ArrowRight2 size={20} />
            </div>
          </div>
        )} */}
        <div className={`transition-all duration-300 flex min-h-full place-self-center w-full flex-col place-items-center overflow-y-auto gap-12 pt-16 pb-32 overflow-x-hidden ${isSidebarOpen ? "ml-[350px]" : "w-10/12 p-16"}`}>
          {childrenWithRefs}
        </div>
      </div>
    </div>
  );
}
