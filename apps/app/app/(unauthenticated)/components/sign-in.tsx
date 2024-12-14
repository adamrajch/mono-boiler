'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from '@repo/auth/client';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/design-system/components/ui/form';

import { toast } from '@/app/hooks/use-toast';
import { signInFormSchema } from '@/app/lib/zod/auth';
import { Button } from '@repo/design-system/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@repo/design-system/components/ui/card';
import { Input } from '@repo/design-system/components/ui/input';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

export const SignIn = () => {
  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof signInFormSchema>) {
    const { email, password } = values;
    await signIn.email(
      {
        email,
        password,
        callbackURL: '/dashboard',
      },
      {
        onRequest: () => {
          toast({
            title: 'Please wait...',
          });
        },
        onSuccess: () => {
          form.reset();
        },
        onError: (ctx) => {
          toast({
            title: 'Error',
            description: ctx.error.message,
            variant: 'destructive',
          });
        },
      }
    );
  }

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>
          Welcome back! Please sign in to continue.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john@mail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>

      <CardFooter className="flex justify-center">
        <p className="text-muted-foreground text-sm">
          Don&apos;t have an account yet?{' '}
          <Link href="/sign-up" className="text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};
