import Image from "next/image";
import { Inter } from "next/font/google";
import { HTMLAttributes, useEffect, useState } from "react";
import Head from "next/head";
import Balancer from "react-wrap-balancer";

const inter = Inter({ subsets: ["latin"] });

export const getStaticProps = async () => {
  const startDate = new Date("2023-07-16");
  const endDate = new Date("2023-08-21");
  const today = new Date();

  const todayGmtPlus8 = new Date(today.getTime() - 8 * 60 * 60 * 1000);
  const startDateGmtPlus8 = new Date(startDate.getTime() - 8 * 60 * 60 * 1000);
  const endDateGmtPlus8 = new Date(endDate.getTime() - 8 * 60 * 60 * 1000);

  return {
    props: {
      today: todayGmtPlus8,
      startDate: startDateGmtPlus8,
      endDate: endDateGmtPlus8,
    },
  };
};

interface Props {
  today: Date;
  startDate: Date;
  endDate: Date;
}

export default function Home({ today, startDate, endDate }: Props) {
  const totalDuration = endDate.getTime() - startDate.getTime();
  const timePassed = today.getTime() - startDate.getTime();
  const percentage = (timePassed / totalDuration) * 100;

  const calculateTimeLeft = () => {
    const difference = +endDate - +new Date();

    if (difference > 0) {
      const twoDigit = (num: number) => String(num).padStart(2, "0");

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      return {
        days: twoDigit(days),
        hours: twoDigit(hours),
        minutes: twoDigit(minutes),
        seconds: twoDigit(seconds),
      };
    }

    return undefined;
  };

  let [timeLeft, setTimeLeft] =
    useState<ReturnType<typeof calculateTimeLeft>>();

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    // Clear timeout if the component is unmounted
    return () => clearTimeout(timer);
  });

  const Unit = ({ unit, value }: { unit: string; value: string }) => {
    return (
      <div>
        <h3 className={`text-7xl font-extrabold tabular-nums}`}>{value}</h3>
        <p className="mt-2 font-light">{unit}</p>
      </div>
    );
  };

  return (
    <>
      <Head>
        <title>KKN SOSIOLOGI FISIP 2023</title>
        <meta
          name="description"
          content="Countdown to KKN SOSIOLOGI FISIP 2023"
        />
      </Head>
      <div className={`${inter.className}`}>
        <div className="mx-auto">
          <div className="relative isolate overflow-hidden bg-gray-900 py-24 text-center min-h-screen flex justify-center md:items-center">
            <div>
              <h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                <Balancer>KKN SOSIOLOGI FISIP ULM 2023</Balancer>
              </h2>

              {timeLeft && (
                <>
                  <div className="grid md:flex md:gap-x-10 md:justify-between mt-14 grid-rows-2 grid-flow-col gap-y-8 md:gap-0">
                    <Unit unit="Hari" value={timeLeft?.days} />
                    <Unit unit="Jam" value={timeLeft?.hours} />
                    <Unit unit="Menit" value={timeLeft?.minutes} />
                    <Unit unit="Detik" value={timeLeft?.seconds} />
                  </div>
                  <div className="overflow-hidden rounded-full bg-gray-200 mt-10 max-w-xs mx-auto">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-orange-800 to-orange-400"
                      style={{
                        width: `${percentage}%`,
                      }}
                    />
                  </div>
                  <p className="mt-2">{percentage.toFixed(0)}%</p>
                </>
              )}

              <svg
                viewBox="0 0 1024 1024"
                className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
                aria-hidden="true"
              >
                <circle
                  cx={512}
                  cy={512}
                  r={512}
                  fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)"
                  fillOpacity="0.7"
                />
                <defs>
                  <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
                    <stop stopColor="#FFA500" /> {/* Orange color */}
                    <stop offset={1} stopColor="#FF4500" />{" "}
                  </radialGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
