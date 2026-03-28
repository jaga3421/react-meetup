"use client";
import React from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { dracula } from "react-code-blocks";
import SlideWrapper from "../components/SlideWrapper";
import MotionH1 from "../components/MotionH1";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  VariantStaggerParent,
  VariantStaggerChildRight,
} from "../framerVariants";

const CodeBlock = dynamic(
  () => import("react-code-blocks").then((mod) => mod.CodeBlock),
  { ssr: false }
);

function EditorPreview({ slide }) {
  const activeFile =
    slide.files?.find((item) => item.active && item.type === "file")?.label ||
    slide.editorTitle ||
    slide.title;

  return (
    <div className="w-[58%] flex-shrink-0">
      <div className="h-full overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0b1220] shadow-[0_25px_60px_rgba(0,0,0,0.35)]">
        <div className="flex items-center justify-between border-b border-white/10 bg-black/20 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
            <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
            <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
            <span className="ml-3 text-xs uppercase tracking-[0.28em] text-gray-400">
              Voice demo repo
            </span>
          </div>
          <div className="text-[11px] uppercase tracking-[0.28em] text-gray-500">
            Important piece
          </div>
        </div>

        <div className="grid h-[430px] grid-cols-[220px_1fr]">
          <div className="overflow-y-auto border-r border-white/10 bg-[#0a101c] px-3 py-4">
            <div className="mb-3 text-[11px] uppercase tracking-[0.28em] text-gray-500">
              File tree
            </div>
            <div className="space-y-1.5">
              {slide.files?.map((item, index) => (
                <div
                  key={`${item.label}-${index}`}
                  className={`rounded-xl px-3 py-2 text-sm ${
                    item.active
                      ? "bg-pink-500/15 text-pink-200"
                      : "text-gray-400"
                  }`}
                  style={{ marginLeft: `${(item.depth || 0) * 14}px` }}
                >
                  <span className="font-mono">
                    {item.type === "folder" ? "> " : "- "}
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="min-w-0 overflow-hidden">
            <div className="border-b border-white/10 bg-black/10 px-4 py-3 text-sm text-gray-300">
              {activeFile}
            </div>
            <div className="h-[374px] overflow-auto text-sm">
              <CodeBlock
                text={slide.code}
                language={slide.language || "javascript"}
                theme={dracula}
                showLineNumbers={true}
                wrapLines={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HorizandalSubSlides({ data }) {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <div ref={ref}>
      <SlideWrapper className="text-center md:items-start" id="why">
        <MotionH1 className="text-center" inView={inView}>
          {data?.title}
        </MotionH1>

        {/* Horizandal slides */}
        <motion.div
          className={`flex overflow-x-scroll snap-x snap-mandatory mx-auto ${
            data.peekAdjacent
              ? "w-full gap-6 px-6 pb-2"
              : "w-[95%] space-x-4"
          }`}
          variants={VariantStaggerParent}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          {data.horizandalSubSlides?.map((slide, index) => {
            const hasEditorPreview = Boolean(slide.files?.length && slide.code);

            return (
              <motion.div
                variants={VariantStaggerChildRight}
                key={index}
                className={`flex-shrink-0 font-light text-left ${
                  data.peekAdjacent
                    ? "w-[86%] xl:w-[80%] snap-start"
                    : "w-[95%] snap-center"
                }`}
              >
                <div
                  className={`cardPrimary ${
                    data.center ? "mx-auto" : ""
                  } flex flex-row gap-6 h-full min-h-[520px] ${
                    hasEditorPreview ? "overflow-hidden" : ""
                  }`}
                >
                  <div
                    className={
                      hasEditorPreview
                        ? "w-[42%] h-full overflow-auto"
                        : slide.image || slide.code
                          ? "w-[60%] h-full overflow-auto"
                          : "w-full"
                    }
                  >
                    {slide?.title && <h3 className="text-5xl mb-8">{slide?.title}</h3>}

                    {slide.summary && (
                      <p className="mb-8 text-2xl leading-relaxed text-gray-300">
                        {slide.summary}
                      </p>
                    )}

                    {hasEditorPreview ? (
                      <div className="space-y-4">
                        {slide.list?.map((content, itemIndex) => (
                          <div
                            key={itemIndex}
                            className="rounded-2xl border border-white/10 bg-black/10 p-5"
                          >
                            <div className="text-xl font-semibold text-pink-400">
                              {content.title}
                            </div>
                            <div className="mt-2 text-lg leading-relaxed text-gray-300">
                              {content.content}
                            </div>
                          </div>
                        ))}

                        {slide.footer && (
                          <div className="pt-2 text-xs uppercase tracking-[0.3em] text-gray-500">
                            {slide.footer}
                          </div>
                        )}
                      </div>
                    ) : (
                      slide.list?.map((content, itemIndex) => (
                        <li
                          key={itemIndex}
                          className="flex items-start mb-8 space-x-4 text-3xl"
                        >
                          <p className="font-thin">
                            <span className="font-bold">{content.title}</span>{" "}
                            {content.content}
                            {content.link && (
                              <a
                                href={content.link}
                                className="mt-4 inline-flex items-center rounded-full border border-pink-500/40 px-4 py-2 text-base font-medium text-pink-400 transition-colors hover:border-pink-400 hover:text-pink-300"
                              >
                                Open demo
                              </a>
                            )}
                            {content.images &&
                              content.images.map((image, imageIndex) => (
                                <img
                                  src={image}
                                  className="mt-3"
                                  alt={content.title}
                                  key={imageIndex}
                                />
                              ))}
                          </p>
                        </li>
                      ))
                    )}
                  </div>

                  {hasEditorPreview && <EditorPreview slide={slide} />}

                  {!hasEditorPreview && slide.image && (
                    <div className="w-[40%] flex-shrink-0 flex items-center justify-center relative">
                      <Image
                        src={slide.image}
                        alt={slide.title || "Slide image"}
                        width={600}
                        height={400}
                        className="w-full h-auto object-contain rounded-lg"
                      />
                    </div>
                  )}

                  {!hasEditorPreview && slide.code && (
                    <div className="w-[40%] flex-shrink-0 flex items-start justify-start relative h-full">
                      <div className="w-full h-full overflow-auto">
                        <CodeBlock
                          text={slide.code}
                          language={slide.language || "javascript"}
                          theme={dracula}
                          showLineNumbers={true}
                          wrapLines={true}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </SlideWrapper>
    </div>
  );
}

export default HorizandalSubSlides;
