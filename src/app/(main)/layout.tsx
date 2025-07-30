import React, { Suspense } from "react";

import Navbar from "@/components/common/navbar/Navbar";

export default function MainLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<Navbar />

			<Suspense fallback={<>loading</>}>{children}</Suspense>
		</>
	);
}
