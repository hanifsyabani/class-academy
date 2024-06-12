import notfound from "@/assets/notfound.svg";
import Image from "next/image";

export default function NotFound({title} :{title: string}) {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div>
        <Image src={notfound} alt="notfound" width={200} height={200} />
        <p className="text-center text-red-500 ">No {title} found</p>
      </div>
    </div>
  );
}
