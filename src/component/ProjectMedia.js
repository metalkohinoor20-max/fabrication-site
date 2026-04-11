// components/ProjectMedia.js
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Play, X } from 'lucide-react';

const ProjectMedia = ({ media, title }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMedia, setModalMedia] = useState(null);

  const hasMultiple = media.length > 1;
  const currentItem = media[currentIndex];

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % media.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + media.length) % media.length);
  };

  const openModal = (item, index) => {
    setModalMedia({ item, index });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalMedia(null);
  };

  const modalNext = () => {
    if (modalMedia) {
      const nextIndex = (modalMedia.index + 1) % media.length;
      setModalMedia({ item: media[nextIndex], index: nextIndex });
    }
  };

  const modalPrev = () => {
    if (modalMedia) {
      const prevIndex = (modalMedia.index - 1 + media.length) % media.length;
      setModalMedia({ item: media[prevIndex], index: prevIndex });
    }
  };

  return (
    <>
      {/* Main Display */}
      <div className="relative overflow-hidden rounded-2xl bg-gray-100">
        <div
          className="relative aspect-[16/9] cursor-pointer"
          onClick={() => openModal(currentItem, currentIndex)}
        >
          {currentItem.type === 'video' ? (
            <>
              <video
                src={currentItem.url}
                poster={currentItem.thumbnail}
                className="h-full w-full object-cover"
                controls={false}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition hover:bg-black/40">
                <div className="rounded-full bg-white/90 p-4 shadow-lg">
                  <Play className="h-8 w-8 text-green-600" fill="currentColor" />
                </div>
              </div>
            </>
          ) : (
            <Image
              src={currentItem.url}
              alt={currentItem.alt || title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 80vw"
            />
          )}
        </div>

        {/* Navigation Buttons */}
        {hasMultiple && (
          <>
            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition hover:bg-black/70"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition hover:bg-black/70"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        {/* Thumbnails */}
        {hasMultiple && (
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
            {media.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === currentIndex ? 'w-6 bg-green-500' : 'w-2 bg-white/70'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Thumbnail Strip */}
      {hasMultiple && (
        <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
          {media.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`relative aspect-[16/9] w-24 flex-shrink-0 overflow-hidden rounded-lg border-2 transition ${
                idx === currentIndex ? 'border-green-500' : 'border-transparent'
              }`}
            >
              {item.type === 'video' ? (
                <>
                  <Image
                    src={item.thumbnail || item.url}
                    alt={item.alt || title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <Play size={16} className="text-white" />
                  </div>
                </>
              ) : (
                <Image src={item.url} alt={item.alt || title} fill className="object-cover" />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Modal for Fullscreen View */}
      {isModalOpen && modalMedia && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
          onClick={closeModal}
        >
          <button
            onClick={closeModal}
            className="absolute right-4 top-4 rounded-full bg-white/20 p-2 text-white transition hover:bg-white/40"
          >
            <X size={24} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              modalPrev();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-3 text-white transition hover:bg-white/40"
          >
            <ChevronLeft size={24} />
          </button>

          <div
            className="relative max-h-[90vh] max-w-[90vw] cursor-pointer"
            onClick={(e) => e.stopPropagation()}
          >
            {modalMedia.item.type === 'video' ? (
              <video
                src={modalMedia.item.url}
                controls
                autoPlay
                className="max-h-[90vh] max-w-[90vw] rounded-lg"
              />
            ) : (
              <Image
                src={modalMedia.item.url}
                alt={modalMedia.item.alt || title}
                width={1200}
                height={800}
                className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain"
              />
            )}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              modalNext();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/20 p-3 text-white transition hover:bg-white/40"
          >
            <ChevronRight size={24} />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-sm text-white">
            {modalMedia.index + 1} / {media.length}
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectMedia;