import Link from "next/link";
import { IoIosCloseCircle as Close } from "react-icons/io";

export default function Cancel() {
  return (
    <div className="h-[80vh]">
      <div className="h-[50%] bg-red-500 text-white grid place-items-center">
        <div className="flex items-center gap-10">
          <Close className="text-[70px]" />
          <p className="font-semibold text-4xl text-center">
            Ödeme Başarısız Oldu
          </p>
        </div>
      </div>
      <div className="h-[50%] p-10 mt-5 text-center text-black">
        <p className="text-lg">
          Ödeme işlemi başarısız oldu. Lütfen tekrar deneyiniz.
        </p>
        <p className="mt-5 mb-10 text-zinc-800">Lütfen tekrar deneyiniz.</p>
        <Link
          href="/"
          className="border shadow py-2 px-5 rounded-lg text-lg hover:shadow-lg"
        >
          Ana Sayfa
        </Link>
      </div>
    </div>
  );
}
