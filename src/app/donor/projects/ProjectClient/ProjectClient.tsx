"use client";

import React, { useState, useEffect, useRef } from "react";
import ProjectList from "@/components/project/ProjectList";
import Filter from "@/components/filters/Filter";
import { IProject, FilterState, ProjectCategory } from "@/types/project";

export default function ProjectClient({
  initialProjects,
}: {
  initialProjects: IProject[];
}) {
  const [filters, setFilters] = useState<FilterState>({
    category: "All",
    country: "All",
  });
  const [visibleProjects, setVisibleProjects] = useState<IProject[]>([]);
  const [page, setPage] = useState(1);
  const loaderRef = useRef<HTMLDivElement>(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const applyFilters = () => {
      let filtered = initialProjects;
      if (filters.category !== "All") {
        filtered = filtered.filter((p) => p.category === filters.category);
      }
      if (filters.country !== "All") {
        filtered = filtered.filter((p) => p.country.includes(filters.country));
      }
      const newVisibleProjects = filtered.slice(0, page * 5);
      setVisibleProjects(newVisibleProjects);
      setHasMore(newVisibleProjects.length < filtered.length); 
    };

    applyFilters();
  }, [filters, page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setPage((prev) => prev + 1);
      },
      { root: null, rootMargin: "100px" }
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Explore Projects</h1>
      <Filter
        filters={filters}
        categories={Object.values(ProjectCategory)}
        onFilterChange={setFilters}
      />
      <ProjectList projects={visibleProjects} />

      <div ref={loaderRef} className="mt-6 flex justify-center">
        {hasMore ? (
          <div className="h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent animate-spin" />
        ) : (
          <p className="text-gray-500 text-lg">That's all~</p>
        )}
      </div>
    </div>
  );
}