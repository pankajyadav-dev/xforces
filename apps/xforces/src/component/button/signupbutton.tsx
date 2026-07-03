"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton({
  content,
  loading,
  className,
}: {
  content: string;
  loading: string;
  className?: string;
}) {
  const { pending } = useFormStatus();

  const style = className
    ? className
    : `w-full py-2.5 bg-accent text-background font-semibold rounded-lg hover:bg-accent-hover transition-colors text-sm cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed`;
  return (
    <button className={style} type="submit" disabled={pending}>
      {pending ? loading : content}
    </button>
  );
}
