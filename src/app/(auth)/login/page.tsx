'use client'

import { CustomButton } from '@/shared/components/CustomButton';
import { CustomIconButton } from '@/shared/components/CustomIconButton';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';
import { Card, Checkbox, IconButton, Input, Typography } from '@material-tailwind/react';
import type { NextPage } from 'next';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Page: NextPage = () => {

    const [showPassword, setShowPassword] = useState(false);

    const router = useRouter();

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }


    return (
        <section className='w-full h-full flex justify-center items-center '>

            <Card className='max-w-md w-full bg-white flex items-center p-8 gap-10 '>

                <Typography variant='h4'>
                    Iniciar Sesión
                </Typography>

                <div className='w-full flex flex-col gap-3'>

                    <Input label="Username/email" />

                    <div className='relative'>

                        <Input type={showPassword ? 'text' : 'password'} label="Password" />

                        <div className='absolute right-0 top-0'>

                            {
                                showPassword ? (
                                    <CustomIconButton variant='text' onClick={handleShowPassword}>
                                        <EyeIcon className='size-5' />
                                    </CustomIconButton>
                                ) : (
                                    <CustomIconButton variant='text' onClick={handleShowPassword}>
                                        <EyeSlashIcon className='size-5' />
                                    </CustomIconButton>
                                )
                            }
                        </div>
                    </div>


                    <div className='w-full bg-amber-200 p-0'>

                    </div>

                </div>


                <CustomButton label='Iniciar Sesión' fullWidth onClick={() => {
                    console.log('Iniciar Sesión');
                    router.push('/');
                }} />


            </Card>
        </section>
    )
}

export default Page;
