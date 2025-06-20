import { SignIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";

const SignInForm = () => {
  return (
    <SignIn
      // appearance={{
      //   elements: {
      //     formButtonPrimary: {
      //       fontSize: 14,
      //       textTransform: "none",
      //       backgroundColor: "#611BBD",
      //       "&:hover, &:focus, &:active": {
      //         backgroundColor: "#49247A",
      //       },
      //     },
      //   },
      // }}

      appearance={{
        elements: {
          card: "border-slate-200 bg-white border drop-shadow-sm rounded-lg shadow-none",

          main: {
            gap: "1.5rem",
          },
          headerTitle: {
            fontSize: "24px",
          },
          headerSubtitle: {
            fontSize: "16px",
          },
          socialButtons: "!flex rounded-full ",

          socialButtonsBlockButton:
            "rounded-full justify-start flex items-center focus:shadow-none",
          socialButtonsIconButton: "rounded-full",
          dividerBox: {
            display: "none",
          },
          formButtonPrimary: {
            borderRadius: "100px",
            textTransform: "none",
          },
          footerActionLink: {
            fontWeight: 500,
          },
        },
      }}
    />
  );
};

export default async function SignInPage() {
  const { userId } = await auth();

  if (userId) {
    return redirect("/");
  }

  return (
    <div className="flex min-h-screen">
      {/* Left side - Login form */}
      <div className="flex w-full flex-col px-6 py-12 lg:w-1/3 lg:px-8">
        <div className="flex flex-1 flex-col justify-center">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-2 text-center text-3xl leading-9 font-bold tracking-tight text-gray-900">
              👋 Welcome back
            </h2>
          </div>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
            <SignInForm />
          </div>
        </div>

        <div className="px-10 pb-0 sm:mx-auto sm:w-full sm:max-w-sm">
          <p className="text-center text-sm text-gray-600">
            By continuing you agree to the{" "}
            <a href="#" className="font-bold text-blue-600">
              Terms of Use
            </a>{" "}
            and{" "}
            <a href="#" className="font-bold text-blue-600">
              Privacy policy
            </a>
            .
          </p>
        </div>
      </div>

      {/* Right side - Gray area */}
      {/*will need to update this later*/}
      <div className="hidden rounded-xl bg-gray-400 lg:m-6 lg:block lg:w-2/3">
        <Image
          src="/signin2.png"
          alt="signin1"
          width={1000}
          height={1000}
          className="h-full w-full rounded-xl object-cover"
        />
      </div>
    </div>
  );
}
