import Image from 'next/image';

export function LogoIcon() {
  return (
    <Image
      src="/traxpilot-logo.svg"
      alt="traxPilot icon"
      width={30}
      height={30}
      priority
    />
  );
}
