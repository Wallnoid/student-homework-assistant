"use client";
import React, { useState } from 'react';
import { CustomButton } from '@/shared/components/CustomButton';
import { CustomIconButton } from '@/shared/components/CustomIconButton';
import { CustomIconTextButton } from '@/shared/components/CustomIconTextButton';
import { PencilIcon, UserPlusIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { Dialog, DialogBody, DialogFooter, DialogHeader, Input, Select, Typography, Option, Alert } from '@material-tailwind/react';
import { useFormUser } from '../../hooks/useFormUser';
import { Role, User } from '@/shared/models/user.model';
import { ShieldExclamationIcon } from '@heroicons/react/24/solid';
import { truncateText } from '@/shared/utils/stringUtils.utils';
import toast from 'react-hot-toast';
import { useLoadUsersStore } from '../../store/load-users';

export type StudentModalProps = {

	student?: User
}

const StudentModal: React.FC<StudentModalProps> = ({ student }) => {

	const [open, setOpen] = useState(false);

	const handleOpen = () => setOpen(!open);

	const setLoadUsers = useLoadUsersStore((state: any) => state.setLoad)

	const { register, handleSubmit, errors, onSubmit, setValue, loading, error, reset } = useFormUser({
		onSuccess: () => {
			handleOpen()
			toast.success('User created successfully!')
			setLoadUsers(true)
		},
		student
	});

	return (
		<>

			{student ? (
				<CustomIconButton size='sm' variant='text' children={<PencilIcon className="h-4 w-4" />} onClick={() => {
					handleOpen()
					// reset()

				}} />
			) : (
				<CustomIconTextButton text="Agregar miembro" size='sm' onClick={() => {
					handleOpen()
					reset()
				}} children={<UserPlusIcon strokeWidth={2} className="h-4 w-4" />} />
			)}

			<Dialog open={open} size='sm' handler={handleOpen} >
				<DialogHeader className="relative m-0 block">
					<Typography variant="h4" color="blue-gray">
						{student ? "Editar Miembro" : "Agregar Miembro"}
					</Typography>
					<Typography className="mt-1 font-normal text-gray-600">
						{student ? "Editar un miembro existente" : "Agregar un nuevo miembro a tu equipo."}
					</Typography>

					<div className='!absolute right-3.5 top-3.5'>

						<CustomIconButton
							size="sm"
							variant="text"
							onClick={handleOpen}
						>
							<XMarkIcon className="h-4 w-4 stroke-2" />
						</CustomIconButton>
					</div>
				</DialogHeader>
				<DialogBody className='flex flex-col gap-5 '>


					<div className='flex flex-col gap-0'>

						<Input label="Correo electrónico"

							{...register("email",
								{
									required: "El correo electrónico es requerido",
									pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Correo electrónico inválido" },
									maxLength: { value: 50, message: "El correo debe tener menos de 50 caracteres" }
								})} error={!!errors.email} />
						{errors.email && <div className='text-red-500 text-[12px]'>{errors.email.message}</div>}
					</div>

					<div className='flex flex-row gap-2 w-full'>

						<div className='flex flex-col gap-0 w-full'>

							<Input label="Nombre"
								className='uppercase'
								{...register("name",
									{
										required: "El nombre es requerido",
										minLength: { value: 3, message: "El nombre debe tener al menos 3 caracteres" },
										maxLength: { value: 20, message: "El nombre debe tener menos de 20 caracteres" },
										pattern: { value: /^[a-zA-Z]+$/, message: "El nombre solo debe contener letras" }
									})} error={!!errors.name} />
							{errors.name && <div className='text-red-500 text-[12px]'>{errors.name.message}</div>}
						</div>

						<div className='flex flex-col gap-0 w-full'>

							<Input label="Apellido"
								className='uppercase'
								{...register("lastName",
									{
										required: "El apellido es requerido",
										minLength: { value: 3, message: "El apellido debe tener al menos 3 caracteres" },
										maxLength: { value: 20, message: "El apellido debe tener menos de 20 caracteres" },
										pattern: { value: /^[a-zA-Z]+$/, message: "El apellido solo debe contener letras" }
									})} error={!!errors.lastName} />
							{errors.lastName && <div className='text-red-500 text-[12px]'>{errors.lastName.message}</div>}
						</div>
					</div>
					<Select value={Role.USER} label="Rol" onChange={(value) => {
						setValue("role", value as Role)
					}} >
						<Option value={Role.ADMIN}>ADMIN</Option>
						<Option value={Role.USER}>USUARIO</Option>
						<Option value={Role.SUPER}>SUPER</Option>
					</Select>

					<div className='flex flex-row gap-1 items-center'>

						<ShieldExclamationIcon className='h-4 w-4' />

						<Typography variant='small' color='gray'>
							La contraseña es el mismo correo electrónico
						</Typography>

					</div>

					{error && <Alert color="red">{truncateText(error, 100)}</Alert	>}

				</DialogBody>
				<DialogFooter className='flex flex-row gap-2'>
					<CustomButton
						label='Cancelar'
						variant="text"
						backgroundColor='red'
						onClick={handleOpen}
						disabled={loading}
					/>
					<CustomButton label='Confirmar' onClick={handleSubmit(onSubmit)} loading={loading} disabled={loading} />


				</DialogFooter>

			</Dialog>
		</>
	);

};

export default StudentModal;
