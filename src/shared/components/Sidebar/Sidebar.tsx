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
	ChatBubbleBottomCenterIcon,
	BuildingOffice2Icon,
	UserIcon,
	Bars4Icon,
} from "@heroicons/react/24/solid";
import { Bars3Icon, ChevronDownIcon, Cog8ToothIcon, ExclamationTriangleIcon, TrashIcon, XCircleIcon } from "@heroicons/react/24/outline";
import {
	ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { User } from '@/shared/models/user.model';
import { useNotes } from '@/shared/hooks/useNotes.hook';
import { Note } from '@/shared/models/note.model';
import { getFirstLetter, truncateText } from '@/shared/utils/stringUtils.utils';
import { useEditorStore } from '@/shared/store/note.store';
import { CustomIconButton } from '../CustomIconButton';
import { useUserMe } from '@/shared/hooks/useUserMe.hook';
import { ChatSession } from '@/shared/models/session.model';
import { useLoadChatsStore } from '@/shared/store/loadChat.store';
import { deleteSessionS } from '@/shared/services/session.service';
import { toast } from 'react-hot-toast/headless';

export type SidebarProps = {
	// types...
}

/* This component is a sidebar that contains links to different sections of the application.
It allows users to navigate between different parts of the app easily.
*/
const Sidebar: React.FC<SidebarProps> = ({ }) => {

	// State to manage the open state of the editor and chat sections
	const [openEditor, setOpen] = useState(1);

	// State to manage the open state of the chat section
	const [openChat, setOpenChat] = useState(0);

	// Hook to get the current user information
	const { user, isLoading } = useUserMe();

	// State to manage the visibility of the sidebar
	const [isOpen, setIsOpen] = useState(false);

	// State to manage the visibility of the new note section
	const [showNewNotenoteExists, setShowNewNote] = useState(true)

	// State to manage the visibility of the new chat section
	const [showNewChat, setShowNewChat] = useState(true)

	// Hook to get the current pathname
	const pathname = usePathname();

	// Function to get the first letter of a string
	const handleOpenEditor = (value: number) => {
		setOpen(openEditor === value ? 0 : value);

		setOpenChat(0);
	};

	// Function to handle opening the chat section
	const handleOpenChat = (value: number) => {
		setOpenChat(openChat === value ? 0 : value);
		setOpen(0);
	};

	// Function to get the first letter of a string
	const isActive = (path: string) => {
		return pathname === path;
	}

	// Hook to get the router object for navigation
	const router = useRouter();

	// Hook to get the notes and loading state
	const { notes, loading: loadingNotes, error, deleteNote } = useNotes()

	// Hook to get the new note from the editor store
	const newNote = useEditorStore((state) => state.note);

	// Function to check if a new note exists
	const setLoadChats = useLoadChatsStore((state: any) => state.setLoad);


	// Function to delete a session
	const deleteSession = (id: number) => {
		deleteSessionS(id).then(() => {
			setLoadChats(true);
		}).catch((error) => {
			console.log(error);
			toast.error("Error al eliminar la sesión");
		});
	}


	// useEffect hook to manage the visibility of the sidebar and new note/chat sections
	useEffect(() => {
		setIsOpen(false);
		setShowNewNote(pathname.includes('editor/new'))
		setShowNewChat(pathname.includes('chat/new'))
		if (pathname.includes('editor')) {
			setOpen(1);
			setOpenChat(0);
		}
		if (pathname.includes('chat')) {
			// setLoadChats(true);
			setOpenChat(1);
			setOpen(0);
		}

	}, [pathname])

	return (

		<>

			{
				!isOpen && (
					<div className='left-2 fixed top-2 z-50 lg:hidden '>

						<CustomIconButton
							size='sm'
							roundedFull
							backgroundColor='white'
							children={<Bars3Icon className="h-6 w-6" />}
							onClick={() => {
								setIsOpen(!isOpen);
							}}

						/>

					</div>
				)

			}

			<div className={`absolute top-0 left-0 lg:static h-full w-full lg:w-auto z-50 ${isOpen ? 'block animate-fade-in' : 'hidden'} lg:block `}>

				<Card

					className={`h-full w-full rounded-xs rounded-r-2xl   lg:max-w-[20rem] lg:min-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/10 relative `}>

					<XCircleIcon
						className={`h-6 w-6 absolute top-8 right-2 cursor-pointer lg:hidden ${isOpen ? 'block' : 'hidden'}`}
						onClick={() => setIsOpen(false)}
					/>

					<div className="mb-2 p-4">
						<Typography variant="h5" color="blue-gray">
							Menú
						</Typography>


					</div>
					<List >

						<Link href={"/"}

						>
							<ListItem className={`${isActive('/') ? 'text-primary hover:text-primary active:text-primary' : ''}`}>
								<ListItemPrefix>
									<HomeIcon className="h-5 w-5" />
								</ListItemPrefix>
								Inicio

							</ListItem>
						</Link>
						<Link href={"/editor/new"}

						>

							<ListItem
							>
								<ListItemPrefix>
									<PlusIcon className="h-5 w-5" />
								</ListItemPrefix>
								Crear Nota

							</ListItem>
						</Link>



						<Accordion
							open={openEditor === 1}
							icon={
								<ChevronDownIcon
									strokeWidth={2.5}
									className={`mx-auto h-4 w-4 transition-transform ${openEditor === 1 ? "rotate-180" : ""}`}
								/>
							}
						>
							<ListItem className="p-0" selected={openEditor === 1}>
								<AccordionHeader onClick={() => handleOpenEditor(1)} className="border-b-0 p-3">
									<ListItemPrefix>
										<BookOpenIcon className="h-5 w-5" />
									</ListItemPrefix>
									<Typography color="blue-gray" className="mr-auto font-normal">
										Notas
									</Typography>
								</AccordionHeader>
							</ListItem>
							<AccordionBody className="py-1">
								<List className="p-0 overflow-y-auto max-h-[calc(100vh-500px)]">

									{
										showNewNotenoteExists && (
											<Link
												key={newNote.id}
												href={`/editor/new`}>
												<ListItem
													className={`${isActive('/editor/new') ? 'text-primary hover:text-primary active:text-primary' : ''}`}
												>
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

									{loadingNotes ?
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

															<ListItem
																className={`${isActive(`/editor/${id}`) ? 'text-primary hover:text-primary active:text-primary' : ''} group`}
															>
																<ListItemPrefix>
																	<DocumentTextIcon strokeWidth={3} className="h-5 w-5 " />
																</ListItemPrefix>
																{truncateText(title, 20)}
																<ListItemSuffix className='group-hover:block hidden'>

																	<TrashIcon
																		onClick={(e) => {
																			e?.preventDefault()
																			deleteNote(id!)
																		}}
																		className="h-4 w-4 hover:text-red-500" />

																</ListItemSuffix>
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

						<Link href={"/chat/new"}

						>

							<ListItem
							>
								<ListItemPrefix>
									<PlusIcon className="h-5 w-5" />
								</ListItemPrefix>
								Crear Chat

							</ListItem>
						</Link>
						<Accordion
							open={openChat === 1}
							icon={
								<ChevronDownIcon
									strokeWidth={2.5}
									className={`mx-auto h-4 w-4 transition-transform ${openChat === 1 ? "rotate-180" : ""}`}
								/>
							}
						>
							<ListItem className="p-0" selected={openChat === 1}>
								<AccordionHeader onClick={() => handleOpenChat(1)} className="border-b-0 p-3">
									<ListItemPrefix>
										<ChatBubbleBottomCenterTextIcon className="h-5 w-5" />
									</ListItemPrefix>
									<Typography color="blue-gray" className="mr-auto font-normal">
										Chats
									</Typography>
								</AccordionHeader>
							</ListItem>
							<AccordionBody className="py-1">
								<List className="p-0 overflow-y-auto max-h-[calc(100vh-500px)]">

									{
										showNewChat && (
											<Link
												href={`/chat/new`}>
												<ListItem
													className={`${isActive('/chat/new') ? 'text-primary hover:text-primary active:text-primary' : ''}`}
												>
													<ListItemPrefix>
														<DocumentTextIcon strokeWidth={3} className="h-5 w-5 " />
													</ListItemPrefix>
													New Chat
													<ListItemSuffix>
														<Chip value="N" size="sm" variant="ghost" color="green" className="rounded-full" />
													</ListItemSuffix>
												</ListItem>
											</Link>


										)
									}

									{isLoading ?
										(
											<div className='flex items-center w-full justify-center gap-2 text-gray-500  mt-2'><Spinner color='gray' className='size-3' /> Loading</div>
										) :
										(
											user?.sessions?.length === 0 ? (
												<div className='flex items-center w-full justify-center gap-1 text-gray-500  mt-2'> <ExclamationTriangleIcon className='size-4' /> No chats</div>
											) : (

												user?.sessions?.toReversed()?.map(({ title, id }: ChatSession) => {
													return (
														<Link
															key={id}
															href={`/chat/${id}`}>

															<ListItem
																className={`${isActive(`/chat/${id}`) ? 'text-primary hover:text-primary active:text-primary' : ''} group`}
															>
																<ListItemPrefix>
																	<ChatBubbleBottomCenterIcon strokeWidth={3} className="h-5 w-5 " />
																</ListItemPrefix>
																{truncateText(title, 20) || 'New Chat'}
																<ListItemSuffix className='group-hover:block hidden'>
																	<TrashIcon
																		onClick={(e) => {
																			e?.preventDefault()
																			deleteSession(id!)

																		}}
																		className="h-4 w-4 hover:text-red-500" />
																</ListItemSuffix>
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
								<div className=" flex items-center justify-between  gap-4 hover:bg-gray-200 p-1 px-2 rounded-lg duration-500 cursor-pointer group">

									<div className="flex items-center gap-4 ">
										<div className='size-11 rounded-full overflow-hidden bg-primary'>
											<Typography
												variant="h5"
												className="text-white  flex items-center justify-center h-full"
											>
												{getFirstLetter(user?.name ?? '?')}{getFirstLetter(user?.lastName ?? '?')}
											</Typography>

										</div>
										<div>
											<Typography className='overflow-hidden text-nowrap' variant="h6">{truncateText(`${user?.name ?? 'Cargando...'}`, 12)}</Typography>
											<Typography variant="small" color="gray" className="font-normal">
												{truncateText(user?.organization?.name ?? 'Cargando...', 12)}
											</Typography>
										</div>


									</div>
									<Cog8ToothIcon
										className="size-6 transition-transform group-hover:rotate-180 duration-500 " />

								</div>
							</MenuHandler>
							<MenuList>
								{(user?.role === 'ADMIN' || user?.role === 'SUPER') && (
									<MenuItem className="flex items-center gap-2" onClick={() => {
										router.push('/admin/students');
									}}>
										<ShieldCheckIcon className="size-5" />


										<Typography variant="small" className="font-medium">
											Miembros
										</Typography>
									</MenuItem>
								)}
								{(user?.role === 'SUPER') && (
									<MenuItem className="flex items-center gap-2" onClick={() => {
										router.push('/admin/organization');
									}}>
										<BuildingOffice2Icon className="size-5" />


										<Typography variant="small" className="font-medium">
											Organizaciones
										</Typography>
									</MenuItem>
								)}
								<MenuItem className="flex items-center gap-2" onClick={() => {
									router.push('/profile');
								}}>

									<UserCircleIcon className="size-5    " />

									<Typography variant="small" className="font-medium">
										Perfil
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
			</div>

		</>
	);
};

export default Sidebar;
