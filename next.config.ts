import type { NextConfig } from "next";

const nextConfig = {
	env: {
		ANALYTICS_CODE: process.env["ANALYTICS_CODE"],
	},
	typedRoutes: true,
} satisfies NextConfig;

export default nextConfig;
