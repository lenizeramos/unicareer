"use client";
import ButtonComp from "../components/ButtonComp";
import { styles } from "../styles";
import Logo from "../components/Logo";
import { FaRegEdit } from "react-icons/fa";
import CardsContainer from "../components/Cards/CardsContainer";
import { useEffect, useState } from "react";
import FileUpload from "../components/FileUpload";
import FileDisplay from "../components/FileDisplay";
import { useDispatch, useSelector } from "react-redux";
import { IApplicationsState, IUserState } from "../Types/slices";
import { AppDispatch, RootState } from "../context/store";
import { fetchApplications } from "../context/slices/applicationsSlices";
import { fetchUsers } from "../context/slices/usersSlices";
import Loader from "../components/Loader";

export default function Home() {
  const dispatch: AppDispatch = useDispatch();
  const { applications } = useSelector(
    (state: RootState) => state.applications as IApplicationsState
  );
  const { users } = useSelector(
    (state: RootState) => state.users as IUserState
  );
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    const getUserId = async () => {
      try {
        const response = await fetch("/api/user/get-user-by-clerk-id", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error);
        setUserId(data.id);
      } catch (error) {
        console.error("Failed to fetch user ID:", error);
      }
    };

    getUserId();

    if (applications.length === 0) {
      dispatch(fetchApplications());
    }
    if (users.length === 0) {
      dispatch(fetchUsers("candidate"));
    }

  }, [dispatch, users.length, applications.length]);

  return (
    <>
      <div className="bg-landingDark p-5 flex flex-col gap-5">
        <Logo fontSize="text-4xl" logoSize={50} isLanding={false} />
        <ButtonComp text="My button" IsWhite={true} />
        <h1 className={`${styles.heroHeadText} ${styles.titleHeroSize}`}>
          Hey <span className={`${styles.heroHeadSpan}`}>There</span>
        </h1>
        <FaRegEdit size={100} className="text-red-300 hover:text-amber-200" />
      </div>

      <div className={`bg-landingDark p-5 flex flex-col gap-5`}>
        <h1
          className={`${styles.heroHeadTextDark} ${styles.titleHeroSize} text-white`}
        >
          Discover more than 500+ Jobs
        </h1>

        <div className="flex flex-col gap-10 h-fit">
          <h2
            className={`${styles.titleSectionSize} ${styles.sectionHeadText} text-white`}
          >
            Cards Section
          </h2>
          <div className="flex flex-col gap-10">
            <div className="flex flex-row gap-10 flex-wrap justify-center">
              <CardsContainer cardId="category" />;
            </div>
            <CardsContainer cardId="dashboardCard" />
            <CardsContainer cardId="perks" />
            <CardsContainer cardId="featuredJob" />
            <CardsContainer cardId="jobUpdates" />
            <CardsContainer cardId="latestJob" />
            <CardsContainer cardId="openPositions" />
            <CardsContainer cardId="allJobs" />
            <CardsContainer cardId="recentPosted" />
            <CardsContainer cardId="recentApply" />
          </div>
        </div>

        {userId && (
          <div className="space-y-8">
            <div className="flex items-center gap-6">
              <FileUpload
                allowedFileTypes={["application/pdf"]}
                apiRoute="/api/upload"
                modelName="candidateDocument"
                fieldName="fileKey"
                userId={userId}
                uploadText="Upload your resume"
                maxSizeMB={5}
                onUploadComplete={() => {}}
              />
              <FileDisplay
                modelName="candidateDocument"
                userId={userId}
                className="min-w-[200px]"
              />
            </div>

            <div className="flex items-center gap-6">
              <FileUpload
                allowedFileTypes={["image/jpeg", "image/png"]}
                apiRoute="/api/upload"
                modelName="userProfileImage"
                fieldName="fileKey"
                userId={userId}
                uploadText="Upload your profile image"
                maxSizeMB={5}
                onUploadComplete={() => {}}
              />
              <FileDisplay
                modelName="userProfileImage"
                userId={userId}
                width={150}
                height={150}
                className="rounded-full overflow-hidden"
              />
            </div>

            <div className="flex items-center gap-6">
              <FileUpload
                allowedFileTypes={["image/jpeg", "image/png"]}
                apiRoute="/api/upload"
                modelName="companyProfileImage"
                fieldName="fileKey"
                userId={userId}
                uploadText="Upload your company profile image"
                maxSizeMB={5}
                onUploadComplete={() => {}}
              />
              <FileDisplay
                modelName="companyProfileImage"
                userId={userId}
                width={200}
                height={200}
                className="rounded-lg overflow-hidden"
              />
            </div>
          </div>
        )}
        <Loader redirecting={true} />
      </div>
    </>
  );
}
