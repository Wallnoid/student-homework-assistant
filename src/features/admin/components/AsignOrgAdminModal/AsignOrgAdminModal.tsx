"use client";
import { CustomButton } from '@/shared/components/CustomButton';
import { CustomIconButton } from '@/shared/components/CustomIconButton';
import { UserIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { Dialog, DialogBody, DialogFooter, DialogHeader, Select, Option, Typography } from '@material-tailwind/react';
import React, { useState } from 'react';
import { useUsers } from '../../hooks/useUsers.hook';
import { User } from '@/shared/models/user.model';
import { set } from 'react-hook-form';
import { updateMember } from '../../services/members.service';

export type AsignOrgAdminModalProps = {
	orgId?: number;
}

// This component is a modal that allows the user to assign an admin to an organization
const AsignOrgAdminModal: React.FC<AsignOrgAdminModalProps> = ({ orgId }) => {

	// State variables to manage the modal open/close state, selected adminId, loading state, and error message
	// The orgId is passed as a prop to the component
	// The open state is used to control the visibility of the modal
	const [open, setOpen] = useState(false);

	// The adminId state is used to store the selected admin's user ID
	const [adminId, setAdminId] = useState<number | undefined>(undefined);

	// The loading state is used to show a loading spinner while the updateMember function is being called
	const [loading, setLoading] = useState(false);
	// The error state is used to show an error message if the user does not select an admin or if the updateMember function fails
	const [error, setError] = useState<string | null>(null);
	// This method toggles the open state of the modal

	const handleOpen = () => setOpen(!open);

	// This hook fetches the list of users with a limit of 100 users
	const { users } = useUsers(100);


	//METHOD FOR SELECT ADMIN
	// This method will be called when the user selects an admin from the dropdown
	const selectAdmin = (userId: string) => {

		// If the userId is empty, we set the adminId to undefined and show an error message
		if (!userId) {
			setAdminId(undefined);
			setError('Debe seleccionar un administrador');
			return;
		}

		// If the userId is not empty, we set the adminId to the selected userId and clear any error message
		setAdminId(Number(userId));
		// Clear any previous error message
		setError(null);
	};

	// This method will be called when the user submits the form
	// It will update the member with the selected adminId and organizationId
	const onSubmit = () => {

		// If the adminId is undefined, we show an error message and return
		if (adminId === undefined) {
			setError('Debe seleccionar un administrador');
			return;
		}

		// If the orgId is undefined, we show an error message and return
		setLoading(true);

		// If the orgId is undefined, we show an error message and return
		setError(null);


		// Call the updateMember function with the adminId and orgId
		updateMember({ id: adminId, organizationId: orgId! })
			.then((response) => {
				console.log(response);
				// If the update is successful, we show a success message and close the modal
				setLoading(false);
				setOpen(false);
				setAdminId(undefined);
			})
			.catch((error) => {
				// If the update fails, we show an error message
				setLoading(false);
				setError(error.message);
			});
	};


	return (
		<>

			<CustomIconButton size='sm' variant='text' onClick={() => {
				handleOpen();
				setAdminId(undefined);
				setError(null);

			}} children={<UserIcon strokeWidth={2} className="h-4 w-4" />} />


			<Dialog open={open} size='sm' handler={handleOpen}  >
				<DialogHeader className="relative m-0 block">
					<Typography variant="h4" color="blue-gray">
						Asignar Administrador a Organización
					</Typography>
					<Typography className="mt-1 font-normal text-gray-600">
						Selecciona un administrador para la organización.
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


					<Select
						label="Administrador"
						value={adminId?.toString()}
						onChange={(val) => selectAdmin(val!)}
						error={!!error}

					>
						{
							users.map((user: User) => (
								<Option key={user.id} value={user.id!.toString()}>
									{user.name} {user.lastName} ({user.email})
								</Option>
							))
						}
					</Select>
					{error && <Typography className='text-red-500 text-sm'>{error}</Typography>}


				</DialogBody>
				<DialogFooter className='flex flex-row gap-2'>
					<CustomButton
						label='Cancelar'
						variant="text"
						backgroundColor='red'
						onClick={handleOpen}
						disabled={loading}
					/>
					<CustomButton label='Confirmar' onClick={onSubmit} loading={loading} disabled={loading} />


				</DialogFooter>

			</Dialog>
		</>
	);
};

export default AsignOrgAdminModal;
