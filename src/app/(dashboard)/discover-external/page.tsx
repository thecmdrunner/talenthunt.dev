"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { useQueryState } from "nuqs";

export default function Page() {
  const [searchQuery, setSearchQuery] = useQueryState("q", {
    defaultValue: "",
  });

  const {
    mutateAsync,
    data: searchResults,
    isPending,
  } = api.services.searchLinkedin.useMutation();

  return (
    <div className="flex flex-col gap-4 p-4">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search LinkedIn profiles..."
        className="rounded border border-zinc-300 px-3 py-2"
      />
      <Button
        type="button"
        onClick={() => mutateAsync({ query: searchQuery })}
        disabled={isPending}
        className="w-full"
      >
        Search
      </Button>
      <pre className="text-xs whitespace-pre-wrap">
        {JSON.stringify(searchResults, null, 2)}
      </pre>
    </div>
  );
}
