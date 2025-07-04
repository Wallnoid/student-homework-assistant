'use client'
import type { NextPage } from 'next';

import { MagnifyingGlassIcon, TrashIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
    Tabs,
    TabsHeader,
    Tab,
    IconButton,
    Tooltip,
} from "@material-tailwind/react";
import { CustomIconTextButton } from '@/shared/components/CustomIconTextButton';
import { CustomButton } from '@/shared/components/CustomButton';
import { useRouter } from 'next/navigation';
import { useUsers } from '@/features/admin/hooks/useUsers.hook';
import { useCallback, useEffect } from 'react';
import { CustomIconButton } from '@/shared/components/CustomIconButton';
import { useUserMe } from '@/shared/hooks/useUserMe.hook';
import { useOrganizations } from '@/features/admin/hooks/useOrganizations.hook';
import { OrganizationModal } from '@/features/admin/components/OrganizationModal';
import { AsignOrgAdminModal } from '@/features/admin/components/AsignOrgAdminModal';




const TABLE_HEAD = ["Nombre", "Dominio", "Acciones"];

const Page: NextPage = () => {
    const router = useRouter()

    const { organizations, isLoading, error, page, totalPages, setSearch, deleteOrganization, handlePageChange } = useOrganizations()

    const { user } = useUserMe();

    useEffect(() => {
        if (user) {
            if (user.role !== 'SUPER') {
                router.push('/')
            }
        }

    }, [user])



    return (
        <section className='w-full h-full  bg-gray-50 px-10 py-10 '>

            <Card className="h-fit w-full">
                <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className="mb-8 flex items-center justify-between gap-8">
                        <div>
                            <Typography variant="h5" color="blue-gray">
                                Organizaciones
                            </Typography>
                            <Typography color="gray" className="mt-1 font-normal">
                                Información sobre las organizaciones
                            </Typography>
                        </div>
                        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                            <CustomButton label=" Regresar al Dashboard" variant="outlined" size="sm" onClick={() => {
                                router.push('/')
                            }} />


                            <OrganizationModal />
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-between gap-4 md:flex-row ">
                        <div className='w-full md:w-max'>

                        </div>
                        <div className="w-full md:w-72">
                            <Input
                                onChange={(e) => setSearch(e.target.value)}
                                label="Search"
                                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardBody className="overflow-scroll px-0 max-h-[500px]  py-0 mt-4 ">
                    <table className="mt-0 w-full min-w-max table-auto text-left  ">
                        <thead className='sticky -top-1  bg-white z-10'>
                            <tr>
                                {TABLE_HEAD.map((head) => (
                                    <th
                                        key={head}
                                        className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4  "
                                    >
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal leading-none opacity-70"
                                        >
                                            {head}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>

                            {isLoading ? (
                                <tr>
                                    <td colSpan={5} className="text-center">Loading...</td>
                                </tr>
                            ) : (

                                organizations.length === 0 ? (

                                    <tr>
                                        <td colSpan={5} className="text-center">No organizations found</td>
                                    </tr>

                                ) : (

                                    organizations.map(
                                        (organization, index) => {
                                            const isLast = index === organizations.length - 1;
                                            const classes = isLast
                                                ? "p-4"
                                                : "p-4 border-b border-blue-gray-50";

                                            return (
                                                <tr key={organization.id}>
                                                    <td className={classes}>
                                                        <div className="flex items-center gap-3">

                                                            <div className="flex flex-col">
                                                                <Typography
                                                                    variant="small"
                                                                    color="blue-gray"
                                                                    className="font-normal"
                                                                >
                                                                    {organization.name}
                                                                </Typography>
                                                                <Typography
                                                                    variant="small"
                                                                    color="blue-gray"
                                                                    className="font-normal opacity-70"
                                                                >
                                                                    ORG
                                                                </Typography>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className={classes}>
                                                        <div className="flex flex-col">
                                                            <Typography
                                                                variant="small"
                                                                color="blue-gray"
                                                                className="font-normal"
                                                            >
                                                                {organization.domain}
                                                            </Typography>

                                                        </div>
                                                    </td>

                                                    <td className={`${classes} flex flex-row gap-2 `}>
                                                        <Tooltip content="Edit Organization">

                                                            <OrganizationModal org={organization} />
                                                        </Tooltip>

                                                        <Tooltip content="Delete Organization">

                                                            <CustomIconButton size='sm' variant='text' backgroundColor='red' children={<TrashIcon className="h-4 w-4" />} onClick={() => {
                                                                deleteOrganization(organization.id!)
                                                            }} />
                                                        </Tooltip>


                                                        <Tooltip content="Assign Admin">
                                                            <AsignOrgAdminModal orgId={organization.id} />
                                                        </Tooltip>

                                                    </td>
                                                </tr>
                                            );
                                        },
                                    )
                                )
                            )}
                        </tbody>
                    </table>
                </CardBody>
                <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                        Page {page} of {totalPages}
                    </Typography>
                    <div className="flex gap-2">
                        <Button variant="outlined" size="sm" onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
                            Previous
                        </Button>
                        <Button variant="outlined" size="sm" onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>
                            Next
                        </Button>
                    </div>
                </CardFooter>
            </Card>

        </section>
    )
}

export default Page;
