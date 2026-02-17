"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { deleteSkill } from "@/actions/skills";

interface Skill {
  id: number;
  name: string;
  description: string;
  isPublic: boolean;
  createdAt: string;
}

/**
 * Dashboard Page - Client Component with httpOnly Cookie Auth
 * Uses cookies (sent automatically) for authentication
 */
export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loadingSkills, setLoadingSkills] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  useEffect(() => {
    if (user) {
      fetchUserSkills();
    }
  }, [user]);

  const fetchUserSkills = async () => {
    try {
      // Cookies are automatically sent with fetch
      const response = await fetch("/api/skills", {
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setSkills(data.skills || []);
      }
    } catch (error) {
      console.error("Failed to fetch skills:", error);
    } finally {
      setLoadingSkills(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!user || !confirm("Are you sure you want to delete this skill?")) {
      return;
    }

    setDeletingId(id);
    try {
      const result = await deleteSkill(id, user.id);
      if (result.success) {
        setSkills(skills.filter((s) => s.id !== id));
      } else {
        alert(result.error || "Failed to delete skill");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete skill");
    } finally {
      setDeletingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-base-content/70 mt-1">
            Welcome back, {user?.name}!
          </p>
        </div>
        <Link href="/dashboard/skills/new" className="btn btn-primary">
          + Create Skill
        </Link>
      </div>

      <div className="stats shadow mb-8">
        <div className="stat">
          <div className="stat-title">Total Skills</div>
          <div className="stat-value">{skills.length}</div>
        </div>
        <div className="stat">
          <div className="stat-title">Public</div>
          <div className="stat-value text-primary">
            {skills.filter((s) => s.isPublic).length}
          </div>
        </div>
        <div className="stat">
          <div className="stat-title">Private</div>
          <div className="stat-value text-secondary">
            {skills.filter((s) => !s.isPublic).length}
          </div>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">Your Skills</h2>

      {loadingSkills ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="card bg-base-200">
              <div className="card-body">
                <div className="skeleton h-6 w-3/4"></div>
                <div className="skeleton h-4 w-full mt-2"></div>
                <div className="skeleton h-8 w-24 mt-4"></div>
              </div>
            </div>
          ))}
        </div>
      ) : skills.length === 0 ? (
        <div className="text-center py-12 bg-base-200 rounded-lg">
          <div className="text-4xl mb-4">📝</div>
          <h3 className="text-lg font-semibold mb-2">No skills yet</h3>
          <p className="text-base-content/70 mb-4">
            Create your first agent skill to get started
          </p>
          <Link href="/dashboard/skills/new" className="btn btn-primary">
            Create Skill
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((skill) => (
            <div key={skill.id} className="card bg-base-200">
              <div className="card-body">
                <div className="flex justify-between items-start">
                  <h3 className="card-title text-lg">{skill.name}</h3>
                  <div
                    className={`badge ${skill.isPublic ? "badge-success" : "badge-ghost"}`}
                  >
                    {skill.isPublic ? "Public" : "Private"}
                  </div>
                </div>
                <p className="text-base-content/70 text-sm line-clamp-2">
                  {skill.description}
                </p>
                <div className="card-actions justify-end mt-4">
                  <Link
                    href={`/dashboard/skills/${skill.id}/edit`}
                    className="btn btn-ghost btn-sm"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(skill.id)}
                    className="btn btn-error btn-sm btn-outline"
                    disabled={deletingId === skill.id}
                  >
                    {deletingId === skill.id ? (
                      <span className="loading loading-spinner loading-xs"></span>
                    ) : (
                      "Delete"
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}