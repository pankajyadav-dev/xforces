import Link from "next/link";

export function PageIndex({
  currentpage,
  visiblePages,
  totalPages,
}: {
  currentpage: number;
  visiblePages: number[];
  totalPages: number;
}) {
  return (
    <div className="flex justify-center items-center gap-2 mt-8 w-full">
      {currentpage > 1 && (
        <Link
          href={`?page=${currentpage - 1}`}
          className="min-w-[36px] h-9 flex items-center justify-center rounded-md text-sm font-medium text-text-muted border border-transparent hover:bg-surface-hover hover:text-text transition-all duration-200"
        >
          {"<"}
        </Link>
      )}

      {visiblePages.map((item, index) => {
        const isActive = item === currentpage;
        return (
          <Link
            key={index}
            href={`?page=${item}`}
            aria-current={isActive ? "page" : undefined}
            className={`min-w-[36px] h-9 flex items-center justify-center rounded-md text-sm font-medium transition-all duration-200 ${
              isActive
                ? "bg-primary text-white border border-primary shadow-sm"
                : "text-text-muted border border-transparent hover:bg-surface-hover hover:text-text"
            }`}
          >
            {item}
          </Link>
        );
      })}

      {currentpage < totalPages && (
        <Link
          href={`?page=${currentpage + 1}`}
          className="min-w-[36px] h-9 flex items-center justify-center rounded-md text-sm font-medium text-text-muted border border-transparent hover:bg-surface-hover hover:text-text transition-all duration-200"
        >
          {">"}
        </Link>
      )}
    </div>
  );
}
