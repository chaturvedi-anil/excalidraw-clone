import Link from "next/link";

export default function Home() {
  return (
    <div>
      homepage

      <Link href={"/signin"} target="_blank">SignIn</Link>
      <Link href={"/signup"} target="_blank">SignUp</Link>
    </div>
  );
}
