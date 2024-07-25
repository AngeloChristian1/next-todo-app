'use client';

import { AddtaskComponent } from '@/components/AddTaskComponent';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useSession, signIn, signOut } from 'next-auth/react';
import { ThemeToggleButton } from '@/components/ThemeToggleButton';
import Hero from '../images/hero2.svg';
import Logo from '../images/todo-log-white.svg';
import { GitHubLogoIcon, ExitIcon } from '@radix-ui/react-icons';
import Head from 'next/head';
import Tasks from '../components/Tasks';

export default function Home() {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <div className="w-[100wh] h-[100vh] overflow-hidden bg-white dark:bg-[#9295AC]">
      <Head>
        <link rel="shortcut icon" href="../images/todo-logo.svg" />
      </Head>
      <div className="w-full flex items-start h-full">
        <div className="w-[30%] bg-white h-full dark:bg-[#9295AC] flex flex-col ">
          <main
            className={cn(
              'h-[97%] my-auto rounded-3xl flex justify-center p-6 text-black w-[80%] mx-auto ',
              'bg-whit dark:bg-[#19181E]  bg-indigo-600'
            )}
          >
            <div className="flex flex-col space-y-4 h-full w-full">
              {session && (
                <div className="flex flex-col justify-between gap-5">
                  <div className="flex gap-3  flex-col">
                    <div className="flex flex-row items-center">
                      <div className=" rounded-full dark:bg-[#19181E] overflow-hidden border border-b">
                        <Image
                          src={session.user?.image}
                          alt={session.user?.name}
                          width={60}
                          height={60}
                          priority={true}
                          quality={100}
                          className="w-full h-full object-fill "
                        />
                      </div>
                      <div className=" flex flex-col gap-1 px-5 w-[80%]">
                        <p className="font-medium text-nowrap text-lg text-black dark:text-white">
                          {`${session?.user?.name.split(' ')[0]}  ${
                            session?.user?.name.split(' ')[1] || ''
                          }`}
                        </p>
                        <p className="text-sm text-nowrap text-black dark:text-white">
                          {session.user?.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className=" flex flex-col my-5">
                    <AddtaskComponent />
                  </div>

                  <Button
                    className="mt-3 self-baseline flex items-center gap-2"
                    onClick={() => signOut()}
                  >
                    <ExitIcon />
                    <p>Logout</p>
                  </Button>
                </div>
              )}
              {!session && pathname !== '/signin' && (
                <div className="w-full flex flex-col">
                  <h1 className="my-5 text-center font-medium uppercase text-white">
                    Login to continue
                  </h1>
                  <Button
                    onClick={() => signIn()}
                    className="flex items-center gap-2 self-center"
                  >
                    <GitHubLogoIcon />

                    <p>Login with Github</p>
                  </Button>
                </div>
              )}
            </div>
          </main>
        </div>
        <div className="w-[70%] bg-indigo-600 dark:bg-[#19181E] h-[98%] my-auto flex flex-col justify-between py-10 px-5 rounded-tl-[50px] rounded-bl-[50px] ">
          <div className="flex gap-5 items-center justify-center">
            <Image
              src={Logo}
              alt={'logo'}
              priority={true}
              quality={100}
              className="w-16  object-fill "
            />

            <h1 className="text-4xl font-bold my-5 text-center p-2 font-sans text-white">
              My Todo App
            </h1>

            <ThemeToggleButton />
          </div>
          {session ? (
            <div className="h-[80%]">
              <div className="w-[80%] mx-auto my-2 h-[100%]  bg-indigo-500  dark:bg-[#19181E] p-5 rounded-3xl">
                <p className=" text-white font-medium p-1 my-2">
                  My Pending Tasks
                </p>

                <div className="overflow-y-auto  h-[90%]">
                  <Tasks />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center">
              <Image
                alt="Image"
                width={100}
                height={100}
                src={Hero}
                className=" h-full w-[40%]"
              />
              <div className="flex flex-col gap-3">
                <h3 className="md: text-6xl font-bold w-[85%]">
                  Welcome 2 Next Todo App
                </h3>
                <p className="text-lg mt-5">Manage your tasks easily</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
