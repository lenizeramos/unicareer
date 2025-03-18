import Image from "next/image";
import DashboardNavbar from "../../../../../components/DashboardNavbar";
import ButtonComp from "@/app/components/ButtonComp";
import { styles } from "@/app/styles";

export default function JobDescription() {
  return (
    <>
      <DashboardNavbar
        title="Job Description"
        button={{ text: "Back to home page", IsWhite: true }}
      />
      <div className="flex flex-col gap-10">
        <div className="border-t-[1px] border-gray-200 py-5">
          <div className="bg-[#f8f8fd] p-10">
            <div className="flex justify-between items-center bg-white p-5 border border-gray-200">
              <div className="flex gap-5 items-center">
                <Image
                  src={`/img/logo.svg`}
                  alt="logo"
                  width={80}
                  height={80}
                />
                <div>
                  <h1 className={`${styles.sectionHeadText}`}>
                    Social Media Assistant
                  </h1>
                  <p className={`flex items-center gap-2 ${styles.sectionSubText}`}>
                    Stripe <span className="bg-gray-600 rounded-full w-1 h-1" />
                    Paris, France
                    <span className="bg-gray-600 rounded-full w-1 h-1" />{" "}
                    Full-Time
                  </p>
                </div>
              </div>
              <div className="pl-10 border-l-[1px] border-gray-200">
                <ButtonComp text="Apply" IsWhite={false} width="w-[8rem]" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="flex flex-col gap-5">
            <div>
              <h2 className={`${styles.sectionSubText} text-xl font-semibold`}>Description</h2>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
}
