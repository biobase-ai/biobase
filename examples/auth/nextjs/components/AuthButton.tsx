import { createClient } from "@/utils/biobase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AuthButton() {
  const biobase = createClient();

  const {
    data: { user },
  } = await biobase.auth.getUser();

  const signOut = async () => {
    "use server";

    const biobase = createClient();
    await biobase.auth.signOut();
    return redirect("/login");
  };

  return user ? (
    <div className="flex items-center gap-4">
      Hey, {user.email}!
      <form action={signOut}>
        <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
          Logout
        </button>
      </form>
    </div>
  ) : (
    <Link
      href="/login"
      className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
    >
      Login
    </Link>
  );
}
