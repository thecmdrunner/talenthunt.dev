import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <SignIn
      appearance={{
        elements: {
          formButtonPrimary: {
            fontSize: 14,
            textTransform: "none",
            backgroundColor: "#611BBD",
            "&:hover, &:focus, &:active": {
              backgroundColor: "#49247A",
            },
          },
        },
      }}
    />
  );
}
