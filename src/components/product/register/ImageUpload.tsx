'use client';

import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const MAX_FILE_COUNT = 5;

export default function ImageUpload() {
  const [files, setFiles] = useState<Array<File & { preview: string }>>([]);

  const deleteFile = useCallback(
    (idx: number) => {
      const newFile = files.filter((_, index) => index !== idx);
      setFiles(newFile);
    },
    [files],
  );

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles = acceptedFiles.map(file =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        }),
      );
      const filesName = files.map(file => file.name);
      const isDuplicated = newFiles.some(newFile => filesName.includes(newFile.name));

      if (files.length + newFiles.length > MAX_FILE_COUNT) {
        alert('최대 5개까지만 업로드 가능합니다.');
        return;
      }

      if (isDuplicated) {
        alert('중복 이미지는 업로드할 수 없습니다.');
        return;
      }

      setFiles(prevFiles => [...prevFiles, ...newFiles]);
    },
    [files],
  );

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': [],
    },
    onDrop,
    disabled: files.length >= MAX_FILE_COUNT ? true : false,
    noDrag: true,
  });

  const thumbs = files.map((file, idx) => (
    <div className="relative box-border inline-flex h-[92px] w-[92px]" key={file.name}>
      <div className="flex min-w-0 overflow-hidden">
        <Image
          src={file.preview}
          className="h-full rounded-md"
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
          width={100}
          height={100}
          alt="thumbnail"
        />
      </div>
      <button className="absolute -right-2 -top-2 rounded-full bg-transparent" onClick={() => deleteFile(idx)}>
        <Image src="/assets/images/button/close_grey.svg" width={20} height={20} alt="close" />
      </button>
    </div>
  ));

  const emptyThumbs = Array.from({
    length: MAX_FILE_COUNT - files.length,
  }).map((_, idx) => (
    <div className="h-[92px] w-[92px] rounded-[10px] border border-dashed border-grey-200" key={idx}></div>
  ));

  useEffect(() => {
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <div className="mt-3 flex flex-wrap gap-2">
      <div
        {...getRootProps({ className: 'dropzone' })}
        className="relative flex h-[92px] w-[92px] cursor-pointer items-center justify-center rounded-[10px] bg-grey-50 hover:bg-grey-100 active:bg-grey-50/70"
      >
        <input {...getInputProps()} />
        <Image src="/assets/images/button/square_plus.svg" width={20} height={20} alt="add" />
        <p className="absolute bottom-4 text-[8px] font-semibold text-grey-400">jpg,png,heic</p>
      </div>
      {thumbs}
      {emptyThumbs}
    </div>
  );
}
