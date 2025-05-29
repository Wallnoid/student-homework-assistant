'use client'
import type { NextPage } from 'next';

import { MagnifyingGlassIcon, TrashIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
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
import { useUsers } from '@/features/admin/hooks/useUsers';
import { useCallback, useEffect } from 'react';
import { StudentModal } from '@/features/admin/components/StudentModal';
import { CustomIconButton } from '@/shared/components/CustomIconButton';
import { getUser } from '@/shared/utils/localStorage.utils';


const TABS = [
    {
        label: "All",
        value: "all",
    },
    {
        label: "Monitored",
        value: "monitored",
    },
    {
        label: "Unmonitored",
        value: "unmonitored",
    },
];

const TABLE_HEAD = ["Member", "Role", "Status", "Created At", "Actions"];

const Page: NextPage = () => {
    const router = useRouter()

    const { users, isLoading, error, page, totalPages, setSearch, deleteUser } = useUsers()



    useEffect(() => {
        const user = getUser()
        if (user) {
            if (user.role !== 'ADMIN' && user.role !== 'SUPER') {
                // router.push('/')
            }
        }

    }, [])



    return (
        <section className='w-full h-full  bg-gray-50 px-10 py-10 '>

            <Card className="h-fit w-full">
                <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className="mb-8 flex items-center justify-between gap-8">
                        <div>
                            <Typography variant="h5" color="blue-gray">
                                Members list
                            </Typography>
                            <Typography color="gray" className="mt-1 font-normal">
                                See information about all members
                            </Typography>
                        </div>
                        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                            <CustomButton label=" Return to Dashboard" variant="outlined" size="sm" onClick={() => {
                                router.push('/')
                            }} />


                            <StudentModal />
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-between gap-4 md:flex-row ">
                        <Tabs value="all" className="w-full md:w-max">
                            <TabsHeader>
                                {TABS.map(({ label, value }) => (
                                    <Tab key={value} value={value}>
                                        &nbsp;&nbsp;{label}&nbsp;&nbsp;
                                    </Tab>
                                ))}
                            </TabsHeader>
                        </Tabs>
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
                                        className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 "
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

                                users.length === 0 ? (

                                    <tr>
                                        <td colSpan={5} className="text-center">No users found</td>
                                    </tr>

                                ) : (

                                    users.map(
                                        (user, index) => {
                                            const isLast = index === users.length - 1;
                                            const classes = isLast
                                                ? "p-4"
                                                : "p-4 border-b border-blue-gray-50";

                                            return (
                                                <tr key={user.id}>
                                                    <td className={classes}>
                                                        <div className="flex items-center gap-3">

                                                            <div className="flex flex-col">
                                                                <Typography
                                                                    variant="small"
                                                                    color="blue-gray"
                                                                    className="font-normal"
                                                                >
                                                                    {user.name} {user.lastName}
                                                                </Typography>
                                                                <Typography
                                                                    variant="small"
                                                                    color="blue-gray"
                                                                    className="font-normal opacity-70"
                                                                >
                                                                    {user.email}
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
                                                                {user.role}
                                                            </Typography>

                                                        </div>
                                                    </td>
                                                    <td className={classes}>
                                                        <div className="w-max">
                                                            <Chip
                                                                variant="ghost"
                                                                size="sm"
                                                                value={true ? "online" : "offline"}
                                                                color={true ? "green" : "blue-gray"}
                                                            />
                                                        </div>
                                                    </td>
                                                    <td className={classes}>
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal"
                                                        >
                                                            {user.createdAt}
                                                        </Typography>
                                                    </td>
                                                    <td className={classes}>
                                                        <Tooltip content="Edit User">

                                                            <StudentModal student={user} />
                                                        </Tooltip>

                                                        <Tooltip content="Delete User">

                                                            <CustomIconButton size='sm' variant='text' backgroundColor='red' children={<TrashIcon className="h-4 w-4" />} onClick={() => {
                                                                deleteUser(user.id!)
                                                            }} />
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
                        <Button variant="outlined" size="sm">
                            Previous
                        </Button>
                        <Button variant="outlined" size="sm">
                            Next
                        </Button>
                    </div>
                </CardFooter>
            </Card>

        </section>
    )
}

export default Page;


