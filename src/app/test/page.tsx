import Image from "next/image";
import ButtonComp from "../components/ButtonComp";

export default function Home() {
  return (
    <div className="px-5">
      <Image src={"/img/logo.svg"} alt="logo" width={100} height={100}/>
      <h1 className="font-bigShoulderStencil text-5xl">
        Discover more than 500+ Jobs
      </h1>
      <h1 className="font-bigShoulderInline text-5xl">
        Discover more than 500+ Jobs
      </h1>
      <p className="font-shafarik text-xl">Finance</p>
      <p className="font-monomakh text-xl">Finance</p>
      <ButtonComp text="My button" IsWhite={false} />
    </div>
  );
}
