import React from "react";
import Image from "next/image";

type Props = {
  onClick: () => void;
  name: string;
  src: string;
};

export default function SignInButton({ onClick, name, src }: Props) {
  return (
    <button onClick={onClick}>
      <Image src={src} width={40} height={40} alt={name} />
    </button>
  );
}
