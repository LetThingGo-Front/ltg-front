"use client";

import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import imageCompression from "browser-image-compression";
import { BeatLoader } from "react-spinners";

const MAX_FILE_COUNT = 5;

type Props = {
  onChange: (acceptedFiles: File[]) => void;
};

export default function ImageUpload({ onChange }: Props) {
  const [files, setFiles] = useState<Array<File & { preview: string }>>([]);
  const [resizing, setResizing] = useState(false);

  const deleteFile = useCallback(
    (idx: number) => {
      const newFile = files.filter((_, index) => index !== idx);
      setFiles(newFile);
    },
    [files],
  );

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const filesName = files.map((file) => file.name);
      const isDuplicated = acceptedFiles.some((newFile) =>
        filesName.includes(newFile.name),
      );

      if (files.length + acceptedFiles.length > MAX_FILE_COUNT) {
        alert("최대 5개까지만 업로드 가능합니다.");
        return;
      }

      if (isDuplicated) {
        alert("중복 이미지는 업로드할 수 없습니다.");
        return;
      }
      const compressionFiles = await handleImageCompression(acceptedFiles);
      if (compressionFiles) {
        const newFiles = compressionFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        );

        setFiles((prevFiles) => [...prevFiles, ...newFiles]);
      }
    },
    [files],
  );

  const handleImageCompression = async (file: File[]) => {
    setResizing(true);
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    try {
      const compressionFiles = await Promise.all(
        file.map(async (f) => {
          if (f.size > 1024 * 1024) {
            const compressedBlob = await imageCompression(f, options);
            const compressedFile = new File([compressedBlob], f.name, {
              type: f.type,
            });
            return compressedFile;
          } else {
            return f;
          }
        }),
      );
      setResizing(false);
      return compressionFiles;
    } catch (error) {
      setResizing(false);
      console.error("image resizing error: ", error);
      alert("이미지 압축 중 오류가 발생했습니다.");
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop,
    disabled: files.length >= MAX_FILE_COUNT ? true : false,
    noDrag: true,
  });

  const thumbs = files.map((file, idx) => (
    <div
      className="relative box-border inline-flex h-[5.75rem] w-[5.75rem]"
      key={file.name}
    >
      <div className="flex min-w-0 overflow-hidden">
        <Image
          src={file.preview}
          className="h-full rounded-md"
          onLoadingComplete={() => {
            URL.revokeObjectURL(file.preview);
          }}
          width={100}
          height={100}
          alt="thumbnail"
        />
      </div>
      <button
        type="button"
        className="absolute -right-2 -top-2 rounded-full bg-transparent"
        onClick={() => deleteFile(idx)}
      >
        <Image
          src="/assets/images/button/close_grey.svg"
          width={20}
          height={20}
          alt="close"
        />
      </button>
    </div>
  ));

  const emptyThumbs = Array.from({
    length: MAX_FILE_COUNT - files.length,
  }).map((_, idx) => (
    <div
      className="h-[5.75rem] w-[5.75rem] rounded-lg border border-dashed border-grey-200"
      key={idx}
    ></div>
  ));

  useEffect(() => {
    console.log(files);
    onChange(files.map((file) => file));
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files, onChange]);

  return (
    <div className="mt-3 flex flex-wrap gap-2">
      <div
        {...getRootProps({ className: "dropzone" })}
        className="relative flex h-[5.75rem] w-[5.75rem] cursor-pointer items-center justify-center rounded-lg bg-grey-50 hover:bg-grey-100 active:bg-grey-50/70"
      >
        <input {...getInputProps()} />
        <Image
          src="/assets/images/button/square_plus.svg"
          width={20}
          height={20}
          alt="add"
        />
        <p className="absolute bottom-4 text-xxxs font-semibold text-grey-400">
          jpg,png,heic
        </p>
      </div>
      {thumbs}
      {emptyThumbs}
      {resizing && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/50">
          <p className="font-semibold">Image resizing...</p>
          <BeatLoader />
        </div>
      )}
    </div>
  );
}
