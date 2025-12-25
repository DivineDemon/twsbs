"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { smsPolicyContent } from "@/lib/policies";
import { trpc } from "@/lib/trpc/client";
import { cn } from "@/lib/utils";
import { type RegisterInput, registerSchema } from "@/lib/validations/auth";
import { PolicyModal } from "./policy-modal";

export function RegisterForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const form = useForm<RegisterInput>({
    // biome-ignore lint/suspicious/noExplicitAny: Resolving type mismatch between zod and react-hook-form
    resolver: zodResolver(registerSchema) as any,
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      password: "",
      confirmPassword: "",
      country: "",
      state: "",
      townSuburb: "",
      metro: "",
      mentorEmail: "",
      preferredContact: [],
      wantsBible: false,
      acceptSmsPolicy: false,
    },
    mode: "onChange",
  });

  const registerMutation = trpc.auth.register.useMutation({
    onSuccess: async (_data, variables) => {
      toast.success("Account created", {
        description: "Signing you in...",
      });

      // Auto-login after registration
      const result = await signIn("credentials", {
        redirect: false,
        email: variables.email,
        password: variables.password,
      });

      if (result?.error) {
        toast.error("Sign in failed", {
          description:
            "Account created but could not sign in. Please try logging in manually.",
        });
        router.push("/login");
        return;
      }

      router.push("/dashboard");
      router.refresh();
    },
    onError: (error) => {
      setIsLoading(false);
      toast.error("Registration failed", {
        description: error.message,
      });
    },
  });

  async function onSubmit(data: RegisterInput) {
    setIsLoading(true);
    registerMutation.mutate(data);
  }

  // Navigation handlers
  const nextStep = async () => {
    let fieldsToValidate: Array<keyof RegisterInput> = [];

    if (step === 1) {
      fieldsToValidate = [
        "firstName",
        "lastName",
        "email",
        "phone",
        "dateOfBirth",
      ];
    } else if (step === 2) {
      fieldsToValidate = ["country", "state", "townSuburb", "metro"];
    }

    const isValid = await form.trigger(fieldsToValidate);
    if (isValid) {
      setStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="grid gap-6">
      {/* Step Indicator */}
      <div className="flex items-center justify-between mb-4">
        {[1, 2, 3].map((i) => (
          <Fragment key={i}>
            <div
              className={cn(
                "flex shrink-0 items-center justify-center w-8 h-8 rounded-full border-2",
                step >= i
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-muted text-muted-foreground",
              )}
            >
              {i}
            </div>
            {i < 3 && (
              <div
                className={cn(
                  "w-full h-1 mx-2",
                  step > i ? "bg-primary" : "bg-muted",
                )}
              />
            )}
          </Fragment>
        ))}
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Step 1: Personal Info */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <h3 className="text-lg font-medium">Personal Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="john.doe@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="+1234567890"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Birth</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          )}

          {/* Step 2: Location */}
          {step === 2 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              <h3 className="text-lg font-medium">Location</h3>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input placeholder="Country" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State/Province</FormLabel>
                      <FormControl>
                        <Input placeholder="State" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="townSuburb"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Town/Suburb</FormLabel>
                      <FormControl>
                        <Input placeholder="Town" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="metro"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Metro Area (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Metro" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          )}

          {/* Step 3: Preferences & Safety */}
          {step === 3 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
              {/* <h3 className="text-lg font-medium">Preferences & Security</h3> */}

              {/* Preferences */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="preferredContact"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel className="text-base">
                          Preferred Contact Method
                        </FormLabel>
                        <FormDescription>
                          Select at least one method.
                        </FormDescription>
                      </div>
                      <div className="grid grid-cols-3">
                        {["email", "sms", "whatsapp"].map((item) => (
                          <FormField
                            key={item}
                            control={form.control}
                            name="preferredContact"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={item}
                                  className="flex flex-row items-center space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(item)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([
                                              ...field.value,
                                              item,
                                            ])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== item,
                                              ),
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal capitalize">
                                    {item}
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="acceptSmsPolicy"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-md">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          I agree to receiving SMS texts. Default rates may
                          apply
                        </FormLabel>
                        <FormDescription>
                          <PolicyModal
                            title="SMS Messaging Policy"
                            content={smsPolicyContent}
                            triggerText="Read full SMS Policy"
                          />
                        </FormDescription>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="wantsBible"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          Request a Bible
                        </FormLabel>
                        {/* <FormDescription>
                          I would like to receive a physical Bible.
                        </FormDescription> */}
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <Separator />

              {/* Security */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="mentorEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mentor&apos;s Email (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="mentor@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      If you were invited by someone, enter their email here.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            {step > 1 ? (
              <Button type="button" variant="outline" onClick={prevStep}>
                Back
              </Button>
            ) : (
              // Spacer for first step to push Next button to right
              <div />
            )}

            {step < totalSteps ? (
              <Button type="button" onClick={nextStep}>
                Next
              </Button>
            ) : (
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Account
              </Button>
            )}
          </div>
        </form>
      </Form>

      <div className="text-center text-sm space-y-2">
        <div>
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-primary hover:underline"
          >
            Sign in here
          </Link>
        </div>
      </div>
    </div>
  );
}
