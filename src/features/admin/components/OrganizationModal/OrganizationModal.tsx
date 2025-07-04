"use client";
import React, { useState } from 'react';
import { CustomButton } from '@/shared/components/CustomButton';
import { CustomIconButton } from '@/shared/components/CustomIconButton';
import { CustomIconTextButton } from '@/shared/components/CustomIconTextButton';
import { BuildingOffice2Icon, PencilIcon, UserPlusIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { Dialog, DialogBody, DialogFooter, DialogHeader, Input, Select, Typography, Option, Alert } from '@material-tailwind/react';
import { truncateText } from '@/shared/utils/stringUtils.utils';
import toast from 'react-hot-toast';
import { useLoadUsersStore } from '../../store/load-users';
import { Organization } from '@/shared/models/organization.model';
import { useFormOrg } from '../../hooks/useFormOrg.hook';

export type OrganizationModalProps = {
	org?: Organization // This prop is optional and can be used to edit an existing organization
}

// This component is a modal that allows the user to create or edit an organization
const OrganizationModal: React.FC<OrganizationModalProps> = ({ org }) => {

	// State to manage the open/close state of the modal
	// It starts as false, meaning the modal is closed by default
	const [open, setOpen] = useState(false);

	// This method toggles the open state of the modal
	// When the user clicks the button to open or close the modal, this method is called
	const handleOpen = () => setOpen(!open);

	// This store hook is used to manage the loading state of users
	// It allows the component to trigger a reload of users when an organization is created or edited
	const setLoadUsers = useLoadUsersStore((state: any) => state.setLoad)

	// This hook is used to manage the form state for creating or editing an organization
	// It provides methods for registering form fields, handling form submission, and managing errors
	const { register, handleSubmit, errors, onSubmit, setValue, loading, error, reset } = useFormOrg({
		onSuccess: () => {
			handleOpen()
			toast.success('User created successfully!')
			setLoadUsers(true)
		},
		org
	});

	return (
		<>

			{org ? (
				<CustomIconButton size='sm' variant='text' children={<PencilIcon className="h-4 w-4" />} onClick={() => {
					handleOpen()
					// reset()

				}} />
			) : (
				<CustomIconTextButton text="Agregar Organización" size='sm' onClick={() => {
					handleOpen()
					reset()
				}} children={<BuildingOffice2Icon strokeWidth={2} className="h-4 w-4" />} />
			)}

			<Dialog open={open} size='sm' handler={handleOpen}  >
				<DialogHeader className="relative m-0 block">
					<Typography variant="h4" color="blue-gray">
						{org ? "Editar Organización" : "Agregar Organización"}
					</Typography>
					<Typography className="mt-1 font-normal text-gray-600">
						{org ? "Editar una organización existente" : "Agregar una nueva organización."}
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

					<div className='flex flex-col gap-0'>

						<Input label="Dominio"

							{...register("domain",
								{
									required: "El dominio es requerido",
									minLength: { value: 3, message: "El dominio debe tener al menos 3 caracteres" },
									maxLength: { value: 20, message: "El dominio debe tener menos de 20 caracteres" },
									pattern: {
										value: /^(?!:\/\/)([a-zA-Z0-9-_]+\.)+[a-zA-Z]{2,}$/,
										message: "Ingresa un dominio válido (ej: ejemplo.com)"
									}

								})} error={!!errors.domain} />
						{errors.domain && <div className='text-red-500 text-[12px]'>{errors.domain.message}</div>}
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

export default OrganizationModal;
