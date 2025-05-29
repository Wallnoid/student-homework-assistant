"use client";
import { useEffect, useState } from "react";
import {
	Navbar,
	Collapse,
	Typography,
	IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { CustomButton } from "@/shared/components/CustomButton";


export type CustomAdminNavBarProps = {
	// types...
}


const CustomAdminNavBar: React.FC<CustomAdminNavBarProps> = ({ }) => {

	const [openNav, setOpenNav] = useState(false);

	const handleWindowResize = () =>
		window.innerWidth >= 960 && setOpenNav(false);

	useEffect(() => {
		window.addEventListener("resize", handleWindowResize);

		return () => {
			window.removeEventListener("resize", handleWindowResize);
		};
	}, []);


	const NavList = () => {
		return (
			<ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
				<Typography
					as="li"
					variant="small"
					color="blue-gray"
					className="p-1 font-medium"
				>
					<a href="#" className="flex items-center hover:text-blue-500 transition-colors">
						Students
					</a>
				</Typography>



			</ul>
		);
	};



	return (
		<Navbar className="mx-auto   fixed top-3 left-0 right-0 z-50 px-6 py-3">
			<div className="flex items-center justify-between text-blue-gray-900">
				<Typography
					as="a"
					href="#"
					variant="h6"
					className="mr-4 cursor-pointer py-1.5"
				>
					Student Assistant
				</Typography>
				<div className="hidden lg:flex lg:items-center lg:gap-4">
					<NavList />

				</div>
				<div className="items-center gap-2 hidden lg:flex">
					<CustomButton label="Return" variant="outlined" size="sm" onClick={() => { }} />
				</div>
				<IconButton
					variant="text"
					className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
					ripple={false}
					onClick={() => setOpenNav(!openNav)}
				>
					{openNav ? (
						<XMarkIcon className="h-6 w-6" strokeWidth={2} />
					) : (
						<Bars3Icon className="h-6 w-6" strokeWidth={2} />
					)}
				</IconButton>
			</div>
			<Collapse open={openNav}>
				<NavList />
			</Collapse>
		</Navbar>
	);
};

export default CustomAdminNavBar;
