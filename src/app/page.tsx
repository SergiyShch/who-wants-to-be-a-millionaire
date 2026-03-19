import Answer from "@/components/Answer/Answer";
import Prize from "@/components/Prize/Prize";

export default function Home() {
  return (
    <main>
      <h1>Hello, Next.js!</h1>
      <Answer variant={"correct"} label={"A"} text={"Answer"}>
        A Inactive
      </Answer>
      <Answer variant={"wrong"} label={"A"} text={"Answer"}>
        A Inactive
      </Answer>
      <Answer variant={"selected"} label={"A"} text={"Answer"}>
        A Inactive
      </Answer>
      <Answer label={"A"} text={"Answer"}>
        A Inactive
      </Answer>

      <Prize variant={"default"} amount={"$1000"} />
      <Prize variant={"guaranteed"} amount={"$1000"} />
      <Prize variant={"passed"} amount={"$1000"} />
    </main>
  );
}
