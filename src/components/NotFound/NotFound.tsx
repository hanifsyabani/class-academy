import notfound from "@/assets/notfound.svg";
import Image from "next/image";

export default function NotFound({title} :{title: string}) {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div>
        <Image src={notfound} alt="notfound" width={350} height={350} />
        <p className="text-center text-red-500 font-bold text-3xl ">No {title} found</p>
      </div>
    </div>
  );
}
