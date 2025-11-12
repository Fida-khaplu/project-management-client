"use client"

import SiteCard from "@/components/siteCard";
// import { getAllSitesLinks } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
 

     const [links, setLinks] = useState([]);
  const [filter, setFilter] = useState("All");

   const filteredLinks =
    filter === "All" ? links : links.filter((link) => link.category === filter);

  // useEffect(() => {
  //   async function fetchLinks() {
  //     const data = await getAllSitesLinks();
  //     setLinks(data);
  //   }
  //   fetchLinks();
  // }, []);

  
  return (
    <div className="p-5">
      <div className="flex justify-between">
       <div className="mb-6 flex gap-3">
                {["All", "Technology", "Design"].map((category) => (
                    <button
                        key={category}
                        onClick={() => setFilter(category)}
                        className={`px-4 py-2 rounded-lg border ${filter === category
                                ? "bg-blue-600 text-white"
                                : "bg-gray-100 text-gray-700"
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>
              <div>
                <Link className=" bg-blue-900 rounded-xl p-4 hover:bg-blue-600" href={'/login'}>Login</Link>
              </div>
            </div>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLinks.map((link) => (
          <SiteCard
            key={link._id}
            title={link.title}
            description={link.description}
            coverImage={link.coverImage}
            category={link.category}
            siteUrl={link.siteUrl}
          />
        ))}
      </div>
    </div>
  );
}
