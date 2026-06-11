import Link from "next/link";

interface LinkFormProps {
  link: string;

  children: React.ReactNode;
}

export default function LinkForm({ link, children }: LinkFormProps) {
  return (
    <Link
      href={link}
      className="p-3 rounded-md font-semibold hover:bg-orange-400 bg-orange-500 text-center flex items-center justify-center gap-2"
    >
      {children}
    </Link>
  );
}
