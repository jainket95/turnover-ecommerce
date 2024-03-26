import { z } from 'zod';
import bcrypt from 'bcrypt';
import { type User } from '@prisma/client';
import { generateRandom as generateVerificationCode } from '../../../utils/';

import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import { sendVerificationEmail } from '~/mail/mail-service';
import { type Categories } from '~/app/types';

export const userRouter = createTRPCRouter({
	signup: publicProcedure
		.input(
			z.object({
				name: z.string(),
				email: z.string().email(),
				password: z.string(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			try {
				let user: User | null = await ctx.db.user.findUnique({
					where: { email: input.email },
				});
				if (user) {
					throw new Error('User already exists');
				} else {
					const hashedPassword = await bcrypt.hash(
						input.password,
						10
					);
					user = await ctx.db.user.create({
						data: {
							name: input.name,
							email: input.email,
							password: hashedPassword,
							verificationCode: '',
							isVerified: false,
							categories: JSON.stringify({ data: [] }),
						},
					});
					return user;
				}
			} catch (error) {
				throw error;
			}
		}),
	login: publicProcedure
		.input(z.object({ email: z.string().email(), password: z.string() }))
		.mutation(async ({ ctx, input }) => {
			const user: User | null = await ctx.db.user.findUnique({
				where: { email: input.email },
			});
			if (!user) {
				throw new Error('User not found');
			}
			const isPasswordValid: boolean = await bcrypt.compare(
				input.password,
				user.password
			);
			if (!isPasswordValid) {
				throw new Error('Invalid password');
			}
			return user;
		}),
	sendVerificationCode: publicProcedure
		.input(z.object({ email: z.string() }))
		.mutation(async ({ ctx, input }) => {
			const user: User | null = await ctx.db.user.findUnique({
				where: { email: input.email },
			});
			if (!user) {
				throw new Error('User not found');
			}
			const verificationCode = generateVerificationCode(8);

			try {
				const user: User | null = await ctx.db.user.update({
					where: { email: input.email },
					data: {
						verificationCode,
					},
				});
				await sendVerificationEmail(input.email, verificationCode);
				return user;
			} catch (error) {
				console.error('Error sending verification email:', error);
			}
		}),
	verifyCode: publicProcedure
		.input(z.object({ email: z.string(), code: z.string() }))
		.mutation(async ({ ctx, input }) => {
			const user: User | null = await ctx.db.user.findUnique({
				where: { email: input.email },
			});
			if (!user) {
				throw new Error('User not found');
			}
			if (user.verificationCode !== input.code) {
				throw new Error('Invalid verification code');
			} else {
				const user: User | null = await ctx.db.user.update({
					where: { email: input.email },
					data: {
						isVerified: true,
						verificationCode: '',
					},
				});
				return user;
			}
		}),
	updateCategories: publicProcedure
		.input(z.object({ email: z.string(), category: z.string() }))
		.mutation(async ({ ctx, input }) => {
			const user: User | null = await ctx.db.user.findUnique({
				where: { email: input.email },
			});
			const categories: Categories = JSON.parse(
				user?.categories as string
			) as Categories;
			if (!user) {
				throw new Error('User not found');
			} else {
				const updatedCategories: Categories = {
					data: [...categories.data, input.category],
				};
				const user: User | null = await ctx.db.user.update({
					where: { email: input.email },
					data: {
						categories: JSON.stringify(updatedCategories),
					},
				});
				return user;
			}
		}),
});
