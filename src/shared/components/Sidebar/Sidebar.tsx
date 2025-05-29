"use client";
import React, { useEffect, useState } from 'react';
import {
	Card,
	Typography,
	List,
	ListItem,
	ListItemPrefix,
	ListItemSuffix,
	Chip,
	Accordion,
	AccordionHeader,
	AccordionBody,
	Avatar,
	Menu,
	MenuList,
	MenuItem,
	MenuHandler,
	Spinner,
} from "@material-tailwind/react";
import {
	UserCircleIcon,
	Cog6ToothIcon,
	HomeIcon,
	BookOpenIcon,
	DocumentTextIcon,
	ShieldCheckIcon,
	PlusIcon,
} from "@heroicons/react/24/solid";
import { ChevronDownIcon, Cog8ToothIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { getNote, getUser } from '@/shared/utils/localStorage.utils';
import { User } from '@/shared/models/user.model';
import { useNotes } from '@/shared/hooks/useNotes.hook';
import { Note } from '@/shared/models/note.model';
import { truncateText } from '@/shared/utils/stringUtils.utils';
import { useEditorStore } from '@/shared/store/note.store';

export type SidebarProps = {
	// types...
}

const Sidebar: React.FC<SidebarProps> = ({ }) => {
	const [open, setOpen] = useState(1);

	const [user, setUser] = useState<User | null>(null)

	const [showNewNotenoteExists, setShowNewNote] = useState(true)

	const pathname = usePathname();

	const handleOpen = (value: number) => {
		setOpen(open === value ? 0 : value);
	};

	const isActive = (path: string) => {
		return pathname === path;
	}

	const router = useRouter();

	const { notes, loading, error } = useNotes()

	const newNote = useEditorStore((state) => state.note);






	useEffect(() => {
		const user = getUser()
		if (user) {
			setUser(user)
		}

	}, [])


	useEffect(() => {


		setShowNewNote(pathname.includes('new'))

	}, [pathname])

	return (
		<Card className="h-full w-full rounded-xs rounded-r-2xl  max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/10 relative ">
			<div className="mb-2 p-4">
				<Typography variant="h5" color="blue-gray">
					Menú
				</Typography>
			</div>
			<List >

				<Link href={"/"}>
					<ListItem>
						<ListItemPrefix>
							<HomeIcon className="h-5 w-5" />
						</ListItemPrefix>
						Inicio
						<ListItemSuffix>
							<Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
						</ListItemSuffix>
					</ListItem>
				</Link>
				<Link href={"/editor/new"}

				>

					<ListItem>
						<ListItemPrefix>
							<PlusIcon className="h-5 w-5" />
						</ListItemPrefix>
						Crear Nota

					</ListItem>
				</Link>
				<Accordion
					open={open === 1}
					icon={
						<ChevronDownIcon
							strokeWidth={2.5}
							className={`mx-auto h-4 w-4 transition-transform ${open === 1 ? "rotate-180" : ""}`}
						/>
					}
				>
					<ListItem className="p-0" selected={open === 1}>
						<AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
							<ListItemPrefix>
								<BookOpenIcon className="h-5 w-5" />
							</ListItemPrefix>
							<Typography color="blue-gray" className="mr-auto font-normal">
								Notas
							</Typography>
						</AccordionHeader>
					</ListItem>
					<AccordionBody className="py-1">
						<List className="p-0 overflow-y-auto max-h-[calc(100vh-330px)]">

							{
								showNewNotenoteExists && (
									<Link
										key={newNote.id}
										href={`/editor/new`}>
										<ListItem >
											<ListItemPrefix>
												<DocumentTextIcon strokeWidth={3} className="h-5 w-5 " />
											</ListItemPrefix>
											{newNote.title !== "" ? truncateText(newNote.title, 20) : 'New Note'}
											<ListItemSuffix>
												<Chip value="N" size="sm" variant="ghost" color="green" className="rounded-full" />
											</ListItemSuffix>
										</ListItem>
									</Link>


								)
							}

							{loading ?
								(
									<div className='flex items-center w-full justify-center gap-2 text-gray-500  mt-2'><Spinner color='gray' className='size-3' /> Loading</div>
								) :
								(
									notes.length === 0 ? (
										<div className='flex items-center w-full justify-center gap-1 text-gray-500  mt-2'> <ExclamationTriangleIcon className='size-4' /> No documents</div>
									) : (

										notes.toReversed()?.map(({ title, id }: Note) => {
											return (
												<Link
													key={id}
													href={`/editor/${id}`}>
													<ListItem >
														<ListItemPrefix>
															<DocumentTextIcon strokeWidth={3} className="h-5 w-5 " />
														</ListItemPrefix>
														{truncateText(title, 20)}
													</ListItem>
												</Link>
											)
										})
									)
								)

							}








						</List>
					</AccordionBody>
				</Accordion>
			</List>

			<div className="absolute bottom-0 left-0 w-full p-4 bg-white ">

				<Menu placement="top-end" offset={2} >
					<MenuHandler>
						<div className=" flex items-center justify-between gap-4 hover:bg-gray-200 p-1 px-2 rounded-lg duration-500 cursor-pointer group">

							<div className="flex items-center gap-4 ">
								<Avatar src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar"


								/>
								<div>
									<Typography variant="h6">{user?.name} {user?.lastName}</Typography>
									<Typography variant="small" color="gray" className="font-normal">
										{user?.role}
									</Typography>
								</div>


							</div>
							<Cog8ToothIcon
								className="size-6 transition-transform group-hover:rotate-180 duration-500 " />

						</div>
					</MenuHandler>
					<MenuList>
						<MenuItem className="flex items-center gap-2" onClick={() => {
							router.push('/admin/students');
						}}>
							<ShieldCheckIcon className="size-5" />

							<Typography variant="small" className="font-medium">
								Administración
							</Typography>
						</MenuItem>
						<MenuItem className="flex items-center gap-2">

							<Cog6ToothIcon className="size-5    " />

							<Typography variant="small" className="font-medium">
								Configuraciones
							</Typography>
						</MenuItem>


						<hr className="my-2 border-blue-gray-50" />

						<MenuItem className="flex items-center gap-2 " onClick={() => {
							router.push('/login');
						}}>
							<svg
								width="16"
								height="14"
								viewBox="0 0 16 14"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M1 0C0.734784 0 0.48043 0.105357 0.292893 0.292893C0.105357 0.48043 0 0.734784 0 1V13C0 13.2652 0.105357 13.5196 0.292893 13.7071C0.48043 13.8946 0.734784 14 1 14C1.26522 14 1.51957 13.8946 1.70711 13.7071C1.89464 13.5196 2 13.2652 2 13V1C2 0.734784 1.89464 0.48043 1.70711 0.292893C1.51957 0.105357 1.26522 0 1 0ZM11.293 9.293C11.1108 9.4816 11.01 9.7342 11.0123 9.9964C11.0146 10.2586 11.1198 10.5094 11.3052 10.6948C11.4906 10.8802 11.7414 10.9854 12.0036 10.9877C12.2658 10.99 12.5184 10.8892 12.707 10.707L15.707 7.707C15.8945 7.51947 15.9998 7.26516 15.9998 7C15.9998 6.73484 15.8945 6.48053 15.707 6.293L12.707 3.293C12.6148 3.19749 12.5044 3.12131 12.3824 3.0689C12.2604 3.01649 12.1292 2.9889 11.9964 2.98775C11.8636 2.9866 11.7319 3.0119 11.609 3.06218C11.4861 3.11246 11.3745 3.18671 11.2806 3.2806C11.1867 3.3745 11.1125 3.48615 11.0622 3.60905C11.0119 3.73194 10.9866 3.86362 10.9877 3.9964C10.9889 4.12918 11.0165 4.2604 11.0689 4.3824C11.1213 4.50441 11.1975 4.61475 11.293 4.707L12.586 6H5C4.73478 6 4.48043 6.10536 4.29289 6.29289C4.10536 6.48043 4 6.73478 4 7C4 7.26522 4.10536 7.51957 4.29289 7.70711C4.48043 7.89464 4.73478 8 5 8H12.586L11.293 9.293Z"
									fill="#90A4AE"
								/>
							</svg>
							<Typography variant="small" className="font-medium">
								Cerrar Sesión
							</Typography>
						</MenuItem>
					</MenuList>
				</Menu>



			</div>
		</Card>
	);
};

export default Sidebar;
