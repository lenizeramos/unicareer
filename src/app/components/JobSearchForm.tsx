// "use client";

// import { useState } from "react";
// import { CiSearch } from "react-icons/ci";
// import { IoLocationOutline } from "react-icons/io5";
// import ButtonComp from "./ButtonComp";

// interface JobSearchFormProps {
//     countries: string[];
// }

// const JobSearchForm: React.FC<JobSearchFormProps> = ({ countries }) => {
//     const [jobSearch, setJobSearch] = useState<string>("");
//     const [selectedCountry, setSelectedCountry] = useState<string>("");

//     return (
//         <div className="flex justify-items-start gap-2 subscribe-form">
//             <div className="flex justify-items-start gap-4 p-3 border border-gray-300 w-180 bg-white">
//                 <input
//                     className="p-2 pl-10 border border-gray-300 w-52 bg-white text-black rounded"
//                     type="text"
//                     placeholder="Job title or keyword "
//                     value={jobSearch}
//                     onChange={(e) => setJobSearch(e.target.value)}
//                 />
//                 <span className="absolute left-3 top-2 text-gray-700">
//                     <CiSearch />
//                 </span>
//                 <div className="relative">
//                     <select
//                         className="p-2 pl-10 border border-gray-300 w-52 bg-white text-gray-800"
//                         value={selectedCountry}
//                         onChange={(e) => setSelectedCountry(e.target.value)}
//                     >
//                         <option value="">Florence,Italy</option>
//                         {countries.map((country) => (
//                             <option key={country} value={country}>
//                                 {country}
//                             </option>
//                         ))}
//                     </select>
//                     <span className="absolute left-3 top-2 text-gray-800">
//                         <IoLocationOutline />
//                     </span>
//                 </div>

//                 {/* Search Button */}
//                 <ButtonComp text="Search my job" IsWhite={false} />
//             </div>
//         </div>
//     );
// };

// export default JobSearchForm;

"use client";

import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import ButtonComp from "./ButtonComp";

interface JobSearchFormProps {
    countries: string[];
}

const JobSearchForm: React.FC<JobSearchFormProps> = ({ countries }) => {
    const [jobSearch, setJobSearch] = useState<string>("");
    const [selectedCountry, setSelectedCountry] = useState<string>("");

    return (
        <div className="flex justify-start items-center py-4">
            <div className="flex flex-col sm:flex-row sm:gap-4 p-4 border border-gray-300 w-full sm:w-3/4 lg:w-2/3 bg-white">
                {/* Job Search Input */}
                <div className="relative sm:w-1/3 w-full mb-4 sm:mb-0">
                    <input
                        className="p-2 pl-10 border border-gray-300 w-full bg-white text-black rounded"
                        type="text"
                        placeholder="Job title or keyword"
                        value={jobSearch}
                        onChange={(e) => setJobSearch(e.target.value)}
                    />
                    <span className="absolute left-3 top-2 text-gray-700">
                        <CiSearch />
                    </span>
                </div>

                {/* Country Selector */}
                <div className="relative sm:w-1/3 w-full mb-4 sm:mb-0">
                    <select
                        className="p-2 pl-10 border border-gray-300 w-full bg-white text-gray-800"
                        value={selectedCountry}
                        onChange={(e) => setSelectedCountry(e.target.value)}
                    >
                        <option value="">Florence, Italy</option>
                        {countries.map((country) => (
                            <option key={country} value={country}>
                                {country}
                            </option>
                        ))}
                    </select>
                    <span className="absolute left-3 top-2 text-gray-800">
                        <IoLocationOutline />
                    </span>
                </div>

                {/* Search Button */}
                <ButtonComp text="Search my job" IsWhite={false} />
            </div>
        </div>
    );
};

export default JobSearchForm;
