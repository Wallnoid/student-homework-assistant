'use client';

import type { NextPage } from 'next';
import React, { useEffect, useState } from "react";
import {
    Avatar,
    Button,
    Card,
    CardBody,
    CardHeader,
    Input,
    Typography,
} from "@material-tailwind/react";
import Image from "next/image";
import { CustomIconTextButton } from '@/shared/components/CustomIconTextButton';
import { IdentificationIcon } from '@heroicons/react/24/solid';
import { User } from '@/shared/models/user.model';
import { getUserLocal } from '@/shared/utils/localStorage.utils';
import { capitalizedFormat, getFirstLetter } from '@/shared/utils/stringUtils.utils';
import { useEditProfileInfo } from '@/features/profile/hooks/useEditProfileInfo.hook';

const Page: NextPage = () => {

    const { user, loading, error, register, errors, handleSubmit, reset, getValues, onSubmit } = useEditProfileInfo();


    return (
        <section className="container mx-auto px-8 py-10">
            <Card
                shadow={false}
                className="border border-gray-300 rounded-2xl"
            >
                <CardHeader shadow={false} className="h-60 !rounded-lg">
                    <Image
                        src="/dark-image.webp"
                        alt="dark"
                        height={1024}
                        width={1024}
                        className="w-full h-full "
                    />
                </CardHeader>
                <CardBody>
                    <div className="flex lg:gap-0 gap-6 flex-wrap justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className='size-16 rounded-full overflow-hidden bg-primary'>
                                <Typography
                                    variant="h3"
                                    className="text-white  flex items-center justify-center h-full"
                                >
                                    {getFirstLetter(user?.name ?? '?')}{getFirstLetter(user?.lastName ?? '?')}
                                </Typography>

                            </div>
                            <div>
                                <Typography color="blue-gray" variant="h6">
                                    {capitalizedFormat(user?.name ?? 'Cargando...')} {capitalizedFormat(user?.lastName ?? '')}
                                </Typography>
                                <Typography
                                    variant="small"
                                    className="font-normal text-gray-600"
                                >
                                    {user?.email ?? 'Cargando...'}
                                </Typography>
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">

                            <div className="flex gap-2">
                                <div className="rounded-md flex items-center bg-green-100 py-0.5 px-2.5 border border-transparent text-sm text-green-800 transition-all shadow-sm">
                                    <div className="mx-auto block h-2 w-2 rounded-full bg-green-800 mr-2"></div>
                                    Online
                                </div>
                            </div>
                        </div>
                    </div>

                </CardBody>
            </Card>

            <Card

                className="border border-gray-300 rounded-2xl mt-6 px-6 py-4"
            >


                <Typography
                    variant="h5"
                    className="font-normal text-gray-700 "
                >
                    Personalizacion de la cuenta
                </Typography>
                <Typography
                    variant="small"
                    className="font-normal text-gray-600 mt-6"
                >
                    {/* NECESITAMOS UNA PEQUE;A DESCRIPCION QUE DIGA  */}
                    Puedes cambiar tu nombre de usuario y contraseña. Asegúrate de que la información sea correcta y actualizada.
                </Typography>

                <CardBody className=" flex flex-col gap-4 px-0 justify-start items-start ">

                    <div className="w-full  min-w-[200px]">
                        <label className="block mb-2 text-sm text-slate-600">
                            Correo electrónico
                        </label>
                        <Input
                            type="email"
                            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                            value={user?.email ?? ''}
                            disabled
                        />
                    </div>

                    <div className="w-full  min-w-[200px]">
                        <label className="block mb-2 text-sm text-slate-600">
                            Nombre
                        </label>
                        <Input
                            type="text"
                            className=" uppercase w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                            {...register("firstName",
                                {
                                    required: "El nombre es requerido",
                                    minLength: { value: 3, message: "El nombre debe tener al menos 3 caracteres" },
                                    maxLength: { value: 20, message: "El nombre debe tener menos de 20 caracteres" },
                                    pattern: { value: /^[a-zA-Z]+$/, message: "El nombre solo debe contener letras" }
                                })} error={!!errors.firstName} />
                        {errors.firstName && <div className='text-red-500 text-[12px]'>{errors.firstName.message}</div>}
                    </div>
                    <div className="w-full  min-w-[200px]">
                        <label className="block mb-2 text-sm text-slate-600">
                            Apellido
                        </label>
                        <Input
                            type="text"
                            className=" uppercase w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                            {...register("lastName",
                                {
                                    required: "El apellido es requerido",
                                    minLength: { value: 3, message: "El apellido debe tener al menos 3 caracteres" },
                                    maxLength: { value: 20, message: "El apellido debe tener menos de 20 caracteres" },
                                    pattern: { value: /^[a-zA-Z]+$/, message: "El apellido solo debe contener letras" }
                                })} error={!!errors.lastName} />
                        {errors.lastName && <div className='text-red-500 text-[12px]'>{errors.lastName.message}</div>}
                    </div>

                    <div className="w-full  min-w-[200px]">
                        <label className="block mb-2 text-sm text-slate-600">
                            Contraseña
                        </label>
                        <Input
                            type="password"
                            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                            {...register("password",
                                {

                                    minLength: { value: 6, message: "La contraseña debe tener al menos 6 caracteres" },
                                    maxLength: { value: 20, message: "La contraseña debe tener menos de 20 caracteres" },
                                })} error={!!errors.password} />
                        {errors.password && <div className='text-red-500 text-[12px]'>{errors.password.message}</div>}
                    </div>
                    <div className="w-full  min-w-[200px]">
                        <label className="block mb-2 text-sm text-slate-600">
                            Confirmar contraseña
                        </label>
                        <Input
                            type="password"
                            className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                            {...register("confirmPassword",
                                {

                                    validate: (value) => value === getValues("password") || "Las contraseñas no coinciden"
                                })} error={!!errors.confirmPassword} />
                        {errors.confirmPassword && <div className='text-red-500 text-[12px]'>{errors.confirmPassword.message}</div>}
                    </div>

                    <div className='flex justify-end w-full mt-8'>

                        <CustomIconTextButton
                            text='Guardar cambios'
                            children={<IdentificationIcon className="h-5 w-5" />}
                            size='lg'
                            onClick={handleSubmit(onSubmit)}
                            loading={loading}
                            disabled={loading}
                        />
                    </div>


                </CardBody>
            </Card>
        </section>

    )
}

export default Page;
