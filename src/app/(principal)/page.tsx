'use client'
import { CustomIconButton } from '@/shared/components/CustomIconButton';
import MarkDownConverter from '@/shared/components/MarkDownConverter/MarkDownConverter';
import { User } from '@/shared/models/user.model';
import { getUser } from '@/shared/utils/localStorage.utils';
import { truncateText } from '@/shared/utils/stringUtils.utils';
import { DocumentIcon, FolderIcon, MagnifyingGlassIcon, PlusCircleIcon, PlusIcon, SparklesIcon } from '@heroicons/react/24/solid';
import { Card, Typography } from '@material-tailwind/react';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';


const Page: NextPage = () => {


  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const user = getUser()
    if (user) {
      setUser(user)
    }
  }, [])


  const textGradient = 'bg-gradient-to-r from-primary  to-secondary inline-block text-transparent bg-clip-text'

  const info = [{
    title: 'Lorem ipsum dolor sit amet consectetur adipiscing elit asdfs sdfsdf sdfsd'
  },
  {
    title: 'Lorem ipsum dolor sit amet consectetur adipiscing elit'
  },
  {
    title: 'Lorem ipsum dolor sit amet consectetur adipiscing elit'
  },

  ]

  const documents = [
    {
      title: 'Documento 1',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat asdsd... '
    },
    {
      title: 'Documento 2',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat asdsd... '
    }
  ]
  return (
    <section className='w-full h-full  p-5 flex flex-col gap-16 '>

      {/* Principal Title */}
      <Typography
        className={`${textGradient} `}
        variant="h2">Bienvenido {user?.name ? user?.name : ''}!</Typography>


      {/* Quick questions section for AI */}

      <div className='flex flex-col w-full gap-5'>

        <MarkDownConverter content={"Aquí te dejo algunos ejemplos de definiciones de funciones que realizan operaciones en diferentes lenguajes de programación:\n\n### 1. Lenguaje de Programación Java\n```java\npublic int suma(int a, int b) {\n    return a + b;\n}\n```\nEsta función suma dos números enteros y devuelve el resultado.\n\n### 2. Lenguaje de Programación Python\n```python\ndef multiplicar(a, b):\n    return a * b\n```\nEsta función multiplica dos números y devuelve el resultado.\n\n### 3. Lenguaje de Programación C++\n```cpp\nint restar(int a, int b) {\n    return a - b;\n}\n```\nEsta función resta dos números enteros y devuelve el resultado.\n\n### 4. Lenguaje de Programación JavaScript\n```javascript\nfunction dividir(a, b) {\n    if (b !== 0) {\n        return a / b;\n    } else {\n        return \"Error: División por cero\";\n    }\n}\n```\nEsta función divide un número por otro y devuelve el resultado, excepto si se intenta dividir por cero.\n\n### 5. Lenguaje de Programación C#\n```csharp\nint promediar(int a, int b) {\n    return (a + b) / 2;\n}\n```\nEsta función calcula el promedio de dos números enteros y devuelve el resultado.\n\nEn general, la estructura de una función en la mayoría de lenguajes de programación es similar:\n- La palabra clave para definir una función (por ejemplo, `public`, `def`, `function`, `int`).\n- El nombre de la función.\n- Los parámetros entre paréntesis.\n- El cuerpo de la función, que contiene la lógica para realizar la operación deseada.\n- La instrucción `return` para devolver el resultado de la función."} />



        <div className='flex flex-row w-full items-center gap-3'>

          <SparklesIcon className='size-7 text-primary' />

          <Typography
            className={`${textGradient} font-semibold`}
            variant="h4">Consulta Rápida con IA</Typography>

        </div>

        <div className="grid grid-cols-2 gap-4">

          {
            info.map((info, index) => {
              return (
                <Card
                  key={index}
                  className='flex flex-row gap-2 p-3 pt-0 pl-0 pb-2  hover:scale-105 duration-700  group hover:cursor-pointer    '
                >
                  <div className='h-8 w-9 bg-gradient-to-br from-primary to-secondary rounded-tl-lg rounded-br-lg p-1 '>

                    <MagnifyingGlassIcon className='size-full text-white ' />

                  </div>

                  <Typography
                    variant='paragraph'
                    className='group-hover:text-primary'
                  >


                    {truncateText(info.title, 60)}
                  </Typography>
                </Card>

              )
            })
          }

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



        <div className="grid grid-cols-3 gap-7">

          {
            documents.map(({ title, content }, index) => {
              return (
                <Card
                  key={index}
                  className='flex flex-col gap-2 py-3 px-5 max-w-96 hover:scale-105 duration-700  hover:cursor-pointer group'
                >
                  <div className='w-full flex flex-row justify-between items-center group-hover:text-primary'>

                    <Typography
                      variant='h5'
                      className='font-normal'
                    >

                      {truncateText(title, 50)}
                    </Typography>

                    <DocumentIcon className='size-6 text-secondary group-hover:text-primary' />

                  </div>

                  <hr className="my-2 border border-primary" />

                  <Typography
                    variant='paragraph'
                    className='font-normal '
                  >

                    {truncateText(content, 250)}
                  </Typography>
                </Card>

              )
            })
          }

          <Card

            className='flex flex-col justify-center items-center gap-2 py-3 px-5 max-w-96  hover:scale-105 duration-500 hover:bg-secondary '
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





    </section>
  )
}

export default Page;
