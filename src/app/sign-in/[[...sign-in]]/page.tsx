import { SignIn } from "@clerk/nextjs";

const page = () => {
  return (
    <main className="wrapper mt-25 flex items-center justify-center">
      <SignIn />
    </main>
  );
};

export default page;
