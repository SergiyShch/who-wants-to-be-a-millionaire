import Link from "@/components/Link";
import layout from "@/styles/heroLayout.module.css";

export default function Home() {
  return (
    <>
      <h1 className={layout.heading}>Who wants to be a millionaire?</h1>
      <Link href="/game">Start</Link>
    </>
  );
}
