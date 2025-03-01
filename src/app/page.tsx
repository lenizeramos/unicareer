import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <Image src={'/img/logo.svg'} alt="logo" width={100} height={100}/>
      <h1>UniCareer</h1>
    </div>
  );
}
