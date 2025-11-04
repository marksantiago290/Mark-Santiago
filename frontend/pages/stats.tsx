import React, { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import useSWR from "swr"
import { FadeContainer } from "@content/FramerMotionVariants"
import fetcher from "@lib/fetcher"
import AnimatedDiv from "@components/FramerMotion/AnimatedDiv"
import MetaData from "@components/MetaData"
import StatsCard from "@components/Stats/StatsCard"
import pageMeta from "@content/meta"
import { HomeHeading } from '../pages'

type Stats = {
  title: string
  value: string
};

export default function Stats() {
  const [mounted, setMounted] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [streakImageError, setStreakImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [streakImageLoading, setStreakImageLoading] = useState(true);
  const { data: github } = useSWR("/api/stats/github", fetcher)

  const stats: Stats[] = [
    {
      title: "Github Repos",
      value: github?.repos,
    },
    {
      title: "Github Followers",
      value: github?.followers,
    },
    {
      title: "Github Stars",
      value: github?.githubStars,
    },
    {
      title: "Repositories Forked",
      value: github?.forks,
    }
  ]

  useEffect(() => {
    setMounted(true);
    
    // Set timeout for images to prevent indefinite loading
    const imageTimeout = setTimeout(() => {
      if (imageLoading) {
        setImageError(true);
        setImageLoading(false);
      }
    }, 10000); // 10 second timeout

    const streakTimeout = setTimeout(() => {
      if (streakImageLoading) {
        setStreakImageError(true);
        setStreakImageLoading(false);
      }
    }, 10000); // 10 second timeout

    return () => {
      clearTimeout(imageTimeout);
      clearTimeout(streakTimeout);
    };
  }, [imageLoading, streakImageLoading]);

  if (!mounted) {
    return (
      <section className="pageTop font-inter bg-darkWhitePrimary dark:bg-darkPrimary">
        <HomeHeading title="Statistics" />
      </section>
    );
  }

  return (
    <>
      <MetaData
        title={pageMeta.stats.title}
        description={pageMeta.stats.description}
        previewImage={pageMeta.stats.image}
        keywords={pageMeta.stats.keywords}
      />

      <section className="pageTop font-inter bg-darkWhitePrimary dark:bg-darkPrimary">
        <HomeHeading title="Statistics" />
        <p>Here are some statistics about my personal github.</p>
        <AnimatedDiv
          className="my-10"
          variants={FadeContainer}
        >
          <div className="grid xs:grid-cols-2 sm:!grid-cols-3 xl:!grid-cols-4 gap-5">
            {stats.map((stat, index) => (
              <StatsCard key={index} title={stat.title} value={stat.value} />
            ))}
          </div>
        </AnimatedDiv>

        <div className="flex flex-col lg:flex-row justify-center w-full my-2 gap-4">
          <div className="flex-1">
            <Link href="https://github.com/marksantiago2909?tab=repositories">
              {!imageError ? (
                <>
                  {imageLoading && (
                    <div className="w-full p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-center animate-pulse">
                      <p className="text-gray-600 dark:text-gray-400">Loading GitHub stats...</p>
                    </div>
                  )}
                  <img
                    src="https://github-readme-stats-one-bice.vercel.app/api?username=marksantiago2909&theme=gotham&show_icons=true&count_private=true&hide_border=true&role=OWNER,ORGANIZATION_MEMBER,COLLABORATOR"
                    className="w-full p-2"
                    alt="@marksantiago2909's github-readme-stats"
                    width={495}
                    height={195}
                    onLoad={() => setImageLoading(false)}
                    onError={() => {
                      setImageError(true);
                      setImageLoading(false);
                    }}
                    style={{ display: imageLoading ? 'none' : 'block' }}
                  />
                </>
              ) : (
                <div className="w-full p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-center">
                  <p className="text-gray-600 dark:text-gray-400">
                    GitHub stats image failed to load. 
                    <Link href="https://github.com/marksantiago2909?tab=repositories" className="text-blue-500 hover:underline ml-1">
                      View repositories directly
                    </Link>
                  </p>
                </div>
              )}
            </Link>
          </div>
          
          <div className="flex-1">
            <Link href="https://github.com/marksantiago2909?tab=stars">
              {!streakImageError ? (
                <>
                  {streakImageLoading && (
                    <div className="w-full p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-center animate-pulse">
                      <p className="text-gray-600 dark:text-gray-400">Loading streak stats...</p>
                    </div>
                  )}
                  <Image
                    src="https://github-readme-streak-stats.herokuapp.com?user=marksantiago2909&theme=gotham&hide_border=true&date_format=M%20j%5B%2C%20Y%5D"
                    className="w-full p-2"
                    alt="@marksantiago2909's github-readme-streak-stats"
                    width={495}
                    height={195}
                    onLoad={() => setStreakImageLoading(false)}
                    onError={() => {
                      setStreakImageError(true);
                      setStreakImageLoading(false);
                    }}
                    priority={false}
                    style={{ display: streakImageLoading ? 'none' : 'block' }}
                  />
                </>
              ) : (
                <div className="w-full p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-center">
                  <p className="text-gray-600 dark:text-gray-400 mb-2">
                    GitHub streak stats failed to load
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    <Link href="https://github.com/marksantiago2909?tab=stars" className="text-blue-500 hover:underline">
                      View starred repositories
                    </Link>
                  </p>
                </div>
              )}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
