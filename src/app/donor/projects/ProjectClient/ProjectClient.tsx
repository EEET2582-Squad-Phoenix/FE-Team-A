"use client";

import React, { useState, useEffect, useRef } from "react";
import ProjectList from "@/components/project/ProjectList";
import Filter from "@/components/filters/Filter";
import { IProject, FilterState, ProjectCategory } from "@/types/project";
import { fetchProjects } from "@/app/api/projects/projectsAPI";
import { Folder } from "lucide-react";

const COUNTRY_OPTIONS = [
  "Vietnam",
  "USA",
  "South Africa",
  "Germany",
  "Ukraine",
  "Israel",
  "China",
];

export default function ProjectClient() {
  const [filters, setFilters] = useState<FilterState>({
    name: "",
    category: "All",
    country: "All",
  });
  const [projects, setProjects] = useState<IProject[]>([]);
  const [page, setPage] = useState(1);
  const loaderRef = useRef<HTMLDivElement>(null);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const loadProjects = async (currentPage = 1, isLoadMore = false) => {
    if (!isLoadMore) {
      setProjects([]);
      setPage(1);
    }

    setIsLoading(true);
    try {
      const response = await fetchProjects(
        {
          name: filters.name || undefined,
          category: filters.category === "All" ? undefined : filters.category,
          country: filters.country === "All" ? undefined : filters.country,
        },
        currentPage,
        5 // Items per page
      );

      const newProjects = response.data;

      if (isLoadMore) {
        setProjects((prevProjects) => [...prevProjects, ...newProjects]);
      } else {
        setProjects(newProjects);
      }

      setHasMore(currentPage < response.totalPages);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Re-fetch projects when filters change
  useEffect(() => {
    loadProjects(1, false);
  }, [filters]);

  // Lazy load projects when loaderRef comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { root: null, rootMargin: "100px" }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }
    return () => observer.disconnect();
  }, [loaderRef, hasMore]);

  useEffect(() => {
    if (page > 1) {
      loadProjects(page, true);
    }
  }, [page]);

  return (
    <div className="p-6">
      <div className="text-gray-900 mb-10">
        <h1 className="text-3xl font-semibold flex items-center gap-4">
          <Folder className="w-8 h-8" />{" "}
          Explore Projects
        </h1>
        <p className="text-sm text-gray-600">
          Discover exciting projects, filter by category and location, and get
          involved today.
        </p>
      </div>
      <Filter
        filters={filters}
        categories={Object.values(ProjectCategory)}
        countries={COUNTRY_OPTIONS}
        onFilterChange={setFilters}
      />
      <ProjectList projects={projects} />

      <div ref={loaderRef} className="mt-6 flex justify-center">
        {isLoading ? (
          <div className="h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent animate-spin" />
        ) : hasMore ? (
          <p className="text-gray-500 text-lg">Loading more projects...</p>
        ) : (
          <p className="text-gray-500 text-lg">That's all~</p>
        )}
      </div>
    </div>
  );
}
