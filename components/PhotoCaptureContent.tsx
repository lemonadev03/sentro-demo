"use client";

import { useState } from "react";
import Image from "next/image";

const resolvedPhoto = {
  id: "resolved",
  label: "Resolved photo",
  time: "Just now",
  src: "/photos/resolved.png",
};

export default function PhotoCaptureContent() {
  const [hasPhoto, setHasPhoto] = useState(false);

  return (
    <div className="space-y-3">
      {!hasPhoto ? (
        <button
          type="button"
          className="flex min-h-[120px] w-full items-center justify-center rounded-lg border border-dashed border-border bg-muted/20 px-4 text-center text-sm text-muted-foreground transition hover:bg-muted/30"
          onClick={() => setHasPhoto(true)}
        >
          <div>
            <p className="text-sm font-semibold text-foreground">No photos yet</p>
            <p className="text-xs text-muted-foreground">
              Tap to add resolved photo.
            </p>
          </div>
        </button>
      ) : (
        <div className="max-w-sm overflow-hidden rounded-lg border border-border bg-muted/20">
          <div className="relative h-28 w-full">
            <Image
              src={resolvedPhoto.src}
              alt={resolvedPhoto.label}
              fill
              className="object-cover"
              sizes="(min-width: 640px) 320px, 100vw"
            />
          </div>
          <div className="px-3 py-2">
            <p className="text-xs font-semibold text-foreground">
              {resolvedPhoto.label}
            </p>
            <p className="text-xs text-muted-foreground">{resolvedPhoto.time}</p>
          </div>
        </div>
      )}

      <p className="text-xs text-muted-foreground">
        {hasPhoto ? "1 photo captured." : "Accepted: JPG, PNG."}
      </p>
    </div>
  );
}
