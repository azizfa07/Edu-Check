import Link from "next/link";
import { Button } from "../ui/button";

export default function LoginButton() {
  return (
    <>
      <Link href="/login">
        <Button>
          <h1>Login</h1>
        </Button>
      </Link>
    </>
  );
}
