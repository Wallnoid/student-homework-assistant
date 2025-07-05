'use client'
import { CustomIconButton } from '@/shared/components/CustomIconButton';
import { MarkDownConverter } from '@/shared/components/MarkDownConverter';
import { useUserMe } from '@/shared/hooks/useUserMe.hook';
import { useChatsHomeStore } from '@/shared/store/chatsHome.store';
import { useLoadChatsStore } from '@/shared/store/loadChat.store';
import { useLoadNotesStore } from '@/shared/store/loadNotes.store';
import { useNotesHomeStore } from '@/shared/store/notesHome.store';
import { capitalizedFormat, formatTextWithLineBreaks, stringToLines, truncateText } from '@/shared/utils/stringUtils.utils';
import { DocumentIcon, FolderIcon, MagnifyingGlassIcon, PlusCircleIcon, PlusIcon, SparklesIcon } from '@heroicons/react/24/solid';
import { Card, Typography } from '@material-tailwind/react';
import type { NextPage } from 'next';
import { Key, useEffect, useState } from 'react';
import Link from "next/link";

const Page: NextPage = () => {


  const { user } = useUserMe();

  const notesHome = useNotesHomeStore((state: any) => state.notesHome);
  const chatsHome = useChatsHomeStore((state: any) => state.chatsHome);
  const loadNotes = useLoadNotesStore((state: any) => state.load)
  const loadChats = useLoadChatsStore((state: any) => state.load);



  const textGradient = 'bg-gradient-to-r from-primary  to-secondary inline-block text-transparent bg-clip-text'





  return (
    <section className='w-full h-full  p-5 flex flex-col gap-16 pt-10 lg:pt-0 '>

      {/* Principal Title */}
      <Typography
        className={`${textGradient} `}
        variant="h2">Bienvenido {capitalizedFormat(user?.name ?? '')}!</Typography>

      {/* Quick questions section for AI */}

      <div className='flex flex-col w-full gap-5'>


        <div className='flex flex-row w-full items-center gap-3'>

          <SparklesIcon className='size-7 text-primary' />

          <Typography
            className={`${textGradient} font-semibold`}
            variant="h4">Consulta Rápida con IA</Typography>

        </div>

        <div className="grid grid-cols-1 grid-rows-4 lg:grid-cols-2 lg:gap-4 gap-6">
          {

            loadChats &&

            Array(3).fill(0).map((_, index) => (
              <Card
                key={index}
                className='flex flex-row gap-2 p-3 pt-0 pl-0 pb-2 items-center  '
              >
                <div className='h-8 w-9 bg-gradient-to-br from-primary to-secondary rounded-tl-lg rounded-br-lg p-1 '>

                  <MagnifyingGlassIcon className='size-full text-white ' />

                </div>

                <div className='w-full h-5 bg-gray-400 rounded-xl animate-pulse'></div>
              </Card>
            ))
          }
          {
            (chatsHome?.length === 0 && !loadChats) &&
            <div className='flex flex-row justify-center items-center h-fit w-full gap-3 '>
              <SparklesIcon className='size-5 text-gray-600 ' />
              <Typography variant='h5' color='gray'>No hay chats recientes</Typography>


            </div>
          }

          {
            chatsHome?.toReversed()?.map((info: { title: string; id: string }, index: Key | null | undefined) => {
              const title = info.title || 'Consulta Rápida';
              return (
                <Link
                  key={index}
                  href={`/chat/${info.id}`}
                >
                  <Card

                    key={index}
                    className='flex flex-row gap-2 p-3 pt-0 pl-0 pb-2 items-center   hover:scale-105 duration-700  group hover:cursor-pointer    '
                  >
                    <div className='h-8 w-9 bg-gradient-to-br from-primary to-secondary rounded-tl-lg rounded-br-lg p-1 '>

                      <MagnifyingGlassIcon className='size-full text-white ' />

                    </div>

                    <Typography
                      variant='paragraph'
                      className='group-hover:text-primary'
                    >


                      {truncateText(title, 60)}
                    </Typography>
                  </Card>
                </Link>

              )
            })
          }
          <Link href='/chat/new'>

            <Card
              className='flex flex-row items-center justify-center gap-2 p-1 hover:scale-105 duration-700 hover:bg-secondary hover:cursor-pointer'
            >
              <CustomIconButton
                onClick={() => {

                }}
                size='sm'
                roundedFull
              >
                <PlusIcon className='size-full' />
              </CustomIconButton>

            </Card>
          </Link>
        </div>
      </div>


      {/*Recent documents section */}


      <div className='flex flex-col w-full gap-5'>
        <div className='flex flex-row w-full items-center gap-3'>

          <FolderIcon className='size-6 text-primary' />

          <Typography
            className={`${textGradient} font-semibold`}
            variant="h4">Documentos Recientes</Typography>

        </div>



        <div className="grid  grid-cols-1 lg:grid-cols-3 gap-7 pb-7 lg:pb-0 ">

          {
            loadNotes && (
              Array(2).fill(0).map((_, index) => (
                <Card
                  key={index}
                  className='flex flex-col gap-2 py-3 px-5 max-w-96 duration-700 h-64   group overflow-hidden'
                >
                  <div className='w-full flex flex-row justify-between items-center group-hover:text-primary'>

                    <div className='w-44 h-5 bg-gray-400 rounded-xl animate-pulse'></div>


                    <DocumentIcon className='size-6 text-secondary group-hover:text-primary' />

                  </div>

                  <hr className="my-2 border border-primary" />

                  <div className='w-full h-5 bg-gray-400 rounded-xl animate-pulse'></div>
                  <div className='w-full h-5 bg-gray-400 rounded-xl animate-pulse'></div>
                  <div className='w-full h-5 bg-gray-400 rounded-xl animate-pulse'></div>


                </Card>
              )))}


          {
            (notesHome?.length === 0 && !loadNotes) &&
            <div className='flex flex-col justify-center items-center h-full w-full '>
              <Typography variant='h5' color='gray'>No hay notas recientes</Typography>

              <DocumentIcon className='size-16 text-gray-400 mt-5' />

            </div>
          }

          {
            notesHome?.toReversed()?.map(
              (
                { id, title, content }: { id: number; title: string; content: string },
                index: number
              ) => {
                return (
                  <Link
                    key={index}
                    href={`/editor/${id}`}>
                    <Card
                      key={index}
                      className='flex flex-col gap-2 py-3 px-5 max-w-96 hover:scale-105 duration-700 h-64  hover:cursor-pointer group overflow-hidden'
                    >
                      <div className='w-full flex flex-row justify-between items-center group-hover:text-primary'>

                        <Typography
                          variant='h5'
                          className='font-normal'
                        >

                          {truncateText(title, 25)}
                        </Typography>

                        <DocumentIcon className='size-6 text-secondary group-hover:text-primary' />

                      </div>

                      <hr className="my-2 border border-primary" />

                      {
                        content.includes('@InputIAForEditor') ? (
                          <MarkDownConverter content={content.replaceAll('@InputIAForEditor', '')} />
                        ) : (
                          stringToLines(content).map((line, lineIndex) => (
                            <Typography
                              key={lineIndex} // ¡Importante agregar key al map!
                              variant="paragraph"
                              className="text-sm text-gray-800"
                            >
                              {line.content}
                            </Typography>
                          ))
                        )
                      }


                    </Card>
                  </Link>

                )
              }
            )
          }

          <Card

            className='flex flex-col justify-center items-center gap-2 py-3 px-5 max-w-96 h-64  hover:scale-105 duration-500 hover:bg-secondary '
          >
            <CustomIconButton
              onClick={() => {

              }}
              size='lg'
              roundedFull
            >
              <PlusIcon className='size-full' />
            </CustomIconButton>

          </Card>
        </div>

      </div>





    </section >
  )
}

export default Page;
