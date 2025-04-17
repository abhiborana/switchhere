"use client";

import { generateToken } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useSwitchStore from "@/store";
import { supabaseClient } from "@/supabase";
import { zodResolver } from "@hookform/resolvers/zod";
import { compare, hash } from "bcryptjs";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const Authentication = () => {
  const router = useRouter();
  const dispatch = useSwitchStore((state) => state.dispatch);
  const form = useForm({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const checkUser = async (email) => {
    const { data, error } = await supabaseClient
      .from("users")
      .select("*")
      .eq("email", email)
      .single();
    if (error) {
      console.debug(error);
      return false;
    }
    return data;
  };

  const onSubmit = async (data) => {
    const { email, password, name } = data;
    const hashedPassword = await hash(password, 10);
    const user = await checkUser(email);
    console.debug(`🚀 ~ onSubmit ~ user:`, user);
    if (user) {
      compare(password, user.password, async (err, result) => {
        if (result) {
          toast.success("Login successful");
          await generateToken({
            email: user.email,
            name: user.name,
            id: user.id,
          });
          dispatch({
            type: "SET_STATE",
            payload: {
              user: {
                email: user.email,
                name: user.name,
                id: user.id,
              },
            },
          });
          router.push("/dashboard");
        } else {
          toast.error("Invalid email or password");
        }
      });
    } else {
      if (!name.trim().length) {
        toast.error("Please enter your name to sign up");
        return;
      }
      const { data: user, error } = await supabaseClient
        .from("users")
        .insert({
          email: email,
          password: hashedPassword,
          name: name,
        })
        .select("name, email, id")
        .single();
      if (error) return toast.error("Error creating user");
      toast.success("User created successfully");
      await generateToken({
        email: user.email,
        name: user.name,
        id: user.id,
      });
      dispatch({
        type: "SET_STATE",
        payload: {
          user: {
            email: email,
            name: name,
            id: user.id,
          },
        },
      });
      router.push("/dashboard");
    }
  };

  return (
    <Card className="w-full max-w-sm shadow-2xl">
      <CardHeader>
        <CardTitle>Login or SignUp</CardTitle>
        <CardDescription>
          Login to your account or create a new one to get started.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Nextjs Hackathon" {...field} />
                  </FormControl>
                  <FormDescription
                    className={"text-amber-500 font-medium text-xs"}
                  >
                    *Only required if you are signing up.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      autoFocus
                      placeholder="next@hackathon.js"
                      {...field}
                    />
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
                      placeholder="Min 6-digit @lpha-numer1c"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className={"w-fit self-end mt-4"}>
              Authenticate
            </Button>
          </form>
        </Form>
        <CardFooter className="flex justify-center items-center text-muted mt-4 font-semibold text-xl">
          Switchhere
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default Authentication;

const authSchema = z.object({
  email: z
    .string({
      message: "Please enter a valid email",
    })
    .email({
      message: "Please enter a valid email",
    }),
  password: z
    .string()
    .min(6, {
      message: "Atleast 6 characters",
    })
    .max(32),
  name: z.string().optional(),
});
