"use client";

import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import imageCompression from "browser-image-compression";
import LoadingMapSpinner from "@/components/common/LoadingMapSpinner";
import { f } from "msw/lib/core/HttpResponse-DzhqZzTK";

const MAX_FILE_UPLOAD_COUNT = 5;
const MAX_FILE_SIZE_MB = 1;
const MAX_FILE_WIDTH_HEIGHT = 1920;
const CONVERSION_TYPE = "image/jpeg";
const CONVERSION_FORMAT = "jpg";

type Props = {
  onChange: (acceptedFiles: File[]) => void;
};

export default function ImageUpload({ onChange }: Props) {
  const [files, setFiles] = useState<Array<File & { preview: string }>>([]);
  const [resizing, setResizing] = useState(false);

  const compressImage = useCallback(async (file: File[]) => {
    const options = {
      maxSizeMB: MAX_FILE_SIZE_MB,
      maxWidthOrHeight: MAX_FILE_WIDTH_HEIGHT,
      useWebWorker: true,
    };

    try {
      const compressionFiles = await Promise.all(
        file.map(async (f) => {
          if (f.size > MAX_FILE_SIZE_MB * 1000000) {
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
      return compressionFiles;
    } catch (error) {
      setResizing(false);
      console.error("image resizing error: ", error);
      alert("이미지 압축 중 오류가 발생했습니다.");
    }
  }, []);

  const convertHeicToType = useCallback(async (file: File[]) => {
    try {
      const heic2any = require("heic2any");
      const convertFiles = await Promise.all(
        file.map(async (f) => {
          const isHeic = /^.*\.(heic|heif)$/i;
          if (isHeic.test(f.name)) {
            const heicToJpeg = await heic2any({
              blob: f,
              toType: CONVERSION_TYPE,
            });
            return new File(
              [heicToJpeg as any],
              `${f.name.split(".")[0]}.${CONVERSION_FORMAT}`,
              {
                type: CONVERSION_TYPE,
                lastModified: new Date().getTime(),
              },
            );
          } else {
            return f;
          }
        }),
      );
      return convertFiles;
    } catch (error) {
      setResizing(false);
      console.error("heic to jpg error: ", error);
      alert("heic 이미지 변환 중 오류가 발생했습니다.");
    }
  }, []);

  const removeFile = useCallback(
    (idx: number) => {
      const newFile = files.filter((_, index) => index !== idx);
      setFiles(newFile);
    },
    [files],
  );

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const filesName = files.map((file) => file.name.split(".")[0]);
      const isDuplicated = acceptedFiles.some((newFile) =>
        filesName.includes(newFile.name.split(".")[0]),
      );

      if (files.length + acceptedFiles.length > MAX_FILE_UPLOAD_COUNT) {
        alert("최대 5개까지만 업로드 가능합니다.");
        return;
      }

      if (isDuplicated) {
        alert("중복 이미지는 업로드할 수 없습니다.");
        return;
      }
      setResizing(true);
      // heic to jpeg (브라우저 호환 및  압축 가능한 형식으로 변환)
      const conversionFiles = await convertHeicToType(acceptedFiles);
      if (conversionFiles) {
        const compressionFiles = await compressImage(conversionFiles);
        if (compressionFiles) {
          const newFiles = compressionFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            }),
          );
          setFiles((prevFiles) => [...prevFiles, ...newFiles]);
        }
      }
      setResizing(false);
    },
    [files, compressImage, convertHeicToType],
  );

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
      "image/heic": [],
    },
    onDrop,
    disabled: files.length >= MAX_FILE_UPLOAD_COUNT ? true : false,
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
        onClick={() => removeFile(idx)}
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
    length: MAX_FILE_UPLOAD_COUNT - files.length,
  }).map((_, idx) => (
    <div
      className="h-[5.75rem] w-[5.75rem] rounded-lg border border-dashed border-grey-200"
      key={idx}
    ></div>
  ));

  useEffect(() => {
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
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/50">
          <LoadingMapSpinner isBlur={false} />
        </div>
      )}
    </div>
  );
}
