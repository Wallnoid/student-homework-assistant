"use client";
import React, { useState } from 'react';
import { CustomButton } from '@/shared/components/CustomButton';
import { CustomIconButton } from '@/shared/components/CustomIconButton';
import { CustomIconTextButton } from '@/shared/components/CustomIconTextButton';
import { UserPlusIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { Dialog, DialogBody, DialogFooter, DialogHeader, Input, Select, Typography, Option, Alert } from '@material-tailwind/react';
import { useFormUser } from '../../hooks/useFormUser';
import { Role } from '@/shared/models/user.model';
import { ShieldExclamationIcon } from '@heroicons/react/24/solid';
import { truncateText } from '@/shared/utils/stringUtils.utils';
import toast from 'react-hot-toast';
import { useLoadUsersStore } from '../../store/load-users';

export type StudentModalProps = {
	// types...
}

const StudentModal: React.FC<StudentModalProps> = ({ }) => {

	const [open, setOpen] = useState(false);

	const handleOpen = () => setOpen(!open);

	const setLoadUsers = useLoadUsersStore((state: any) => state.setLoad)

	const { register, handleSubmit, errors, onSubmit, setValue, loading, error, reset } = useFormUser({
		onSuccess: () => {
			handleOpen()
			toast.success('User created successfully!')
			setLoadUsers(true)
		}
	});

	return (
		<>
			<CustomIconTextButton text="Add member" size='sm' onClick={() => {
				handleOpen()
				reset()
			}} children={<UserPlusIcon strokeWidth={2} className="h-4 w-4" />} />

			<Dialog open={open} size='sm' handler={handleOpen} >
				<DialogHeader className="relative m-0 block">
					<Typography variant="h4" color="blue-gray">
						Add Member
					</Typography>
					<Typography className="mt-1 font-normal text-gray-600">
						Add a new member to your team.
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

						<Input label="Email"

							{...register("email",
								{
									required: "Email is required",
									pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email" },
									maxLength: { value: 50, message: "Email must be less than 50 characters" }
								})} error={!!errors.email} />
						{errors.email && <div className='text-red-500 text-[12px]'>{errors.email.message}</div>}
					</div>

					<div className='flex flex-row gap-2 w-full'>

						<div className='flex flex-col gap-0 w-full'>

							<Input label="Name"
								className='uppercase'
								{...register("name",
									{
										required: "Name is required",
										minLength: { value: 3, message: "Name must be at least 3 characters" },
										maxLength: { value: 20, message: "Name must be less than 20 characters" },
										pattern: { value: /^[a-zA-Z]+$/, message: "Name must contain only letters" }
									})} error={!!errors.name} />
							{errors.name && <div className='text-red-500 text-[12px]'>{errors.name.message}</div>}
						</div>

						<div className='flex flex-col gap-0 w-full'>

							<Input label="Last Name"
								className='uppercase'
								{...register("lastName",
									{
										required: "Last name is required",
										minLength: { value: 3, message: "Last name must be at least 3 characters" },
										maxLength: { value: 20, message: "Last name must be less than 20 characters" },
										pattern: { value: /^[a-zA-Z]+$/, message: "Last name must contain only letters" }
									})} error={!!errors.lastName} />
							{errors.lastName && <div className='text-red-500 text-[12px]'>{errors.lastName.message}</div>}
						</div>
					</div>
					<Select value={Role.USER} label="Role" onChange={(value) => {
						setValue("role", value as Role)
					}} >
						<Option value={Role.ADMIN}>ADMIN</Option>
						<Option value={Role.USER}>USER</Option>
						<Option value={Role.SUPER}>SUPER</Option>
					</Select>

					<div className='flex flex-row gap-1 items-center'>

						<ShieldExclamationIcon className='h-4 w-4' />

						<Typography variant='small' color='gray'>
							The password is the same email
						</Typography>

					</div>

					{error && <Alert color="red">{truncateText(error, 100)}</Alert	>}

				</DialogBody>
				<DialogFooter className='flex flex-row gap-2'>
					<CustomButton
						label='Cancel'
						variant="text"
						backgroundColor='red'
						onClick={handleOpen}
						disabled={loading}
					/>
					<CustomButton label='Confirm' onClick={handleSubmit(onSubmit)} loading={loading} disabled={loading} />


				</DialogFooter>

			</Dialog>
		</>
	);

};

export default StudentModal;
